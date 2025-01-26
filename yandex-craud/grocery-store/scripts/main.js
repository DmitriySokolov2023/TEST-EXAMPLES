document.addEventListener('DOMContentLoaded', () => {
	const products = document.querySelectorAll('.product')
	const cart = document.querySelector('.drop-zone')
	const checkoutBtn = document.querySelector('.checkout-btn')
	let cartItems = 0

	products.forEach(product => {
		product.addEventListener('dragstart', e => {
			e.dataTransfer.setData('text', e.target.id)
		})
	})

	cart.addEventListener('dragover', e => {
		e.preventDefault()
	})

	cart.addEventListener('drop', e => {
		e.preventDefault()
		const productId = e.dataTransfer.getData('text')
		const product = document.getElementById(productId)

		if (product && cartItems < 3) {
			cart.appendChild(product)
			cartItems++
		}

		if (cartItems >= 3) {
			checkoutBtn.classList.remove('hidden')
		}
	})

	checkoutBtn.addEventListener('click', () => {
		alert('Оплата прошла успешно!')
	})
})
