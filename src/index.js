import "./styles/style.scss";
import { v4 as uuidv4 } from "uuid";
class StarWarsCatalog {
  constructor() {
    this.id = uuidv4();
    this.currentPage = 1;

    this.people = [];
    this.newPeople = [];

    this.catalog = null;
    this.button = null;
    this.loader = null;
    this.searchBar = null;
    this.info = null;

    this.properties = null;

    this.API = "https://swapi.dev/api";
    this.API_RESOURCE = "people";
    this.API_ENDPOINT = `${this.API}/${this.API_RESOURCE}`;

    this.UiSelectors = {
      content: "[data-content]",
      button: "[data-button]",
      loader: "[data-loader]",
      searchBar: "searchBar",
      card: "[data-card]",
      info: "[data-info]",
    };
  }

  initializePeople() {
    this.catalog = document.querySelector(this.UiSelectors.content);
    this.button = document.querySelector(this.UiSelectors.button);
    this.loader = document.querySelector(this.UiSelectors.loader);
    this.searchBar = document.getElementById(this.UiSelectors.searchBar);
    this.info = document.querySelector(this.UiSelectors.info);

    this.addEventListeners();

    this.pullPeople();
  }

  addEventListeners() {
    this.button.addEventListener("click", () => this.pullPeople());
    this.searchBar.addEventListener("keyup", () => this.filterPeople());
  }

  async pullPeople() {
    this.toggleShowElement(this.loader, this.button);

    const { results } = await this.fetchData(
      `${this.API_ENDPOINT}/?page=${this.currentPage}`
    );

    this.toggleShowElement(this.loader, this.button);

    this.people = [...this.people, ...results];
    this.newPeople = [...results];

    this.createCatalog(this.newPeople);

    this.currentPage++;
  }

  toggleShowElement(...elements) {
    elements.forEach((element) => element.classList.toggle("hide"));
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
    url,
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
        <div id=${url} class="card blue-grey darken-1 card__size" data-card>
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

  filterPeople() {
    let searchQuery = this.searchBar.value.toLowerCase();

    searchQuery.length
      ? this.button.classList.add("hide")
      : this.button.classList.remove("hide");

    document
      .querySelectorAll(this.UiSelectors.card)
      .forEach((el) => el.classList.remove("hide"));

    const filteredCards = this.people.filter(
      ({ name }) => !name.toLowerCase().includes(searchQuery)
    );

    filteredCards.length === this.cards.length
      ? this.info.classList.remove("hide")
      : this.info.classList.add("hide");

    filteredCards.forEach(({ url }) =>
      document.getElementById(url).classList.add("hide")
    );
  }
}

const catalog = new StarWarsCatalog();
catalog.initializePeople();
