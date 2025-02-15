const util = require("../util");
var path = require("path");

module.exports = {
    name: "resume",
    exec: async (msg) => {
        console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename));
        const { music } = msg.guild;
        if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setDescription("❌|  Currently not playing anything."));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setDescription("❌ | You must be on a voice channel."));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setDescription(`❌ | You must be on ${msg.guild.me.voice.channel} to use this command.`));

        try {
            await music.resume();
            msg.react("▶️").catch(e => e);
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);
        }
    }
};
