import { DynamicModule } from "@nestjs/common";
import { DestinationStream, LoggerOptions } from "pino";
import { LoggerModuleAsyncOptions, Params } from "./params";
export declare class LoggerModule {
    static forRoot(opts?: Exclude<Params, [LoggerOptions, DestinationStream]>): DynamicModule;
    static forRoot(opts: LoggerOptions, stream: DestinationStream): DynamicModule;
    static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule;
}
