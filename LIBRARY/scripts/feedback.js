/**
 * This script is called when user clicks on feedback button.
 */

function onFeedback() {
  hide = 0; // used for showing and hiding password.
  let fSet = document.createElement("fieldset");
  let legend = document.createElement("legend");
  legend.textContent = "Feedback";
  let user_nameInput = document.createElement("input");
  user_nameInput.setAttribute("form", "inputsForm");
  user_nameInput.setAttribute("placeholder", "name");
  user_nameInput.setAttribute("name", "username");
  user_nameInput.setAttribute("type", "text");
  user_nameInput.setAttribute("id", "username");
  user_nameInput.setAttribute("class", "accountform");
  let user_emailInput = document.createElement("input");
  user_emailInput.setAttribute("form", "inputsForm");
  user_emailInput.setAttribute("placeholder", "email");
  user_emailInput.setAttribute("name", "useremail");
  user_emailInput.setAttribute("type", "email");
  user_emailInput.setAttribute("id", "useremail");
  user_emailInput.setAttribute("class", "accountform");
  let user_sectorInput = document.createElement("textArea");
  user_sectorInput.setAttribute("form", "inputsForm");
  user_sectorInput.setAttribute(
    "placeholder",
    "suggestions/bug reports/Applause"
  );
  user_sectorInput.setAttribute("name", "usersector");
  user_sectorInput.setAttribute("class", "accountform");
  user_sectorInput.setAttribute("id", "textA");
  //user_sectorInput.setAttribute('rows','10');
  //user_sectorInput.setAttribute('cols','100');
  let acceptAccount = document.createElement("button");
  acceptAccount.setAttribute("value", "send");
  acceptAccount.textContent = "send";
  acceptAccount.setAttribute("id", "acceptbutton");
  acceptAccount.setAttribute("form", "inputsForm");
  acceptAccount.setAttribute("class", "lowerbuts");
  let buttonDiv = document.createElement("div"); // div for holding account buttons.
  buttonDiv.setAttribute("id", "butdiv");
  buttonDiv.appendChild(acceptAccount);
  let inputsForm = document.createElement("form"); // form for holding input elements
  inputsForm.setAttribute("id", "inputsForm");
  inputsForm.setAttribute("action", "userInfoservlet");
  inputsForm.setAttribute("method", "post");
  fSet.appendChild(legend);
  fSet.appendChild(user_nameInput);
  fSet.appendChild(document.createElement("br"));
  fSet.appendChild(user_emailInput);
  fSet.appendChild(document.createElement("br"));
  fSet.appendChild(user_sectorInput);
  fSet.appendChild(document.createElement("br"));
  inputsForm.appendChild(fSet);
  let inputsDiv = document.createElement("div"); // div for holding form
  inputsDiv.setAttribute("id", "inputsDiv1");
  inputsDiv.appendChild(inputsForm);
  let headerDiv = document.createElement("div"); // header to hold a header and cross.
  headerDiv.setAttribute("id", "headerDiv");
  let headLabel = document.createElement("label");
  headLabel.setAttribute("id", "headLabel");
  let headText = document.createTextNode(
    "Let's Hear from you, Pal. Your suggestions will help us better our services "
  );
  headLabel.appendChild(headText);
  let divTo = document.querySelector("#contentbody");
  let db = document.getElementById("accountDiv2");
  if (db) {
    divTo.removeChild(db);
  }
  let headCancel = document.createElement("button");
  headCancel.setAttribute("id", "headCancel");
  headCancel.addEventListener(
    "click",
    () => {
      inputsForm.removeAttribute("action");
      divTo.removeChild(accountDiv);
    },
    false
  );
  let cancelText = document.createTextNode("x");
  headCancel.appendChild(cancelText);
  headerDiv.appendChild(headLabel);
  headerDiv.appendChild(headCancel);
  let accountDiv = document.createElement("div"); // content div.
  accountDiv.setAttribute("id", "accountDiv");
  accountDiv.appendChild(headerDiv);
  accountDiv.appendChild(inputsDiv);
  accountDiv.appendChild(buttonDiv);
  divTo.appendChild(accountDiv);
  acceptAccount.addEventListener("click", sendEmail, false);
}
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  document.head.append(script);
  script.onload = () => callback();
}

/*this functions needs to be changed */
function sendEmail() {
  let name = document.getElementById("username").value;
  let email = document.getElementById("useremail").value;
  let suggest = document.getElementById("textA").value;
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "your@gmail.com",
    Password: "password" /*change this to your  elastic email password */,
    To: "receiver@gmail.com",
    From: "your@gmail.com",
    Subject: "{KINGFLOW FEEDBACK}",
    Body:
      "User Name : " +
      name +
      "<br>" +
      "User Email : " +
      email +
      "<br>" +
      "Feedback " +
      suggest,
  }).then((message) =>
    alert(
      message + ": message sent successfully, we will get back to you shortly"
    )
  );
  let divTo = document.querySelector("#contentbody");
  document.getElementById("accountDiv");
  divTo.removeChild(accountDiv);
}
