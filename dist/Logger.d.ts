import { LoggerService } from "@nestjs/common";
import { PinoLogger } from "./PinoLogger";
export declare class Logger implements LoggerService {
    private readonly logger;
    private contextKey;
    constructor(logger: PinoLogger);
    verbose(message: any, context?: string, ...args: any[]): void;
    debug(message: any, context?: string, ...args: any[]): void;
    log(message: any, context?: string, ...args: any[]): void;
    warn(message: any, context?: string, ...args: any[]): void;
    error(message: any, trace?: string, context?: string, ...args: any[]): void;
}
