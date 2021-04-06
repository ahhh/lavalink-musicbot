var path = require("path");
module.exports = {
    name: "ping",
    exec: (msg) => {
        console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename));
        msg.channel.send(`🏓 Pong! \`${msg.client.ws.ping}ms\``);
    }
};
