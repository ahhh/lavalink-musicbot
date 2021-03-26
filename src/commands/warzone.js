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
			console.log(res.data.matches[0].segments[0].stats);
			var results = "Last Match \nKills: "+ res.data.matches[0].segments[0].stats.kills.value + "\n";
			if (res.data.matches[0].segments[0].stats.assists) results = results + "Assists: " + res.data.matches[0].segments[0].stats.assists.value + "\n";
			if (res.data.matches[0].segments[0].stats.headshots) results = results + "Headshots: " + res.data.matches[0].segments[0].stats.headshots.value + "\n";
			if (res.data.matches[0].segments[0].stats.objectiveTeamWiped) results = results + "Team Wipes: " + res.data.matches[0].segments[0].stats.objectiveTeamWiped.value + "\n";
			results += "Damage Delt: " + res.data.matches[0].segments[0].stats.damageDone.value + "\n";
			results += "Damage Taken: " + res.data.matches[0].segments[0].stats.damageTaken.value + "\n";
			results = results + "Deaths: " + res.data.matches[0].segments[0].stats.deaths.value + "\n";
			results += "KDR: " + res.data.matches[0].segments[0].stats.kdRatio.displayValue + "\n";
			if (res.data.matches[0].segments[0].stats.objectiveReviver) results += "Revives: " + res.data.matches[0].segments[0].stats.objectiveReviver.displayValue + "\n";
			if (res.data.matches[0].segments[0].stats.objectiveBrKioskBuy) results += "Store Buys: " + res.data.matches[0].segments[0].stats.objectiveBrKioskBuy.displayValue + "\n";
			results += "Placement: " +res.data.matches[0].segments[0].stats.teamPlacement.value + "\n";
			results += "Time Played: " +res.data.matches[0].segments[0].stats.timePlayed.value + "\n";
			results += "Time Moving: " +res.data.matches[0].segments[0].stats.percentTimeMoving.displayValue + "\n";


            const embed = util.embed()
                .setTitle(user)
				.setURL(`https://cod.tracker.gg/warzone/profile/${encodeURIComponent(platform)}/${encodeURIComponent(user)}/overview`)
                .setDescription(results);

            const myMsg = await msg.channel.send(embed);
        } catch (e) {
            if (e.message === "Sorry I couldn't find that hash") msg.channel.send(util.embed().setDescription(`❌ | ${e.message}`));
            else msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
