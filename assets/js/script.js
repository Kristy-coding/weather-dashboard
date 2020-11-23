
var currentCityTitle = document.getElementById("current-city-title");

var currentCityTemp = document.getElementById("current-city-temp");

var currentCityUvIndex = document.getElementById("uv-index");

var currentCityWindSpeed = document.getElementById("current-city-wind");

var currentCityHumidity = document.getElementById("current-city-humidity");

var currentCityUvIndex = document.getElementById("uv-index");

var searchInput =  document.querySelector('#searchTerm')

var forecastCardContainer = document.getElementById("forecast-card-container");

var searchHistoryListEl = document.getElementById("search-history-list");

var searchButtonEl = document.getElementById("search-btn");

var cityList = [];




var getSearchValue = function (event) {

    // to prevent form submission to refreshing the page 
    if (event) {
      event.preventDefault();
    }
    
    var searchTerm = searchInput.value;
  
    //console.log(searchTerm);

  
    // call getCurrentWeatherData with searchTerm 
    getCurrentWeatherData(searchTerm);

    // save the user input in local storage 
    saveSearchTerm(searchTerm);

    loadSearchHistory();

};


var getUvData = function (coordinates) {

    //console.log(coordinates);

  var lat = coordinates.city.coord.lat

    //console.log(lat);

  var lon = coordinates.city.coord.lon

    //console.log(lon);
     
  fetch("https://api.openweathermap.org/data/2.5/uvi?lat="+ lat +"&lon="+ lon +"&appid=aeed2b4f76bdbe411a612dd49400c7d4")

  .then(function(response) {
    if (response.ok){
      response.json().then(function(data) {

        // call displayUvData and pass the data as an argument 

        //console.log(data)

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

};


var getForecast = function(city) {
    
 // format the response/promise
 var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=aeed2b4f76bdbe411a612dd49400c7d4&units=imperial"
  
 // make a request to the url
  fetch(forecastApiUrl)
    .then(function(response) {
      if (response.ok){
        response.json().then(function(data) {

          // call displayForecast and pass the data as an argument 
          //console.log(data);

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

// fetch data for current weather of searchTerm 

var getCurrentWeatherData = function(searchTerm) {

  var currentWeatherDataApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=aeed2b4f76bdbe411a612dd49400c7d4&units=imperial"

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

  getForecast(searchTerm);

};

      
 var displayCurrentWeatherData =function (weatherData) {

  // had to get Icon url seperately from data 

  var iconUrl = "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

  
   currentCityTitle.innerHTML = weatherData.name + '<span> ('+ moment().format('ll') + ') </span>' +'<img src="' + iconUrl + '">' 
   currentCityWindSpeed.innerHTML =  weatherData.wind.speed 
   currentCityHumidity.innerHTML = weatherData.main.humidity 
   currentCityTemp.innerHTML = weatherData.main.temp 


  searchInput.value = ""
   
 };


 var displayUvData = function (uvdata) {

  currentCityUvIndex.innerHTML = uvdata.value
   
 };


var displayForecast = function (forecastData) {

  forecastCardContainer.innerHTML = ''

  // increment by +8 so that you get a forecast for each day. The array is 40 so if we increment by 8 we should get a forecast for the same time each day 

  for (var i= 0;  i < forecastData.list.length; i+=8 ) {

    date =[moment().add(1,'days').format('L'),moment().add(2,'days').format('L'),moment().add(3,'days').format('L'),moment().add(4,'days').format('L'),moment().add(5,'days').format('L')]

    // had to create a second for loop to iterate over to increment the data 
    for(vari=0; i<date.length; i++){


      var forecastiIconUrl = "https://openweathermap.org/img/w/" + forecastData.list[i].weather[0].icon + ".png";

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
    
    }; 

  };

};


// save search history to local storage, this function is being call as soon as the user inputs a city 

var saveSearchTerm = function (searchTerm) {


  //localStorage.setItem("city", searchTerm)


    // I wanted to figure out how to limit number of items in an array so tutor helped me find unshift() insted of push 
    // looked at array methods: pop(), shift(), unshift(), push()
    //unshift() will add new searches to the front of the array insted of the end
    cityList.unshift(searchTerm); 

    // limit number of cities in array to 10, slice() is going to slice off any of the data after and including index 10
    cityList = cityList.slice(0,10);
  

    localStorage.setItem("cityList",JSON.stringify(cityList))

};


var loadSearchHistory = function () {

  // get the array from local storage or set it equal to an empty array if nothing in local storage so don't get a null value 
  cityList = JSON.parse(localStorage.getItem("cityList")) || [];

  //console.log(cityList);
  

  // clear the inner HTML that is on the page so that the stored array gets generated on a fresh page and not added on top of the array that is there 
  searchHistoryListEl.innerHTML = ""

  // loop through cityList array that is stored in local storage and dynamically create persistant list items 

  for (var i= 0; i < cityList.length; i++){

  var li = document.createElement("li")

    li.classList.add("list-group-item")

    li.innerHTML = '<button class="btn search-history-btn" value="'+ cityList[i]+'">'+ cityList[i] + '</button>'

    searchHistoryListEl.appendChild(li);

  }
 
};

// when a button is clicked I used event delegation to call getCurrentWeatherData value of the button that was clicked using event.target.value
var searchHistoryHandler = function (event) {

  var button = (event.target);
  if (button.classList.contains("search-history-btn")) {

    getCurrentWeatherData(button.value);

  }  
};




// on page load I want search history to be displayed, so call it at bottom of page 

loadSearchHistory();

// get current weather data is called from page load with a defaultSearchTerm that I set as the first value of the cityList array using cityList.shift()

var defaultSearchTerm = (cityList.shift()) ;

getCurrentWeatherData(defaultSearchTerm);
    
searchButtonEl.addEventListener("click", getSearchValue);

searchHistoryListEl.addEventListener("click", searchHistoryHandler);

    

    


