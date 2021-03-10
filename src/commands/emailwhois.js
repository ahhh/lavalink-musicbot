const fetch = require("node-fetch");
const util = require("../util");

const getDeets = async (query) => {
    const body = await (await fetch(`http://api.whoxy.com/?key=e9ddbbd683d80d4xp03bcd61620bf20e&reverse=whois&email=${encodeURIComponent(query)}`)).json();
    if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "emailwhois",
    aliases: ["ewhois"],
    exec: async (msg, args) => {
        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setDescription("❌ | Missing args."));

        try {
            const res = await getDeets(query);
            const splittedRes = util.chunk(JSON.stringify(res), 1024);

            const embed = util.embed()
                .setAuthor("total matches: "+res.total_results)
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
