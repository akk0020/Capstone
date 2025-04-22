import { header, nav, main, footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { camelCase } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector("#root").innerHTML = `
      ${header(state)}
      ${nav(store.nav)}
      ${main(state)}
      ${footer()}
    `;
  attachNavToggle();
}
function attachNavToggle() {
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
}

// Function to fetch a random meal
const fetchRandomMeal = () => {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => {
      // This is where we process the meal data
      const meal = response.data.meals[0];
      console.log(meal); // Log the meal data to the console for now

      // Call a function to display the meal on the page (you'll create this next)
      displayRandomMeal(meal);
    })
    .catch(error => {
      console.error("Error fetching random meal:", error);
    });
};

// Function to display the meal data on your page
const displayRandomMeal = meal => {
  const mealContainer = document.querySelector("#meal-container");

  // Example of how you could structure the HTML for displaying the meal
  mealContainer.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <p><strong>Category:</strong> ${meal.strCategory}</p>
    <p><strong>Area:</strong> ${meal.strArea}</p>
    <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
    <a href="${meal.strSource}" target="_blank">Recipe Source</a>
  `;
};

// Call fetchRandomMeal on page load or based on a trigger
document.addEventListener("DOMContentLoaded", () => {
  fetchRandomMeal(); // Fetch a random meal when the page loads
});

router.hooks({
  // We pass in the `done` function to the before hook handler to allow the function to tell Navigo we are finished with the before hook.
  // The `match` parameter is the data that is passed from Navigo to the before hook handler with details about the route being accessed.
  // https://github.com/krasimir/navigo/blob/master/DOCUMENTATION.md#match
  before: (done, match) => {
    // We need to know what view we are on to know what data to fetch
    const view = match?.data?.view ? camelCase(match.data.view) : "home";
    // Add a switch case statement to handle multiple routes
    switch (view) {
      // Add a case for each view that needs data from an API
      // New Case for the Home View
      case "home":
        // Get request to retrieve the current weather data using the API key and providing a city name
        axios
          .get(`${process.env.API_URL}/status`)
          .then(response => {
            console.log("response.data", response.data);

            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        break;

        // New Axios get request utilizing already made environment variable
        axios
          .get(`${process.env.API_URL}/restaurants`)
          .then(response => {
            // Storing retrieved data in state
            // The dot chain variable access represents the following {storeFolder.stateFileViewName.objectAttribute}
            store.restaurant.restaurants = response.data;
            console.log(
              "store.restaurant.restaurants",
              store.restaurant.restaurants
            );
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;
      default:
        // We must call done for all views so we include default for the views that don't have cases above.
        done();
      // break is not needed since it is the last condition, if you move default higher in the stack then you should add the break statement.
    }
  },
  already: match => {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    render(store[view]);
  },
  after: match => {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    if (view === "restaurant") {
      document.querySelector("form").addEventListener("submit", event => {
        event.preventDefault();

        const inputList = event.target.elements;
        console.log("Input Element List", inputList);

        const requestData = {
          restaurantName: inputList.restaurantName.value,
          location: inputList.location.value,
          type: inputList.type.value,
          rating: inputList.rating.value,
          anothertopic: inputList.anothertopic.value,
        };

        console.log("request Body", requestData);

        axios
          .post(`${process.env.API_URL}/restaurants`, requestData)
          .then(response => {
            console.log("request postrestaurant", response.data);
            router.navigate("/restaurant");
          })
          .catch(error => {
            console.log("It puked", error);
          });

        // axios.get(`${process.env.API_URL}/restaurants`).then(response => {
        //   store.restaurant.restaurants.push(response.data);
        //   console.log("request data", store.restaurant.restaurants);
        // });
        axios.get(`${process.env.API_URL}/restaurants`).then(response => {
          store.restaurant.restaurants = response.data;
          console.log("Updated restaurant list:", store.restaurant.restaurants);
        });
      });
    }

    router.updatePageLinks();

    // add menu toggle to bars icon in nav bar
    document.querySelector(".fa-bars").addEventListener("click", () => {
      document.querySelector("nav > ul").classList.toggle("hidden--mobile");
    });
  },
});

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

router
  .on({
    "/": () => render(),

    "/:view": function(match) {
      // Get the route string after the slash, like 'about-me'
      const view = match?.data?.view ? camelCase(match.data.view) : "home";

      // Check if this view exists in the store
      if (view in store) {
        render(store[view]);
      } else {
        render(store.viewNotFound);
        console.log(`View '${view}' not defined.`);
      }
    },
  })
  .resolve();

// https://www.themealdb.com/api.php maybe use this for API? ehhhhh
