const fetch = require("node-fetch");
const util = require("../util");

const getInfo = async (query) => {
    const body = await (await fetch(`https://cloud.iexapis.com/stable/stock/${encodeURIComponent(query)}/quote?token=pk_63464c8c53fc49f499982cc3a6469491`)).json();
    if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "stock",
    aliases: ["stonks"],
    exec: async (msg, args) => {
        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setDescription("❌ | Missing args."));

        try {
            const res = await getInfo(query);
	    const priceChange = res.change;
            var graphEmoji = `:chart_with_downwards_trend:`;
            if (priceChange >= 0) graphEmoji = `:chart_with_upwards_trend:`;

            const embed = util.embed()
                .setAuthor(res.symbol + " - " + res.companyName)
                .setTitle("$" + res.latestPrice + " - " + graphEmoji)
                .setURL("https://finance.yahoo.com/quote/" + res.symbol + "/")
				
		await msg.channel.send(embed);
				
        } catch (e) {
            if (e.message === "Sorry I couldn't find data on that") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
