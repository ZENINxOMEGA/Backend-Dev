// API Fetch Example using async/await

async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  console.log(data)

}


fetchData()

// API fetch example using promises

function fetchData() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      return response.json();   
    })
    .then((data) => {
      console.log(data);      
    })
    .catch((error) => {
      console.log(error);      
    });
}

fetchData();