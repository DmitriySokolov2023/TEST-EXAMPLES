const products = document.querySelectorAll('.product')
const basket = document.getElementById('cart')
let itemCount = 0

products.forEach(product => {
	product.addEventListener('dragstart', event => {
		event.dataTransfer.setData('id', event.target.id)
		setTimeout(() => (event.target.style.display = 'none'), 0)
	})

	product.addEventListener('dragend', event => {
		event.target.style.display = 'inline'
	})
})

function addToBasket(product) {
	product.style.display = 'none'
	const clonedProduct = product.cloneNode(true)
	clonedProduct.style.display = 'block'
	clonedProduct.style.width = '50px'

	const randomX = Math.random() * 40 - 20
	const randomY = Math.random() * 30 - 10
	const randomRotate = Math.random() * 30 - 15

	clonedProduct.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`

	basket.appendChild(clonedProduct)
	itemCount++

	// ✅ Показываем кнопку "Оплатить" после 3 товаров
	if (itemCount >= 3) {
		document.getElementById('payButton').classList.remove('hidden')
	}
}

// 📌 Перетаскивание мышью (для ПК)

basket.addEventListener('dragover', event => {
	event.preventDefault()
	basket.classList.add('dragover')
})

basket.addEventListener('drop', event => {
	event.preventDefault()
	basket.classList.remove('dragover')

	const productId = event.dataTransfer.getData('id')
	console.log(productId)
	const product = document.getElementById(productId)
	console.log(product)
	if (product) addToBasket(product)
})

products.forEach(product => {
	product.addEventListener('touchstart', event => {
		event.preventDefault()
		product.classList.add('dragging')
	})

	product.addEventListener('touchmove', event => {
		event.preventDefault()
		let touch = event.touches[0]
		product.style.position = 'absolute'
		product.style.left = touch.pageX - 30 + 'px'
		product.style.top = touch.pageY - 30 + 'px'
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
			addToBasket(product)
		} else {
			product.style.position = 'static'
		}
	})
})
