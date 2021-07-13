import { cli } from '@debut/plugin-utils';
import { DebutOptions, GenticWrapperOptions, DebutMeta, WorkingEnv } from '@debut/types';
import { GeneticWrapper } from './tester/genetic';
import { TesterTransport } from './tester/tester-transport';
import { getHistory } from './tester/history';

type Params = {
    bot: string;
    ticker: string;
    days?: number;
    ohlc?: boolean;
    gap?: number;
};

type GeneticParams = {
    bot: string;
    ticker: string;
    log?: boolean;
    days?: number;
    hours?: number;
    amount?: number;
    gen?: number;
    pop?: number;
    ohlc?: boolean;
    gap?: number;
    best?: number;
    daysForStudy?: number;
    daysForTrade?: number;
};

const args = cli.getArgs() as GeneticParams;
const {
    bot,
    ticker,
    log,
    amount = 10000,
    days = 1000,
    hours = 0,
    gen = 12,
    pop = 2000,
    ohlc,
    gap = 0,
    best = 5,
    daysForStudy = 2,
    daysForTrade = 1,
} = args;
let resAmount = Number(amount);

const schema: cli.BotData | null = cli.getBotData(bot);

(async function () {
    if (!schema) {
        process.stdout.write('Genetic CLI error: Incorrect configuration');
        return;
    }

    const { configs, meta } = schema;

    for (let i = days; i > 0; i--) {
        const config: DebutOptions = { ...configs[ticker], ticker, amount: Number(amount) };

        const options: GenticWrapperOptions = {
            days: daysForStudy,
            hours,
            generations: gen,
            populationSize: pop,
            log,
            ohlc,
            gapDays: Number(gap) + Number(daysForTrade) + Number(i),
            validateSchema: meta.validate,
            score: meta.score,
            stats: meta.stats,
            create: meta.create,
            ticksFilter: meta.ticksFilter,
            best,
        };

        //console.log(options);

        const genetic = new GeneticWrapper(options);
        let stats = await genetic.start(meta.parameters, config);

        stats = stats.map((item, index) => {
            item.config.id = index;
            return item;
        });

        //console.log(stats[0].config);

        const cfg = stats[0].config;
        cfg.amount = resAmount;

        let res = await test(cfg, meta, Number(daysForTrade), Number(gap) + Number(daysForTrade) + Number(i) - 1);
    }
    console.log(resAmount);
})();

async function test(cfg: DebutOptions, meta: DebutMeta, daysForTrade: number, gapMove: number) {
    try {
        const transport = new TesterTransport({ ohlc, comission: cfg.fee, broker: cfg.broker, ticker: cfg.ticker });
        const bot = await meta.create(transport, cfg, WorkingEnv.tester);
        // const logger = new TesterLogger(transport);

        if (!cfg) {
            process.stdout.write('Genetic CLI error: Put config in bot cfgs.ts file');
        }

        const { broker = 'tinkoff', ticker, interval } = cfg;
        let ticks = await getHistory({ broker, ticker, interval, days: daysForTrade, gapDays: gapMove });

        if (meta.ticksFilter) {
            ticks = ticks.filter(meta.ticksFilter(cfg));
        }

        //console.log('\n---- Tinkoff [' + cfg.ticker + '] ----\n');
        console.log('Tested in ', ticks.length, ' candles...');
        transport.setTicks(ticks);
        await bot.start();
        await transport.run();
        await bot.closeAll();
        await bot.dispose();
        console.log(meta.stats(bot));
        // console.log(meta.score(bot));
        resAmount = resAmount + Number(meta.score(bot));
    } catch (e) {
        console.log(e);
    }
}
