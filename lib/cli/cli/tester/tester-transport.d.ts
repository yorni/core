import { BaseTransport, TickHandler, Instrument, OrderOptions, ExecutedOrder, Candle } from '@debut/types';
declare type TesterTransportOptions = {
    ticker: string;
    comission: number;
    ohlc?: boolean;
    broker?: string;
};
export declare class TesterTransport implements BaseTransport {
    done: Promise<boolean>;
    private ticks;
    private handlers;
    opts: TesterTransportOptions;
    complete: Promise<void>;
    private precision;
    private resolve;
    private fee;
    constructor(opts: TesterTransportOptions);
    getInstrument(): Promise<Instrument>;
    setTicks(ticks: Candle[]): void;
    run(waitFor?: boolean): Promise<void>;
    reset(): void;
    subscribeToTick(ticker: string, handler: TickHandler): Promise<() => void>;
    tickLoop(): Promise<void>;
    placeOrder(order: OrderOptions): Promise<ExecutedOrder>;
    placeSandboxOrder(order: OrderOptions): Promise<ExecutedOrder>;
    getUsdBalance(): Promise<number>;
    prepareLots(lots: number): number;
}
export {};
