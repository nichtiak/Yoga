function modal() {
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
}

module.exports = modal;