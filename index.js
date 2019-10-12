const Telegraf = require('telegraf'),
    unirest = require("unirest"),
    schedule = require('node-schedule');

const MSW_APIKEY = process.env.MSW_APIKEY;
//chivo global vars
var chivoMinBreak,
    chivoMaxBreak,
    chivoWindSpeed,
    chivoWindCompass,
    chivoWeather,
    chivoSwellCompass,
    chivoBoards;
//conejo global vars
var conejoMinBreak,
    conejoMaxBreak,
    conejoWindSpeed,
    conejoWindCompass,
    conejoWeather,
    conejoSwellCompass,
    conejoBoards;
//misc global vars
var chat_id = "-1001367734960";
//var fists; need emoi code for fists
require('dotenv').config();
//TODO add scheduled announcments 
const bot = new Telegraf(process.env.BOT_TOKEN);
//bot listeners
bot.start((ctx) => ctx.reply('CHAPA!'))
bot.help((ctx) => ctx.reply('CHAPA!'))
bot.on('sticker', (ctx) => ctx.reply('CHAPA!'))
bot.hears('hi', (ctx) => ctx.reply('CHAPA!'))
bot.hears('chivo', (ctx) => ctx.reply(chivo()))
bot.hears('conejo', (ctx) => ctx.reply(conejo()))
bot.hears('dawn', (ctx) => ctx.reply(dawnPatrol()))
bot.hears('noon', (ctx) => ctx.reply(afternoonSesh()))
bot.hears('eve', (ctx) => ctx.reply(eveningSesh()))
bot.launch()

//functions
var suggestions = ['fuck off to Huatulco.', 'fuck off at the putaria.'],
    slurs = ['jotitos', 'putitos', 'jotos', 'pinche putos', 'putos', 'chingones', 'mamones', 'pinche cabrones', 'cabrones', 'chupetes', 'pinche maricones', 'marica', 'maricones'];

function chivo() {
    var req = unirest("GET", "http://magicseaweed.com/api/86780a66a2ca2879ec6b2f25e942db10/forecast/");
    req.headers({
        "cache-control": "no-cache",
        "Connection": "keep-alive",
        "accept-encoding": "gzip, deflate",
        "cookie": "mswrelease_variant=b; MSW_region=17; MSW_unitgroup=us",
        "Host": "magicseaweed.com",
        "Postman-Token": "58d6e248-2825-4282-95d3-580db8b162bb,4518335c-1fca-489a-95cd-8a9c679d75f8",
        "Cache-Control": "no-cache",
        "Accept": "*/*",
        "User-Agent": "PostmanRuntime/7.11.0"
    });
    req.query({
        "spot_id": "2071",
        "units": "us",
        "fields": "localTimestamp,swell.minBreakingHeight,swell.maxBreakingHeight,wind.speed,wind.compassDirection,condition.weather,swell.components.combined.compassDirection"
    });
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log(res.body);
        chivoMinBreak = res.body[0].swell.minBreakingHeight,
            chivoSwellCompass = res.body[0].swell.components.combined.compassDirection,
            chivoMaxBreak = res.body[0].swell.maxBreakingHeight,
            chivoWindSpeed = res.body[0].wind.speed,
            chivoWindCompass = res.body[0].wind.compassDirection,
            chivoWeather = res.body[0].condition.weather;
        //flat indicaton
        //return "It's flat today " + slurs[Math.random(0, slurs.length - 1)] + ", might as well go and " + suggestions[Math.floor(Math.random() * suggestions.length - 1)];s
        //board selections logic
        if (chivoMaxBreak >= 12) {
            chivoBoards = "guns"
        } else if (chivoMaxBreak <= 4) {
            chivoBoards = "grovelers"
        } else if (chivoMaxBreak >= 4 && chivoMaxBreak <= 6) {
            chivoBoards = "short boards"
        } else if (chivoMaxBreak >= 6 && chivoMaxBreak <= 12) {
            chivoBoards = "step ups"
        } else if (chivoMaxBreak == 0) {
            chivoBoards = "step ups"
        } //board selection
    });
    return 'Punta Chivo is ' + chivoMinBreak + ' to ' + chivoMaxBreak + ' feet with ' + chivoWindSpeed + ' mph ' + chivoWindCompass + ' winds and a ' + chivoSwellCompass + ' direction swell. Bring your ' + chivoBoards + '.';
}; //chivo

