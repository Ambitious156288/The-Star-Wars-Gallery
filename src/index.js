import "./styles/style.scss";

class StarWarsCatalog {
  constructor() {
    this.cards = [];
    this.newCars = [];

    this.API = "https://swapi.dev/api";
    this.API_RESOURCE = "people";

    this.API_ENDPOINT = `${this.API}/${this.API_RESOURCE}`;
  }
}
