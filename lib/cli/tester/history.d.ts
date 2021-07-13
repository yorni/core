import { Candle, TimeFrame } from '@debut/types';
import { SingleBar } from 'cli-progress';
export declare type RequestFn = (from: number, to: number, ticker: string, interval: TimeFrame) => Promise<Candle[]>;
export interface HistoryOptions {
    broker: 'tinkoff' | 'binance' | 'alpaca';
    ticker: string;
    days: number;
    interval: TimeFrame;
    gapDays: number;
    noProgress?: boolean;
}
/**
 * Get history from different providers, depends on broker name in `HistoryOptions`
 */
export declare function getHistory(options: HistoryOptions): Promise<Candle[]>;
export declare function createProgress(title?: string): SingleBar;
export declare function generateOHLC(candles: Candle[]): Candle[];