function conejo() {

    var req = unirest("GET", "http://magicseaweed.com/api/86780a66a2ca2879ec6b2f25e942db10/forecast/");
    req.headers({
        "cache-control": "no-cache",
        "Connection": "keep-alive",
        "accept-encoding": "gzip, deflate",
        "cookie": "mswrelease_variant=b; MSW_region=17; MSW_unitgroup=us",
        "Host": "magicseaweed.com",
        "Postman-Token": "58d6e248-2825-4282-95d3-580db8b162bb,4518335c-1fca-489a-95cd-8a9c679d75f8",
        "Cache-Control": "no-cache",
        "Accept": "*/*",
        "User-Agent": "PostmanRuntime/7.11.0"
    });
    req.query({
        "spot_id": "1087",
        "units": "us",
        "fields": "localTimestamp,swell.minBreakingHeight,swell.maxBreakingHeight,wind.speed,wind.compassDirection,condition.weather,swell.components.combined.compassDirection"
    });
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log(res.body);
        conejoMinBreak = res.body[0].swell.minBreakingHeight,
            conejoSwellCompass = res.body[0].swell.components.combined.compassDirection,
            conejoMaxBreak = res.body[0].swell.maxBreakingHeight,
            conejoWindSpeed = res.body[0].wind.speed,
            conejoWindCompass = res.body[0].wind.compassDirection,
            conejoWeather = res.body[0].condition.weather;
        //board selections logic
        if (conejoMaxBreak >= 12) {
            conejoBoards = "guns"
        } else if (conejoMaxBreak <= 4) {
            conejoBoards = "grovelers"
        } else if (conejoMaxBreak >= 4 && conejoMaxBreak <= 6) {
            conejoBoards = "short boards"
        } else if (conejoMaxBreak >= 6 && conejoMaxBreak <= 12) {
            conejoBoards = "step ups"
        } //board selection
        //flat indicaton
        //return "It's flat today " + slurs[Math.random(0, slurs.length - 1)] + ", might as well go and " + suggestions[Math.floor(Math.random() * suggestions.length - 1)];
    });
    return 'Punta Conejo is ' + conejoMinBreak + ' to ' + conejoMaxBreak + ' feet with ' + conejoWindSpeed + ' mph ' + conejoWindCompass + ' winds and a ' + conejoSwellCompass + ' direction swell. Bring your ' + conejoBoards + '.';
}; //conejo

//TODO schedule morning, afternoon, and evening sesson updates 

var dawnRule = new schedule.RecurrenceRule(),
    noonRule = new schedule.RecurrenceRule(),
    eveRule = new schedule.RecurrenceRule();
dawnRule.hour = 06,
    dawnRule.minute = 00,
    noonRule.hour = 13,
    noonRule.minute = 00,
    eveRule.hour = 17,
    eveRule.minute = 00;

var dawn = schedule.scheduleJob(dawnRule, function () {
    bot.telegram.sendMessage(chat_id, dawnPatrol())
    console.log("Executed dawn rule.");
});

var noon = schedule.scheduleJob(noonRule, function () {
    bot.telegram.sendMessage(chat_id, afternoonSesh())
    console.log("Executed noon rule.");
});

var noon = schedule.scheduleJob(eveRule, function () {
    bot.telegram.sendMessage(chat_id, eveningSesh())
    console.log("Executed eve rule.");
});

function dawnPatrol() {
    // call spot functions to populate/update global variables
    chivo();
    conejo();
    //chronologically apropriate greeting
    var greeting = 'Buenos dias ' + slurs[Math.floor(Math.random() * slurs.length - 1)] + "! ";
    //spot logic
    if (chivoMaxBreak > conejoMaxBreak) {
        return greeting + "Punto Chivo is the biggest this morning at " + chivoMaxBreak + " feet.";
    } else {
        return greeting + "Punto Conejo is the biggest this morning at " + conejoMaxBreak + " feet.";
    }
}; //dawnPatrol

function afternoonSesh() {
    // call spot functions to populate/update global variables
    chivo();
    conejo();
    //chronologically apropriate greeting
    var greeting = 'Buenos tardes ' + slurs[Math.floor(Math.random() * slurs.length - 1)] + "! ";
    //spot logic
    if (chivoMaxBreak > conejoMaxBreak) {
        return greeting + "Punto Chivo is the biggest this afternoon at " + chivoMaxBreak + " feet.";
    } else {
        return greeting + "Punto Conejo is the biggest this afternoon at " + conejoMaxBreak + " feet.";
    }
}; //afternoonSesh

function eveningSesh() {
    // call spot functions to populate/update global variables
    chivo();
    conejo();
    //chronologically apropriate greeting
    var greeting = 'Buenos noches ' + slurs[Math.floor(Math.random() * slurs.length - 1)] + "! ";
    //spot logic
    if (chivoMaxBreak > conejoMaxBreak) {
        return greeting + "Punto Chivo is the biggest this evening at " + chivoMaxBreak + " feet.";
    } else {
        return greeting + "Punto Conejo is the biggest this evening at " + conejoMaxBreak + " feet.";
    }
}; //eveningSesh