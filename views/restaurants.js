import html from "html-literal";

export default state => html`
  <section class="restaurant">
    <form id="restaurant" method="POST" action="">
      <h2>Add restaurant</h2>
      <div>
        <label for="restaurantName">Restaurant Name:</label>
        <input
          type="text"
          name="restaurantName"
          id="restaurantName"
          placeholder="Enter Name"
          required
        />
      </div>
      <div>
        <label for="location">Location:</label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Enter Location"
          required
        />
      </div>
      <div>
        <label for="type">Type:</label>
        <input
          type="text"
          name="type"
          id="type"
          placeholder="Enter Type"
          required
        />
      </div>
      <div>
        <label for="rating">Rating:</label>
        <input
          type="number"
          name="rating"
          id="rating"
          placeholder="Enter Rating"
          required
        />
      </div>
      <div>
        <label for="anothertopic">Another Topic:</label>
        <input
          type="text"
          name="anothertopic"
          id="anothertopic"
          placeholder="Enter Description"
        />
      </div>
      <input type="submit" name="submit" value="Submit Restaurant" />
    </form>

    <hr />

    <section id="restaurant">
      <h2>Restaurants</h2>
      <ul>
        ${state.restaurants
          .map(
            restaurant => `
        <li>
          <h3>${restaurant.restaurantName}</h3>
          <p>Location: ${restaurant.location}</p>
          <p>Type: ${restaurant.type}</p>
          <p>Rating: ${restaurant.rating} ⭐</p>
          <p>${restaurant.anothertopic}</p>
        </li>
      `
          )
          .join("")}
      </ul>
    </section>
  </section>
`;
