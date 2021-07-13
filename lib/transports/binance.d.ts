import { BaseTransport, ExecutedOrder, Instrument, OrderOptions, TickHandler, TimeFrame } from '@debut/types';
import Binance, { CandleChartInterval, ExchangeInfo } from 'binance-api-node';
export declare class BinanceTransport implements BaseTransport {
    api: ReturnType<typeof Binance>;
    protected instruments: Map<string, Instrument>;
    protected info: ExchangeInfo;
    constructor();
    getInstrument(ticker: string): Promise<Instrument>;
    subscribeToTick(ticker: string, handler: TickHandler, interval: TimeFrame): Promise<() => void>;
    placeOrder(order: OrderOptions): Promise<ExecutedOrder>;
    placeSandboxOrder(order: OrderOptions): Promise<ExecutedOrder>;
    prepareLots(lots: number, ticker: string): number;
    private handlerAdapter;
}
export declare function convertTimeFrame(interval: TimeFrame): CandleChartInterval.ONE_MINUTE | CandleChartInterval.FIVE_MINUTES | CandleChartInterval.FIFTEEN_MINUTES | CandleChartInterval.THIRTY_MINUTES | CandleChartInterval.ONE_HOUR | CandleChartInterval.FOUR_HOURS | CandleChartInterval.ONE_DAY;
