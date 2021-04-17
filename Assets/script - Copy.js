var nameInputEl = $("#cityName");
var getWeatherButton = $("#getWeatherDetails");

// // Using this as global var to feed both fetch requests
// var txtCity = nameInputEl.val();

// when we enter something into the text box, we need to call the api and get weather details
// API Key
var APIkey = "2a42cf72ca1c72e324a6fd97d7102e2a";

// ---- Function will run after the entry of city name for current weather conditions ------
var fetchWeatherData = function (event) {
  // Prevent page reload
  event.preventDefault();
  // Checking the function is working by logging  string to console
  console.log("Calling weather data");
  // Feeding the city name to the API based on value the user has entered via html id and var above 
  var txtCity = nameInputEl.val();
  // Fetching the open weather  API based on city text / name inputed
  //  using my unique  API key to access the data 
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${txtCity}&appid=${APIkey}`
  )
  // response returned as a json
    .then(function (response) {
      return response.json();
    })
    // feeding the data rec'd to my renderWeatherDAta function and console 
    .then(function (data) {
      renderWeatherData(data);
      console.log(data);
    });
};

// Function feeding the HTML the data procured via API 
function renderWeatherData(data) {
  // vars targetting  HTML div elements 
  var cityWeather = $("#city-weather");
  var temperature = $("#temperature");
  var humidity = $("#humidity");
  var windSpeed = $("#wind-speed");
  var uvIndex = $("#uv-index")

  cityWeather.text(nameInputEl.val() + " ");
    //Vars above updated based on the data returned by the API object 
  temperature.text("Temperature: " + data.main.temp_max + "F");
  humidity.text("Humidity: " + data.main.humidity + "%");
  windSpeed.text("Wind Speed: " + data.wind.speed + " Miles per hour");
  // uvIndex.text("UV-Index :" + data.)

}

// // ----  Code for 5 day / 3 hour forecast API  ------------
// var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=${txtCity}&appid=${APIkey}"
//  is there a way to run both apis concurrently within the same function, activated when the weather btn is clicked???

var fetchForecastWeatherData = function (event) {
  event.preventDefault();
  console.log("Calling forecast data");
  var txtCity = nameInputEl.val();
  // var APIkey = "2a42cf72ca1c72e324a6fd97d7102e2a";

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${txtCity}&appid=${APIkey}`)
  .then(function(response) {
    return response.json()
  })
  .then (function(data) {
    console.log(data)
  });
};

// ----  Function feeding the HTML the data procured via forecast API 
function renderForecastWeatherData(data) {
  // var tagetting the HTML div elements 
  var day1 = $("#day-1");
  var day2 = $("#day-2");
  var day3 = $("#day-3");
  var day4 = $("#day-4");
  var day5 = $("#day-5");
//Vars above updated based on the data returned by the forecast API object 
  day1.text("test: " + data.list[4].main.temp_max + "something else")
}



// --------------- Event listener for the submit button ------------------- 
getWeatherButton.on("click", fetchForecastWeatherData);

/*
- Need to figure out how to get UVI and forecast data 
- might need to call another API 
- Need to then  feed data to divs on HTML 
- Also need to update HTML with images representing the forecast / weather outlook (see project gif)
- also need to use local storage   to store user input 
- when searchbox is clicked, it will save the entered text/city to local storage (so that it  persists)

need 5 day forecast
and 3 pieces of data for each day i.e. date, temp, humidity 
+ images to represent weather conditions 

*/