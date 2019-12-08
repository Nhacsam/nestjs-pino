"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const PinoLogger_1 = require("./PinoLogger");
const decoratedTokenPrefix = "PinoLogger:";
const decoratedLoggers = new Set();
function InjectPinoLogger(context = "") {
    decoratedLoggers.add(context);
    return common_1.Inject(`${decoratedTokenPrefix}${context}`);
}
exports.InjectPinoLogger = InjectPinoLogger;
function createDecoratedLoggerProvider(context) {
    return {
        provide: `${decoratedTokenPrefix}${context}`,
        useFactory: (logger) => {
            logger.setContext(context);
            return logger;
        },
        inject: [PinoLogger_1.PinoLogger]
    };
}
function createProvidersForDecorated() {
    return [...decoratedLoggers.values()].map(context => createDecoratedLoggerProvider(context));
}
exports.createProvidersForDecorated = createProvidersForDecorated;
//# sourceMappingURL=InjectPinoLogger.js.map