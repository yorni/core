import { Candle, TimeFrame } from '@debut/types';
export declare function requestAlpaca(from: number, to: number, ticker: string, interval: TimeFrame): Promise<Candle[]>;
