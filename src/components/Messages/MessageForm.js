import React, { Component } from 'react'
import firebase from '../../firebase'
import { Segment, Input, Button } from 'semantic-ui-react'
import uuidv4 from 'uuid/v4'
import { Picker, emojiIndex } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import FileModal from './FileModal'
import ProggresBar from './ProgressBar'

export class MessageForm extends Component {
  state = {
    storageRef: firebase.storage().ref(),
    typingRef: firebase.database().ref('typing'),
    uploadTask: null,
    uploadState: '',
    percentUploaded: 0,
    message: '',
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: [],
    modal: false,
    emojiPicker: false
  }

  componentWillUnmount() {
    if (this.state.uploadTask !== null) {
      this.state.uploadTask.cancel()
      this.setState({ uploadTask: null })
    }
  }

  openModal = () => this.setState({ modal: true })
  closeModal = () => this.setState({ modal: false })

  handleOnChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleKeyDown = e => {
    const { message, typingRef, channel, user } = this.state

    e = e || window.event
    const enterKey = e.key === 'Enter' || e.keyCode === 13
    if (enterKey) {
      this.sendMessage()
    }

    if (message) {
      typingRef
        .child(channel.id)
        .child(user.uid)
        .set(user.displayName)
    } else {
      typingRef
        .child(channel.id)
        .child(user.uid)
        .remove()
    }
  }

  createMessage = (fileUrl = null) => {
    const { user } = this.state

    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL
      }
    }
    if (fileUrl !== null) {
      message['image'] = fileUrl
    } else {
      message['content'] = this.state.message
    }
    return message
  }

  sendMessage = () => {
    const { getMessagesRef } = this.props
    const { message, channel, user, typingRef } = this.state

    if (message) {
      this.setState({ loading: true })
      getMessagesRef()
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({
            loading: false,
            message: '',
            errors: []
          })
          typingRef
            .child(channel.id)
            .child(user.uid)
            .remove()
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: [...this.state.errors.concat, { message: 'Add a message' }]
        // errors: this.state.errors.concat({ message: 'Add a message' }})
      })
    }
  }

  getPath = () => {
    if (this.props.isPrivateChannel) {
      return `chat/private/${this.state.channel.id}`
    } else {
      return 'chat/public'
    }
  }

  uploadFile = (file, metadata) => {
    const pathToUpload = this.state.channel.id
    const ref = this.props.getMessagesRef()
    const filePath = `${this.getPath()}/${uuidv4()}.jpg`

    this.setState(
      {
        uploadState: 'uploading',
        uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
      },
      () => {
        this.state.uploadTask.on(
          'state_changed',
          snap => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            )
            this.setState({ percentUploaded })
          },
          err => {
            console.error(err)
            this.setState({
              errors: this.state.error.concat(err),
              uploadState: 'error',
              uploadTask: null
            })
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadUrl => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload)
              })
              .catch(err => {
                console.error(err)
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: 'error',
                  uploadTask: null
                })
              })
          }
        )
      }
    )
  }

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({ uploadState: 'done' })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          errors: this.state.errors.concat(err)
        })
      })
  }

  handleTogglePicker = () => {
    this.setState({ emojiPicker: !this.state.emojiPicker })
  }

  handleAddEmoji = emoji => {
    const oldMessage = this.state.message
    const newMessage = this.colonToUnicode(` ${oldMessage} ${emoji.colons} `)
    this.setState({ message: newMessage, emojiPicker: false })
    setTimeout(() => this.messageInputRef.focus(), 0)
  }

  colonToUnicode = message => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, x => {
      x = x.replace(/:/g, '')
      let emoji = emojiIndex.emojis[x]
      if (typeof emoji !== 'undefined') {
        let unicode = emoji.native
        if (typeof unicode !== 'undefined') {
          return unicode
        }
      }
      x = ':' + x + ':'
      return x
    })
  }

  render() {
    // prettier ignore
    const {
      errors,
      message,
      loading,
      modal,
      uploadState,
      percentUploaded,
      emojiPicker
    } = this.state

    return (
      <Segment className='message__form'>
        {emojiPicker && (
          <Picker id="Emojipicker"
            set='apple'
            onSelect={this.handleAddEmoji}
            className='emojipicker'
            title='Pick your emoji'
            emoji='point_up'
          />
        )}
        <Input
          fluid
          name='message'
          style={{ marginBottom: '.7em' }}
          labelPosition='left'
          placeholder='Write your message'
          ref={node => (this.messageInputRef = node)}
          value={message}
          onChange={this.handleOnChange}
          onKeyDown={this.handleKeyDown}
          className={
            errors.some(err => err.message.includes('message')) ? 'error' : ''
          }
          label={
            <Button
              icon={emojiPicker ? 'close' : 'add'}
              content={emojiPicker ? 'Close' : null}
              onClick={this.handleTogglePicker}
            />
          }
        />
        <Button.Group icon widths='2'>
          <Button
            onClick={this.sendMessage}
            disabled={loading}
            color='orange'
            content='Add Reply'
            labelPosition='left'
            icon='edit'
          />
          <Button
            onClick={this.openModal}
            disabled={uploadState === 'uploading'}
            color='teal'
            content='Upload Media'
            labelPosition='right'
            icon='cloud upload'
          />
          <FileModal
            modal={modal}
            closeModal={this.closeModal}
            uploadFile={this.uploadFile}
          />
        </Button.Group>
        <ProggresBar
          uploadState={uploadState}
          percentUploaded={percentUploaded}
        />
      </Segment>
    )
  }
}

export default MessageForm