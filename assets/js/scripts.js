document.addEventListener('DOMContentLoaded', function () {
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

	if (menuBar && navbar && menuIcon) {
		menuBar.addEventListener('click', () => {
			navbar.classList.toggle('active')
			menuIcon.classList.toggle('fa-bars')
			menuIcon.classList.toggle('fa-times')
		})
	}

	navLinks.forEach(link => {
		link.addEventListener('click', e => {
			navLinks.forEach(navLink => navLink.classList.remove('active'))
			link.classList.add('active')

			if (navbar) {
				navbar.classList.remove('active')
			}
			if (menuIcon) {
				menuIcon.classList.remove('fa-times')
				menuIcon.classList.add('fa-bars')
			}
		})
	})

	function updateActiveNavLink() {
		const sections = document.querySelectorAll('section')
		const scrollPos = window.scrollY + 150

		sections.forEach(section => {
			const top = section.offsetTop
			const bottom = top + section.offsetHeight
			const id = section.getAttribute('id')
			const navLink = document.querySelector(`#navbar a[href="#${id}"]`)

			if (scrollPos >= top && scrollPos <= bottom) {
				navLinks.forEach(link => link.classList.remove('active'))

				if (navLink) {
					navLink.classList.add('active')
				}
			}
		})
	}

	window.addEventListener('scroll', throttle(updateActiveNavLink, 100))

	updateActiveNavLink()

	smoothScrollLinks.forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()
			const targetId = this.getAttribute('href')

			if (targetId === '#') return

			const targetElement = document.querySelector(targetId)

			if (targetElement) {
				requestAnimationFrame(() => {
					targetElement.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					})
				})
			}
		})
	})

	if (modal && modalImage && modalPdf && pdfDownload) {
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

		const closeModal = () => {
			modal.style.display = 'none'
			modalPdf.data = ''
			modalImage.src = ''
			document.body.style.overflow = 'auto'
		}

		modal.addEventListener('click', function (e) {
			if (e.target === modal) {
				closeModal()
			}
		})

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && modal.style.display === 'flex') {
				closeModal()
			}
		})
	}

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

	const slides = document.querySelectorAll('.carousel-slide')
	const indicators = document.querySelectorAll('.indicator')
	const prevBtn = document.querySelector('.prev-btn')
	const nextBtn = document.querySelector('.next-btn')
	const carouselContainer = document.querySelector('.carousel-container')

	let currentSlide = 0
	let carouselInterval

	// Variables para touch events
	let startX = 0
	let startY = 0
	let isDragging = false
	let hasMoved = false

	function showSlide(index) {
		slides.forEach(slide => slide.classList.remove('active'))
		indicators.forEach(indicator => indicator.classList.remove('active'))

		if (slides[index] && indicators[index]) {
			slides[index].classList.add('active')
			indicators[index].classList.add('active')
		}

		currentSlide = index
	}

	function nextSlide() {
		const next = (currentSlide + 1) % slides.length
		showSlide(next)
	}

	function prevSlide() {
		const prev = (currentSlide - 1 + slides.length) % slides.length
		showSlide(prev)
	}

	function startAutoCarousel() {
		carouselInterval = setInterval(nextSlide, 5000) // Cambiar cada 5 segundos
	}

	function stopAutoCarousel() {
		clearInterval(carouselInterval)
	}

	if (nextBtn && prevBtn) {
		nextBtn.addEventListener('click', () => {
			nextSlide()
			stopAutoCarousel()
			startAutoCarousel() // Reiniciar el auto-carrusel
		})

		prevBtn.addEventListener('click', () => {
			prevSlide()
			stopAutoCarousel()
			startAutoCarousel() // Reiniciar el auto-carrusel
		})
	}

	indicators.forEach((indicator, index) => {
		indicator.addEventListener('click', () => {
			showSlide(index)
			stopAutoCarousel()
			startAutoCarousel() // Reiniciar el auto-carrusel
		})
	})

	const homeSection = document.getElementById('home')
	if (homeSection) {
		// Eventos de mouse para desktop
		homeSection.addEventListener('mouseenter', stopAutoCarousel)
		homeSection.addEventListener('mouseleave', startAutoCarousel)

		// Touch events para móviles
		homeSection.addEventListener('touchstart', handleTouchStart, { passive: false })
		homeSection.addEventListener('touchmove', handleTouchMove, { passive: false })
		homeSection.addEventListener('touchend', handleTouchEnd, { passive: false })
	}

	// Funciones para manejar touch events
	function handleTouchStart(e) {
		if (e.touches.length !== 1) return

		startX = e.touches[0].clientX
		startY = e.touches[0].clientY
		isDragging = true
		hasMoved = false
		stopAutoCarousel()
	}

	function handleTouchMove(e) {
		if (!isDragging || e.touches.length !== 1) return

		const currentX = e.touches[0].clientX
		const currentY = e.touches[0].clientY
		const diffX = Math.abs(currentX - startX)
		const diffY = Math.abs(currentY - startY)

		// Si el movimiento horizontal es mayor que el vertical, es un swipe horizontal
		if (diffX > diffY && diffX > 10) {
			hasMoved = true
			e.preventDefault() // Prevenir scroll durante swipe horizontal
		}
	}

	function handleTouchEnd(e) {
		if (!isDragging) return

		isDragging = false

		if (hasMoved && e.changedTouches.length === 1) {
			const endX = e.changedTouches[0].clientX
			const diffX = startX - endX
			const minSwipeDistance = 50

			// Swipe hacia la izquierda (siguiente imagen)
			if (diffX > minSwipeDistance) {
				nextSlide()
			}
			// Swipe hacia la derecha (imagen anterior)
			else if (diffX < -minSwipeDistance) {
				prevSlide()
			}
		}

		startAutoCarousel()
	}

	if (slides.length > 0) {
		showSlide(0)
		startAutoCarousel()
	}
})
