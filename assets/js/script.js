//VARIABLES
var searchBoxLoc = "";
var cityName = "";
var country = "";
var weatherDate = "";
var longtitude = 0;
var latitude = 0;
var weatherObj = [];


//CRS set departure date to tomorrow
var tomorrow = moment().add(01, 'days').format('YYYY-MM-DD');
$("#depDate").attr("value", tomorrow)

// CRS query selectors
var airline = document.getElementById('airline');
var DepartureDate = document.getElementById('DepartureDate');
var DirectFlight = document.getElementById('DirectFlight');
var MinPrice = document.getElementById('MinPrice');


console.log(airline);

/// CRS fetch flight info.

fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/SFO-sky/ORD-sky/anytime", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "a54ca3a1f3msh0c6896d0f1fe25ep12b2bajsn2f4c15928ba5",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
.then(function(response) {
    return response.json();
})
.then(function(json) {

    //create p for airline
    var airlinep = document.createElement("p");
    airline.appendChild(airlinep);
    airlinep.innerHTML = json.Carriers[0].Name;

    //creat p for date
    var DepartureDatep = document.createElement("p");
    DepartureDate.appendChild(DepartureDatep);
    var dateParser = json.Quotes[0].OutboundLeg.DepartureDate.split("T" , 1);
    DepartureDatep.innerHTML = dateParser;

    //create p for direct
    var DirectFlightp = document.createElement("p");
    DirectFlight.appendChild(DirectFlightp);
    DirectFlightp.innerHTML = json.Quotes[0].Direct;

    //create p for direct
    var MinPricep = document.createElement("p");
    MinPrice.appendChild(MinPricep);
    MinPricep.innerHTML = "$" + json.Quotes[0].MinPrice;




    console.log(json)
});


var getFlightInfo = function() {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language);
                console.log(data);
            });
            console.log(response);
        } else {
            alert('error: gitgub user not found');
        }

    });
    
    
  };

//--FIRST fetch the co-ordinates based on the name of the location
function weatherFetch() {
    //DUMMY CITY NAME TO BE REPLACED WITH USER ENTRY FROM TEXT BOX
    searchBoxLoc = "Edison";
    //DUMMY CITY NAME ENDS

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchBoxLoc + "&units=imperial&appid=2fd9f6120b1e5e49f6b0893e50ef57f6")
        .then(function (response) {
            //check if there is a response then json the data and send it to be processed
            if (response.ok) {
                response.json().then(function (data) {
                    //extract the city name and country from this first API
                    cityName = data.name;
                    country = data.sys.country;
                    longtitude = data.coord.lon;
                    latitude = data.coord.lat;
                });
            }

            //display error message if no response
            else {
                alert("INVALID ENTRY");
            }
        })

    //--THEN a fetch to a different API using the co-ordinates of the named location. Returns a more complete weather profile
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longtitude + "&units=imperial&appid=2fd9f6120b1e5e49f6b0893e50ef57f6")
        .then(function (response) {
            //check if there is a response then json the data to be sent for processing
            if (response.ok) {
                response.json().then(function (data) {
                    //send the data to be rendered in HTML
                    dateFinder(data);
                });
            }
            //display error message if no response
            else {
                alert("INVALID ENTRY");
            }
        })
};

//--LAST renders the weather data for the given location on a given date to the correct HTML container
function renderWeatherData(data, date) {
    
    //date formatting
    var dayName = new Date(date).toString().slice(0, 3);
    var d = String(date.getDate()).padStart(2, '0');
    var m = String(date.getMonth() + 1).padStart(2, '0');
    date = dayName + ', ' + m + '/' + d;
    //***********************************************************************************
    //create a new card for each of the three days of weather IN FOUNDATION CSS. ALTER IF CSS IS CHANGED.
    var weatherCardEl = $("<div>")
        .addClass("card");
    var weatherCardTitleEl = $("<div>")
        .addClass("card-divider");
    var weatherCardBodyEl = $("<div>")
        .addClass("card-section");
    var weatherCardFooterEl = $("<div>")
        .addClass("card-divider card-footer");

    //insert the city name and country as well as an icon depicting the weather conditions
    var cityNameContainerEl = $("<h2>")
        .text("City of: " + cityName + ", " + country + " (" + date + ")");
    var currentWeatherIcon = data.current.weather;
    currentWeatherIconEl = $("<img>")
        .attr("src", "http://openweathermap.org/img/wn/" + currentWeatherIcon[0].icon + "@2x.png");
    $(weatherCardTitleEl).append(cityNameContainerEl).append(currentWeatherIconEl);


    //TEMPERATURE
    var temperature = $("<div>")
        .text("Current temp: " + data.current.temp + "°F");
    $(weatherCardBodyEl).append(temperature);

    //WINDSPEED
    var windSpeed = $("<div>")
        .text("Wind Speed: " + data.current.wind_speed + " MPH");
    $(weatherCardBodyEl).append(windSpeed);

    //HUMIDITY
    var humidity = $("<div>")
        .text("Humidity: " + data.current.humidity + "%");
    $(weatherCardBodyEl).append(humidity);

    //UV INDEX WITH DIFFERENT TEXT COLORS BASED ON SEVERITY
    if (data.current.uvi <= 2) {
        var uvIndex = $("<div>")
            .addClass("text-success bg-dark")
            .text("UV Index: " + data.current.uvi);
        $(weatherCardFooterEl).append(uvIndex);
    }

    else if (data.current.uvi <= 5 && data.current.uvi > 2) {
        var uvIndex = $("<div>")
            .addClass("text-warning bg-dark")
            .text("UV Index: " + data.current.uvi);
        $(weatherCardFooterEl).append(uvIndex);
    }

    else if (data.current.uvi <= 7 && data.current.uvi > 5) {
        var uvIndex = $("<div>")
            .addClass("text-orange bg-dark")
            .text("UV Index: " + data.current.uvi);
        $(weatherCardFooterEl).append(uvIndex);
    }

    else if (data.current.uvi <= 10 && data.current.uvi > 7) {
        var uvIndex = $("<div>")
            .addClass("text-danger bg-dark")
            .text("UV Index: " + data.current.uvi);
        $(weatherCardFooterEl).append(uvIndex);
    }

    else {
        var uvIndex = $("<div>")
            .addClass("text-violet bg-dark")
            .text("UV Index: " + data.current.uvi);
        $(weatherCardFooterEl).append(uvIndex);
    };

    $(weatherCardEl).append(weatherCardTitleEl);
    $(weatherCardEl).append(weatherCardBodyEl);
    $(weatherCardEl).append(weatherCardFooterEl);
    $("#weather-container").append(weatherCardEl);
};

//FUNCTIONALITY TO PICK A DATE FROM A CALENDAR
$(function () {
    $("#date-pick").datepicker({ minDate: 0, maxDate: "+7D" });
});

function dateFinder(data) {
    weatherDate = $("#date-pick").val();
    for (i = 1; i >= -1; i--) {
        var dayPredict = new Date(weatherDate);
        dayPredict.setDate(dayPredict.getDate() - i);
        renderWeatherData(data, dayPredict);
    };
};

