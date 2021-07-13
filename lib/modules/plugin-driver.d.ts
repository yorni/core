import { PluginDriverInterface, DebutCore, PluginInterface, SyncHooks, SkippingHooks, AsyncHooks, PluginHook, HookToArgumentsMap } from '@debut/types';
export declare class PluginDriver implements PluginDriverInterface {
    private debut;
    private pluginCtx;
    private plugins;
    constructor(debut: DebutCore);
    register(plugins: PluginInterface[]): void;
    getPublicAPI(): Readonly<unknown>;
    syncReduce<T extends SyncHooks>(hookName: T, ...args: Parameters<HookToArgumentsMap[T]>): void;
    asyncSkipReduce<T extends SkippingHooks>(hookName: T, ...args: Parameters<HookToArgumentsMap[T]>): Promise<any>;
    asyncReduce<T extends AsyncHooks>(hookName: AsyncHooks, ...args: Parameters<HookToArgumentsMap[T]>): Promise<void>;
    runHook<T extends PluginHook>(hookName: PluginHook, plugin: PluginInterface, ...args: Parameters<HookToArgumentsMap[T]>): any;
    private findPlugin;
}
