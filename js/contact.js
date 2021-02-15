const form = document.querySelector('form');

const validateForm = event => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    sendMail(form);

    inputs = document.querySelectorAll("input, textarea");
    Array.prototype.slice.call(inputs).forEach(input => {
        input.value = "";
    });

    form.classList.remove('was-validated');
};

const sendMail = form => {
    const data = {
        Name: form.querySelector("#name").value,
        Email: form.querySelector("#email").value,
        Message: form.querySelector("#message").value
    }

    const request = new XMLHttpRequest();
    request.open("POST", "https://formsubmit.co/ajax/bojan@zdelar.com", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
};

form.addEventListener('submit', validateForm, false);