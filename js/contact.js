const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  form.classList.remove("was-validated");

  sendMail();
  resetForm();
});

const resetForm = () => {
  document.querySelectorAll("input, textarea").forEach((input) => {
    input.value = "";
  });
};

const sendMail = async () => {
  try {
    await fetch("https://formsubmit.co/ajax/bojan@zdelar.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: form.querySelector("#name").value,
        Email: form.querySelector("#email").value,
        Message: form.querySelector("#message").value,
      }),
    });
    window.alert("Message sent!");
  } catch {
    window.alert("Something went wrong. Please try again later!");
  }
};
