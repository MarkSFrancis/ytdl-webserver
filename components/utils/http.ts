import fileSaver from 'file-saver';

export function get(url: string) {
  // Return a new promise.
  return new Promise((resolve, reject) => {
    // Do the usual XHR stuff
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onload = () => {
      // This is called even on 404 etc
      // so check the status
      if (req.status === 200) {
        // Resolve the promise with the response text
        resolve(JSON.parse(req.response));
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = () => {
      reject(Error('Network Error'));
    };

    // Make the request
    req.send();
  });
}

export function post(url, params) {
  // Return a new promise.
  return new Promise((resolve, reject) => {
    // Do the usual XHR stuff
    const req = new XMLHttpRequest();
    req.open('POST', url);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onload = () => {
      // This is called even on 404 etc
      // so check the status
      if (req.status === 200) {
        // Resolve the promise with the response text
        resolve(JSON.parse(req.response));
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = () => {
      reject(Error('Network Error'));
    };

    // Make the request
    req.send(params);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function downloadPost(url: string, requestData?: any) {
  // Return a new promise.
  return new Promise((resolve, reject) => {
    // Do the usual XHR stuff
    const req = new XMLHttpRequest();
    req.open('POST', url);
    req.responseType = 'blob';
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    req.onload = () => {
      // This is called even on 404 etc
      // so check the status
      if (req.status === 200) {
        // Resolve the promise with the response text
        const filename = req.getResponseHeader('Content-Disposition')
          .split(';')
          .map((h) => h.trim())
          .filter((h) => h.startsWith('filename='))[0]
          .substring('filename='.length)
          .replace(/^"+|"+$/g, '');

        fileSaver.saveAs(req.response, filename);
        resolve();
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = () => {
      reject(Error('Network Error'));
    };

    // Make the request
    req.send(requestData);
  });
}
