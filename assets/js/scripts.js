document.addEventListener('DOMContentLoaded', function () {
	// Cache DOM elements
	const menuBar = document.querySelector('#menu-bar')
	const navbar = document.querySelector('#navbar')
	const menuIcon = menuBar?.querySelector('i')
	const modal = document.getElementById('modal-overlay')
	const modalImage = document.getElementById('modal-image')
	const modalPdf = document.getElementById('modal-pdf')
	const pdfDownload = document.getElementById('pdf-download')
	const certificacionImages = document.querySelectorAll('.certificacion-img')
	const navLinks = document.querySelectorAll('#navbar a')
	const smoothScrollLinks = document.querySelectorAll('a[href^="#"]')

	// Throttle function for performance
	function throttle(func, wait) {
		let timeout
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout)
				func(...args)
			}
			clearTimeout(timeout)
			timeout = setTimeout(later, wait)
		}
	}

	// Toggle menu en móvil
	if (menuBar && navbar && menuIcon) {
		menuBar.addEventListener('click', () => {
			navbar.classList.toggle('active')
			menuIcon.classList.toggle('fa-bars')
			menuIcon.classList.toggle('fa-times')
		})
	}

	// Cerrar menú al hacer click en un enlace
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			if (navbar) {
				navbar.classList.remove('active')
			}
			if (menuIcon) {
				menuIcon.classList.remove('fa-times')
				menuIcon.classList.add('fa-bars')
			}
		})
	})

	// Scroll suave para los enlaces de navegación con mejor performance
	smoothScrollLinks.forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()
			const targetId = this.getAttribute('href')

			if (targetId === '#') return

			const targetElement = document.querySelector(targetId)

			if (targetElement) {
				// Usar requestAnimationFrame para mejor performance
				requestAnimationFrame(() => {
					targetElement.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					})
				})
			}
		})
	})

	// Modal para certificaciones con mejor manejo de memoria
	if (modal && modalImage && modalPdf && pdfDownload) {
		// Agregar evento click a cada imagen de certificación
		certificacionImages.forEach(img => {
			img.addEventListener('click', function () {
				const pdfUrl = this.getAttribute('data-pdf')

				if (pdfUrl) {
					// Mostrar PDF
					modalImage.style.display = 'none'
					modalPdf.style.display = 'block'
					modalPdf.data = pdfUrl
					pdfDownload.href = pdfUrl
				} else {
					// Mostrar imagen
					modalPdf.style.display = 'none'
					modalImage.style.display = 'block'
					modalImage.src = this.src
					modalImage.alt = this.alt
				}

				modal.style.display = 'flex'
				document.body.style.overflow = 'hidden'
			})
		})

		// Función para cerrar modal
		const closeModal = () => {
			modal.style.display = 'none'
			modalPdf.data = ''
			modalImage.src = ''
			document.body.style.overflow = 'auto'
		}

		// Cerrar modal al hacer click en el overlay
		modal.addEventListener('click', function (e) {
			if (e.target === modal) {
				closeModal()
			}
		})

		// Cerrar modal con la tecla Escape
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && modal.style.display === 'flex') {
				closeModal()
			}
		})
	}

	// Optimización para imágenes lazy loading
	if ('IntersectionObserver' in window) {
		const imageObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const img = entry.target
					if (img.dataset.src) {
						img.src = img.dataset.src
						img.removeAttribute('data-src')
						observer.unobserve(img)
					}
				}
			})
		})

		document.querySelectorAll('img[data-src]').forEach(img => {
			imageObserver.observe(img)
		})
	}
})
