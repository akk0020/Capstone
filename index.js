import * as components from "./components";
import { header, nav, main, footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { camelCase } from "lodash";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector("#root").innerHTML = `
      ${header(state)}
      ${nav(store.nav)}
      ${main(state)}
      ${footer()}
    `;
}

render();

router.on({
  "/": () => render(),
  // The :view slot will match any single URL segment that appears directly after the domain name and a slash
  "/:view": function(match) {
    // If URL is '/about-me':
    // match.data.view will be 'about-me'
    // Using Lodash's camelCase to convert kebab-case to camelCase:
    // 'about-me' becomes 'aboutMe'
    const view = match?.data?.view ? camelCase(match.data.view) : "home";

    // If the store import/object has a key named after the view
    if (view in store) {
      // Then the invoke the render function using the view state, using the view name
      render(store[view]);
    } else {
      // If the store
      render(store.viewNotFound);
      console.log(`View ${view} not defined`);
    }
    // Now we can use viewName to find the correct state in our store
    // If viewName is 'aboutMe', it will look for store.aboutMe
    const state = store[view];

    // Finally, render the page with the state
    render(state);
  },
});

// adding one route
router.on("/", () => console.log("Visiting Home Page")).resolve();

// adding more than one route
router.on({
  routeOne: () => console.log("Visiting Route One"),
  routeTwo: () => console.log("Visiting Route Two"),
});

router.on(":x", defaultParam => defaultParam);
// returns:
// {x: "<route entered in URL>"}

// When the route http://localhost:1234/home is hit then match.data.view will return "home"
router.on(":view", match => match.data.view);
// returns:
// "<route entered in URL>"
