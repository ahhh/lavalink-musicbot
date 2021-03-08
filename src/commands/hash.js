const fetch = require("node-fetch");
const util = require("../util");

const getDeets = async (query) => {
    const body = await (await fetch(`https://api.shadowserver.org/malware/info?sample=${encodeURIComponent(query)}`)).json();
    if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "hash",
    aliases: ["exe"],
    exec: async (msg, args) => {
        const query = args.join(" ");
        if (!query) return msg.channel.send(util.embed().setDescription("❌ | Missing args."));

        try {
            const res = await getDeets(query);
            const splittedAV = util.chunk(JSON.stringify(res[0].anti_virus), 1024);

            const embed = util.embed()
                .setAuthor(res[0].magic)
                .setTitle(res[0].adobe_malware_classifier)
                .setDescription(splittedAV[0])
                .setFooter(`Page 1 of ${splittedAV.length}.`);

            const myMsg = await msg.channel.send(embed);
            if (splittedAV.length > 1) await util.pagination(myMsg, msg.author, splittedAV);
        } catch (e) {
            if (e.message === "Sorry I couldn't find that hash") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
