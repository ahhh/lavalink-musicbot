const fetch = require("node-fetch");
const util = require("../util");

const getDeets = async (query) => {
    const body = await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(query)}&APPID=da13201d36831242cbc1d64dc1fa4c04&units=imperial`)).json();
    if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "weather",
    aliases: ["temp"],
    exec: async (msg, args) => {
        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setDescription("❌ | Missing args."));
        try {
            const res = await getDeets(query);
            const splittedWe = util.chunk(JSON.stringify(res.list), 1024);

            const embed = util.embed()
                .setTitle(query)
				.setAuthor(res.list[0].main.temp)
                .setDescription(splittedWe[0])
                .setFooter(`Page 1 of ${splittedWe.length}.`);

            const myMsg = await msg.channel.send(embed);
            if (splittedWe.length > 1) await util.pagination(myMsg, msg.author, splittedWe);
        } catch (e) {
            if (e.message === "Sorry I couldn't find that place") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
