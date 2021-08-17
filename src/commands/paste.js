const fetch = require("node-fetch");
const util = require("../util");
var path = require("path");


module.exports = {
    name: "paste",
    aliases: ["pastee","pastebin"],
    exec: async (msg, args) => {

        try {
    		console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));

            const pasteURL = `https://pastebin.com/raw/${args}`
            const res = await fetch(pasteURL);
            const rawpaste = await res.text();
            const textchunks = util.chunk(rawpaste, 1024);

            const pasteEmbed = util.embed()
            .setColor("WHITE")
            .setTitle(args)
            .setURL(pasteURL)
            .setDescription(textchunks[0])
            .setFooter(`Page 1 of ${textchunks.length}.`);

            const myMsg = await msg.channel.send(pasteEmbed);
            if (textchunks.length > 1) await util.pagination(myMsg, msg.author, textchunks);
				
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
