'use strict';

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

require("core-js/modules/es.promise.finally");

require("core-js/modules/web.dom-collections.iterator");

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

var events = require('events');
/**
 * A Named Promise Task 
 * Inspire from https://stackoverflow.com/questions/53540348/js-async-await-tasks-queue
 */


class PromiseTask extends events.EventEmitter {
  constructor(context, namedWorkers) {
    var _this;

    super();
    _this = this;

    _defineProperty(this, "addTask", (() => {
      let pending = Promise.resolve();

      const run = async function run(name) {
        try {
          await pending;
        } finally {
          for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            values[_key - 1] = arguments[_key];
          }

          return _this._namedWorkers[name].call(_this._context, ...values).finally(() => {
            _this._size--;

            if (_this._size === 0) {
              _this.emit('stop');
            }
          });
        }
      }; // update pending promise so that next task could await for it


      return function (name) {
        _this._size++;

        if (_this._size === 1) {
          _this.emit('start');
        }

        for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          values[_key2 - 1] = arguments[_key2];
        }

        return pending = run(name, ...values);
      };
    })());

    this._context = context;
    this._namedWorkers = namedWorkers;
    this._pending = Promise.resolve();
    this._size = 0;
  } // task queue size


  get size() {
    return this._size;
  } // checking is running


  get isRunning() {
    return this._size !== 0;
  } // task executor


}

module.exports = PromiseTask;
//# sourceMappingURL=index.cjs.js.map
