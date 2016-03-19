// require rx-facebook.js
function rx_fb_api(next) {
  return Rx.Observable.create(function (observer) {
    _rx_fb_api(next, observer);
  });
}

function _rx_fb_api(next, observer) {
  FB.api(next, function (response) {
    if (response.error) {
      observer.onError(response.error);
      return;
    }

    for (var i = 0; i < response.data.length; i++) {
      observer.onNext(response.data[i]);
    }

    if (response.paging && response.paging.next) {
      _rx_fb_api(response.paging.next, observer);
    }
  });
}
