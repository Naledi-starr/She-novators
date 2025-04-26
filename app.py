import time
from flask import Flask, request, jsonify, render_template
import random
import os
import google.generativeai as genai

app = Flask(__name__)

# --- Food Menu ---
menu = [
    {"id": 1, "name": "Vegan Burger", "price": 65},
    {"id": 2, "name": "Coffee", "price": 18},
    {"id": 3, "name": "Fries", "price": 35},
    {"id": 4, "name": "Monster", "price": 21},
    {"id": 5, "name": "Spicy Pizza", "price": 65},
    {"id": 6, "name": "Chicken Wrap", "price": 40}
]

# --- Student Credit Balance ---
student_credits = {
    "ST10492795": 235.00  # Example student balance
}

# Store order details globally
current_order = {}

# --- Homepage ---
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

# --- Get Menu ---
@app.route('/menu', methods=['GET'])
def get_menu():
    return jsonify(menu)

# --- Order Processing ---
@app.route('/order', methods=['POST'])
def process_order():
    global current_order
    order_data = request.json
    selected_ids = order_data.get("item_ids", [])

    ordered_items = [item for item in menu if item["id"] in selected_ids]
    if not ordered_items:
        return jsonify({"error": "Invalid items"}), 400

    total = sum(item["price"] for item in ordered_items)
    current_order = {"items": ordered_items, "total": round(total, 2)}

    return jsonify(current_order)

# --- Order Summary ---
@app.route('/order_summary', methods=['GET'])
def order_summary():
    return jsonify(current_order)

# --- Payment Processing ---
@app.route('/pay', methods=['POST'])
def process_payment():
    global current_order
    payment_data = request.json
    method = payment_data.get("method")
    total = payment_data.get("total")
    student_id = payment_data.get("student_id", "")

    if method == "Food credits":
        balance = student_credits.get(student_id, 0)
        if balance >= total:
            student_credits[student_id] -= total
            pickup_code = random.randint(1000, 9999)
            return jsonify({"status": "Payment successful", "remaining_balance": balance - total, "pickup_code": pickup_code})
        return jsonify({"error": "Not enough credits"}), 400
    
    elif method in ["Card", "Cash"]:
        pickup_code = random.randint(1000, 9999)
        return jsonify({"status": "Payment successful", "pickup_code": pickup_code})

    return jsonify({"error": "Invalid payment method"}), 400

# --- Cafeteria Notifications ---
@app.route('/select_item', methods=['POST'])
def select_item():
    selected_ids = request.json.get('selected_ids', [])
    
    if not selected_ids:
        return jsonify({"error": "No items selected"}), 400
    
    summary = process_order({"item_ids": selected_ids})

    time.sleep(15)  # Simulate delay

    response = {
        "show_notification": True,
        "message": "⚠️ The cafeteria is currently full. Orders may be delayed.",
        "order_summary": summary
    }
    
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
