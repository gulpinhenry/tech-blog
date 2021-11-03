async function commentHandler(event) {
    event.preventDefault();
    const post_id = document.querySelector('#pid').innerHTML;
    const comment_text = document.querySelector('#comment-text').value;
    const user_id = document.querySelector('#uid').innerHTML;
    console.log(user_id+ "\n\n")
    console.log("hi")
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        comment_text: comment_text,
        user_id: user_id,
        post_id: post_id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert('Failed to add comment');
    }
  }
  
  document.querySelector('#comment-form').addEventListener('submit', commentHandler);