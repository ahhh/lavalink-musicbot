const fetch = require("node-fetch");
const util = require("../util");

module.exports = {
    name: "sword",
    aliases: ["sw","comic4"],
    exec: async (msg, args) => {
        try {
            const embed = "https://swordscomic.com/comic/random/"
			await msg.channel.send(embed);
				
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
