const redditImageFetcher = require("reddit-image-fetcher");
const util = require("../util");
var path = require("path");

const getDeets = async () => {
    const meme = await redditImageFetcher.fetch({type: 'meme'});
    return meme;
};

module.exports = {
    name: "meme",
    aliases: ["memes", "mems"],
    exec: async (msg, args) => {


        try {
       		console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
        	const res = await getDeets();
	    	const myimg = res[0].image;
		await msg.channel.send(myimg);

        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
