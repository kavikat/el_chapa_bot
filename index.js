const Telegraf = require('telegraf'),
msw = require('msw-api');
//Configure the instance to use your API key, optionally override the units (default is 'US')
msw.set({ apiKey: 'YOUR API KEY GOES HERE', units: 'us' });
//
require('dotenv').config();
//TODO add MSW API calls
const bot = new Telegraf(process.env.BOT_TOKEN);
//general

bot.start((ctx) => ctx.reply('CHAPA!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('CHAPA!'))
bot.launch()

/*
    Punta Chivo : 2071
    Punta Conejo : 1087
    La Ventosa : 2072
*/

//Get a promise for the swell forecast for spot at id 169 (Mundaka)
msw.forecast(2071).then(function (forecast) {

    //Return all forecasts at least 5 solid stars and at least 6
    //(feet in this case as the request was using 'us' units) high, and at least 16s in primary swell period
    forecast.where
        ({
            minSolidStars: 5,
            minBreakingHeight: 6,
            minPeriod: 16
        });

}, function (err) {
    console.log('ERR: encountered error getting MSW data: ' + err);
});

//TODO upload pix to editbucket