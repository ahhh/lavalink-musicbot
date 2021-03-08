const fetch = require("node-fetch");
const util = require("../util");

module.exports = {
    name: "xkcd",
    aliases: ["x"],
    exec: async (msg, args) => {
        try {
            const num = randomNumber(1,2433);
            const embed = "https://xkcd.com/"+num+"/"
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
  
