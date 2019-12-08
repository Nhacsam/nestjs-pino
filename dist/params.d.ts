import * as pinoHttp from "pino-http";
import * as pino from "pino";
import { DestinationStream } from "pino";
import { ModuleMetadata } from "@nestjs/common/interfaces";
export declare type PassedLogger = {
    logger: pino.Logger;
};
export declare type UseExisting = {
    useExisting: boolean;
};
export declare type Params = null | pinoHttp.Options | DestinationStream | [pinoHttp.Options, DestinationStream] | UseExisting;
export interface LoggerModuleAsyncOptions extends Pick<ModuleMetadata, "imports" | "providers"> {
    useFactory: (...args: any[]) => Params | Promise<Params>;
    inject?: any[];
}
export declare function isPassedLogger(params: Params): params is PassedLogger;
