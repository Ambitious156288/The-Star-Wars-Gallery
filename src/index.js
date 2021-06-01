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

  initializeCatalog() {
    this.catalog = document.querySelector(this.UiSelectors.content);

    this.pullCards();
  }

  async pullCards() {
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
    this.catalog.innerHTML += [people.map((person) => person.name)];
  }
}

const catalog = new StarWarsCatalog();
catalog.initializeCatalog();
