//User enters the city in search bar
function showTemp(response) {
  let h3 = document.querySelector("#temp");
  h3.innerHTML = Math.round(response.data.main.temp);
  let h5 = document.querySelector(".weatherType");
  h5.innerHTML = response.data.weather[0].description.toUpperCase();
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let apiKey = "65a6ca53c94284a78ade1834db48e6ab";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;

  let h1 = document.querySelector("#location");
  if (searchInput.value) {
    h1.innerHTML = searchInput.value;
    axios.get(url).then(showTemp);
  } else {
    alert("Please enter a city");
  }
}

let city = document.querySelector("#searchCity");
city.addEventListener("submit", displayCity);

//Current location weather info
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "65a6ca53c94284a78ade1834db48e6ab";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(showCurrTemp);
}

//TESTER
function showWeatherDetails(response) {
  let precipitation = document.querySelector("#precipitation");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  //wind.innerHTML = response.data.wind.speed;
  console.log(response.data);
}
let apiKey = "65a6ca53c94284a78ade1834db48e6ab";
let url = `https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=${apiKey}&units=imperial`;
axios.get(url).then(showWeatherDetails);

function showCurrTemp(response) {
  let h3 = document.querySelector("#temp");
  h3.innerHTML = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#location");
  h1.innerHTML = response.data.name;
  let h5 = document.querySelector(".weatherType");
  h5.innerHTML = response.data.weather[0].description.toUpperCase();
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
}

function getCurrentPos() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPos);

//Local time information
let timeNow = new Date();
let hour = timeNow.getHours();
let minutes = timeNow.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[timeNow.getDay()];
if (minutes < 10) {
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${day}, ${hour}:0${minutes}`;
} else {
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${day}, ${hour}:${minutes}`;
}

//Temperature information
//ONLY PROBLEM: once I click on C or F another time, it does another conversion
//so it's kind of a bad user experience
function celciusConversion(event) {
  event.preventDefault();
  let currTemp = document.getElementById("temp").innerHTML;
  let displayTemp = document.querySelector("#temp");
  let result = ((currTemp - 32) * 5) / 9;
  displayTemp.innerHTML = Math.round(result);
}
function fahrenheitConversion(event) {
  event.preventDefault();
  let currTemp = document.getElementById("temp").innerHTML;
  let displayTemp = document.querySelector("#temp");
  let result = 1.8 * currTemp + 32;
  displayTemp.innerHTML = Math.round(result);
}
let tempC = document.querySelector("#celcius");
tempC.addEventListener("click", celciusConversion);
let tempF = document.querySelector("#fahrenheit");
tempF.addEventListener("click", fahrenheitConversion);
