



// fetch data from the server API Open Weather

var getFeaturedWeather = function() {
    
    // format the open weather api url

    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=London&appid=aeed2b4f76bdbe411a612dd49400c7d4"
    // make a request to the url
    fetch(apiUrl)
      .then(function(response) {
        if (response.ok){
          response.json().then(function(data) {
            console.log(data);

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

getFeaturedWeather();


// make a fucntion createSearchHistory(city)

    // we need to take the user input and search for the city and add that URL to the search history
    // make search history link searchable 


// displayFeaturedCity()

    // we need to take the user input and dynamically display the data in the current-city row 


//displayFiveDayForcast()

    // we need to take the user input and dynamically display the 5 -day forcast in the forecast card 
    // apend the forcast data to the hardcoded card-body div 