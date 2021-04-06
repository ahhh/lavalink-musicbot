const util = require("../util");
var path = require("path");

module.exports = {
    name: "source",
    aliases: ["src"],
    exec: (msg) => {
        console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename));
        msg.channel.send(util.embed().setDescription("✅ | [Here](https://github.com/pointblankdev/lavalink-musicbot) is the open source repository this bot uses."));
    }
};
