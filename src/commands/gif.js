const fetch = require("../fetch.js");
const util = require("../util");

const getDeets = async (searchin) => {
    const body = await (await fetch(`https://api.gfycat.com/v1/gfycats/search?search_text=${encodeURIComponent(searchin)}&count=1`)).json();
	if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "gif",
    aliases: ["meme", "memes"],
    exec: async (msg, args) => {
	const searchin = args.join(" ");
        if (!searchin) return msg.channel.send(util.embed().setDescription("❌ | Missing args (search)."));
        try {
            const res = await getDeets(searchin);
	    const myimg = res.gfycats[0].max2mbGif
	    await msg.channel.send(myimg);
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
