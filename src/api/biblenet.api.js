import fetchJsonp from 'fetch-jsonp';

// http://getbible.net/api

export const fetchBook = (bookRef) => {
  const url = `http://getbible.net/json?text=${bookRef}`;

  return fetchJsonp(url, {jsonpCallback: 'getbible'})
    .then((response) => {
      return response.json();
    })
    .catch((ex) => {
      return {};
    });
};

export const fetchChapter = (bookRef, chapterRef) => {
  const url = `http://getbible.net/json?text=${bookRef}${chapterRef}`;

  return fetchJsonp(url, {jsonpCallback: 'getbible'})
    .then((response) => {
      return response.json();
    })
    .catch((ex) => {
      return {};
    });
};

window.fetchChapter = fetchChapter;
window.fetchBook = fetchBook;

// http://getbible.net/api
// http://getbible.net/json?getbible=jQuery1124032952169341802806_1531956343748&p=John1&v=kjv&_=1531956343750
