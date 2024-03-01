var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Worker } from 'near-workspaces';
import anyTest from 'ava';
import { setDefaultResultOrder } from 'dns';
setDefaultResultOrder('ipv4first'); // temp fix for node >v17
var worker;
var accounts;
var test = anyTest;
test.before(function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var root, contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Worker.init()];
            case 1:
                // Init the worker and start a Sandbox server
                worker = _a.sent();
                t.assert(false);
                root = worker.rootAccount;
                return [4 /*yield*/, root.createSubAccount('test-account')];
            case 2:
                contract = _a.sent();
                // Get wasm file path from package.json test script in folder above
                return [4 /*yield*/, contract.deploy(process.argv[2])];
            case 3:
                // Get wasm file path from package.json test script in folder above
                _a.sent();
                // Save state for test runs, it is unique for each test
                accounts = { root: root, contract: contract };
                return [2 /*return*/];
        }
    });
}); });
test.after.always(function (t) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // Stop Sandbox server
            return [4 /*yield*/, worker.tearDown().catch(function (error) {
                    console.log('Failed to stop the Sandbox:', error);
                })];
            case 1:
                // Stop Sandbox server
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('returns the default greeting', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, greeting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contract = accounts.contract;
                return [4 /*yield*/, contract.view('get_greeting', {})];
            case 1:
                greeting = _a.sent();
                t.is(greeting, 'Hello');
                return [2 /*return*/];
        }
    });
}); });
test('changes the greeting', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var root, contract, greeting;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                root = accounts.root, contract = accounts.contract;
                return [4 /*yield*/, root.call(contract, 'set_greeting', { greeting: 'Howdy' })];
            case 1:
                _a.sent();
                return [4 /*yield*/, contract.view('get_greeting', {})];
            case 2:
                greeting = _a.sent();
                t.is(greeting, 'Howdy');
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5hdmEuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2dhZ2RpZXovdG1wL2RvY3MtZXhhbXBsZXMvaGVsbG8tbmVhci1leGFtcGxlcy9jb250cmFjdC10cy8iLCJzb3VyY2VzIjpbInNhbmRib3gtdHMvbWFpbi5hdmEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBZSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sT0FBbUIsTUFBTSxLQUFLLENBQUM7QUFDdEMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7QUFFMUcsSUFBSSxNQUFjLENBQUM7QUFDbkIsSUFBSSxRQUFxQyxDQUFDO0FBRTFDLElBQU0sSUFBSSxHQUFHLE9BQXFCLENBQUM7QUFFbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFPLENBQUM7Ozs7b0JBRVQscUJBQU0sTUFBTSxDQUFDLElBQUksRUFBRSxFQUFBOztnQkFENUIsNkNBQTZDO2dCQUM3QyxNQUFNLEdBQUcsU0FBbUIsQ0FBQztnQkFFN0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFVixJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFDZixxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLEVBQUE7O2dCQUF0RCxRQUFRLEdBQUcsU0FBMkM7Z0JBQzVELG1FQUFtRTtnQkFDbkUscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDaEIsRUFBQTs7Z0JBSEQsbUVBQW1FO2dCQUNuRSxTQUVDLENBQUM7Z0JBRUYsdURBQXVEO2dCQUN2RCxRQUFRLEdBQUcsRUFBRSxJQUFJLE1BQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDOzs7O0tBQy9CLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQU8sQ0FBQzs7OztZQUN4QixzQkFBc0I7WUFDdEIscUJBQU0sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFDLEtBQUs7b0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3BELENBQUMsQ0FBQyxFQUFBOztnQkFIRixzQkFBc0I7Z0JBQ3RCLFNBRUUsQ0FBQzs7OztLQUNKLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyw4QkFBOEIsRUFBRSxVQUFPLENBQUM7Ozs7O2dCQUNuQyxRQUFRLEdBQUssUUFBUSxTQUFiLENBQWM7Z0JBQ0wscUJBQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLEVBQUE7O2dCQUExRCxRQUFRLEdBQVcsU0FBdUM7Z0JBQ2hFLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7O0tBQ3pCLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxzQkFBc0IsRUFBRSxVQUFPLENBQUM7Ozs7O2dCQUMzQixJQUFJLEdBQWUsUUFBUSxLQUF2QixFQUFFLFFBQVEsR0FBSyxRQUFRLFNBQWIsQ0FBYztnQkFDcEMscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUE7O2dCQUFoRSxTQUFnRSxDQUFDO2dCQUN4QyxxQkFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsRUFBQTs7Z0JBQTFELFFBQVEsR0FBVyxTQUF1QztnQkFDaEUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7S0FDekIsQ0FBQyxDQUFDIn0=