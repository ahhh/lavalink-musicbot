const fetch = require("node-fetch");
const util = require("../util");
var path = require("path");

var honkArray = [
  'https://image.shutterstock.com/image-photo/angry-goose-600w-901533.jpg',
  'https://i.kym-cdn.com/photos/images/facebook/001/599/338/5b2.png',
	'https://ih1.redbubble.net/image.1139045308.4894/raf,750x1000,075,t,8DB3D2:e6f0370482.jpg',
	'https://ih1.redbubble.net/image.928162828.3517/flat,750x1000,075,f.jpg',
	'https://assets.thespinoff.co.nz/1/2019/09/Goose-game-header-850x510.jpg',
	'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F57d552e8-e9c3-11e8-a9c0-ffbf0f2a8629.jpg?crop=3000%2C2000%2C0%2C0',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRlSLewMRbgmLIJReKr1of0MI7jrYRODYz7i0aISD34jVd0zcMrotPhJHkVi37HFVyuL0&usqp=CAU',
	'https://i.ytimg.com/vi/riJs7DlphEM/maxresdefault.jpg',
	'https://i.pinimg.com/originals/5e/7c/0e/5e7c0ec745f8933adf19d8033bea0577.png',
	'https://static.tweaktown.com/news/6/9/69940_01_united-goose-game-composer-know-honk-big_full.png',
	'https://static.wikia.nocookie.net/jacksepticeye/images/b/b9/HONK_HONK_AM_GOOSE_image.jpg/revision/latest?cb=20190923162101',
	'https://i.kym-cdn.com/photos/images/facebook/001/591/377/522.png',
	'https://i.ytimg.com/vi/UYftaiffI0w/maxresdefault.jpg',
	'https://149349728.v2.pressablecdn.com/wp-content/uploads/2019/10/Screen-Shot-2019-10-02-at-1.17.05-PM.png',
	'https://pyxis.nymag.com/v1/imgs/254/9be/22c3a104174a6f11968ea54f46c3818458-20-goose-video-game.rsquare.w700.jpg',
	'https://www.pngitem.com/pimgs/m/630-6301861_honk-honk-goose-hd-png-download.png',
	'https://cdn2.vectorstock.com/i/1000x1000/87/66/cute-cartoon-goose-farm-bird-making-honk-sound-vector-24498766.jpg',
	'https://cdn.mos.cms.futurecdn.net/fEUDeQHN9M8reMvRfp525e-320-80.jpg',
	'https://cdn.pressstart.com.au/wp-content/uploads/2020/08/Untitled-Goose-Game-Honk-770x433.jpg',
	'https://static.newmobilelife.com/wp-content/uploads/2020/08/Untitled-Goose-Game.png',
	'https://i.kym-cdn.com/photos/images/original/001/588/797/0f8.jpg',
	'https://assets1.ignimgs.com/2019/09/19/pipe-1568931609207.jpg?width=1280',
	'https://pbs.twimg.com/profile_images/1006975646495473664/YiHP0gUH_400x400.jpg',
	'https://i.pinimg.com/564x/48/1b/f1/481bf1e30b2b914974e7a355c7d8bcbc.jpg',
	'https://i.pinimg.com/originals/a6/95/62/a695621c2bfcf30c326bbceb7cdaf9f2.jpg',
	'https://goombastomp.com/wp-content/uploads/2019/10/EGh7HjjX0AI9W8L.jpg',
	'https://cdn.drawception.com/drawings/ckrzMpNJm3.png',
	'https://i.ytimg.com/vi/7sBs6EWPjBg/maxresdefault.jpg',
	'https://i.ytimg.com/vi/ydrICKcjQ1k/maxresdefault.jpg',
	'https://i.ytimg.com/vi/SIwfnfWCzuI/maxresdefault.jpg',
	'https://miro.medium.com/max/1080/1*YRWPjl5vNxJPIImAC7IUew.png',
	'https://i.redd.it/vgx44ywhwys31.jpg',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGS11wJcxUbNMbvp85HSM4-ac35mLLCxTix9-kws9pcaetn3MYNwws_0Wp_bIRxs4ZvZA&usqp=CAU',
	'https://i.pinimg.com/originals/b3/9a/46/b39a46c4aa6ff404b8ea9fc36b58c080.jpg',
	'https://i.etsystatic.com/8148617/r/il/e59d45/2212911005/il_570xN.2212911005_pz03.jpg',
	'https://dlp2gfjvaz867.cloudfront.net/product_photos/78679759/file_f04a0eba4d_original.png',
	'https://pbs.twimg.com/media/EKtrdDEXYAE5i2h.jpg',
	'https://ih1.redbubble.net/image.1075072996.2270/raf,750x1000,075,t,FFFFFF:97ab1c12de.jpg',
	'https://i2-prod.dailystar.co.uk/incoming/article22453535.ece/ALTERNATES/s1200b/0_Honking-Goose.jpg',
	'https://canary.contestimg.wish.com/api/webimage/5e07587bcd162b24cc62596f-large.jpg?cache_buster=cb3e861347c47291b1515d41ac2883e8',
	'https://canary.contestimg.wish.com/api/webimage/5e9b9e6e4ca8b748c0dddcdc-large.jpg?cache_buster=1e798021a496175b86a5ff43f997e5e8',
	'https://ih1.redbubble.net/image.1003022318.0510/flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
	'https://ih1.redbubble.net/image.1139045308.4894/raf,750x1000,075,t,8DB3D2:e6f0370482.jpg'
];

module.exports = {
    name: "honk",
    aliases: ["bork","goose"],
    exec: async (msg, args) => {
        try {
		console.log(Date() + " " + msg.member.user.id + " aka " + msg.member.user.tag + " is calling " + path.basename(__filename) + " with " + args.join(" "));
		var randomNumber = Math.floor(Math.random()*honkArray.length);
         	const embed = honkArray[randomNumber];
		await msg.channel.send(embed);		
        } catch (e) {
            msg.channel.send(`An error occured: ${e.message}.`);   
        }
    }
};
