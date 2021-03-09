const fetch = require("node-fetch");
const util = require("../util");

const getInfo = async (query) => {
    const body = await (await fetch(`https://api.blockchain.com/v3/exchange/tickers/${encodeURIComponent(query)}-USD`)).json();
    if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "coin",
    aliases: ["cd"],
    exec: async (msg, args) => {
        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setDescription("❌ | Missing args."));

        try {
            const res = await getInfo(query);
            const embed = util.embed()
			    .setAuthor(res.symbol)
                .setTitle("24 hr price: " + res.price_24h)
                .setDescription("last trade price: " + res.last_trade_price)
				
			await msg.channel.send(embed);
				
        } catch (e) {
            if (e.message === "Sorry I couldn't find data on that") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
