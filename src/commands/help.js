const util = require("../util");
var path = require("path");

const unlisted = ["eval", "source"];

module.exports = {
    name: "help",
    aliases: ["commands", "?"],
    exec: (msg) => {
        console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename));
        const commands = msg.client.commands
            .filter(c => !unlisted.includes(c.name))
            .map(c => `\`${c.name}\``);

        const embed = util.embed()
            .setAuthor("Command List", msg.client.user.displayAvatarURL())
            .setDescription(commands.join(", "))
            .setTimestamp();

        msg.channel.send(embed);
    }
};
