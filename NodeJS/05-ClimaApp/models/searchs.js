const fs = require("fs");

const axios = require("axios");

class Searchs {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    //Leer DB si existe
    this.readDB();
  }

  getMapboxParams() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  getWeatherParams(lat, lon) {
    return {
      lat,
      lon,
      appid: process.env.OPENWEATHER_KEY,
      lang: "es",
      units: "metric",
    };
  }

  getCapitalizedHistorial() {
    return this.historial.map((x) => {
      let words = x.split(" ");
      words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
      return words.join(" ");
    });
  }

  async getPlaces(lugar = "") {
    try {
      //Peticion http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json/`,
        params: this.getMapboxParams(),
      });

      const res = await instance.get();

      return res.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lon: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getWeatherByPlace(lat, lon) {
    try {
      //Instance axios
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather/",
        params: this.getWeatherParams(lat, lon),
      });

      const res = await instance.get();
      const { weather, main } = res.data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async addHistorial(place) {
    if (!this.historial.includes(place.toLowerCase())) {
      this.historial.unshift(place.toLowerCase());
    }

		//Only show last 5 results
    this.historial = this.historial.splice(0, 5);
		
    //Save Historial
    this.saveDB();
  }

  saveDB() {
    const payload = {
      historial: this.historial,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (fs.existsSync(this.dbPath)) {
      const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
      const data = JSON.parse(info);
      this.historial = data.historial;
    }
  }
}

module.exports = Searchs;
