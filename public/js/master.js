const pushData = document.getElementById("weather-wrapper");
const formInput = document.querySelector("#weather-form>input");

document
  .querySelector("#weather-form>button")
  .addEventListener("click", event => {
    event.preventDefault();
    const getInputValue = formInput.value;
    fetch(`http://localhost:3000/weather?address=${getInputValue}`).then(
      response => {
        response.json().then(data => {
          if (data.error) {
            pushData.innerHTML = data.error;
          } else {
            pushData.innerHTML = `<h4>Your selected location: ${data.location}</h4>
            <p>Forecast summary: ${data.forecast.summary}</p>
            <div>Temperature: ${data.forecast.temperature}</div>
            <div>Chance of rain: ${data.forecast.chanceOfRain}%</div>`;
          }
        });
      }
    );
  });
