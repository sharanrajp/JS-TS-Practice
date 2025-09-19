document.addEventListener("DOMContentLoaded", () => {
  const locationEl = document.getElementById("location");
  const dateEl = document.getElementById("date");
  const tempEl = document.getElementById("temp");
  const condEl = document.getElementById("condition");
  const rainEl = document.getElementById("rain");
  const humidityEl = document.getElementById("humidity");
  const windEl = document.getElementById("wind");
  const forecastEl = document.getElementById("forecast");
  const calendarEl = document.getElementById("calendar");
  const toggleBtn = document.getElementById("toggleCalendar");

  // Background mapping
  const weatherBackgrounds = {
    Clear: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80')",
    Cloudy: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')",
    Rain: "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1920&q=80')",
    Snow: "url('https://images.unsplash.com/photo-1608889176935-d01d9b709584?auto=format&fit=crop&w=1920&q=80')",
    Storm: "url('https://images.unsplash.com/photo-1500674425229-f692875b0ab7?auto=format&fit=crop&w=1920&q=80')",
    Default: "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7b?auto=format&fit=crop&w=1920&q=80')"
  };

  function updateBackground(condition) {
    const bg = weatherBackgrounds[condition] || weatherBackgrounds.Default;
    document.body.style.backgroundImage = bg;
  }

  // Fake sample daily data (replace with API later)
  const today = new Date();
  const sampleWeather = [
    { date: 1, temp: 22, cond: "Cloudy", rain: 30, humidity: 60, wind: 12 },
    { date: 2, temp: 24, cond: "Clear", rain: 10, humidity: 55, wind: 8 },
    { date: 3, temp: 18, cond: "Rain", rain: 70, humidity: 85, wind: 20 },
    { date: 4, temp: 5, cond: "Snow", rain: 20, humidity: 90, wind: 10 },
    { date: 5, temp: 28, cond: "Storm", rain: 90, humidity: 95, wind: 25 }
  ];

  // Show today's weather by default
  locationEl.textContent = "Paris";
  dateEl.textContent = today.toDateString();
  showWeather(sampleWeather[0]);

  // Render forecast (just 5-day preview here)
  forecastEl.innerHTML = sampleWeather
    .map(
      (d) => `
      <div class="forecast-day">
        <div>${d.date}</div>
        <div>${d.cond === "Clear" ? "☀️" : d.cond === "Cloudy" ? "☁️" : d.cond === "Rain" ? "🌧️" : d.cond === "Snow" ? "❄️" : "⛈️"}</div>
        <div>${d.temp}°</div>
      </div>`
    )
    .join("");

  // Render calendar
  function renderCalendar() {
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    calendarEl.innerHTML = "";

    // Empty slots
    for (let i = 0; i < firstDay.getDay(); i++) {
      const empty = document.createElement("div");
      calendarEl.appendChild(empty);
    }

    // Fill days
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";

      // Find weather data for this day if available
      const dayWeather = sampleWeather.find((w) => w.date === d);

      if (dayWeather) {
        dayDiv.innerHTML = `
          <strong>${d}</strong><br/>
          ${dayWeather.cond === "Clear" ? "☀️" : dayWeather.cond === "Cloudy" ? "☁️" : dayWeather.cond === "Rain" ? "🌧️" : dayWeather.cond === "Snow" ? "❄️" : "⛈️"}
        `;

        // Click event
        dayDiv.addEventListener("click", () => {
          showWeather(dayWeather);
        });
      } else {
        dayDiv.textContent = d;
      }

      calendarEl.appendChild(dayDiv);
    }
  }

  renderCalendar();

  // Show weather details in main card
  function showWeather(data) {
    tempEl.textContent = `${data.temp}°`;
    condEl.textContent = data.cond;
    rainEl.textContent = `${data.rain}%`;
    humidityEl.textContent = `${data.humidity}%`;
    windEl.textContent = `${data.wind} km/h`;
    dateEl.textContent = `${today.toLocaleString("default", {
      month: "long"
    })} ${data.date}, ${today.getFullYear()}`;

    updateBackground(data.cond);
  }

  toggleBtn.addEventListener("click", () => {
    calendarEl.classList.toggle("hidden");
    toggleBtn.textContent = calendarEl.classList.contains("hidden")
      ? "📅 Show Calendar"
      : "❌ Hide Calendar";
  });
});
