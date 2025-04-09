fetch('/assets/data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('message').textContent = data.message;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
