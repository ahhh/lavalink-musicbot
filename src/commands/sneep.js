const fetch = require("node-fetch");
const util = require("../util");
var path = require("path");

var popArray = [
    'https://i.imgur.com/ZwdXVRv.gif',
    'https://i.imgur.com/Z56FHaK.gif',
	'https://media1.giphy.com/media/7CenO2Ot5xvP2/giphy.gif',
	'https://i.pinimg.com/originals/94/4b/8d/944b8dd151a76fe018026522e494c27a.gif'
];

module.exports = {
    name: "sneep",
    aliases: ["sneepsneep","poppop"],
    exec: async (msg, args) => {
        try {
		console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
		var randomNumber = Math.floor(Math.random()*popArray.length);
         	const embed = popArray[randomNumber];
		await msg.channel.send(embed);		
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
