function validateForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const form = document.querySelector("form");
    const errorElement = document.getElementById("error");

    form.addEventListener("submit", (e) => {
        let messages = [];

        if (!name.value || name.value.trim() === "") {
            messages.push("Name is required");
        }

        if (!email.value || email.value.trim() === "") {
            messages.push("Email is required");
        }

        if (messages.length > 0) {
            e.preventDefault();
            errorElement.innerText = messages.join(", ");
        } else {
            errorElement.innerText = "";
        }
    });
}

validateForm();