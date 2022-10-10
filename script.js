'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map, mapEvent;

//Geolocation (2 functions .1st success, 2nd error)
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //Destructuring
      const { latitude, longitude } = position.coords;
      // const { longitude } = position.coords;
      //Check with google Map
      console.log(`https://www.google.com/maps/@${latitude},${longitude},14z`);
      const coords = [latitude, longitude];
      //*Leaflet API (3rd party library)
      map = L.map('map').setView(coords, '12');

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      //* POPUP MSG AND MARKER SETUP
      //? leaflet api method handling clicks on map
      map.on('click', function (mapE) {
        //get access to variable
        mapEvent = mapE;
        form.classList.remove('hidden');
        //? add cursors to selected input field
        inputDistance.focus();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
form.addEventListener('submit', function (e) {
  e.preventDefault();
  //Clear input fields
  inputDistance.value =
    inputCadence.value =
    inputDuration.value =
    inputElevation.value =
      '';
  //Display the marker
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidht: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});
//? Switching between running and cycling!
inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
