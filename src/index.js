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

    this.properties = null;
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
    const peopleProperties = [
      "height",
      "mass",
      "hair_color",
      "skin_color",
      "eye_color",
      "birth_year",
      "gender",
    ];

    this.properties = [...peopleProperties];

    return `       
          <div class="card blue-grey darken-1 card__size">
            <div class="card-content white-text">
              <span class="card-title">${name}</span>
            </div>
            <div class="card-action">
              ${this.properties
                .map(
                  (property) => `
                    <p> 
                      <span class="card-action--bold">${property}: </span>
                      <span>${eval(property)}</span>
                    </p>
                `
                )
                .join("")}
            </div>
          </div>
    `;
  }
}

const catalog = new StarWarsCatalog();
catalog.initializePeople();
