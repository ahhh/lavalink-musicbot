const fetch = require("node-fetch");
const util = require("../util");
var path = require("path");
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const turndownService = new TurndownService()

module.exports = {
    name: "darkheresy",
    aliases: ["dark","heresy", "dh", "harlock"],
    exec: async (msg, args) => {

        try {
		console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
        var embed = "https://dark-heresy-rp.fandom.com/wiki"
            const combo = args.join("_");
            const sURL = `${embed}/${combo}`
            const res = await fetch(sURL);
            const html = await res.text();
            const $ = cheerio.load(html);
            const bodyTag = $('#content').first().html();
            const markdown = turndownService.turndown(bodyTag);
            const regex = /(?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>))/g;
            const markdown2 = markdown.replace(regex, "");
            console.log(markdown2.includes("There is currently no text in this page."))
            if (markdown2.includes("There is currently no text in this page.") == true)
            {
                const itemEmbed = util.embed()
                .setColor("BLACK")
                .setTitle("Can not find")
                .setDescription("Try redoing your search")
                await msg.channel.send(itemEmbed);
            } else {
                const textchunks = util.chunk(markdown2, 1024);
                const sEmbed = util.embed()
                .setColor("GOLD")
                .setTitle(combo)
                .setURL(sURL)
                .setDescription(textchunks[0])
                .setFooter(`Page 1 of ${textchunks.length}.`);
                
                const myMsg = await msg.channel.send(sEmbed);
                if (textchunks.length > 1) await util.pagination(myMsg, msg.author, textchunks);
            }
				
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
