import { DebutOptions, GeneticSchema, GenticWrapperOptions } from '@debut/types';
export declare class GeneticWrapper {
    private options;
    private genetic;
    private transport;
    private internalOptions;
    private schema;
    private schemaKeys;
    private configLookup;
    private deduplicateLookup;
    private scoreLookup;
    private lastIteration;
    private baseOpts;
    constructor(options: GenticWrapperOptions);
    start(schema: GeneticSchema, opts: DebutOptions): Promise<{
        config: DebutOptions;
        stats: unknown;
    }[]>;
    private getRandomSolution;
    private fitness;
    private mutate;
    private crossover;
    private deduplicate;
}
