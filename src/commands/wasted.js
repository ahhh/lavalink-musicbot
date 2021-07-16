const fetch = require("node-fetch");
const util = require("../util");
var path = require("path");

module.exports = {
    name: "wasted",
    aliases: ["waste"],
    exec: async (msg, args) => {
        console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setDescription("❌ | Missing args."));

        try {
		    await msg.channel.send(`https://some-random-api.ml/canvas/wasted?avatar=${encodeURIComponent(query)}&size=2048`);

        } catch (e) {
            if (e.message === "Sorry I couldn't find that image") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
