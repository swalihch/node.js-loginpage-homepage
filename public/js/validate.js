const form = document.querySelector("form");
const username = document.querySelector("input[type = 'text']");
const password = document.querySelector("input[type = 'password']");


form.addEventListener('submit',onSubmitFunction);

function onSubmitFunction(event){
  if (username.value === "" && password.value === ""){
    event.preventDefault();
    alert("please fill the form...");
    return false;
  }
}