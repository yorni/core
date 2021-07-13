import { BaseTransport, Candle, DebutCore, DebutOptions, ExecutedOrder, Instrument, OrderType, PluginInterface } from '@debut/types';
export declare abstract class Debut implements DebutCore {
    dispose: () => void;
    instrument: Instrument;
    opts: DebutOptions;
    orders: ExecutedOrder[];
    transport: BaseTransport;
    protected plugins: unknown;
    protected candles: Candle[];
    private marketTick;
    private pluginDriver;
    private learning;
    constructor(transport: BaseTransport, opts: DebutOptions);
    /**
     * Prev known candle hot getter
     */
    get prevCandle(): Candle;
    /**
     * Last known closed candle
     */
    get currentCandle(): Candle;
    /**
     * Plugins initialization
     */
    registerPlugins(plugins: PluginInterface[]): void;
    /**
     * Start listen ticks for current instrument
     */
    start(): Promise<() => void>;
    /**
     * Get constructor name, for logs and other cases
     */
    getName(): string;
    /**
     * Close all current positions
     */
    closeAll(): Promise<ExecutedOrder[]>;
    /**
     * Place market order with type
     */
    createOrder(operation: OrderType): Promise<ExecutedOrder>;
    /**
     * Close selected order
     */
    closeOrder(closing: ExecutedOrder): Promise<ExecutedOrder>;
    /**
     * Submitting historical data to the bot as a pre-start stage
     * In order for the bot to enter the market of these indicators and possibly transactions
     * To make a smooth transition to real deals
     */
    learn(days?: number): Promise<void>;
    private handler;
    /**
     * Candle collection managment
     */
    private updateCandles;
    protected onOrderClosed(order: ExecutedOrder, closing: ExecutedOrder): Promise<void>;
    protected onOrderOpened(order: ExecutedOrder): Promise<void>;
    protected onCandle(candle: Candle): Promise<void>;
    protected onTick(tick: Candle): Promise<void>;
}
