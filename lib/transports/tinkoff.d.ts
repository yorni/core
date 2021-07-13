import { BaseTransport, Candle, ExecutedOrder, Instrument, OrderOptions, TickHandler, TimeFrame } from '@debut/types';
import OpenAPI, { Candle as TinkoffCandle, CandleStreaming, CandleResolution } from '@tinkoff/invest-openapi-js-sdk';
export declare function transformTinkoffCandle(candle: TinkoffCandle | CandleStreaming): Candle;
export declare function convertTimeFrame(interval: TimeFrame): CandleResolution;
export declare class TinkoffTransport implements BaseTransport {
    protected api: OpenAPI;
    private instruments;
    constructor();
    getPrice(ticker: string): Promise<number>;
    getInstrument(ticker: string): Promise<Instrument>;
    subscribeToTick(ticker: string, handler: TickHandler, interval?: TimeFrame): Promise<() => void>;
    placeOrder(order: OrderOptions): Promise<ExecutedOrder>;
    placeSandboxOrder(order: OrderOptions): Promise<ExecutedOrder>;
    prepareLots(lots: number): number;
}
