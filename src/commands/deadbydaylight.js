const fetch = require("../fetch.js");
const util = require("../util");
var path = require("path");

const getDeets = async (cat, name) => {
    const body = await (await fetch(`https://dbd-api.herokuapp.com/${encodeURIComponent(cat)}?name=${encodeURIComponent(name)}`)).json();
	if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "deadbydaylight",
    aliases: ["dbd", "DbD", "DeadByDaylight"],
    exec: async (msg, args) => {
	console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
    const [cat, ...remaining] = args;
	const name = remaining.join(" ");
    const name2 = remaining.join("_");
    if (!cat) return msg.channel.send(util.embed().setDescription("❌ | Missing args (category, name). Example: sneeps!dbd killers Ghost Face"));
	if (!name) return msg.channel.send(util.embed().setDescription("❌ | Missing args (category, name). Example: sneeps!dbd killers Ghost Face"));
        try {
            const res = await getDeets(cat, name);
            const results = util.chunk(res[0]['overview'], 1024);

            const embed = util.embed()
                .setTitle(name)
                .setURL(`https://deadbydaylight.fandom.com/wiki/${encodeURIComponent(name2)}`)
                .setDescription(results[0])
                .setThumbnail(res[0]['icon']['preview_portrait'])
		.setFooter(`Page 1 of ${results.length}.`);
				
            const myMsg = await msg.channel.send(embed);				
            if (results.length > 1) await util.pagination(myMsg, msg.author, results);
        } catch (e) {
            if (e.message === "Sorry I couldn't find that info") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
