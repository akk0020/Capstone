<table id="restaurants">
  <tr>
    <th>RestaurantName</th>
    <th>Location</th>
    <th>Type</th>
    <th>Rating</th>
    {/* <th>Customer</th> */}
  </tr>
  $
  {state.restaurants
    .map(restaurant => {
      return `<tr>
      <td>${restaurants.restaurantName}</td>
      <td>${restaurants.location}</td>
      <td>${restaurants.type}</td>
      <td>${restaurants.rating}</td>
    </tr>`;
    })
    .join("")}
</table>;




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
