const appForm = document.querySelector('.appForm');
const order_list = document.querySelector('.orders');
let orders = JSON.parse(localStorage.getItem("orders")) || [];
const deleteButton = document.querySelector('input[name="delete"]');

function addOrder(e) {
	e.preventDefault();
	const order_value = (document.querySelector('form.appForm input[name="order"]')).value;
	const order = {
		order_value,
		isChecked: false
	}
	orders.push(order);
	printOrders(orders, order_list);
	const ordersJson = JSON.stringify(orders);
	localStorage.setItem("orders", ordersJson);
	this.reset();
}

function printOrders(orders, ordersList) {
	ordersList.innerHTML = orders.map((item, i) => {
		return `
			<li id="orderId_${i}">
				<input type="checkbox" data-index=${i} id="orderId_${i}" ${item.isChecked ? 'checked' : ''}/>
				<label for="orderId_${i}">${item.order_value}</label>
			</li>
		`;
	}).join('');
	console.log('list refreshing');
}

function isCheckedToggle(e) {
	if(!e.target.matches('input')) return;
	const el = e.target;
	const index = el.dataset.index;
	console.log(index);
	orders[index].isChecked = !orders[index].isChecked;
	localStorage.setItem("orders", JSON.stringify(orders));
	printOrders(orders, order_list);
}

function deleteOrder() {
	orders = orders.filter(order => !order.isChecked);
	localStorage.setItem("orders", JSON.stringify(orders));
	printOrders(orders, order_list);
}

appForm.addEventListener('submit', addOrder);
deleteButton.addEventListener('click', deleteOrder);
order_list.addEventListener('click', isCheckedToggle);

printOrders(orders, order_list);
