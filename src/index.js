import "./styles/style.scss";
class StarWarsCatalog {
  constructor() {
    this.people = [];

    this.catalog = null;

    this.API = "https://swapi.dev/api";
    this.API_RESOURCE = "people";

    this.API_ENDPOINT = `${this.API}/${this.API_RESOURCE}`;

    this.UiSelectors = {
      content: "[data-content]",
    };
  }

  initializePeople() {
    this.catalog = document.querySelector(this.UiSelectors.content);

    this.pullPeople();
  }

  async pullPeople() {
    const { results } = await this.fetchData(this.API_ENDPOINT);

    this.people = [...results];

    this.createCatalog(this.people);

    console.log(results);
  }

  async fetchData(url) {
    const response = await fetch(url);
    const parsedResponse = await response.json();

    return parsedResponse;
  }

  createCatalog(people) {
    this.catalog.insertAdjacentHTML("beforeend", [
      people.map((person) => this.createPerson(person)).join(""),
    ]);
  }

  createPerson({
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
  }) {
    return `       
          <div class="card blue-grey darken-1 card__size">
            <div class="card-content white-text">
              <span class="card-title">${name}</span>
            </div>
            <div class="card-action">
            <p>height: ${height}</p>
            <p>mass: ${mass}</p>
            <p>height: ${hair_color}</p>
            <p>mass: ${skin_color}</p>
            <p>height: ${height}</p>
            <p>mass: ${eye_color}</p>
            <p>height: ${birth_year}</p>
            <p>mass: ${gender}</p>
            </div>
          </div>
    `;
  }
}

const catalog = new StarWarsCatalog();
catalog.initializePeople();
