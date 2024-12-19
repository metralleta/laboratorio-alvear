document.addEventListener('DOMContentLoaded', function () {
	const menuBar = document.querySelector('#menu-bar')
	const navbar = document.querySelector('#navbar')
	const menuIcon = menuBar.querySelector('i') // Seleccionamos el ícono

	// Toggle menu en móvil
	menuBar.addEventListener('click', () => {
		navbar.classList.toggle('active')
		// Opcional: Cambiar el ícono cuando se abre/cierra el menú
		menuIcon.classList.toggle('fa-bars')
		menuIcon.classList.toggle('fa-times')
	})

	// Cerrar menú al hacer click en un enlace
	document.querySelectorAll('#navbar a').forEach(link => {
		link.addEventListener('click', () => {
			navbar.classList.remove('active')
			// Restaurar el ícono del menú
			menuIcon.classList.remove('fa-times')
			menuIcon.classList.add('fa-bars')
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
