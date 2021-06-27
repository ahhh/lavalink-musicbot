const fetch = require("../fetch");
const util = require("../util");
var path = require("path");
var math = require("mathjs");

function mathTime(args) {
  return math.evaluate(args)
}

module.exports = {
    name: "math",
    aliases: ["add", "multiply", "divide", "subtract"],
    exec: async (msg, args) => {
	console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
        try {
	        const query = args.join(" ");
            var res = mathTime(query);
            const embed = res.toString();
		    await msg.channel.send(embed);
				
        } catch (e) {
            if (e.message === "Sorry I couldn't find data on that") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
