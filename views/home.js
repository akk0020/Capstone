import html from "html-literal";

export default state => html`
  <header>
    <section class="jumbotron">
      <div class="jumbotron-content">
        <h2>tastelocal</h2>
        <p>
          find local restaurants
        </p>
        <!-- <a href="#bannerButton" class="cta-btn">quick search?</a> -->
        <!-- <div class="search-bar">
          <input
            type="text"
            id="quickSearch"
            placeholder="quick search ....." -->
          <!-- /> -->
          <button>&#11088;<a href="/meal">View Random Meal</a>
          </button>
        </div>
      </div>
    </section>
  </header>

  <div class="homepage-bottom">
    <h2>
      tastelocal is your go-to guide for finding local trusted restaurants.
    </h2>
    <p>taste something local</p>
  </div>
`;
