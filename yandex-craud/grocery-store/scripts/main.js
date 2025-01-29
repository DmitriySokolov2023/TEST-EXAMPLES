const products = document.querySelectorAll('.product')
const basket = document.getElementById('cart')
const basket_drop = document.getElementById('cart_drop')
const button = document.querySelector('.cart_button')
let itemCount = 0

products.forEach(product => {
	product.addEventListener('dragstart', event => {
		event.dataTransfer.setData('id', event.target.id)
		setTimeout(() => (event.target.style.opacity = 0), 0)
	})

	product.addEventListener('dragend', event => {
		const alreadyExist = document.querySelectorAll(`#${event.target.id}`)
		if (alreadyExist.length > 1) {
			event.target.style.opacity = 0
		} else event.target.style = ''
	})
})

basket.addEventListener('drop', event => {
	event.preventDefault()

	const productId = event.dataTransfer.getData('id')
	document.getElementById(productId).opacity = 0
	const productClone = document.getElementById(productId).cloneNode(true)

	if (productClone) {
		productClone.style.opacity = 1
		basket_drop.append(productClone)
		itemCount++
	}
	if (itemCount == 3) {
		button.classList.remove('hidden')
	}
})

//Мобильная версия

products.forEach(product => {
	product.addEventListener('touchstart', event => {
		event.preventDefault()
	})

	product.addEventListener('touchmove', event => {
		event.preventDefault()
		let touch = event.touches[0]
		product.style.position = 'absolute'
		product.style.left = touch.pageX - 100 + 'px'
		product.style.top = touch.pageY - 150 + 'px'
	})

	product.addEventListener('touchend', event => {
		event.preventDefault()

		// Проверяем, попал ли товар в корзину
		let basketRect = basket.getBoundingClientRect()
		let touchX = event.changedTouches[0].clientX
		let touchY = event.changedTouches[0].clientY
		const productClone = product.cloneNode(true)

		if (
			touchX >= basketRect.left &&
			touchX <= basketRect.right &&
			touchY >= basketRect.top &&
			touchY <= basketRect.bottom
		) {
			product.style = ''
			productClone.style = ''
			productClone.style.opacity = 1
			basket_drop.append(productClone)
			itemCount++

			if (itemCount == 3) {
				button.classList.remove('hidden')
			}
		} else {
			product.style.opacity = 1
		}
	})
})
