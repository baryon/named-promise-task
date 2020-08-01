'use strict';

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

var _assertThisInitialized = require("@babel/runtime/helpers/assertThisInitialized");

var _inherits = require("@babel/runtime/helpers/inherits");

var _possibleConstructorReturn = require("@babel/runtime/helpers/possibleConstructorReturn");

var _getPrototypeOf = require("@babel/runtime/helpers/getPrototypeOf");

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var events = require('events');
/**
 * A Named Promise Task
 * Inspire from https://stackoverflow.com/questions/53540348/js-async-await-tasks-queue
 */


var PromiseTask = /*#__PURE__*/function (_events$EventEmitter) {
  _inherits(PromiseTask, _events$EventEmitter);

  var _super = _createSuper(PromiseTask);

  function PromiseTask(context, namedWorkers) {
    var _this;

    _classCallCheck(this, PromiseTask);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "addTask", function () {
      var pending = Promise.resolve();

      var run = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(name) {
          var _this$_namedWorkers$n,
              _len,
              values,
              _key,
              _args = arguments;

          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return pending;

                case 3:
                  _context.prev = 3;

                  for (_len = _args.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    values[_key - 1] = _args[_key];
                  }

                  return _context.abrupt("return", Promise.resolve((_this$_namedWorkers$n = _this._namedWorkers[name]).call.apply(_this$_namedWorkers$n, [_this._context].concat(values)))["finally"](function () {
                    _this._size--;

                    if (_this._size === 0) {
                      _this.emit('stop');
                    }
                  }));

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0,, 3, 7]]);
        }));

        return function run(_x) {
          return _ref.apply(this, arguments);
        };
      }(); // update pending promise so that next task could await for it


      return function (name) {
        _this._size++;

        if (_this._size === 1) {
          _this.emit('start');
        }

        for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          values[_key2 - 1] = arguments[_key2];
        }

        return pending = run.apply(void 0, [name].concat(values));
      };
    }());

    _this._context = context;
    _this._namedWorkers = namedWorkers;
    _this._pending = Promise.resolve();
    _this._size = 0;
    return _this;
  } // task queue size


  _createClass(PromiseTask, [{
    key: "size",
    get: function get() {
      return this._size;
    } // checking is running

  }, {
    key: "isRunning",
    get: function get() {
      return this._size !== 0;
    } // task executor

  }]);

  return PromiseTask;
}(events.EventEmitter);

module.exports = PromiseTask;
//# sourceMappingURL=index.cjs.js.map
