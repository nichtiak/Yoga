function timer() {
    let deadLine = "2019-05-30";

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)));

		hours = checkTime(hours);
		minutes = checkTime(minutes);
		seconds = checkTime(seconds);

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
		function checkTime(i) {
			if (i < 10) {
				i = "0" + i;
			}
			return i;
		}
	}



	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(upDateClock, 1000);

		function upDateClock() {
			let t = getTimeRemaining(endtime);
			hours.textContent = t.hours;
			minutes.textContent = t.minutes;
			seconds.textContent = t.seconds;

			if (t.total <= 0) {
				clearInterval(timeInterval);
				hours.textContent = '00';
				seconds.textContent = '00';
				minutes.textContent = '00';
			}


		}


	}

	setClock('timer', deadLine);
}

module.exports = timer;