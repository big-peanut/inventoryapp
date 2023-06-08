const myform = document.getElementById('myform')
const itemlist = document.getElementById('itemlist')

function updateItem(itemId, item) {
    axios.put(`https://crudcrud.com/api/c8f5ba09122a4de08af481c495225b07/data1/${itemId}`, {item:item.item,description:item.description,price:item.price,quantity:item.quantity})
        .then(res => {
            fetchItems();
        })
        .catch(error => {
            console.error(error);
        });
}

function buyItem(itemId, quantity) {
    axios.get(`https://crudcrud.com/api/c8f5ba09122a4de08af481c495225b07/data1/${itemId}`)
        .then(res => {
            const item = res.data;
            item.quantity -= quantity;
            updateItem(itemId, item);
        })
        .catch(error => {
            console.error(error);
        });
}

function displayItems(items) {
    itemlist.innerHTML = ""
    items.forEach(item => {
        const li = document.createElement('li')
        li.textContent = `ITEM : ${item.item} , DESCRIPTION : ${item.description} , PRICE : ${item.price} , QUANTITY : ${item.quantity}`
        itemlist.appendChild(li)

        const buyButton1 = document.createElement('button')
        buyButton1.textContent = 'Buy 1';
        buyButton1.addEventListener('click', () => buyItem(item._id, 1))

        const buyButton2 = document.createElement('button');
        buyButton2.textContent = 'Buy 2';
        buyButton2.addEventListener('click', () => buyItem(item._id, 2))

        const buyButton3 = document.createElement('button');
        buyButton3.textContent = 'Buy 3';
        buyButton3.addEventListener('click', () => buyItem(item._id, 3))

        itemlist.appendChild(buyButton1);
        itemlist.appendChild(buyButton2);
        itemlist.appendChild(buyButton3);
    });
}

function fetchItems() {
    axios.get("https://crudcrud.com/api/c8f5ba09122a4de08af481c495225b07/data1")
        .then(res => {
            displayItems(res.data)
        })
        .catch((err) => console.log(err))
}

function addItems(item, description, price, quantity) {
    let obj = {
        item: item,
        description: description,
        price: price,
        quantity: quantity
    }
    axios.post("https://crudcrud.com/api/c8f5ba09122a4de08af481c495225b07/data1", obj)
        .then(res => {
            fetchItems()
        })
        .catch((err) => console.log(err))
}

myform.addEventListener('submit', (e) => {
    e.preventDefault()

    let itemName = document.getElementById('item-name')
    let description = document.getElementById('description')
    let price = document.getElementById('price')
    let quantity = document.getElementById('quantity')

    addItems(itemName.value, description.value, price.value, quantity.value)


    itemName.value = ""
    description.value = ""
    price.value = ""
    quantity.value = ""
})
document.addEventListener('DOMContentLoaded', fetchItems);
