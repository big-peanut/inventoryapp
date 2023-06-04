const myform = document.getElementById('myform')
const itemlist = document.getElementById('itemlist')

function addItems(item, description, price, quantity) {
    let obj = {
        item: item,
        description: description,
        price: price,
        quantity: quantity
    }
    axios.post("https://crudcrud.com/api/7f34ab12878c4798ba3f3d9e744207db/Inventory", obj)
        .then(() => {
            displayItems()
        })
        .catch((err) => console.log(err))
}

function displayItems() {
    axios.get("https://crudcrud.com/api/7f34ab12878c4798ba3f3d9e744207db/Inventory")
        .then((res) => {
            itemlist.innerHTML = ""
            const items = res.data
            items.forEach(i => {
                const li = document.createElement('li')
                li.textContent = `ITEM : ${i.item} , DESCRIPTION : ${i.description} , PRICE : ${i.price} , QUANTITY : ${i.quantity}`
                itemlist.appendChild(li)

                const buy1Btn = document.createElement('button')
                buy1Btn.textContent = "Buy 1"
                buy1Btn.addEventListener('click', () => {
                    updateQuantity(i._id, i.quantity - 1)
                })

                const buy2Btn = document.createElement('button')
                buy2Btn.textContent = "Buy 2"
                buy2Btn.addEventListener('click', () => {
                    updateQuantity(i._id, i.quantity - 2)
                })

                const buy3Btn = document.createElement('button')
                buy3Btn.textContent = "Buy 3"
                buy3Btn.addEventListener('click', () => {
                    updateQuantity(i._id, i.quantity - 3)
                })
                li.appendChild(buy1Btn)
                li.appendChild(buy2Btn)
                li.appendChild(buy3Btn)
            });
        })
}

function updateQuantity(id,quantity){
    axios.put(`https://crudcrud.com/api/7f34ab12878c4798ba3f3d9e744207db/Inventory/${id}`,{quantity:quantity})
        .then(()=>{
            displayItems()
        })
        .catch((err)=>console.log(err))
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
document.addEventListener('DOMContentLoaded', displayItems);
