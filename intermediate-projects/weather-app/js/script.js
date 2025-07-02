//ac1d253a-5792-11f0-bed1-0242ac130006-ac1d25ee-5792-11f0-bed1-0242ac130006
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#weather-form");
  const cityInput = document.querySelector("#city-input");
  const cityName = document.querySelector("#city-name");
  const temperature = document.querySelector("#temperature");
  const description = document.querySelector("#description");
  const icon = document.querySelector("#icon");
  const weatherResult = document.querySelector("#weather-result");
  const errorMessage = document.querySelector("#error-message");
  const apiKey = "7d14f47485cc0e1d3c1db319d1263985";

  async function getWeather(city) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric&lang=pt_br`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Cidade não encontrada");
      }

      const data = await response.json();

      console.log(data);

      cityName.textContent = data.name;
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      description.textContent = data.weather[0].description;
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      weatherResult.classList.remove("hidden");
      errorMessage.classList.add("hidden");
    } catch (error) {
      weatherResult.classList.add("hidden");
      errorMessage.classList.remove("hidden");
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city !== "") {
      getWeather(city);
      cityInput.value = "";
    }
  });
});
