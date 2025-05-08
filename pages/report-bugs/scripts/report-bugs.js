document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("bugReportForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const serverInput = document.getElementById("server");
  const descriptionInput = document.getElementById("bugDescription");
  const followUpCheckbox = document.getElementById("followUp");
  const usernameError = document.getElementById("username-error");
  const emailError = document.getElementById("email-error");
  const serverError = document.getElementById("server-error");
  const descriptionError = document.getElementById("description-error");

  let checkboxError = document.getElementById("followUp-error");
  if (!checkboxError) {
    checkboxError = document.createElement("div");
    checkboxError.id = "followUp-error";
    checkboxError.className = "error-message";
    document.querySelector(".checkbox-group").appendChild(checkboxError);
  }

  const popup = document.createElement("div");
  popup.className = "octagon-popup";
  popup.innerHTML =
    '<div class="octagon-content">Thank you! Your report has been submitted.</div>';
  popup.style.display = "none";
  document.body.appendChild(popup);

  descriptionInput.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
    if (this.scrollHeight > 300) {
      this.style.overflowY = "auto";
    } else {
      this.style.overflowY = "hidden";
    }
  });

  function validateUsername() {
    if (usernameInput.value.trim() === "") {
      usernameInput.classList.add("error");
      usernameError.textContent = "Username cannot be blank";
      return false;
    }
    usernameInput.classList.remove("error");
    usernameError.textContent = "";
    return true;
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    if (email === "") {
      emailInput.classList.add("error");
      emailError.textContent = "Email cannot be blank";
      return false;
    }
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");
    if (
      atIndex <= 0 ||
      dotIndex <= atIndex + 1 ||
      dotIndex === email.length - 1 ||
      email[atIndex + 1] === "."
    ) {
      emailInput.classList.add("error");
      emailError.textContent = "Please enter a valid email";
      return false;
    }
    emailInput.classList.remove("error");
    emailError.textContent = "";
    return true;
  }

  function validateServer() {
    if (serverInput.value === "") {
      serverInput.classList.add("error");
      serverError.textContent = "Please select a server region";
      return false;
    }
    serverInput.classList.remove("error");
    serverError.textContent = "";
    return true;
  }

  function validateDescription() {
    if (descriptionInput.value.trim() === "") {
      descriptionInput.classList.add("error");
      descriptionError.textContent = "Description cannot be blank";
      return false;
    } else if (descriptionInput.value.trim().length < 20) {
      descriptionInput.classList.add("error");
      descriptionError.textContent =
        "Description must be at least 20 characters";
      return false;
    }
    descriptionInput.classList.remove("error");
    descriptionError.textContent = "";
    return true;
  }

  function validateCheckbox() {
    if (!followUpCheckbox.checked) {
      checkboxError.textContent =
        "Please check the box to receive email notifications.";
      document.querySelector(".checkbox-group").classList.add("error");
      return false;
    }
    checkboxError.textContent = "";
    document.querySelector(".checkbox-group").classList.remove("error");
    return true;
  }

  usernameInput.addEventListener("blur", validateUsername);
  emailInput.addEventListener("blur", validateEmail);
  serverInput.addEventListener("change", validateServer);
  descriptionInput.addEventListener("blur", validateDescription);
  followUpCheckbox.addEventListener("change", validateCheckbox);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isServerValid = validateServer();
    const isDescriptionValid = validateDescription();
    const isCheckboxValid = validateCheckbox();

    if (
      isUsernameValid &&
      isEmailValid &&
      isServerValid &&
      isDescriptionValid &&
      isCheckboxValid
    ) {
      popup.style.display = "flex";
      form.reset();
      descriptionInput.style.height = "auto";
      document
        .querySelectorAll(".error")
        .forEach((el) => el.classList.remove("error"));
      document
        .querySelectorAll(".error-message")
        .forEach((el) => (el.textContent = ""));
      document.querySelector(".checkbox-group").classList.remove("error");
      setTimeout(() => {
        popup.style.display = "none";
      }, 5000);
    }
  });
});
