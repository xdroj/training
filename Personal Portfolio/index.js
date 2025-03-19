document.addEventListener("DOMContentLoaded", function () {
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

    // Listen for scroll events and trigger animation
    window.addEventListener("scroll", optimizedRevealProjects);
    
    // Run once on page load to reveal already visible projects
    revealProjects();
});

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("your_public_key"); // Initialize EmailJS

    document.getElementById("contact-form").addEventListener("submit", function (event) {
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

        this.reset(); // Clear form after sending
    });
});
