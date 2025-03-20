document.addEventListener("DOMContentLoaded", function () {
    // 📌 Select Menu Elements
    const menuToggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector(".nav-list");

    if (menuToggle && navList) {
        // ✅ Toggle Menu When Clicking Button
        menuToggle.addEventListener("click", function () {
            navList.classList.toggle("active");
        });

        // ✅ Close Menu When Clicking Outside
        document.addEventListener("click", function (event) {
            if (!menuToggle.contains(event.target) && !navList.contains(event.target)) {
                navList.classList.remove("active");
            }
        });
    }

    // 📌 Project Tiles Scroll Animation
    const tiles = document.querySelectorAll(".project-tile");

    function revealProjects() {
        tiles.forEach(tile => {
            if (tile.getBoundingClientRect().top < window.innerHeight - 100) {
                tile.classList.add("show");
            }
        });
    }

    // Debounce function to improve performance
    function debounce(func, delay) {
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(func, delay);
        };
    }

    // Optimize scrolling performance
    const optimizedRevealProjects = debounce(revealProjects, 100);
    window.addEventListener("scroll", optimizedRevealProjects);
    revealProjects(); // Run once on page load

    // 📌 Contact Form EmailJS Integration
    if (typeof emailjs !== "undefined") {
        emailjs.init("your_public_key"); // Initialize EmailJS

        const contactForm = document.getElementById("contact-form");

        if (contactForm) {
            contactForm.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent page refresh

                const formData = {
                    name: this.name.value,
                    email: this.email.value,
                    message: this.message.value
                };

                emailjs.send("your_service_id", "your_template_id", formData)
                    .then(function () {
                        alert("Message sent successfully!");
                    }, function (error) {
                        alert("Failed to send message. Please try again.");
                        console.log(error);
                    });

                this.reset(); 
            });
        }
    }
}); 
