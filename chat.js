const predefinedResponses = {
    "hello"  :  "Hello! How can I assist you today?",
    "recommend a meal": "I suggest trying our Spicy Pizza! 🍕",
    "goodbye": "Goodbye! Have a great day. 😊",
    "give me something spicy": "🔥 Sure! Here's a spicy meal suggestion:\n\n🌶 **Spicy Chicken Wrap** - Grilled chicken with hot chili sauce, fresh veggies, and a hint of lime.\n🥘 **Fiery Tofu Stir-Fry** - Tofu cubes tossed with Szechuan sauce & red chilies.\n🍕 **Mexican Spicy Pizza** - Loaded with jalapeños, pepperoni, and a smoky chipotle base.",
    "i'm on a diet, please make a meal plan for me": "✅ Absolutely! Here’s a detailed meal plan for a balanced diet:\n\n🥗 **Breakfast:** Greek yogurt with chia seeds, honey, and fresh fruit.\n🥦 **Lunch:** Grilled salmon with steamed broccoli & quinoa.\n🍲 **Dinner:** Mixed vegetable stir-fry with tofu and brown rice.\n🥜 **Snacks:** Almonds, hummus with carrots, or fresh smoothies."
};

function sendMessage() {
    const userMessage = document.getElementById("chatInput").value.toLowerCase().trim(); // Convert to lowercase for matching
    if (userMessage === "") return;

    const messageDiv = document.createElement("p");
    messageDiv.textContent = `You: ${userMessage}`;
    document.getElementById("chatMessages").appendChild(messageDiv);
    document.getElementById("chatResponses").appendChild(messageDiv);


    document.getElementById("chatInput").value = ""; // Clear input box

    // Check if there's a predefined response
    const botResponse = predefinedResponses[userMessage] || "I don't have an answer for that, but I'm here to help!";

    let index = 0;
    const responseDiv = document.createElement("p");
    responseDiv.textContent = "🤖 ChefBot is typing...";
    document.getElementById("chatMessages").appendChild(responseDiv);

    function typeEffect() {
        if (index < botResponse.length) {
            responseDiv.textContent = botResponse.substring(0, index);
            index++;
            setTimeout(typeEffect, 40); // Adjust speed (40ms per character)
        }
    }
    
    setTimeout(typeEffect, 800); // Delay before typing starts (800ms)
}
