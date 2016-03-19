// require promise.js
function fb_api(next) {
  return new Promise(function (resolve, reject) {
    fb_api_promise(next, resolve, reject);
  });
}

function fb_api_promise(next, resolve, reject) {
  FB.api(next, function (response) {
    if (response.error) {
      reject(new Error(response.error));
      return;
    }

    for (var i = 0; i < response.data.length; i++) {
      resolve(response.data[i]);
    }

    if (response.paging && response.paging.next) {
      fb_api_promise(response.paging.next, resolve, reject);
    }
  });
}

