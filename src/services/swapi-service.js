export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';
  _imgBase = 'https://starwars-visualguide.com/assets/img';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  getPersonImage = ({id}) => {
    return `${this._imgBase}/characters/${id}.jpg`;
  }

  getStarshipImage = ({id}) => {
    return `${this._imgBase}/starships/${id}.jpg`;
  }

  getPlanetImage = ({id}) => {
    return `${this._imgBase}/planets/${id}.jpg`;
  }

  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPersonData);
  }

  getPerson = async(id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPersonData(person);
  }

  getAllPlanets = async() => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanetData)
  }

  getPlanet = async(id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanetData(planet);
  }

  getAllStarships = async() => {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarshipData);
  }

  getStarship = async(id) => {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarshipData(starship);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPlanetData = (planet) => {

    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformStarshipData = (starship) => {

    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity
    }
  }

  _transformPersonData = (person) => {

    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }
}
