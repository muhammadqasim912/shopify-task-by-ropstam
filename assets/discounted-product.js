    var countdownDate = new Date();
    countdownDate.setHours(countdownDate.getHours() + parseInt("{{ section.settings.timer_duration | split: ":" | first }}"));
    countdownDate.setMinutes(countdownDate.getMinutes() + parseInt("{{ section.settings.timer_duration | split: ":" | second }}"));
    countdownDate.setSeconds(countdownDate.getSeconds() + parseInt("{{ section.settings.timer_duration | split: ":" | last }}"));

    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countdownDate - now;

        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "EXPIRED";
            document.getElementById("discounted-product-section").style.display = "none"; // Hide the section when timer expires
        }
    }, 1000);

    document.getElementById("add-to-cart-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var formData = new FormData(this);

        fetch("/cart/add.js", {
            method: "POST",
            body: formData
        }).then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to add product to cart");
            }
        }).then(function(data) {
            console.log("Product added to cart:", data);
            // Optionally, redirect to the cart page or display a success message
        }).catch(function(error) {
            console.error("Error adding product to cart:", error);
        });
    });
