window.loadApiKey = () => {
  return fetch('/.env')
    .then(response => response.text())
    .then(text => {
      const lines = text.split('\n');
      for (const line of lines) {
        const [key, value] = line.split('=');
        if (key === 'GEMINI_API_KEY') {
          window.GEMINI_API_KEY = value.trim();
        }
      }
    })
    .catch(error => {
      console.error('Failed to load API key:', error);
      // Fallback: try to get from server
      return fetch('http://localhost:3000/api/key')
        .then(response => response.json())
        .then(data => {
          window.GEMINI_API_KEY = data.key;
        })
        .catch(err => console.error('Fallback API key load failed:', err));
    });
};
