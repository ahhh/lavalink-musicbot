const fetch = require("node-fetch");
const util = require("../util");
var path = require("path");

module.exports = {
    name: "sword",
    aliases: ["sw","comic4"],
    exec: async (msg, args) => {
        try {
		console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
            	const embed = "https://swordscomic.com/comic/random/"
		await msg.channel.send(embed);
				
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
