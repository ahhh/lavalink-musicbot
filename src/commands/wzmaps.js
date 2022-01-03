const fetch = require("node-fetch");
const util = require("../util");
var path = require("path");

module.exports = {
    name: "wzmaps",
    aliases: ["map", "wzmap", "maps"],
    exec: async (msg, args) => {

     try {
		console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
        if (args == "areas" || args == "Area" || args == "area" || args == "Areas" || args == "locations") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEgXxe0NaNd0R5MSPr5VEBmUzy00tD_lmgK8x5b6p5TtjEV3LAYghWZHYa1q6y7uaI5fSXxlJ8yVfgi3qss7S0TawXZnqkrG0CSbRS2pt-GkVkgbzd2owaq7syAtBe-jThC_WbXXGwwbQH7Q0dIi9eGgCljyZK3YmswtlK57-v0_E0hSZDBmzMnOdZqS=s1920");
        } else if (args == "map" || args == "Map" || args == "Coords" || args == "coords" || args == "cords") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEjL5l3B3txY9IFc_isIFuiD1xECF0Oq0MFQCSa2tfBpggSHF7BxfSW6WuMfAToVDTH4XKBk4CK5JrpXmNiO4xHUlb3PKpRrlKhAG6GExqEn5MCDdJmgpwW083Jwl6PwpsJyIclN7WX3bHophEBUbx6AsnDU3q4eJUII1cOTjSUQR5OtPphWPLSyTp12=s828");
        } else if (args == "Arsenal" || args == "arsenal") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEjV8dQom3TkzSMVXMo7Fypv8FS4H6gMq86KSvUc7mLmYnKNwT-P6xPzE4rfES9Ga1i2_tulgM_IeHtbxo_cEB25Rx9LbR83xBQya50k8JxEKI4EoKOO2yHBhCfnpoS4heFG7vgvGJFc2lDwPrU1h69tgnSk6zhG05vSmiE_xS0p6ZMLXt3g2lDJid-Q=s828");
        } else if (args == "capital" || args == "Capital") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEiztvPDcCLAfoOvJqAiMSIE14LcR8drzJi0tgsJtySaT5lDTlq_ZSCjjK29-GvGvbU5unMwNUYmN6fIc6Qz0XRbSIWLvrTpGqZpBOEAZZTyovV-LK161E8PII4ikcultF2Hccbg76V0L2lqAGah2es_f6aQDn2O4GEKDsbJNWy7I_HT5VjQgulfr_YL=s828");
        } else if (args == "fields" || args == "Fields") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEj3UNV68UgHCK8FgSkIpwxP3IAFhUz_YPELqySUtQil9Jpi8ciLejvoB2IfavLfxvpLQIeS824emZxkfytmllFN08hM_P5Rik5M-hNwhCjjaWVVSZRLX0ofING-YbswAqXPMGVBLeEGD3vJSxz1jTI9Wu5wspjCwS6XSxeJmPBMBOhbEdMK-zcnacux=s826");
        } else if (args == "resort" || args == "Resort") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEgDc7UmMOOC-STSXTlWxAhpRackGzpntfKnphq0kffFaspzBNbeKOcqYrSxDsSyGpaUxnhgqLuG-K57CXjDObPmZEmaZcwfzhdld-Gq-b1ShMz99B9YDb6MtR2ioHhoQPbX6vL7ms9rIlaKf0m6FhLli8bTdh1CIpsb8jNVgH0ROwMkijoAYiBY-fUS=s828");
        } else if (args == "subpen" || args == "sub" || args == "SubPen") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEiTICiSf4_-Fbo-G4DNNO0dWYTa2tJ-O-W3WGGmwpLmHMiMusOriUFr3GJNK3pjEeLq83okKPqm1pCZRXfMkFjpQouifAo-AiRNQRQg-uHtU6NdYr6Da4P0lwrVz7V81sl8NSTaTeSU8d__Hh6Lf73TFlAiHhOVXoHS8L-U4hYvbIucvq59wh44o4i6=s830");
        } else if (args == "tiki" || args == "tikihuts" || args == "huts" || args == "TikiHuts") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEjReZOfQ_IhjCoZh2NNiTqircuzTeWB8ueBL07CMynY-Xy_VslOiJ4yaQflIZ5yehiilsXU7oVUbu6U_lx4oH8ts9E6J1hvUr1KbTr2w8JvaQK3B0qqYm_fD8hgymOdyc5eWL2_WwtsTNqaL2dxFg081nhUceCfS0PfWK58dgD8F1WV_Ds8qy2bkjk4=s830");
        } else if (args == "village" || args == "ruins" || args == "Village" || args == "Ruins") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEheqdXUhwu8mPYsmXlfJJwYgxtv7OPRESOP8P6dRdvcTNHsKpXFGY5A7-e0vSSj0sFipz9kVcE9jHWDyl95-ceKgR6ujqOToTa8SvR4eG21i9O34o466d2lA117BWBa241Kx3i82mbnqHVL6pzJ-OggGt79cVDQNpjOF6NUXFQX2bebfgkv1aD-756I=s826");
        } else if (args == "runway" || args == "Runway") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEjOze6mrQNdEXxI2warm0dLVGwpQ9vp_wbaDl4RPne82pES9HMqhv9upmoZnexnXRq9wgL96k1C1iVWc9nr6l3EozqGsC0g36iyq4vp92nqY0oqcO9hm053PESd9Ct_2PdysTvj2CdqFZX_oIDCiW3VGc0LqHMRCnfj3v1z3MV4qeh0DFr4rTSquUP0=s828");
        } else if (args == "oil_plant" || args == "oilplant" || args == "oil") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEi8DMbQ5ZCN7FIHwumlm5nGDtBqcvzvT0HxBI6nx4_N85VfKTLBQl1ncdAk75IMNkG4IklNA6LDlU4VEGqwsrMTv54uNA6Y4ZhuoYa1P27YVvLkk9TDytV0aQk2cgUft7HHHGINzZE_Y9f4uOcM5AgYfAhPRhxRFY8QQpVg6DJox3npFmyqaJsqZgF-=s824");
        } else if (args == "mines" || args == "Mines") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEhAUHZ1JB44MhHFVVxdvKkqk_rcR83whJ0qHvykf7EK1pCcC5hIKiB_a7ev0R3paYFSITGw9NJluk92FuEJNQtiK-Yxs61PdPo7Nn3TW1T7pPT1Wb9O2hN1J0gTezNoAOX6qRPHnW9UWapZV19lkMmuC8Gkce7BVp3nhqp8pxyIVA6KsHamO8lYpeMr=s830");
        } else if (args == "peak" || args == "Peak") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEg4OpYkELR5fauGbw2JfP6Uxs6cohzAVAVPB4rKn13dbE9-A40XdSqND0CIsx6Kmd-iftplQ6OFIAQOGoP8CHEahH_fh0g7_x4fjdMX3z8PW2nX9JBgDa6xOf_LTYVxcwIkChq9vRDrZPJ1T-iHKNog6RcWMF6HopKaxL7OwjGOyrAZuHw7PIH_HEbq=w640-h638");
        } else if (args == "lagoon" || args == "Lagoon") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEhQQLwYjpGQ4C85IEFJiVdCejyfImwju_Baz4f6PVuATIHs7sUyb3pAYZGQXP0qpSba8NOTYfth1NRKF9FEOypjaDeiBmmAcEjmi2PdjqPsEs5vqWMvUPtud75uFrHWgRHaFelv3qNgpwTJWDh_iZR9GCGQuUObaqFJc0afV-bxtZRAGvgMhaW4zDSq=s836");
        } else if (args == "docks" || args == "Docks") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEhJVlRVZXC7SEbyZowGJSsRwaLtkflvBW1wGgCou-lgD3Mv9x3rqInJkc7tlBNlfp19csCVxEKFmv-erWiMzpz2CpiKDlKQFCvbANe4I3kEcviFAUPHpnhCUxxRBWaH29HRC_TUQumv82sKckYZONSsQ0gms_C7LOUd82Tv1LlqhJohUysXYcJnue2Q=s828");
        } else if (args == "beachhead" || args == "Beachhead") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEiUZYU0iF9BZXQroDhoUpizlbEd2G1F9hn-jCxx5QgQsvOm6BdHSjSQGzEk-zlhj869bV_fFJzyz_3eU_5jKbLXQIgSkMlEn0Y47PSMtOco6y5UOnhemlvr8yg1dezeTXmub6HCSwkTeqsU1PxPRhb8kUuVWg-jhQ09YIAbYnk_H02JKDejp2yc94Bi=s830");
        } else if (args == "airfield" || args == "Airfield") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEhBY-dbLBhBDi95Xo08feEC8wyw5QtlbQZKlQnuPWoK3ew60RZj6R4J3LUyrNF-gtIT1oVTTi88RJ0pPA6PwI-Y1eHT8dwgQI2RGZGs5RmnjMG2ceBUGoDOHwxECOM6Guspr5APs7Y1XRVNX3YK7Uy8PLz-ar1juT7SRsTFrqL9YMTPmZFIzrI3C6oK=s840");
        } else if (args == "power_plant" || args == "powerplant" || args == "PowerPlant") {
            await msg.channel.send("https://blogger.googleusercontent.com/img/a/AVvXsEji2eEBHBhOYKagF5Z4c2JtiCkyDwsZpYvzr-gWUX3d16eUwTeoKoe7diykS-s4npQt1Ao13so00VLsjrztoynjXH3negV1Dq1r8mmj4SsGcgu4k8Ve1xfUv8dXZe4TNkmCwMakJhVuue6VcjxNleoQZd2-XVrGN43RHfz64_nVVtrfxDPeNmBRiyG1=s818");
        } else {
            await msg.channel.send("Could not find specified map");
        }
    } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
