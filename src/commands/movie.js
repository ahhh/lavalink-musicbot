const fetch = require("../fetch.js");
const util = require("../util");
const zlib = require('zlib');
var path = require("path");


module.exports = {
    name: "movie",
    aliases: ["tomatoes"],
    exec: async (msg, args) => {

		try {
			console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
			const query = args.join(" ");
			const search = await (await fetch(`https://www.rottentomatoes.com/api/private/v2.0/search/?limit=10&q=${encodeURIComponent(query)}`)).json();
			if (!search.movies.length) return msg.say('Could not find any results.');
			const find = search.movies.find(m => m.name.toLowerCase() === query.toLowerCase()) || search.movies[0];
			const urlID = find.url.replace('/m/', '');
			const body = await (await fetch(`https://www.rottentomatoes.com/api/private/v1.0/movies/${urlID}`)).json();
			const criticScore = body.ratingSummary.allCritics;
			const audienceScore = body.ratingSummary.audience;
			var bodyPart = util.chunk(body.ratingSummary.consensus, 1024);
			const embed = util.embed()
				.setColor(0xFFEC02)
				.setTitle(`${body.title} (${body.year})`)
				.setURL(`https://www.rottentomatoes.com${body.url}`)
				.setAuthor('Rotten Tomatoes', 'https://i.imgur.com/Sru8mZ3.jpg', 'https://www.rottentomatoes.com/')
				.setDescription(bodyPart[0])
				.setThumbnail(body.posters.original)
				.addField('❯ Critic Score', criticScore.meterValue ? `${criticScore.meterValue}%` : '???', true)
				.addField('❯ Audience Score', audienceScore.meterScore ? `${audienceScore.meterScore}%` : '???', true);
			const myMsg = await msg.channel.send(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
