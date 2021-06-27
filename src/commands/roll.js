const fetch = require("../fetch");
const util = require("../util");
var path = require("path");

function rollDie(min, max) {
  return min + Math.floor(Math.random() * (max-min + 1))
}

function rollDice(num, max) {
  var rolls = new Array();
  for (i=0; i < num; i++) {
	rollres = rollDie(1, max);
    rolls.push(rollres);
  }
  return rolls
}

module.exports = {
    name: "roll",
    aliases: ["dice"],
    exec: async (msg, args) => {
	console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
        try {
	      var input = args[0].split("d");
	      var embed = "error";
	      if (input[0] > 1000) { embed = "amount of dice is too large" } else {
                var res = rollDice(input[0], input[1]);
		var total = res.reduce((a, b) => a + b);
                embed = total + '\n' + res.toString();
	      }
	      await msg.channel.send(embed);
				
        } catch (e) {
            if (e.message === "Sorry I couldn't find data on that") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
