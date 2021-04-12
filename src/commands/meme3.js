const fetch = require("../fetch.js");
const util = require("../util");
var path = require("path");

const getDeets = async (searchin) => {
    const body = await (await fetch(`http://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(searchin)}+meme&api_key=vY6Stl3KZeePYnRRiShdC9o3ohkcNGmX`)).json();
	if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "meme3",
    aliases: ["mem3", "m3m3", "m33m"],
    exec: async (msg, args) => {
	console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
	const searchin = args.join(" ");
        if (!searchin) return msg.channel.send(util.embed().setDescription("❌ | Missing args (search)."));
        try {
            const res = await getDeets(searchin);
	    const myimg = res.data[0].embed_url
	    await msg.channel.send(myimg);
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
