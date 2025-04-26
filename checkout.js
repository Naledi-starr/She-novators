document.addEventListener("DOMContentLoaded", () => {
    fetch("/order_summary")
        .then(response => response.json())
        .then(data => {
            let summaryHtml = "<h3>Your Order:</h3><ul>";
            data.items.forEach(item => {
                summaryHtml += `<li>${item.name} - R${item.price}</li>`;
            });
            summaryHtml += `</ul><h3>Total: R${data.total.toFixed(2)}</h3>`;
            document.getElementById("orderSummary").innerHTML = summaryHtml;
        });
});

function processPayment() {
    let method = document.getElementById("paymentMethod").value;
    let studentId = document.getElementById("studentId").value;

    let paymentData = { method: method, total: parseFloat(document.querySelector("#orderSummary h3").textContent.split("R")[1]) };
    if (method === "Food credits") paymentData.student_id = studentId;

    fetch("/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("confirmationMessage").innerText = ` ${data.error}`;
        } else {
            document.getElementById("confirmationMessage").innerText = `Payment Successful! Pickup Code: #${data.pickup_code}`;
        }
    });
}
