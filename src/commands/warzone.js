const fetch = require("../fetch.js");
const util = require("../util");

const getDeets = async (platform, user) => {
    const body = await (await fetch(`https://api.tracker.gg/api/v1/warzone/matches/${encodeURIComponent(platform)}/${encodeURIComponent(user)}?type=wz&next=null`)).json();
	if (body.error) throw Error(body.error);
    return body;
};

module.exports = {
    name: "warzone",
    aliases: ["wz"],
    exec: async (msg, args) => {
        const platform = args[0];
		const user = args[1];
        if (!platform) return msg.channel.send(util.embed().setDescription("❌ | Missing args (platform, user)."));
		if (!user) return msg.channel.send(util.embed().setDescription("❌ | Missing args (platform, user)."));


        try {
            const res = await getDeets(platform, user);
			const matches = res.data.matches
			let results = new Array(matches.length-1);
			for (i = 0; i < results.length-2; i++) {
				results[i] = "Match " + (i+1) +" \nKills: "+ res.data.matches[i].segments[0].stats.kills.value + "\n";
				if (res.data.matches[i].segments[0].stats.assists) results[i] = results[i] + "Assists: " + res.data.matches[i].segments[0].stats.assists.value + "\n";
				if (res.data.matches[i].segments[0].stats.headshots) results[i] = results[i] + "Headshots: " + res.data.matches[i].segments[0].stats.headshots.value + "\n";
				if (res.data.matches[i].segments[0].stats.objectiveTeamWiped) results[i] = results[i] + "Team Wipes: " + res.data.matches[i].segments[0].stats.objectiveTeamWiped.value + "\n";
				if (res.data.matches[i].segments[0].stats.damageDone) results[i] += "Damage Delt: " + res.data.matches[i].segments[0].stats.damageDone.value + "\n";
				if (res.data.matches[i].segments[0].stats.damageTaken) results[i] += "Damage Taken: " + res.data.matches[i].segments[0].stats.damageTaken.value + "\n";
				if (res.data.matches[i].segments[0].stats.deaths) results[i] = results[i] + "Deaths: " + res.data.matches[i].segments[0].stats.deaths.value + "\n";
				if (res.data.matches[i].segments[0].stats.kdRatio) results[i] += "KDR: " + res.data.matches[i].segments[0].stats.kdRatio.displayValue + "\n";
				if (res.data.matches[i].segments[0].stats.objectiveReviver) results[i] += "Revives: " + res.data.matches[i].segments[0].stats.objectiveReviver.displayValue + "\n";
				if (res.data.matches[i].segments[0].stats.objectiveBrKioskBuy) results[i] += "Store Buys: " + res.data.matches[i].segments[0].stats.objectiveBrKioskBuy.displayValue + "\n";
				if (res.data.matches[i].segments[0].stats.teamPlacement) results[i] += "Placement: " +res.data.matches[i].segments[0].stats.teamPlacement.value + "\n";
				if (res.data.matches[i].segments[0].stats.timePlayed) results[i] += "Time Played: " +res.data.matches[i].segments[0].stats.timePlayed.value + "\n";
				if (res.data.matches[i].segments[0].stats.percentTimeMoving) results[i] += "Time Moving: " +res.data.matches[i].segments[0].stats.percentTimeMoving.displayValue + "\n";
			}

            const embed = util.embed()
                .setTitle(user)
		.setURL(`https://cod.tracker.gg/warzone/profile/${encodeURIComponent(platform)}/${encodeURIComponent(user)}/overview`)
                .setDescription(results[0])
		.setFooter(`Page 1 of ${results.length}.`);
				
            const myMsg = await msg.channel.send(embed);				
            if (results.length > 1) await util.pagination(myMsg, msg.author, results);
        } catch (e) {
            if (e.message === "Sorry I couldn't find that hash") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
