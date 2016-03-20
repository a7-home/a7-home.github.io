// require rx-facebook.js
function rxFbApi(next) {
  return Rx.Observable.create(function (observer) {
    _rxFbApi(next, observer);
  });
}

function _rxFbApi(next, observer) {
  FB.api(next, function (response) {
    if (response.error) {
      observer.onError(response.error);
      return;
    }

    for (var i = 0; i < response.data.length; i++) {
      if (!observer.unsubscribed) {
        observer.onNext(response.data[i]);
      }
    }

    if (!observer.unsubscribed) {
      if (response.paging && response.paging.next) {
        _rxFbApi(response.paging.next, observer);
      } else {
        observer.onCompleted();
      }
    }
  });
}
