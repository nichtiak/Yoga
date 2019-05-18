window.addEventListener('DOMContentLoaded', function () {

	'use strict';
	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function (event) {
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});

	// Timer

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

	// Modal

	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close'),
		descriptionBtn = document.querySelectorAll('.description-btn');

	function modal(target) {
		for (let i = 0; i < descriptionBtn.length; i++) {
			target[i].addEventListener('click', function () {
				overlay.style.display = 'block';
				this.classList.add('more-splash');
				document.body.style.overflow = 'hidden';
			});

			more.addEventListener('click', function () {
				overlay.style.display = 'block';
				this.classList.add('more-splash');
				document.body.style.overflow = 'hidden';
			});

			close.addEventListener('click', function () {
				overlay.style.display = 'none';
				more.classList.remove('more-splash');
				document.body.style.overflow = '';
			})
		};
	};
	modal(descriptionBtn);

	// Forma

	let message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжимся!',
		failure: 'Что-то пошло не так...'
	},
		form = document.querySelector('.main-form'),
		input = form.getElementsByTagName('input'),
		statusMessage = document.createElement('div'),

		forma = document.getElementById('form'),
		inputs = forma.getElementsByTagName('input'),
		input1 = forma.getElementsByTagName('input')[0],
		input2 = forma.getElementsByTagName('input')[1];


	input1.name = 'email';
	input2.name = 'phone';

	input2.onkeypress = function (e) {    //отмена ввода букв

		e = e || event;

		if (e.ctrlKey || e.altKey || e.metaKey) return;

		let chr = getChar(e);

		if (chr == '+' || (chr == null)) return;

		if (chr < '0' || chr > '9') {
			return false;
		}

	};

	input[0].onkeypress = function (e) {

		e = e || event;

		if (e.ctrlKey || e.altKey || e.metaKey) return;

		let chr = getChar(e);

		if (chr == '+' || (chr == null)) return;

		if (chr < '0' || chr > '9') {
			return false;
		}

	};

	function getChar(event) {
		if (event.which == null) {
			if (event.keyCode < 32) return null;
			return String.fromCharCode(event.keyCode)
		}

		if (event.which != 0 && event.charCode != 0) {
			if (event.which < 32) return null;
			return String.fromCharCode(event.which)
		}

		return null;
	}


	statusMessage.classList.add('status');



	// Отправка промисами

	function sendForm(elem) {
		elem.addEventListener('submit', function (e) {
			e.preventDefault();
			elem.appendChild(statusMessage);
			let formData = new FormData(elem);


			function postData(data) {

				return new Promise(function (resolve, reject) {
					let request = new XMLHttpRequest();

					request.open('POST', 'server.php');

					request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

					// request.send(json);

					request.onreadystatechange = function () {
						if (request.readyState < 4) {
							resolve()
						} else if (request.readyState === 4) {
							if (request.status == 200 && request.status < 300) {
								resolve()
							} else {
								reject()
							}
						}
					};



					let obj = {};

					formData.forEach(function (value, key) {
						obj[key] = value;
					});

					let json = JSON.stringify(obj);

					request.send(json);
				});
			} //end postData

			function clearInput() {
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
				}
			}

			function clearInputs() {
				for (let i = 0; i < inputs.length; i++) {
					inputs[i].value = '';
				}
			}

			postData(formData)
				.then(() => statusMessage.innerHTML = message.loading)
				.then(() => statusMessage.innerHTML = message.success)
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput)
				.then(clearInputs);
		});
	}
	sendForm(form);
	sendForm(forma);

	// Slider

	let slideIndex = 1,
		slides = document.querySelectorAll('.slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');

	showSlides(slideIndex);

	function showSlides(n) {

		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach((item) => item.style.display = 'none');
		// for (let i = 0; i < slides.length; i++) {
		// 	slides[i].style.display = 'none';
		// }
		dots.forEach((item) => item.classList.remove('dot-active'));

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');
	}

	function plusSlides(n){
		showSlides(slideIndex += n);
	}
	function currentSlide(n) {
		showSlides(slideIndex = n);
	}

	prev.addEventListener('click', function(){
		plusSlides(-1);
	});

	next.addEventListener('click', function() {
		plusSlides(1);
	});

	dotsWrap.addEventListener('click', function(event) {
		for (let i = 0; i < dots.length + 1; i++) {
			if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
				currentSlide(i);
			}
		}
	});

	// Calc

	let persons = document.querySelectorAll('.counter-block-input')[0],
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total'),
		personsSum = 0,
		daysSum = 0,
		total = 0;

		totalValue.innerHTML = 0;

		persons.addEventListener('change', function(){
			personsSum = +this.value;
			total = (daysSum + personsSum)*4000;

			if(restDays.value == '' || persons.value == '' || persons.value == 0 || restDays.value == 0) {
				totalValue.innerHTML = 0;
			} else {
				totalValue.innerHTML = place.options[place.selectedIndex].value * total;
			}
		});

		restDays.addEventListener('change', function(){
			daysSum = +this.value;
			total = (daysSum + personsSum)*4000;

			if(persons.value == '' || restDays.value == '' || persons.value == 0 || restDays.value == 0) {
				totalValue.innerHTML = 0;
			} else {
				totalValue.innerHTML = place.options[place.selectedIndex].value * total;
			}
		});

		place.addEventListener('change', function() {
			if (restDays.value == '' || persons.value == '' || persons.value == 0 || restDays.value == 0) {
				totalValue.innerHTML = 0;
			} else {
				let a = total;
				totalValue.innerHTML = a * this.options[this.selectedIndex].value;
			}
		});
		persons.addEventListener('keypress', function(e){
			if (!/\d/.test(e.key)){
				e.preventDefault();
			}
		});
		restDays.addEventListener('keypress', function(e){
			if (!/\d/.test(e.key)){
				e.preventDefault();
			}
		});
});
