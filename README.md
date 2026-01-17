# 🌌 Atmosphere | Immersive Weather Visualizer

Atmosphere is a weather application that prioritizes environmental immersion over raw data. Built with Vanilla JavaScript and the OpenWeatherMap API, the entire UI dynamically adapts its theme based on real-world conditions and astronomical time.

## ✨ Features
- Dynamic Environments: Smoothly transitions between Day/Night and various weather states (Clear, Rainy, Cloudy).
- Real-Time Astronomy: Uses Unix timestamps to compare current local time against sunrise/sunset data, triggering a "Night Mode" automatically.
- Custom Particles: A custom-built CSS/JS engine to generate randomized rain particles during stormy conditions.
- Responsive UX: Minimalist interface with backdrop-blur glassmorphism effects.

## 🛠️ Technical Breakdown
- Asynchronous Logic: Handles real-time API fetches with async/await and error handling.
- DOM Manipulation: Dynamically generates and cleans up rain elements to optimize performance.
- CSS Transitions: Utilizes long-duration linear transitions for background gradients to create a "mood fade" effect.

## 🚀 How to use
Simply type a city name (e.g., "Paris" or "Tokyo") and press Enter. The interface will shift to match the city's current vibe.