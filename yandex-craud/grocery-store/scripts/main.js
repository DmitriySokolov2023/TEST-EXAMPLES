const products = document.querySelectorAll('.product')
const basket = document.getElementById('cart')
const basket_drop = document.getElementById('cart_drop')
const button = document.querySelector('.cart_button')
let itemCount = 0

products.forEach(product => {
	product.addEventListener('dragstart', event => {
		event.dataTransfer.setData('id', event.target.id)
		setTimeout(() => (event.target.style.display = 'none'), 0)
	})

	product.addEventListener('dragend', event => {
		event.target.style = ''
	})
})

basket.addEventListener('dragover', event => {
	event.preventDefault()
	basket.classList.add('dragover')
})

basket.addEventListener('drop', event => {
	event.preventDefault()
	basket.classList.remove('dragover')

	const productId = event.dataTransfer.getData('id')
	const product = document.getElementById(productId)
	if (product) {
		basket_drop.append(product)
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
		product.classList.add('dragging')
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
		product.classList.remove('dragging')

		// Проверяем, попал ли товар в корзину
		let basketRect = basket.getBoundingClientRect()
		let touchX = event.changedTouches[0].clientX
		let touchY = event.changedTouches[0].clientY

		if (
			touchX >= basketRect.left &&
			touchX <= basketRect.right &&
			touchY >= basketRect.top &&
			touchY <= basketRect.bottom
		) {
			basket_drop.append(product)
			itemCount++
			product.style = ''
			if (itemCount == 3) {
				button.classList.remove('hidden')
			}
		} else {
			product.style.position = 'static'
		}
	})
})
