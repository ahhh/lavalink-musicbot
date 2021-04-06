const prettyMs = require("pretty-ms");
const util = require("../util");
var path = require("path");

module.exports = {
    name: "stats",
    exec: (msg) => {
        console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename));
        /** @type {import("lavacord").LavalinkNode[]} */
        const nodes = [...msg.client.manager.nodes.values()];

        msg.channel.send(util.embed()
            .setAuthor("Lavalink Node(s) Stats", msg.client.user.displayAvatarURL())
            .setTitle("Source Code")
            .setURL("https://github.com/Allvaa/lavalink-musicbot")
            .setDescription(
                nodes.map(node  => {
                    const cpuLoad = (node.stats.cpu.lavalinkLoad * 100).toFixed(2);
                    const memUsage = (node.stats.memory.used / 1024 / 1024).toFixed(2);
                    const uptime = prettyMs(node.stats.uptime, { verbose: true, secondsDecimalDigits: 0 });

                    return `\`\`\`asciidoc
ID        :: ${node.id}
Status    :: ${node.connected ? "Connected" : "Disconnected"}
${node.connected ? `
CPU Load  :: ${cpuLoad}%
Mem Usage :: ${memUsage} MB
Uptime    :: ${uptime}
Players   :: ${node.stats.playingPlayers} of ${node.stats.players} playing` : ""}\`\`\``;
                })
            )
            .setTimestamp()
        );
    }
};
