function modal() {
	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close');
	more.classList.add('description-btn');

	const modal = () => {
		let allButtons = document.querySelectorAll('.description-btn');
		for (let i = 0; i < allButtons.length; i++) {
			allButtons[i].addEventListener('click', () => {
				overlay.style.display = 'block';
				allButtons[i].classList.add('more-splash');
				document.body.style.overflow = 'hidden';
			});
		};
	};

	const hideModal = () => {
		close.addEventListener('click', () => {
			overlay.style.display = 'none';
			more.classList.remove('more-splash');
			document.body.style.overflow = '';
		});
	};

	modal();
	hideModal();
}

module.exports = modal;