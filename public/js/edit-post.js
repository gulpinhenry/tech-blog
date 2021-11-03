async function editFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('#title-input').value;
    const content = document.querySelector('#content-input').value;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert('Failed to edit post');
    }
  }
  
  document.querySelector('#edit-form').addEventListener('submit', editFormHandler);