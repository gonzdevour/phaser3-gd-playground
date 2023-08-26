(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.gdavg = factory());
})(this, (function () { 'use strict';

    var avg = function avg() {
      for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
        arr[_key] = arguments[_key];
      }
      return arr.reduce(function (a, b) {
        return a + b;
      }) / arr.length;
    };

    return avg;

}));
