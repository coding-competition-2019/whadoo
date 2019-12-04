const INPUT_JSON = 'inputs/places.json';
const OUTPUT_JSON = 'outputs/places.json';
const API_KEY = 'AIzaSyB02lxqd03pjNwgiOiAF-fM0HwzcmK_FcY';

const fs = require('fs');
const request = require('request');

// npm install request@2.81.0
function loadData(dataJson) {
  let places = dataJson.places;
  let left = places.length;

  places.forEach(place => {
    let result = [];
    const argument = (place.address.city + ' ' + place.address.street);
    const query = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' +
      encodeURIComponent(argument.trim()) +
      '&inputtype=textquery&fields=geometry&key=' + API_KEY;

    request(query, {json: true}, (err, res, body) => {
      if (err || typeof body.candidates[0] !== 'undefined' && body.candidates[0]) {
        let geom = body.candidates[0].geometry.location;
        place.coordinates = {'lat': geom.lat, 'lng': geom.lng};
        result.push(place);
      } else {
        console.log("Could not find place:");
        console.log(query);
      }
      if (--left < 1) update(result);
    });
  });
}

function readFile() {
  fs.readFile(INPUT_JSON, (error, data) => {
    console.log('Async Read: starting...');
    if (error) {
      console.log('Async Read: NOT successful!');
      console.log(error);
    } else {
      try {
        const dataJson = JSON.parse(data);
        console.log('Async Read: successful!');
        loadData(dataJson);
      } catch (error) {
        console.log(error);
      }
    }
  });
}

function update(result) {
  let jsonResult = JSON.stringify(result);
  fs.writeFile(OUTPUT_JSON, jsonResult, (error) => {
    console.log(error);
  });
}

readFile();
