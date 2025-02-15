const util = require("../util");
var path = require("path");

module.exports = {
    name: "loop",
    aliases: ["repeat"],
    exec: (msg) => {
	console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename));
        const { music } = msg.guild;
        if (!music.player) return msg.channel.send(util.embed().setDescription("❌ | Currently not playing anything."));
        if (!msg.member.voice.channel)
            return msg.channel.send(util.embed().setDescription("❌ | You must be on a voice channel."));
        if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
            return msg.channel.send(util.embed().setDescription(`❌ | You must be on ${msg.guild.me.voice.channel} to use this command.`));

        music.loop = !music.loop;

        msg.channel.send(util.embed().setDescription(`✅ | Loop ${music.loop ? "enabled" : "disabled"}.`));
    }
};
