document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display entries
    fetchEntries();
  
    // Add Entry Button
    const addEntryBtn = document.getElementById('addEntryBtn');
    addEntryBtn.addEventListener('click', () => {
      const content = prompt('Enter content for the clipboard:');
      if (content) {
        addEntry(content);
      }
    });
  });
  
  // Fetch entries
  async function fetchEntries() {
    try {
      const response = await fetch('/api/entries'); // Using relative URL
      const data = await response.json();
      displayEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  }
  
  // Display entries
  function displayEntries(entries) {
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = ''; // Clear existing entries
    entries.forEach(entry => {
      const entryDiv = document.createElement('div');
      entryDiv.innerHTML = `<p>${entry.content}</p>`;
      entriesDiv.appendChild(entryDiv);
    });
  }
  
  // Add entry with image handling
  async function addEntry(content) {
    try {
      // Get file input element
      const fileInput = document.getElementById('imageUpload');
      const imageFile = fileInput.files[0]; // Get the selected image file
  
      // Prepare the form data
      const formData = new FormData();
      formData.append('content', content); // Append text content
      if (imageFile) {
        formData.append('image', imageFile); // Append image file if selected
      }
  
      // Make POST request with FormData
      const response = await fetch('/api/entries', { // Using relative URL
        method: 'POST',
        body: formData, // Send form data
      });
  
      if (!response.ok) throw new Error('Failed to add entry');
  
      const newEntry = await response.json();
      console.log('Entry added:', newEntry);
  
      // Refresh entries
      fetchEntries();
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  }
  