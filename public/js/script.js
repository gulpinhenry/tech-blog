const hostPrefix = "http://localhost:3000";

var signup = document.getElementById("signup-btn");
var signupForm = document.getElementById("signup-form")

var login = document.getElementById("login-btn");
var loginForm = document.getElementById("login-form");

var logout = document.getElementById("logout-btn");

logout.addEventListener("click", function (event) {
    event.preventDefault();
    fetch(hostPrefix + '/api/users/logout', {
        method: "POST"
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
});

login.addEventListener("click", function (event) {
    event.preventDefault();
    // data to be sent to the POST request
    let postData = {
        username: loginForm.elements[0].value,
        password: loginForm.elements[1].value,
    }

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