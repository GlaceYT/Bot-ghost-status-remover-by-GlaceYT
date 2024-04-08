const duration = require("iso8601-duration");

class Video {
	constructor(data) {
		const durationObj = duration.parse(data.items[0].contentDetails.duration);

		this.duration = durationObj;
		this.durationSeconds = duration.toSeconds(durationObj);
		this.title = data.items[0].snippet.title;
		this.id = data.items[0].id;
		this.description = data.items[0].snippet.description;
		this.data = data;
	}

	get url() {
		return `https://www.youtube.com/watch?v=${this.id}`;
	}

	get thumbnail() {
		return `https://img.youtube.com/vi/${this.id}/default.jpg`;
	}

	get length() {
		const time = this.durationSeconds;
		const hours = ~~(time / 3600);
		const minutes = ~~((time % 3600) / 60);
		const seconds = time % 60;

		let length = "";
		if (hours > 0) length += `${hours}:${minutes < 10 ? "0" : ""}`;
		length += `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
		return length;
	}
}

module.exports = Video;