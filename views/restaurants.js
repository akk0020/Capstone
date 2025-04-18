import html from "html-literal";

export default state => html`
  <section id="restaurant">
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
  </section>
`;
