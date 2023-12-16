(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.gdavg = factory());
})(this, (function () { 'use strict';

    var IsInValidKey = function (keys) {
      return keys == null || keys === '' || keys.length === 0;
    };
    var GetEntry = function (target, keys, defaultEntry) {
      var entry = target;
      if (IsInValidKey(keys)) ; else {
        if (typeof keys === 'string') {
          keys = keys.split('.');
        }
        var key;
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
          key = keys[i];
          if (entry[key] == null || typeof entry[key] !== 'object') {
            var newEntry;
            if (i === cnt - 1) {
              if (defaultEntry === undefined) {
                newEntry = {};
              } else {
                newEntry = defaultEntry;
              }
            } else {
              newEntry = {};
            }
            entry[key] = newEntry;
          }
          entry = entry[key];
        }
      }
      return entry;
    };
    var SetValue = function (target, keys, value, delimiter) {
      if (delimiter === undefined) {
        delimiter = '.';
      }

      // no object
      if (typeof target !== 'object') {
        return;
      }

      // invalid key
      else if (IsInValidKey(keys)) {
        // don't erase target
        if (value == null) {
          return;
        }
        // set target to another object
        else if (typeof value === 'object') {
          target = value;
        }
      } else {
        if (typeof keys === 'string') {
          keys = keys.split(delimiter);
        }
        var lastKey = keys.pop();
        var entry = GetEntry(target, keys);
        entry[lastKey] = value;
      }
      return target;
    };

    var avg = function avg() {
      for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
        arr[_key] = arguments[_key];
      }
      return arr.reduce(function (a, b) {
        return a + b;
      }) / arr.length;
    };
    SetValue(window, 'GD.Average', avg);

    return avg;

}));
