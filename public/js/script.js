const hostPrefix = "http://localhost:3000";

var signup = document.getElementById("signup-btn");
var signupForm = document.getElementById("signup-form")

var login = document.getElementById("login-btn");
var loginForm = document.getElementById("login-form");

login.addEventListener("click", function (event) {
    event.preventDefault();
    // data to be sent to the POST request
    let postData = {
        username: loginForm.elements[0].value,
        password: loginForm.elements[1].value,
    }

    console.log(postData);
    console.log(JSON.stringify(postData));

    fetch(hostPrefix + '/api/users/login', {
        method: "POST",
        body: JSON.stringify(postData),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
});

signup.addEventListener("click", function (event) {
    event.preventDefault();

});