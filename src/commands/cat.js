const fetch = require("../fetch");
const util = require("../util");
var path = require("path");

const getInfo = async () => {
    const body = await (await fetch(`https://api.thecatapi.com/v1/images/search`)).json();
    if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "cat",
    aliases: ["meow"],
    exec: async (msg, args) => {
	  console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
        try {
            const res = await getInfo();
            const embed = res[0].url
			      await msg.channel.send(embed);
				
        } catch (e) {
            if (e.message === "Sorry I couldn't find data on that") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
