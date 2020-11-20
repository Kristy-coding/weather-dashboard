
var currentCityTitle = document.getElementById("current-city-title");

var currentCityTemp = document.getElementById("current-city-temp");

var currentCityUvIndex = document.getElementById("uv-index");

var currentCityWindSpeed = document.getElementById("current-city-wind");

var currentCityHumidity = document.getElementById("current-city-humidity");

var searchInput =  document.querySelector('#searchTerm')

var forecastCardContainer = document.getElementById("forecast-card-container");


var searchButtonEl = document.getElementById("search-btn");

//var searchHistoryListEl = document.getElementById("search-history-list");


// move this inside getCurrentWeather()???

var getForecast = function(city) {
    
  // format the response/promise
//var searchTerm = searchInput.value

 var forecastApiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=aeed2b4f76bdbe411a612dd49400c7d4&units=imperial"
  
 // make a request to the url
  fetch(forecastApiUrl)
    .then(function(response) {
      if (response.ok){
        response.json().then(function(data) {
          displayForecast(data);
          
          //function call searchForCity(city)
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      // if internet is down? error type???
      alert("unable to connect to GitHub");
    });
};

// fetch data from the server API Open Weather for current weather 
var getCurrentWeatherData = function(event) {

  if (event) {

  event.preventDefault();

  }
  

  var searchTerm = searchInput.value;

  var currentWeatherDataApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=aeed2b4f76bdbe411a612dd49400c7d4&units=imperial"

    //format the response/promise
    fetch(currentWeatherDataApiUrl)
        .then(function(response) {
          if (response.ok){
            response.json().then(function(data) {

              displayCurrentWeatherData(data)
              
              //function call searchForCity(city)
            });
          } else {
          alert("Error: " + response.statusText);
          }
        })
        .catch(function(error) {
          alert("unable to connect");
        });


  // make a nested call to get the UV data 


  //call getForecast and pass in an arugument or parameter gerForecast(city or searchTerm??)
  //getForecast(city)

  getForecast(searchTerm);

};

getCurrentWeatherData();
        



 var displayCurrentWeatherData =function (weatherData) {

   //currentCityUvIndex.innerHTML = // info from nexted function call (seperate for uv data)

   currentCityTitle.innerHTML = weatherData.name
   currentCityWindSpeed.innerHTML =  weatherData.wind.speed 
   currentCityHumidity.innerHTML = weatherData.main.humidity 
   currentCityTemp.innerHTML = weatherData.main.temp 

  console.log(weatherData);
   
 }
  
  // // create variables to select the elements that will desplay the currentCityTitle, temp, humidity, windspeed uv-index etc. 
  
  // // also need to siplay current date next to the title (use momentjs??)
  
  // // title 
  
  
  
  
  // // temp
  
  


  // //humidity




  // //windspeed



  // //uv-index
  




  // call displayCurrentWeatherData in getCurrentWeatherData()


var displayForecast = function (forecastData) {

forecastCardContainer.innerHTML = ''
  
console.log(forecastData);


for (var i= 0;  i < forecastData.list.length; i+=8 ) {

  var div = document.createElement("div")
    div.classList.add("col-12", "col-md-auto")

                    
var innerHtml = 

'<div class="card forecast-card">' + 
  '<div class="card-body">' +
      '<h5 class="card-title">8/16/2019</h5>' +
      '<p class="card-text">'+forecastData.list[i].weather[0].icon+'</p>' +
      '<p class="card-text">Temp: '+forecastData.list[i].main.temp+'</p>' +
      '<p class="card-text">Humidity:'+forecastData.list[i].main.humidity+'</p>' +
    '</div>' +
'</div>'


div.innerHTML = innerHtml

forecastCardContainer.appendChild(div)


  console.log(forecastData.list[i])

}

}



 // Create a variable that will select the <div> where the forecastwill be displayed

  // loop through the forecast array 

  // for (var i= 0;  i < length; i+8 ) {
    // increment through the array by 8 and it will give us the index at 3pm every day 
    
    // at list[i] get the values for weather.icon, main.temp, main.humidity, dtx reversed 

    // create a variable to select the forecast-card-container 

      //var forecastCardContainer = document.getElementByID("forecast-card-container")

    // dynamically create the below elements and append them 

    //document.write('

                   
                 // ')

                  // append this section of the html to the forecast-card-container 
  //}
  
  


// make a fucntion createSearchHistory(city)

    // take input text and append to searchHistory List 
    //get / set local storage 
    // make search history link searchable 


    
    
    
    searchButtonEl.addEventListener("click", getCurrentWeatherData);