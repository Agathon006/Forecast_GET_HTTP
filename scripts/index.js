let httpRequest = new XMLHttpRequest();
httpRequest.onload = function () {
  parsedRequest = JSON.parse(httpRequest.responseText);
  console.log(JSON.parse(httpRequest.responseText));
  document.querySelector('#city').textContent = parsedRequest.city.name;
  var currentDate = new Date();
  document.querySelector('#time').textContent = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
  let currentIcon = document.createElement('img');
  currentIcon.src = `../images/${parsedRequest.list[0].weather[0].icon}.png`;
  document.querySelector('#weather-icon').appendChild(currentIcon);
  document.querySelector('#weather-info').textContent = parsedRequest.list[0].weather[0].main;
  document.querySelector('#temperature').textContent = `${Math.round(parsedRequest.list[0].main.temp)}°С`;
  document.querySelector('#speed-number').textContent = `${Math.round(parsedRequest.list[0].wind.speed * 10) / 10} m/s`;
  for (let i = 0; i < 40; i += 8) {
    document.querySelector(`#date-${i / 8}`).textContent = parsedRequest.list[i].dt_txt.slice(0, 10);
    document.querySelector(`#current-time-${i / 8}`).textContent = parsedRequest.list[i].dt_txt.slice(10);
    let forecastIcon = document.createElement('img');
    forecastIcon.src = `../images/${parsedRequest.list[i].weather[0].icon}.png`;
    document.querySelector(`#forecast-icon-${i / 8}`).appendChild(forecastIcon);
    document.querySelector(`#forecast-temperature-${i / 8}`).textContent = `${Math.round(parsedRequest.list[i].main.temp)}°С`;
  }
};
navigator.geolocation.getCurrentPosition(
  function (position) {
    httpRequest.open('Get', `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=a94d0a5ac08570add4b47b8da933f247&units=metric`);
    httpRequest.send();
  }
);