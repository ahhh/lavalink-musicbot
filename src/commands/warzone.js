const fetch = require("./fetch.js");
const util = require("../util");

const getDeets = async (query) => {
    const body = await (await fetch(`https://api.tracker.gg/api/v1/warzone/matches/psn/${encodeURIComponent(query)}?type=wz&next=null`)).json();
	if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "pswarzone",
    aliases: ["pswz"],
    exec: async (msg, args) => {
        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setDescription("❌ | Missing args."));

        try {
            const res = await getDeets(query);
			console.log(res.data.matches[0].segments[0].stats);
            const splittedRes = util.chunk(JSON.stringify(res.data.matches[0].segments[0].stats), 1024);

            const embed = util.embed()
                .setTitle(query)
		.setURL(`https://cod.tracker.gg/warzone/profile/psn/${encodeURIComponent(query)}/overview`)
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
