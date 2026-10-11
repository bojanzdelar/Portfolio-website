const form = document.querySelector(".contact-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const submitButton = form.querySelector("#sendMessage");
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending… <span aria-hidden="true">↗</span>';

  try {
    const response = await fetch("https://formsubmit.co/ajax/bojan@zdelar.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        Name: form.querySelector("#name").value.trim(),
        Email: form.querySelector("#email").value.trim(),
        Message: form.querySelector("#message").value.trim(),
      }),
    });
    if (!response.ok) throw new Error("Message service returned an error.");
    const result = await response.json();
    if (result.success === "false" || result.success === false) {
      throw new Error("Message was not accepted.");
    }
    window.alert("Message sent — thank you!");
    form.reset();
    form.classList.remove("was-validated");
  } catch (error) {
    console.error(error);
    window.alert("Something went wrong. Please try again or email bojan@zdelar.com directly.");
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
  }
});
