import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Icon, Dropdown, Image, Modal, Input, Button  } from 'semantic-ui-react'
import firebase from 'firebase';
import AvatarEditor from 'react-avatar-editor'

class UserPanel extends React.Component {

  state = {
    // Passed global state via props from App>SidePanel>UserPanel
      user: this.props.currentUser,
      modal: false,
      previewImage: '',
      croppedImage: '',
      uploadedCroppedImage: '',
      blob: '' ,
      storageRef: firebase.storage().ref(),
      userRef: firebase.auth().currentUser,
      usersRef: firebase.database().ref("users"),
      metadata: {
        contentType: "image/jpeg"
      }
    }
  
    openModal = () => this.setState({ modal: true })
    closeModal = () => this.setState({ modal: false })
  
    dropdownOptions = () => [
      {
        key: 'user',
        text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
        disabled: true
      },
      {
        key: 'avatar',
        text: <span onClick={this.openModal}>Change Avatar</span>
      },
      {
        key: 'signout',
        text: <span onClick={this.handleSignout}>Sign Out</span>,
      }
    ]
  
    handleSignout = () => {
      firebase
        .auth()
        .signOut()
        .then(console.log('Signed out'))
    }
  
    handleChange = e => {
      const file = e.target.files[0]
      const reader = new FileReader()
  
      if (file) {
        reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          this.setState({ previewImage: reader.result })
        })
      }
    }
  
    handleCropImage = () => {
      if (this.avatarEditor) {
        this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
          let imageUrl = URL.createObjectURL(blob)
          this.setState({
            croppedImage: imageUrl,
            blob
          })
        })
      }
    }
  
    uploadCroppedImage = () => {
      const { storageRef, userRef, blob, metadata } = this.state
  
      storageRef
        .child(`avatars/users/${userRef.uid}`)
        .put(blob, metadata)
        .then(snap => {
          snap.ref.getDownloadURL().then(downloadURL => {
            this.setState({ uploadedCroppedImage: downloadURL }, () =>
              this.changeAvatar()
            )
          })
        })
    }
  
    changeAvatar = () => {
      this.state.userRef
        .updateProfile({
          photoURL: this.state.uploadedCroppedImage
        })
        .then(() => {
          console.log("PhotoURL updated")
          this.closeModal()
        })
        .catch(err => {
          console.error(err)
        });
  
      this.state.usersRef
        .child(this.state.user.uid)
        .update({ avatar: this.state.uploadedCroppedImage })
        .then(() => {
          console.log("User avatar updated");
        })
        .catch(err => {
          console.error(err);
        })
    }
  
    render() {
      const { user, modal, previewImage, croppedImage } = this.state
      const { primaryColor } = this.props

    return (
      <Grid style={{ background: primaryColor }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>

            <Header inverted floated='left' as='h2' >
              <Icon name='book' />
              <Header.Content>
                <span className='font__cornera font__cornera--medium'>Bible Buddy</span>
              </Header.Content>
            </Header>
          {/* // user drowdown */}
            <Header style={{ padding: '.25rem' }} as='h4' inverted>
              <Dropdown 
                trigger={
                  <span>
                    <Image src={user.photoURL} spaced='right' avatar/>
                    {user.displayName}
                  </span> 
                }
                options={this.dropdownOptions()}
              />
            </Header>
            {/* Change User Avatar Modal   */}
            <Modal basic open={modal} onClose={this.closeModal}>
              <Modal.Header>Change Avatar</Modal.Header>
              <Modal.Content>
                <Input 
                  onChange={this.handleChange}
                  fluid
                  type='file'
                  label='New Avatar'
                  name='previewImage'
                 />
                <Grid centered stackable columns={2}>
                  <Grid.Row centered>
                    <Grid.Column className='ui center aligned grid'>
                      {/* Image Preview */}
                      {previewImage && (
                        <AvatarEditor
                          ref={node => (this.avatarEditor = node)}
                          image={previewImage}
                          width={120}
                          height={120}
                          border={50}
                          scale={1.2}
                        />
                      )}
                    </Grid.Column>
                    <Grid.Column>
                      {/* Cropped Image Preview */}
                      {croppedImage && (
                        <Image
                          style={{ margin: '3.5em auto' }}
                          width={100}
                          height={100}
                          src={croppedImage}
                        />
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Content>
              <Modal.Actions>
                {croppedImage && (
                  <Button
                    color="green"
                    inverted
                    onClick={this.uploadCroppedImage}
                  >
                    <Icon name="save" /> Change Avatar
                </Button>
                )}
                <Button color='green' inverted onClick={this.handleCropImage} >
                  <Icon name='image' /> Preview
              </Button>
                <Button color='red' inverted onClick={this.closeModal}>
                  <Icon name='remove' /> Cancel
              </Button>
              </Modal.Actions>
            </Modal>

          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(UserPanel);