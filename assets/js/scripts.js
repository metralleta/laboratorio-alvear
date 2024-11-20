let menuBar = document.querySelector('#menu-bar')
let navBar = document.querySelector('#navbar')

menuBar.addEventListener('click', () => {
	menuBar.classList.toggle('fa-times')
	navBar.classList.toggle('active')
})
