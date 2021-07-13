import { BaseTransport, Candle, ExecutedOrder, Instrument, OrderOptions, TickHandler, TimeFrame } from '@debut/types';
import { Bar, AlpacaClient, AlpacaStream } from '@master-chief/alpaca';
import { RawBar } from '@master-chief/alpaca/@types/entities';
export declare type AlpacaTransportArgs = {
    atoken: string;
    asecret: string;
};
export declare function convertTimeFrame(timeframe: TimeFrame): "1Min" | "1Hour" | "1Day";
export declare function isNotSupportedTimeframe(timeframe: TimeFrame): boolean;
export declare function transformAlpacaCandle(bar: Bar | RawBar): Candle;
export declare class AlpacaTransport implements BaseTransport {
    protected api: AlpacaClient;
    protected stream: AlpacaStream;
    private instruments;
    constructor();
    getInstrument(ticker: string): Promise<Instrument>;
    subscribeToTick(ticker: string, handler: TickHandler, interval: TimeFrame): Promise<() => void>;
    placeOrder(order: OrderOptions): Promise<ExecutedOrder>;
    placeSandboxOrder(order: OrderOptions): Promise<ExecutedOrder>;
    prepareLots(lots: number): number;
}
