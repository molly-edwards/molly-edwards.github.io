const mainContent = document.getElementById("main-content");
const navButtons = document.querySelectorAll(".nav-button");

const pages = {
welcome: `
  <section class="welcome-card">
    <img
      class="campus-hero"
      src="https://sc.edu/imgs/background/background_bigoaktree.jpg"
      alt="Students walking on the University of South Carolina Horseshoe"
    >

    <h2>Welcome to the Portal!</h2>
    <p>
      Welcome, Gamecocks! This student portal is your place to find dining
      choices, athletics events, academic information, and ways to get
      involved on campus.
    </p>
    <p>
      Select one of the buttons on the left to explore your student resources.
    </p>

    <button class="garnet-button" data-go-to="dining">
      Explore Dining Options
    </button>
  </section>
`,

  dining: `
    <section>
      <div class="page-header">
        <h2>Dining Options</h2>
        <p>Today's campus dining highlights — Thursday, October 8, 2026.</p>
      </div>

      <div class="card-grid">
        <article class="info-card">
          <img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80" alt="Food served in a dining hall">
          <div class="card-content">
            <h3>Gamecock Park</h3>
            <span class="date-label">October 8, 2026</span>
            <ul>
              <li>Carolina BBQ chicken</li>
              <li>Macaroni and cheese</li>
              <li>Garden salad</li>
              <li>Peach cobbler</li>
            </ul>
          </div>
        </article>

        <article class="info-card">
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80" alt="Fresh and healthy meal">
          <div class="card-content">
            <h3>Fresh Greene's</h3>
            <span class="date-label">October 8, 2026</span>
            <ul>
              <li>Build-your-own salad</li>
              <li>Grilled chicken wrap</li>
              <li>Vegetable quinoa bowl</li>
              <li>Fresh fruit cup</li>
            </ul>
          </div>
        </article>

        <article class="info-card">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" alt="Variety of dining hall food">
          <div class="card-content">
            <h3>The Pavilion</h3>
            <span class="date-label">October 8, 2026</span>
            <ul>
              <li>Chicken parmesan</li>
              <li>Pasta primavera</li>
              <li>Garlic bread</li>
              <li>Chocolate chip cookies</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  `,

  athletics: `
    <section>
      <div class="page-header">
        <h2>Gamecock Athletics</h2>
        <p>Cheer on the Garnet and Black this weekend!</p>
      </div>

      <div class="schedule-list">
        <article class="schedule-item">
          <h3>⚽ Women's Soccer</h3>
          <p><strong>Friday, October 9</strong> · 7:00 p.m.</p>
          <p>South Carolina vs. Auburn Tigers</p>
          <p>Location: Stone Stadium</p>
        </article>

        <article class="schedule-item">
          <h3>⚽ Men's Soccer</h3>
          <p><strong>Saturday, October 10</strong> · 7:00 p.m.</p>
          <p>South Carolina vs. Kentucky Wildcats</p>
          <p>Location: Stone Stadium</p>
        </article>

        <article class="schedule-item">
          <h3>🏈 Football</h3>
          <p><strong>Saturday, October 10</strong> · 3:30 p.m.</p>
          <p>South Carolina at Tennessee Volunteers</p>
          <p>Location: Knoxville, Tennessee — Away Game</p>
        </article>
      </div>
    </section>
  `,

  academics: `
    <section>
      <div class="page-header">
        <h2>Academics</h2>
        <p>Stay on top of academic dates and explore your academic path.</p>
      </div>

      <div class="academic-layout">
        <div>
          <h3>2026–27 Academic Calendar</h3>

          <div class="calendar-list">
            <article class="calendar-item">
              <h3>Fall 2026</h3>
              <p>Classes begin: August 18, 2026</p>
              <p>Fall break: October 15–16, 2026</p>
              <p>Final examinations: December 7–14, 2026</p>
            </article>

            <article class="calendar-item">
              <h3>Spring 2027</h3>
              <p>Classes begin: January 11, 2027</p>
              <p>Spring break: March 7–14, 2027</p>
              <p>Final examinations: April 28–May 5, 2027</p>
            </article>
          </div>
        </div>

        <div>
          <h3>Majors and Minors</h3>
          <div class="note-box">
            <p>
              UofSC offers undergraduate majors and minors across colleges such
              as Arts and Sciences, Business, Education, Engineering and
              Computing, Nursing, Public Health, Hospitality, Retail and Sport
              Management, and more.
            </p>

            <p>
              Students can explore programs including biology, psychology,
              marketing, computer science, journalism, criminal justice,
              exercise science, finance, political science, and many others.
            </p>

            <p>
              Meet with your academic advisor to discuss major requirements,
              minor options, and course planning.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,

  clubs: `
    <section>
      <div class="page-header">
        <h2>Clubs and Organizations</h2>
        <p>Find your community and make the most of your Carolina experience.</p>
      </div>

      <div class="card-grid">
        <article class="info-card">
          <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80" alt="Students spending time together">
          <div class="card-content">
            <h3>Student Government</h3>
            <p>
              Represent student voices, develop leadership skills, and help
              shape campus life.
            </p>
          </div>
        </article>

        <article class="info-card">
          <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80" alt="Students participating in a volunteer activity">
          <div class="card-content">
            <h3>Dance Marathon</h3>
            <p>
              Raise funds and awareness for local children’s healthcare through
              service, events, and community.
            </p>
          </div>
        </article>

        <article class="info-card">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80" alt="Students studying together">
          <div class="card-content">
            <h3>Pre-Health Society</h3>
            <p>
              Connect with students interested in health professions through
              mentoring, speakers, and service opportunities.
            </p>
          </div>
        </article>
      </div>
    </section>
  `
};

function showPage(pageName) {
  mainContent.innerHTML = pages[pageName];
  mainContent.focus();

  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.page === pageName);
  });

  window.location.hash = pageName;
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

mainContent.addEventListener("click", (event) => {
  if (event.target.dataset.goTo) {
    showPage(event.target.dataset.goTo);
  }
});

const pageFromUrl = window.location.hash.replace("#", "");
showPage(pages[pageFromUrl] ? pageFromUrl : "welcome");