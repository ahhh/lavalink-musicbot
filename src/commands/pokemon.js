const fetch = require("node-fetch");
const util = require("../util");
var path = require("path");

const getPokemon = async (query) => {
    const body = await (await fetch(`https://some-random-api.ml/pokedex?pokemon=${encodeURIComponent(query)}`)).json();
    if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "pokedex",
    aliases: ["pokemon"],
    exec: async (msg, args) => {
        console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setDescription("❌ | Missing args."));

        try {
            const res = await getPokemon(query);

            const embed = util.embed()
                .setTitle(res.name)
                .setURL("https://pokedex.org/#/pokemon/"+res.id)
                .setThumbnail(res.sprites.normal)
                .setDescription(res.description)

            const lyricsMsg = await msg.channel.send(embed);
        } catch (e) {
            if (e.message === "Sorry I couldn't find that pokemon") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
