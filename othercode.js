





#restaurants {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Table headers */
#restaurants th {
  background-color: #222831;
  color: #eeeeee;
  text-align: left;
  padding: 12px;
  font-size: 1rem;
  letter-spacing: 0.5px;
}

/* Table rows */
#restaurants td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 0.95rem;
}

/* Hover effect on rows */
#restaurants tr:hover {
  background-color: #f5f5f5;
  transition: 0.2s ease-in-out;
}

/* Zebra stripe */
#restaurants tr:nth-child(even) {
  background-color:rgb(133, 6, 59);
}

/* Responsive: make table scrollable on small screens */
@media (max-width: 768px) {
  #restaurants {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}







// old code unnecessary routes and tests
// router.on({
//   "/": () => render(),
//   // The :view slot will match any single URL segment that appears directly after the domain name and a slash
//   "/:view": function(match) {
//     // If URL is '/about-me':
//     // match.data.view will be 'about-me'
//     // Using Lodash's camelCase to convert kebab-case to camelCase:
//     // 'about-me' becomes 'aboutMe'
//     const view = match?.data?.view ? camelCase(match.data.view) : "home";

//     // If the store import/object has a key named after the view
//     if (view in store) {
//       // Then the invoke the render function using the view state, using the view name
//       render(store[view]);
//     } else {
//       // If the store
//       render(store.viewNotFound);
//       console.log(`View ${view} not defined`);
//     }
//     // Now we can use viewName to find the correct state in our store
//     // If viewName is 'aboutMe', it will look for store.aboutMe (not needed)
//     const state = store[view];

//     // Finally, render the page with the state (not needed)
//     render(state);
//   },
// });

// // adding one route
// router.on("/", () => console.log("Visiting Home Page")).resolve();

// // adding more than one route
// router.on({
//   routeOne: () => console.log("Visiting Route One"),
//   routeTwo: () => console.log("Visiting Route Two"),
// });

// router.on(":x", defaultParam => defaultParam);
// // returns:
// // {x: "<route entered in URL>"}

// // When the route http://localhost:1234/home is hit then match.data.view will return "home"
// router.on(":view", match => match.data.view);
// // returns:
// // "<route entered in URL>"







// // Function to fetch a random meal
// const fetchRandomMeal = () => {
//   axios
//     .get("https://www.themealdb.com/api/json/v1/1/random.php")
//     .then(response => {
//       // This is where we process the meal data
//       const meal = response.data.meals[0];
//       console.log(meal); // Log the meal data to the console for now

//       // Call a function to display the meal on the page (you'll create this next)
//       displayRandomMeal(meal);
//     })
//     .catch(error => {
//       console.error("Error fetching random meal:", error);
//     });
// };

// // Function to display the meal data on your page
// const displayRandomMeal = meal => {
//   const mealContainer = document.querySelector("#meal-container");

//   // Example of how you could structure the HTML for displaying the meal
//   mealContainer.innerHTML = `
//     <h2>${meal.strMeal}</h2>
//     <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
//     <p><strong>Category:</strong> ${meal.strCategory}</p>
//     <p><strong>Area:</strong> ${meal.strArea}</p>
//     <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
//     <a href="${meal.strSource}" target="_blank">Recipe Source</a>
//   `;
// };

// // Call fetchRandomMeal on page load or based on a trigger
// document.addEventListener("DOMContentLoaded", () => {
//   fetchRandomMeal(); // Fetch a random meal when the page loads
// });
