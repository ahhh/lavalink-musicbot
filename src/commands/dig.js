const fetch = require("node-fetch");
const util = require("../util");
var spawn = require('child_process').spawn
var path = require("path");

const getScan = (query) => {
  return new Promise((resolve, reject) => {
    run_cmd('dig', [query, 'ANY', '+noall', '+answer'], function(text) { resolve(text); });
  })
};

function run_cmd(cmd, args, callBack ) {
    var child = spawn(cmd, args);
    var resp = "";
    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callBack (resp) });
}

module.exports = {
    name: "dig",
    aliases: ["dns"],
    exec: async (msg, args) => {
        const query = args.join(" ");
      	console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
        if (!query) return msg.channel.send(util.embed().setDescription("❌ | Missing args."));

        try {
            const res = await getScan(query);
            const splittedRes = util.chunk(res, 1024);

            const embed = util.embed()
                .setAuthor(query)
                .setDescription(splittedRes[0])
                .setFooter(`Page 1 of ${splittedRes.length}.`);

            const nMsg = await msg.channel.send(embed);
            if (splittedRes.length > 1) await util.pagination(nMsg, msg.author, splittedRes);
        } catch (e) {
            if (e.message === "Sorry I couldn't find that results") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
