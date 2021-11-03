async function handleForm(event) {
  event.preventDefault();
  const title = document.querySelector("#title-input").value;
  const content = document.querySelector("#content-input").value;
  const user_id = document.querySelector("#userid").innerHTML;
  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      content: content,
      user_id: user_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to add post");
  }
}

document
  .querySelector("#create-post-form")
  .addEventListener("submit", handleForm);
