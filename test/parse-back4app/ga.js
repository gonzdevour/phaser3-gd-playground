window.ga_sendEvent = function(eventName, params) {
  gtag('event', eventName, params);
  c2_callFunction('ga.sendevent.success',[eventName,params]);
}