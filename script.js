const store4SiteForm = {
  step: 1,
};

function detect4SiteForm() {
  document
    .querySelector("button.openForm")
    .addEventListener("click", reOpenForm);

  let cookie = document.cookie;

  if (!cookie.includes("4sitecontactform=finished")) {
    let box = document.createElement("aside");
    box.setAttribute("class", "contact_form_4site");

    let close = document.createElement("a");
    close.setAttribute("href", "#");
    close.innerText = "x";
    close.addEventListener("click", closeBox);
    box.appendChild(close);

    document.querySelector("body").appendChild(box);

    renderBox();
  }
}

function renderBox() {
  if (store4SiteForm.step === 1) {
    renderStepOne();
  } else if (store4SiteForm.step === 2) {
    renderStepTwo();
  } else {
    renderConfirmation();
  }
}

function renderStepOne() {
  document.querySelector(".contact_form_4site").classList.add("stepOne");

  let heading = document.createElement("h2");
  heading.innerText = "Tortor neque egestas";
  document.querySelector(".contact_form_4site").appendChild(heading);

  let p = document.createElement("p");
  p.innerText =
    "Quisque sit amet est et spaien ullamcorpoer pharetra. Vestibulum erat wisi, condimentum";
  document.querySelector(".contact_form_4site").appendChild(p);

  let button = document.createElement("button");
  button.innerText = "subscribe";
  button.addEventListener("click", subscribeClick);
  document.querySelector(".contact_form_4site").appendChild(button);
}

function renderStepTwo() {
  document.querySelector(".contact_form_4site").classList.remove("stepOne");
  document.querySelector(".contact_form_4site").classList.add("stepTwo");

  let form = document.createElement("form");
  form.addEventListener("submit", formSubmit);

  let first = document.createElement("input");
  first.type = "text";
  first.name = "first";
  first.placeholder = "Your First Name";
  first.required = true;
  form.appendChild(first);

  let last = document.createElement("input");
  last.type = "text";
  last.name = "last";
  last.placeholder = "Your Last Name";
  form.appendChild(last);

  let email = document.createElement("input");
  email.type = "email";
  email.name = "email";
  email.placeholder = "Your Email Address";
  email.required = true;
  form.appendChild(email);

  let country = document.createElement("select");
  country.name = "country";
  country.required = true;

  let countries = {
    BR: "Brazil",
    CA: "Canada",
    USA: "United States of America",
  };

  for (const c in countries) {
    let option = document.createElement("option");
    option.value = c;
    option.innerText = countries[c];
    country.appendChild(option);
  }

  form.appendChild(country);

  let submit = document.createElement("button");
  submit.type = "submit";
  submit.innerText = "subscribe";
  form.appendChild(submit);

  document.querySelector(".contact_form_4site button").remove();
  document.querySelector(".contact_form_4site p").replaceWith(form);
}

function renderConfirmation() {
  document.querySelector(".contact_form_4site").classList.remove("stepTwo");
  document.querySelector(".contact_form_4site").classList.add("stepThree");

  document.querySelector(".contact_form_4site h2").innerText =
    "you're signed up.";

  let p = document.createElement("p");
  p.innerText =
    "Keep an eye on your inbox to learn more about ways you can create a better world.";

  document.querySelector(".contact_form_4site form").replaceWith(p);

  //   $(".contact_form_4site").html(`
  //     <a href="#">x</a>
  //       <h2>you're signed up.</h2>
  //       <p>Keep an eye on your inbox to learn more about ways you can create a better world.</p>
  //   `);
}

function subscribeClick() {
  store4SiteForm.step = 2;
  renderBox();
}

function formSubmit(e) {
  e.preventDefault();
  var formdata = new FormData();
  formdata.append("first_name", e.target.first.value);
  formdata.append("last_name", e.target.last.value);
  formdata.append("email", e.target.email.value);
  formdata.append("country", e.target.country.value);

  fetch("https://apps.4sitestudios.com/fernando/tj/api.php", {
    method: "POST",
    body: formdata,
    redirect: "follow",
  }).then((res) => {
    if (!res.ok) {
      let error = document.createElement("p");
      error.classList.add("error");
      error.innerText =
        "There was a problem submitting, please correct and try again";
      document.querySelector(".contact_form_4site form").appendChild(error);
    } else {
      document.cookie = "4sitecontactform=finished";
      store4SiteForm.step = 3;
      renderBox();
    }
  });
}

function closeBox(e) {
  e.preventDefault();
  document.cookie = "4sitecontactform=finished";
  document.querySelector(".contact_form_4site").remove();
}

function reOpenForm() {
  document.cookie = "4sitecontactform=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  store4SiteForm.step = 1;
  detect4SiteForm();
}

detect4SiteForm();