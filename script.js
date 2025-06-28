const apiKey = "Enter_Your_API_Key"; // Enter your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const cityName = data.name;
    const country = data.sys.country;

    document.getElementById("weatherResult").innerHTML = `
      <h3>${cityName}, ${country}</h3>
      <img src="${iconUrl}" alt="${description}" />
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Forecast:</strong> ${description}</p>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

async function autocompleteCity() {
  const input = document.getElementById("cityInput").value;
  const suggestionsBox = document.getElementById("suggestions");

  if (input.length < 1) {
    suggestionsBox.innerHTML = "";
    return;
  }

  console.log("Autocomplete triggered:", input);

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(input)}&limit=5&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const cities = await response.json();

    if (!Array.isArray(cities) || cities.length === 0) {
      suggestionsBox.innerHTML = "<div>No matches found</div>";
      return;
    }

    suggestionsBox.innerHTML = cities.map(city =>
      `<div style="cursor:pointer; padding:5px;" onclick="selectCity('${city.name}, ${city.country}')">${city.name}, ${city.country}</div>`
    ).join("");
  } catch (err) {
    console.error("Error fetching city data:", err);
    suggestionsBox.innerHTML = "<div style='color:red;'>Error loading suggestions</div>";
  }
}


function selectCity(cityName) {
  document.getElementById("cityInput").value = cityName;
  document.getElementById("suggestions").innerHTML = "";
}
