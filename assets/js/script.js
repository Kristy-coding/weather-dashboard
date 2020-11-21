
var currentCityTitle = document.getElementById("current-city-title");

var currentCityTemp = document.getElementById("current-city-temp");

var currentCityUvIndex = document.getElementById("uv-index");

var currentCityWindSpeed = document.getElementById("current-city-wind");

var currentCityHumidity = document.getElementById("current-city-humidity");

var currentCityUvIndex = document.getElementById("uv-index");

var searchInput =  document.querySelector('#searchTerm')

var forecastCardContainer = document.getElementById("forecast-card-container");

var searchHisotyListEl = document.getElementById("search-history-list");

var searchButtonEl = document.getElementById("search-btn");

var storedSearchTerm = [];








var getUvData = function (coordinates) {

  console.log(coordinates);

  var lat = coordinates.city.coord.lat

  console.log(lat);

  var lon = coordinates.city.coord.lon

  console.log(lon);
     
fetch("http://api.openweathermap.org/data/2.5/uvi?lat="+ lat +"&lon="+ lon +"&appid=aeed2b4f76bdbe411a612dd49400c7d4")

  .then(function(response) {
    if (response.ok){
      response.json().then(function(data) {

        // call displayUvData and pass the data as an argument 

        console.log(data)

        displayUvData(data);
        
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
    // if internet is down? error type???
    alert("unable to");
  });

 }


var getForecast = function(city) {
    
// format the response/promise
 var forecastApiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=aeed2b4f76bdbe411a612dd49400c7d4&units=imperial"
  
 // make a request to the url
  fetch(forecastApiUrl)
    .then(function(response) {
      if (response.ok){
        response.json().then(function(data) {

          // call displayForecast and pass the data as an argument 
          console.log(data);

          displayForecast(data);
          getUvData(data);
    
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      // if internet is down? error type???
      alert("unable to connect");
    });
};


var getSearchValue = function (event) {
  // to prevent form submission to refreshing the page 
  if (event) {
    event.preventDefault();
    }
    
    var searchTerm = searchInput.value;
  
    console.log(searchTerm);

  
    // call getCurrentWeatherData with searchTerm 
    getCurrentWeatherData(searchTerm)

    // save the user input in local storage 
    saveSearchTerm(searchTerm)

    createSearchHistory()

};

// var getSearchHistoryValue = function (event) {

//   var searchTerm = event.target

//   console.log(event.target)

//   displayCurrentWeatherData(searchTerm)
  
// };

var saveSearchTerm = function (searchTerm) {

   localStorage.setItem("city",searchTerm)
  
  //storedSearchTerm.push()
 

};



var createSearchHistory = function () {

  storedSearchTerm = localStorage.getItem("city")


  // loop through storedSearchTerm array to create them??

  // creeate list items to be displayed as a search history list 
  var li = document.createElement("li")
  li.classList.add("list-group-item")

  li.innerHTML = '<button class="btn search-history-btn" value="city">'+ storedSearchTerm + '</button>'

  searchHisotyListEl.appendChild(li);
  
};

createSearchHistory();


// fetch data for current weather of searchTerm 
var getCurrentWeatherData = function(searchTerm) {

  var currentWeatherDataApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=aeed2b4f76bdbe411a612dd49400c7d4&units=imperial"



    //format the response/promise
    fetch(currentWeatherDataApiUrl)
        .then(function(response) {
          if (response.ok){
            response.json().then(function(data) {

              // call displayCurrentWeatherData and pass data as an argument to both functions
              displayCurrentWeatherData(data)
              
            });
          } else {
          alert("Error: " + response.statusText);
          }
        })
        .catch(function(error) {
          alert("unable to connect");
        });

  //call getForecast and pass in an arugument or parameter gerForecast(city or searchTerm??)
  //getForecast(city)

  getForecast(searchTerm);

};

      
 var displayCurrentWeatherData =function (weatherData) {

  var iconUrl = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

  
   currentCityTitle.innerHTML = weatherData.name + '<span> ('+ moment().format('ll') + ') </span>' +'<img src="' + iconUrl + '">' 
   currentCityWindSpeed.innerHTML =  weatherData.wind.speed 
   currentCityHumidity.innerHTML = weatherData.main.humidity 
   currentCityTemp.innerHTML = weatherData.main.temp 


  searchInput.value = ""
   
 };


 var displayUvData = function (uvdata) {

  currentCityUvIndex.innerHTML = uvdata.value
   
 }


var displayForecast = function (forecastData) {

  forecastCardContainer.innerHTML = ''
  
  //console.log(forecastData);

  
  for (var i= 0;  i < forecastData.list.length; i+=8 ) {

    date =[moment().add(1,'days').format('L'),moment().add(2,'days').format('L'),moment().add(3,'days').format('L'),moment().add(4,'days').format('L'),moment().add(5,'days').format('L')]

    // had to create a second for loop to iterate over to increment the data 
    for(vari=0; i<date.length; i++){

   

      var forecastiIconUrl = "http://openweathermap.org/img/w/" + forecastData.list[i].weather[0].icon + ".png";

      var div = document.createElement("div")
      div.classList.add("col-12", "col-md-auto")

                    
      var innerHtml = 

     '<div class="card forecast-card">' + 
        '<div class="card-body">' +
            '<h5 class="card-title">'+ date[i] +'</h5>' +
            '<p class="card-text"><img src="' + forecastiIconUrl + '"></p>' + 
            '<p class="card-text">Temp: '+forecastData.list[i].main.temp+' °F</p>' +
           '<p class="card-text">Humidity: '+forecastData.list[i].main.humidity+'%</p>' +
          '</div>' +
      '</div>'




      div.innerHTML = innerHtml

      forecastCardContainer.appendChild(div)
    
    } 

  }

};



// get current weather data is called from page load with an item from local storage 
getCurrentWeatherData(localStorage.getItem("city"));
    
searchButtonEl.addEventListener("click", getSearchValue);

//searchHistoryList.addEventListener("click", getSearchHistoryValue);

    

    


