const fetch = require("node-fetch");
const util = require("../util");

const getDeets = async (query) => {
    const body = await (await fetch(`https://api.shodan.io/shodan/host/search?key=D32FBKHYYqETSf4bIdmurM7xoZA74FnL&&limit=5&query=${encodeURIComponent(query)}`)).json();
    if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "shodan",
    aliases: ["sho", "shodansearch"],
    exec: async (msg, args) => {
        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setDescription("❌ | Missing args."));

        try {
            const res = await getDeets(query);
            const splittedRes = util.chunk(JSON.stringify(res.matches), 1024);

            const embed = util.embed()
                .setAuthor("total matches: "+res.matches.length)
                .setDescription(splittedRes[0])
                .setFooter(`Page 1 of ${splittedRes.length}.`);

            const myMsg = await msg.channel.send(embed);
            if (splittedRes.length > 1) await util.pagination(myMsg, msg.author, splittedRes);
        } catch (e) {
            if (e.message === "Sorry I couldn't find that hash") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
