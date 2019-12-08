"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const pino = require("pino");
const express_ctx_1 = require("express-ctx");
const constants_1 = require("./constants");
const params_1 = require("./params");
let outOfContext;
function __resetOutOfContextForTests() {
    // only for tests
    // @ts-ignore
    outOfContext = undefined;
}
exports.__resetOutOfContextForTests = __resetOutOfContextForTests;
let PinoLogger = class PinoLogger {
    constructor(options) {
        this.context = "";
        this.contextKey = "name";
        if (!outOfContext) {
            if (Array.isArray(options)) {
                outOfContext = pino(...options);
            }
            else if (params_1.isPassedLogger(options)) {
                outOfContext = options.logger;
            }
            else if (options && "useExisting" in options) {
                const { useExisting } = options, rest = __rest(options, ["useExisting"]);
                outOfContext = pino(rest);
            }
            else {
                outOfContext = pino(options || undefined);
            }
        }
    }
    trace(...args) {
        this.call("trace", ...args);
    }
    debug(...args) {
        this.call("debug", ...args);
    }
    info(...args) {
        this.call("info", ...args);
    }
    warn(...args) {
        this.call("warn", ...args);
    }
    error(...args) {
        this.call("error", ...args);
    }
    fatal(...args) {
        this.call("fatal", ...args);
    }
    setContext(value) {
        this.context = value;
    }
    call(method, ...args) {
        const context = this.context;
        if (context) {
            const firstArg = args[0];
            if (typeof firstArg === "object") {
                args = [
                    Object.assign({ [this.contextKey]: context }, firstArg),
                    ...args.slice(1)
                ];
            }
            else {
                args = [{ [this.contextKey]: context }, ...args];
            }
        }
        this.logger[method](...args);
    }
    get logger() {
        return express_ctx_1.getValue(constants_1.LOGGER_KEY) || outOfContext;
    }
};
PinoLogger = __decorate([
    common_1.Injectable({ scope: common_1.Scope.TRANSIENT }),
    __param(0, common_1.Inject(constants_1.OPTIONS_PROVIDER_TOKEN)),
    __metadata("design:paramtypes", [Object])
], PinoLogger);
exports.PinoLogger = PinoLogger;
//# sourceMappingURL=PinoLogger.js.map