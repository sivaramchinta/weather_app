/*
Actual URL: "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e813bfc7ec37d66d7a31c14744016018"
Adding &units=metric at the end of the above URL to convert default standard units(KELVIN) ----> metric units (CELSIUS)
URL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e813bfc7ec37d66d7a31c14744016018&units=metric"

For coding purpose - we removed the API key and City in the URL i.e ("q=London,uk&APPID=e813bfc7ec37d66d7a31c14744016018&") in the URL
Means we use - "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
*/

const apiKEY = "e813bfc7ec37d66d7a31c14744016018";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city)
{
    const response = await fetch(apiURL + city + `&APPID=${apiKEY}`);
    /* 
    The fetch function is used to make an HTTP request.
    Backticks(``) should be used for variable interpolation means dollar sign above
       const name = "John";
       const greeting = `Hello, ${name}!`;
       console.log(greeting);
       Output: Hello, John!
       In this example, the variable name is interpolated into the string using ${} within the template literal.
    */
   if(response.status == 404)
   {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
   }
   else
   {
    var data = await response.json();
    /* used to extract the JSON data from the response. */

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds")
    {
        weatherIcon.src = "./images/clouds.png";
    }
    else if(data.weather[0].main == "Clear")
    {
        weatherIcon.src = "./images/clear.png";
    }
    else if(data.weather[0].main == "Rain")
    {
        weatherIcon.src = "./images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle")
    {
        weatherIcon.src = "./images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist")
    {
        weatherIcon.src = "./images/mist.png";
    }
    else if(data.weather[0].main == "Snow")
    {
        weatherIcon.src = "./images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  
   }
    

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})



