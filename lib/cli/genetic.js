#!/usr/bin/env node
"use strict";var e=require("@debut/plugin-utils"),t=require("./genetic-8697fca0.js");require("async-genetic"),require("./tester-transport-0f71243c.js"),require("cli-progress"),require("@master-chief/alpaca"),require("binance-api-node"),require("@tinkoff/invest-openapi-js-sdk");const r=e.cli.getArgs(),{bot:i,ticker:a,log:s,amount:c=1e4,days:o=1e3,hours:n=0,gen:u=12,pop:l=2e3,ohlc:p,gap:g=0,best:d=5}=r,f=e.cli.getBotData(i);!async function(){if(!f)return void process.stdout.write("Genetic CLI error: Incorrect configuration");const{configs:e,meta:r}=f,i={...e[a],ticker:a,amount:Number(c)},m={days:o,hours:n,generations:u,populationSize:l,log:s,ohlc:p,gapDays:g,validateSchema:r.validate,score:r.score,stats:r.stats,create:r.create,ticksFilter:r.ticksFilter,best:d},q=new t.GeneticWrapper(m);let b=await q.start(r.parameters,i);b=b.map(((e,t)=>(e.config.id=t,e))),console.log(b)}();