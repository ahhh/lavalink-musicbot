const fetch = require("node-fetch");
const util = require("../util");

const getDeets = async (query) => {
    const body = await (await fetch(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(query)}`)).json();
    if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "definition",
    aliases: ["urbandictionary", "urban", "define"],
    exec: async (msg, args) => {
        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setDescription("❌ | Missing args."));

        try {
            const res = await getDeets(query);
			const link =`https://www.urbandictionary.com/define.php?term=${encodeURIComponent(query)}`
			var defos = ""
			for (var def in res['list']) {
					console.log(def)
					defos += "Definition "+def+": " + res['list'][def].definition + "\n"
			}
            const splittedRes = util.chunk(defos, 1024);
			const title = res['list'][0].word
            const embed = util.embed()
				.setTitle(title)
				.setURL(link)
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
