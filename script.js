// Select the form element and store it in a variable
const formElement = document.querySelector('#randomCatsForm');
// Select the select element inside the form and store it in a variable
const selectElement = formElement.querySelector('select');

// Select the main tag and store it in a variable
const main = document.querySelector('main');

// Add an event listener to the formElement
formElement.addEventListener('submit', handleSubmit);

function setCategories() {
  const url = 'https://api.thecatapi.com/v1/categories';

  fetch(url)
    // Read and parse the response using the .json() method
    .then(response => response.json())
    // Use the data we got from the API to update the view
    .then(data => {
      // Create a variable to hold all of the category options
      // Use let so we can add on to the options
      let categoryOptions = '<option value="">Any Category</option>';
      // Loop over the data we got
      data.forEach(category => {
        // For each category in the data, create an option and add it to the string
        categoryOptions += `<option value=${category.id}>${category.name}</option>`;
      });
      // Add all of the categoryOptions to the selectElement
      selectElement.innerHTML = categoryOptions;
    });
}

// Create an event handler callback function for the random button
// Add a parameter so we have access to the event
function handleSubmit(event) {
  // Prevent the default form submit behavior
  event.preventDefault();

  // Get the value from the select
  // If there's a value, create the query string
  // If there's not a value, set the query string to an empty string
  const categoryQueryString = selectElement.value
    ? '?category_ids=' + selectElement.value
    : '';

  // Store the url in a variable so the rest of our code is more readable
  const url = `https://api.thecatapi.com/v1/images/search${categoryQueryString}`;

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
      main.innerHTML = `<img src=${data[0].url} alt='Just a random cat picture'>`;
    })
    // Catch any errors and log them
    .catch(console.error);
}

setCategories();
