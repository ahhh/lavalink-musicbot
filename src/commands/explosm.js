const fetch = require("node-fetch");
const util = require("../util");
var path = require("path");

module.exports = {
    name: "explosm",
    aliases: ["ex","comic2"],
    exec: async (msg, args) => {
        try {
	    console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
            const num = randomNumber(1,5812);
            const embed = "https://explosm.net/comics/"+num
			await msg.channel.send(embed);
				
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
function randomNumber(min, max) {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}  
  
