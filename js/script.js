const apiKey = "2382162206ae137946f178c5fb6e0416";

const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-txt");
const cityName = document.querySelector("#city-name");
const icon = document.querySelector("#icon");
const temperature = document.querySelector("#temp");
const humidity = document.querySelector("#humidity-div");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // ป้องกันการส่ง form
        findWeatherDetails();
    }
}

function theResponse(response) {
    const jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name;
    icon.src = "https://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
    humidity.innerHTML = jsonObject.main.humidity + "%";
}

function findWeatherDetails() {
    if (searchInput.value === "") {
        // Handle empty input case here if needed
    } else {
        const searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + apiKey;
        httpRequestAsync(searchLink, theResponse);
    }
}

function httpRequestAsync(url, callback) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            callback(httpRequest.responseText);
        }
    };
    httpRequest.open("GET", url, true);
    httpRequest.send();
}