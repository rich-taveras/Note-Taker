const notesForm = document.getElementById('notes-form');

// Handle when a user submits notes
notesForm
  .addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the notes text from the DOM and assign it to a variable
    let notes = document.getElementById('notesText').value;
    // Get the username text and add it to a variable
    let email = document.getElementById('notesUsername').value.trim();

    // Create an object with the username and notes
    const newnotes = {
      notes,
      email,
      notesType: 'Complaint',
    };

    // Fetch POST request to the server
    fetch('api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newnotes),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.status);
        email = '';
        notes = '';
      });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
