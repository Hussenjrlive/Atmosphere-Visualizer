const apiKey = "8c6792fcae0c82f3d49e23eaae0b3c93";

async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if(data.cod === 200) {
            updateEnvironment(data);
        } else {
            alert("City not found. Please try again!");
        }
    } catch (error) {
        console.log("Error fetching weather data");
    }
}

// Search on Enter key
document.getElementById('city-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});

function updateEnvironment(data) {
    const bg = document.getElementById('bg');
    const temp = document.getElementById('temp');
    const desc = document.getElementById('description');
    const overlay = document.getElementById('overlay');
    
    const weather = data.weather[0].main.toLowerCase();
    const isNight = data.dt > data.sys.sunset || data.dt < data.sys.sunrise;
    
    temp.innerText = Math.round(data.main.temp) + "°";
    desc.innerText = data.weather[0].description;
    
    overlay.innerHTML = ""; 

    // 1. NIGHT LOGIC
    if (isNight) {
        bg.style.background = "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)";
        desc.innerText += " (Night)";
        // If it's raining at night, still show rain
        if (weather.includes("rain")) makeItRain();
    } 
    // 2. DAY LOGIC
    else {
        if (weather.includes("rain") || weather.includes("drizzle")) {
            bg.style.background = "#4b6584"; 
            makeItRain();
        } else if (weather.includes("clear")) {
            bg.style.background = "linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)";
        } else if (weather.includes("cloud")) {
            bg.style.background = "linear-gradient(to bottom, #757f9a, #d7dde8)";
        } else {
            bg.style.background = "#1a1a2e"; 
        }
    }
}

function makeItRain() {
    const overlay = document.getElementById('overlay');
    for (let i = 0; i < 100; i++) {
        let drop = document.createElement('div');
        drop.className = 'drop';
        drop.style.left = Math.random() * 100 + "vw";
        drop.style.animationDuration = Math.random() * 0.5 + 0.3 + "s";
        drop.style.opacity = Math.random();
        overlay.appendChild(drop);
    }
}