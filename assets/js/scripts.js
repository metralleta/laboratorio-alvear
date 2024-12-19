document.addEventListener('DOMContentLoaded', function () {
	const menuBar = document.querySelector('#menu-bar')
	const navbar = document.querySelector('#navbar')

	// Toggle menu en móvil
	menuBar.addEventListener('click', () => {
		navbar.classList.toggle('active')
	})

	// Cerrar menú al hacer click en un enlace
	document.querySelectorAll('#navbar a').forEach(link => {
		link.addEventListener('click', () => {
			navbar.classList.remove('active')
		})
	})

	// Scroll suave para los enlaces de navegación
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()
			const targetId = this.getAttribute('href')
			const targetElement = document.querySelector(targetId)

			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				})
			}
		})
	})
})
