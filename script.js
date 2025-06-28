 const apiKey = "Your_API_Key_Here"; //enter you api key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const temp = data.current.temp_c;
    const humidity = data.current.humidity;
    const description = data.current.condition.text;
    const iconUrl = "https:" + data.current.condition.icon;
    const cityName = data.location.name;
    const country = data.location.country;

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

  const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${input}`;

  try {
    const response = await fetch(url);
    const cities = await response.json();

    suggestionsBox.innerHTML = cities.map(city =>
      `<div onclick="selectCity('${city.name}, ${city.country}')">${city.name}, ${city.country}</div>`
    ).join("");
  } catch {
    suggestionsBox.innerHTML = "";
  }
}

function selectCity(cityName) {
  document.getElementById("cityInput").value = cityName;
  document.getElementById("suggestions").innerHTML = "";
}
