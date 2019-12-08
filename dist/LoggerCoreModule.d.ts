import { DynamicModule, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { Params, LoggerModuleAsyncOptions } from "./params";
export declare class LoggerCoreModule implements NestModule {
    private readonly options;
    static forRoot(options: Params | undefined): DynamicModule;
    static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule;
    constructor(options: Params);
    configure(consumer: MiddlewareConsumer): void;
}
