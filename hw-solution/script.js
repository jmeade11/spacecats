// Select the random button and store it in a variable
const randomButton = document.querySelector('.randomButton');

// Add an event listener to the random button
randomButton.addEventListener('click', handleRandomButton);

// Create an event handler callback function for the random button
function handleRandomButton() {
  // Store the url in a variable so the rest of our code is more readable
  const url = 'https://api.thecatapi.com/v1/images/search';

  // Make a GET request to the API
  fetch(url, {
    // Set the headers option to pass the API key
    headers: {
      'x-api-key': '996ceed0-6918-4ca2-8231-62cfa41567d5'
    }
  })
    // Read and parse the response using the .json() method
    .then(response => response.json())
    // Use the data we got from the API to update the view
    .then(data => {
      const catImage = document.querySelector('.randomCatImage');
      catImage.src = data[0].url;
      catImage.alt = 'Just a random cat picture';
    })
    // Catch any errors and log them
    .catch(console.error);
}

// Select the search button and store it in a variable
const searchButton = document.querySelector('.searchButton');

// Add an event listener to the search button
searchButton.addEventListener('click', handleSearch);

// Create an event handler callback function for the search button
// Add a parameter so we have access to the event
function handleSearch(event) {
  // The button is in a form, so we have prevent the default form submit behavior
  event.preventDefault();

  // Get the value of the input
  const userInput = document.querySelector('.input').value;
  // Construct the url by appending the user's selection to it
  const url = `https://api.thecatapi.com/v1/images/search?category_ids=${userInput}`;
  //

  // Make a GET request to the API
  fetch(url, {
    headers: {
      'x-api-key': '996ceed0-6918-4ca2-8231-62cfa41567d5'
    }
  })
    // Read and parse the response using the .json() method
    .then(response => response.json())
    // Use the data we got from the API to update the view
    .then(data => {
      const catImage = document.querySelector('.categoryCatImage');
      // If there is data, display the image otherwise display no-cats-here image
      catImage.src = data.length ? data[0].url : 'no-cats-here.png';
      catImage.alt = data.length
        ? `A random cat from the ${data[0].categories[0].name} category`
        : 'No Cats Found';
      document.querySelector('form').reset();
    })
    // Catch any errors and log them
    .catch(console.error);
}
