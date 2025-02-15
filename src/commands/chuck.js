const fetch = require("node-fetch");
const util = require("../util");
var path = require("path");

const getDeets = async (query) => {
    const body = await (await fetch(`https://api.chucknorris.io/jokes/random`)).json();
    if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "chuck",
    aliases: ["norris"],
    exec: async (msg, args) => {

        try {
	    console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
            const res = await getDeets();
            const embed = util.embed()
                .setAuthor("Chuck Norris Facts")
		.setThumbnail(res.icon_url)
                .setDescription(res.value)
            const myMsg = await msg.channel.send(embed);
        } catch (e) {
            if (e.message === "Sorry I couldn't find that hash") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
