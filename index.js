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
      case "restaurant":
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
  already: async match => {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";
    if (view === "restaurant") {
      console.log("already hook restaurant");
      await axios
        .get(`${process.env.API_URL}/restaurants`)
        .then(response => {
          // Storing retrieved data in state
          // The dot chain variable access represents the following {storeFolder.stateFileViewName.objectAttribute}
          store.restaurant.restaurants = response.data;
          console.log(
            "store.restaurant.restaurants",
            store.restaurant.restaurants
          );
        })
        .catch(error => {
          console.log("It puked", error);
        });
    }

    render(store[view]);
    if (view === "restaurant") {
      let form = document.querySelector("form");
      form.addEventListener("submit", event => {
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
            form.reset();
            router.navigate("/restaurant");
          })
          .catch(error => {
            console.log("It puked", error);
          });
      });
    }
  },
  after: match => {
    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    if (view === "restaurant") {
      let form = document.querySelector("form");
      form.addEventListener("submit", event => {
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
            form.reset();
            router.navigate("/restaurant");
          })
          .catch(error => {
            console.log("It puked", error);
          });
      });
    }
    if (view === "contact") {
      document
        .querySelector("#emailForm")
        .addEventListener("submit", async e => {
          e.preventDefault();

          const inputList = e.target.elements;
          const requestData = {
            name: inputList.to.value,
            email: inputList.do.value,
            message: inputList.message.value,
          };
          try {
            await axios
              .post(`${process.env.API_URL}/sendMail`, requestData)
              .then(response => {
                alert(response.data.message);
              });
          } catch (error) {
            console.error(error.message);
            alert("Failed to send");
          }
        });
    }
    router.updatePageLinks();

    // add menu toggle to bars icon in nav bar
    document.querySelector(".fa-bars").addEventListener("click", () => {
      document.querySelector("nav > ul").classList.toggle("hidden--mobile");
    });
  },
});

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
