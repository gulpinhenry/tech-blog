async function deleteFormHandler(event) {
    event.preventDefault();
    console.log("hi mwah");
    const id =  document.querySelector("#postid").innerHTML;
    
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert('Failed to delete article');
    }
  }
  document.querySelector('#delete-btn').addEventListener('click', deleteFormHandler);