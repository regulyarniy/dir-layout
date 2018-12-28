export default (url, callback) => {
  // Feature detection
  if (!window.XMLHttpRequest) {
    return;
  }

  // Create new request
  let xhr = new XMLHttpRequest();

  // Setup callback
  xhr.onload = function () {
    if (callback && typeof (callback) === `function`) {
      callback(this.responseXML);
    }
  };

  // Get the HTML
  xhr.open(`GET`, url);
  xhr.responseType = `document`;
  xhr.send();
};
