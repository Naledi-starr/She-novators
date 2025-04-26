// Sample menu data
const menu = [
    { id: 1, name: "Vegan Burger", price: 65 },
    { id: 2, name: "Coffee", price: 18 },
    { id: 3, name: "Fries", price: 35 },
    { id: 4, name: "Monster", price: 21 },
    { id: 5, name: "Spicy Pizza", price: 65 },
    { id: 6, name: "Chicken Wrap", price: 40 }
];

let currentOrder = [];

// Load menu dynamically
function loadMenu() {
    let menuHtml = "<ul>";
    menu.forEach(item => {
        menuHtml += `<li>${item.name} - R${item.price} 
        <button onclick="addToOrder(${item.id})">Order</button></li>`;
    });
    menuHtml += "</ul>";
    document.getElementById("menu").innerHTML = menuHtml;
}

// Add item to order
function addToOrder(itemId) {
    let item = menu.find(m => m.id === itemId);
    if (item) {
        currentOrder.push(item);
        updateOrderSummary();
    }
}

// Update order summary dynamically
function updateOrderSummary() {
    let orderHtml = "<ul>";
    let total = 0;
    currentOrder.forEach(item => {
        orderHtml += `<li>${item.name} - R${item.price}</li>`;
        total += item.price;
    });
    orderHtml += `</ul><h3>Total: R${total.toFixed(2)}</h3>`;
    document.getElementById("orderSummary").innerHTML = orderHtml;
}

// Process payment
function processPayment() {
    let method = document.getElementById("paymentMethod").value;
    let studentId = document.getElementById("studentId").value;

    if (method === "Food credits" && studentId === "") {
        document.getElementById("confirmationMessage").innerText = "❌ Please enter your student ID.";
        return;
    }

    let total = currentOrder.reduce((sum, item) => sum + item.price, 0);
    let pickupCode = Math.floor(1000 + Math.random() * 9000);

    document.getElementById("confirmationMessage").innerText = `✅ Payment Successful! Pickup Code: #${pickupCode}`;
}


   
    


