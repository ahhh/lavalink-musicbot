const fetch = require("node-fetch");
const util = require("../util");
var path = require("path");

const getInfo = async (query) => {
    const body = await (await fetch(`https://api.shadowserver.org/net/asn?origin=${encodeURIComponent(query)}`)).json();
    if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "info",
    aliases: ["ip"],
    exec: async (msg, args) => {
	console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setDescription("❌ | Missing args."));

        try {
            const res = await getInfo(query);
            const embed = util.embed()
			    .setAuthor(res[0].geo)
                .setTitle(res[0].asname_long)
                .setDescription(JSON.stringify(res))
				
			await msg.channel.send(embed);
				
        } catch (e) {
            if (e.message === "Sorry I couldn't find data on that") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
