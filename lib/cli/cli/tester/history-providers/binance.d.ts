import { TimeFrame, Candle } from '@debut/types';
export declare function requestBinance(from: number, to: number, ticker: string, interval: TimeFrame): Promise<Candle[]>;
