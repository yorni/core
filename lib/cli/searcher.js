#!/usr/bin/env node
"use strict";var e=require("@debut/plugin-utils"),t=require("./genetic-8697fca0.js"),r=require("./tester-transport-0f71243c.js");require("async-genetic"),require("cli-progress"),require("@master-chief/alpaca"),require("binance-api-node"),require("@tinkoff/invest-openapi-js-sdk");const i=e.cli.getArgs(),{bot:o,ticker:s,log:a,amount:c=1e4,days:n=1e3,hours:l=0,gen:g=12,pop:u=2e3,ohlc:f,gap:p=0,best:k=5,daysForStudy:d=2,daysForTrade:y=1}=i,b=e.cli.getBotData(o);async function w(e,t){try{const i=new r.TesterTransport({ohlc:f,comission:e.fee,broker:e.broker,ticker:e.ticker}),o=await t.create(i,e,1);e||process.stdout.write("Genetic CLI error: Put config in bot cfgs.ts file");const{broker:s="tinkoff",ticker:a,interval:c}=e;let l=await r.getHistory({broker:s,ticker:a,interval:c,days:n,gapDays:p});t.ticksFilter&&(l=l.filter(t.ticksFilter(e))),console.log("\n---- Tinkoff ["+e.ticker+"] ----\n"),console.log("Tested in ",l.length," candles..."),i.setTicks(l),await o.start(),await i.run(),await o.closeAll(),await o.dispose(),console.log(t.stats(o))}catch(e){console.log(e)}}!async function(){if(!b)return void process.stdout.write("Genetic CLI error: Incorrect configuration");const{configs:e,meta:r}=b,i={...e[s],ticker:s,amount:Number(c)};for(let e=0;e<n;e++){const o={days:d,hours:l,generations:g,populationSize:u,log:a,ohlc:f,gapDays:p+e,validateSchema:r.validate,score:r.score,stats:r.stats,create:r.create,ticksFilter:r.ticksFilter,best:k},s=new t.GeneticWrapper(o);let c=await s.start(r.parameters,i);c=c.map(((e,t)=>(e.config.id=t,e))),console.log(c[0].config);w(c[0].config,r)}}();