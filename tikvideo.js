const axios = require("axios");
module.exports.config = {
	name: "tikvideo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Thiệu Trung Kiên Mod By Kaneki",
	description: "Tải video tiktok",
	commandCategory: "Mạng xã hội",
	usages: "",
	cooldowns: 5
}, module.exports.onLoad = function() {
	console.log("===TIKTOK DOWNLOAD NO WATERMARK===")
}, module.exports.run = async function({
	args: e,
	event: a,
	api: t
}) {
	const n = await axios.get(`http://api.leanhtruong.net/api-no-key/tiktok?url=${e[0]}`),
		i = ((await axios.get(`${n.data.thumbail}`, {
			responseType: "stream"
		})).data, n.data.data_nowatermark[0].url),
	return t.sendMessage(`Title: ${n.data.title}\nAuthor : ${n.data.author_video}\n\n1.Tải Video\n\nReply tin nhắn để chọn!`, a.threadID, ((e, t) => {
		global.client.handleReply.push({
			name: this.config.name,
			messageID: t.messageID,
			author: a.senderID,
			url: i,
			type: "choose"
		})
	}), a.messageID)
}, module.exports.handleReply = async function({
	args: e,
	event: a,
	api: t,
	handleReply: n
}) {
      if(n.author != a.sendetID) return;
	const i = require("fs-extra"),
		s = require("request");
	if ("choose" === n.type) switch (a.body) {
		case "1":
			var o = () => t.sendMessage({
				body: "DONE",
				attachment: i.createReadStream(__dirname + "/cache/video.mp4")
			}, a.threadID, (() => i.unlinkSync(__dirname + "/cache/video.mp4")), a.messageID);
			return s(encodeURI(`${n.url}`)).pipe(i.createWriteStream(__dirname + "/cache/video.mp4")).on("close", (() => o()))
	}
};
