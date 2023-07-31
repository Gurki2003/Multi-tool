// WEATHER

// ######################################################################
const APIKey = "";
const city = "";

const weatherBox = document.querySelector(".weather-box");
const image = document.querySelector(".weather-box img");
const error404 = document.querySelector(".not-found");
var bool = true;

var yo =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

var alerten = `https://api.openweathermap.org/data/2.5/weather?q=x${city}&units=metric&appid=${APIKey}`;

function start() {
  if (bool == true) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={APIKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          weatherBox.style.display = "none";
          return;
        }

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "https://i.postimg.cc/RZ5WNqZD/clear.png";
            break;

          case "Rain":
            image.src = "https://i.postimg.cc/wjX7JHtT/snow.png";
            break;
          case "Drizzle":
            image.src = "https://i.postimg.cc/zXRLzT8h/rain.png";
            break;
          case "Snow":
            image.src = "https://i.postimg.cc/zXRLzT8h/rain.png";
            break;

          case "Clouds":
            image.src = "https://i.postimg.cc/gc7XbgFd/cloud.png";
            break;

          case "Haze":
            image.src = "https://i.postimg.cc/J0SG3zct/mist.png";
            break;

          default:
            image.src = "https://i.postimg.cc/yN7Wy59h/404.png";
        }

        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        weatherBox.style.display = "";
        weatherBox.classList.add("fadeIn");
      });
  }
  bool = false;
}

start();
// #################################################################

// SONG

document.querySelector("button.play").addEventListener("click", function () {
  const SelTrack = document.querySelector("select").value;

  chrome.runtime.sendMessage({ name: "sw-playTrack", track: SelTrack });
});

document.querySelector("button.pause").addEventListener("click", function () {
  chrome.runtime.sendMessage({ name: "sw-pauseTrack" });
});

//##########################################################

// TIMER

document.querySelector("button.play").addEventListener("click", function () {
  const value = 1;
  const response = chrome.runtime.sendMessage({ value });
  console.log(response);
});

// ##################################################

// Scrapper

document
  .querySelector("button.scrap")
  .addEventListener("click", async function () {
    const product_url = document.getElementById("scrap_input").value;
    const base_url =
      "https://cors-anywhere.herokuapp.com/https://www.pricebefore.com/search/?category=all&q=";
    // const base_url = "https://cors-anywhere.herokuapp.com/https://camelcamelcamel.com/product/B08KSGZ261";
    const call_url = base_url + product_url;
    const output = document.getElementById("scrap_display");
    
    var flag = 0;
    // Make an HTTP request to the website
    await fetch(call_url, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((html) => {
        // Parse the HTML response
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const allPrices = doc.getElementsByClassName(
          "cmo-product-price-overview"
        )[0];
        const currentPrice =
          allPrices?.querySelector(".js-product-price")?.textContent;
        const highestPrice =
          allPrices.querySelector(".highest").nextElementSibling.textContent;
        const lowestPrice =
          allPrices.querySelector(".lowest").nextElementSibling.textContent;

        console.log("Current Price:", currentPrice);
        console.log("Lowest Price:", lowestPrice);
        console.log("Highest Price:", highestPrice);
        
        output.innerHTML= `Current : ${currentPrice}<br>`;
        output.innerHTML += `Lowest : ${lowestPrice}<br>`;
        output.innerHTML += `Highest : ${highestPrice}`;

        // output.innerHTML = `<div>
        //                           <p>Current Price: ${currentPrice}</p>
        //                           <p>Lowest Price: ${lowestPrice}</p>
        //                           <p>Highest Price: ${highestPrice}</p>
        //                     </div>
        //                       `;
      })
      .catch((error) => {
        flag = 1;
        output.innerHTML = "This is newly launched product so NO Data";
        console.log("Error:", error);
      });
    if (flag == 1) {
      output.innerHTML = "This is newly launched product so NO Data";
    }
  });

