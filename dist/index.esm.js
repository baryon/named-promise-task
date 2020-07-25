import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/**
 * A Named Promise Task 
 * Insipre from https://stackoverflow.com/questions/53540348/js-async-await-tasks-queue
 */
var PromiseTask = function PromiseTask(context, namedWorkers) {
  var _this = this;

  _classCallCheck(this, PromiseTask);

  _defineProperty(this, "addTask", function () {
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

                return _context.abrupt("return", (_this$_namedWorkers$n = _this._namedWorkers[name]).call.apply(_this$_namedWorkers$n, [_this._context].concat(values)));

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
      for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        values[_key2 - 1] = arguments[_key2];
      }

      return pending = run.apply(void 0, [name].concat(values));
    };
  }());

  this._context = context;
  this._namedWorkers = namedWorkers;
  this._pending = Promise.resolve();
} // task executor
;

export default PromiseTask;
//# sourceMappingURL=index.esm.js.map
