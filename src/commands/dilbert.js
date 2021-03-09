const fetch = require("node-fetch");
var dateFormat = require("dateformat");
const util = require("../util");

const FIRST_DILBERT = new Date(1989, 03, 17);

module.exports = {
    name: "dilbert",
    aliases: ["dil","comic5"],
    exec: async (msg, args) => {
        try {
            const date0 = randomDate(1,2433);
            const embed = "https://dilbert.com/strip/"+date0+"/"
			await msg.channel.send(embed);
				
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
function randomDate() {
  var end = new Date()
  var datetime = new Date(FIRST_DILBERT.getTime() + Math.random() * (end.getTime() - FIRST_DILBERT.getTime()));
  var derp = dateFormat(datetime, "yyyy-dd-mm");
  return derp
}
