//Enviroment variables
require("dotenv").config();

//Packages imports
require("colors");

//Custom imports
const Searchs = require("./models/searchs");
const {
  inquirerMenu,
  pause,
  listPlaces,
  readInput,
} = require("./helpers/inquirer");

//Main function
const main = async () => {
  let opt;
  let searches = new Searchs();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        //Catch search term
        const searchTerm = await readInput("Ciudad");

        //Search places
        const places = await searches.getPlaces(searchTerm);
        const selectedId = await listPlaces(places);

        //Cancel operation
        if (selectedId == "0") continue;

        //Fill selected place object
        const selectedPlace = places.find((place) => place.id === selectedId);

        //Save in db
        searches.addHistorial(selectedPlace.nombre);

        //Get weather for selected city
        const weather = await searches.getWeatherByPlace(
          selectedPlace.lat,
          selectedPlace.lon
        );

        //Show results
        console.log("\nInformación de la ciudad\n".green);
        console.log(`Ciudad: ${selectedPlace.nombre}`);
        console.log(`Latitud: ${selectedPlace.lat}`);
        console.log(`Longitud: ${selectedPlace.lon}`);
        console.log(`Temperatura: ${weather.temp}`);
        console.log(`Mínima: ${weather.min}`);
        console.log(`Máxima: ${weather.max}`);
        console.log(`Cómo está el clima: ${weather.desc}`);
        break;
      case 2:
        //Show historial from our fake DB
        searches.getCapitalizedHistorial().forEach((place, index) => {
          console.log(`${(index + 1).toString().green} ${place}`);
        });
        break;
    }
    if (opt != 0) await pause();
  } while (opt != 0);
};

//Execute main function
main();
