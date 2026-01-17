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
    const bg = document.getElementById("bg");
    const temp = document.getElementById('temp');
    const desc = document.getElementById('description');
    const overlay = document.getElementById('overlay');
    
    const mainWeather = data.weather[0].main.toLowerCase();
    
    // Check if it's night in that specific city
    const isNight = data.dt > data.sys.sunset || data.dt < data.sys.sunrise;
    
    temp.innerText = Math.round(data.main.temp) + "°";
    desc.innerText = data.weather[0].description;
    overlay.innerHTML = ""; 

    if (isNight) {
        // Dark Night Theme
        bg.style.background = "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)";
        if (mainWeather.includes("rain")) makeItRain();
    } else {
        // DAY THEMES - Fixed Priority
        if (mainWeather.includes("rain") || mainWeather.includes("drizzle")) {
            bg.style.background = "#4b6584"; 
            makeItRain();
        } 
        // We check CLEAR first so "Scattered Clouds" doesn't hide the sun
        else if (mainWeather.includes("clear")) {
            bg.style.background = "linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)";
        } 
        // Brighter Grey for clouds so it looks like daytime
        else if (mainWeather.includes("cloud")) {
            bg.style.background = "linear-gradient(to bottom, #bdc3c7, #2c3e50)"; 
        } 
        else {
            bg.style.background = "linear-gradient(to bottom, #4facfe, #00f2fe)"; 
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

