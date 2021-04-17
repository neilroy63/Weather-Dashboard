var nameInputEl = $("#cityName");
var getWeatherButton = $("#getWeatherDetails");
var APIkey = "2a42cf72ca1c72e324a6fd97d7102e2a";
// Empty Array to store names of cities entered ----- > 
var listOfCities = []

// ---- Code for current weather conditions ------>
var fetchWeatherData = function () {
  console.log("Calling weather data");
  // Feeding the city name to the API based on value the user has entered via html id and var above 
  var txtCity = nameInputEl.val();
  // City name is speaking to this function  
  // function that pushes into array of cities var  
    function populateArray () {
    listOfCities.push(txtCity)
      }
      // calling the above populateArray function
      populateArray ();
  console.log(listOfCities);
  // Fetching the open weather  API based on city text / name inputed
  //  using my unique  API key to access the data 
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${txtCity},${"VIC"},${"AU"}&units=metric&appid=${APIkey}`
  )
  // response returned as a json object 
    .then(function (response) {
      return response.json();
    })
    // feeding the data rec'd to my renderWeatherDAta function and console 
    .then(function (data) {
      renderWeatherData(data);
      console.log(data);
    });

    // statrt fetching forcast data
};

// Function feeding the HTML the current weather data  ----> 
function renderWeatherData(data) {
  // vars targetting  HTML div elements 
  var cityWeather = $("#city-weather");
  var temperature = $("#temperature");
  var humidity = $("#humidity");
  var windSpeed = $("#wind-speed");
  var uvIndex = $("#uv-index")

  cityWeather.text(nameInputEl.val() + " ");
    //Vars above updated based on the data returned by the API object 
  temperature.text("Temperature: " + data.main.temp_max + " Celcius");
  humidity.text("Humidity: " + data.main.humidity + "%");
  windSpeed.text("Wind Speed: " + data.wind.speed + " Miles per hour");
  // uvIndex.text("UV-Index :" + data.)

}

// // ----  Code for 5 day / 3 hour forecast ------------>
var fetchForecastWeatherData = function () {
  //event.preventDefault();
  console.log("Calling forecast data");
  var txtCity = nameInputEl.val();
  // var APIkey = "2a42cf72ca1c72e324a6fd97d7102e2a";

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${txtCity},${"VIC"},${"AU"}&units=metric&appid=${APIkey}`)
  .then(function(response) {
    return response.json()
  })
  .then (function(data) {
    console.log(data)
    renderForecastWeatherData(data)
  }).catch(function(err){
    console.log(err)
  });
  
};

// ----  Function feeding the HTML the forecast data procured via forecast API 
function renderForecastWeatherData(data) {
  // var tagetting the HTML div elements 
  var day1Temp = $("#day-1-temp");
  // var day1Humidity = $("#day-1-humidity");
  var day2 = $("#day-2");
  var day3 = $("#day-3");
  var day4 = $("#day-4");
  var day5 = $("#day-5");
//Vars above updated based on the data returned by the forecast API object 
  day1Temp.text ("Temp: " + data.list[6].main.temp + " Celcius")
  // day1Humidity.text ("Humidity: " + data.list[6].main.humidity + "%")

  day2.text ("Temp: " + data.list[14].main.temp + " Celcius")
  day2.text ("Humidity: " + data.list[14].main.humidity + "%")

  day3.text ("Temp: " + data.list[22].main.temp + " Celcius")
  day3.text ("Humidity: " + data.list[22].main.humidity + "%")

  day4.text ("Temp: " + data.list[30].main.temp + " Celcius")
  day4.text ("Humidity: " + data.list[30].main.humidity + "%")

  day5.text ("Temp: " + data.list[38].main.temp + " Celcius")
  day5.text ("Humidity: " + data.list[38].main.humidity + "%")

}

// ---- Event listener for the submit button ---->
getWeatherButton.on("click", PopulateWeatherData);

function PopulateWeatherData (event) {
   event.preventDefault();
    fetchWeatherData();
    fetchForecastWeatherData();
}


/*
- Need to figure out how to get UVI and forecast data 
- Also need to update HTML with images representing the forecast / weather outlook (see project gif)
- also need to use local storage   to store user input 
- when searchbox is clicked, it will save the entered text/city to local storage (so that it  persists)

need 5 day forecast
and 3 pieces of data for each day i.e. date, temp, humidity 
+ images to represent weather conditions 

local storage?
how do I update the html for 3 values i.e. date, temp, humidity for the forecast 
how do i input images to represent the weather???



*/