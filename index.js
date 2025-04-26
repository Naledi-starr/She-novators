// Fetch and display menu items dynamically
function fetchMenu() {
    fetch("/menu")
    .then(response => response.json())
    .then(data => {
        let menuHtml = "<ul>";
        data.forEach(item => {
            menuHtml += `<li>${item.name} - R${item.price} 
            <button onclick="placeOrder(${item.id})">Order</button></li>`;
        });
        menuHtml += "</ul>";
        document.getElementById("menu").innerHTML = menuHtml;
    });
}

// Handle order placement & display notification
function placeOrder(itemId) {
    fetch("/select_item", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"selected_ids": [itemId]})
    })
    .then(response => response.json())
    .then(data => {
        if (data.show_notification) {
            let notification = document.getElementById("notification");
            notification.innerText = data.message;
            notification.style.display = "block";
        }
    });
}
