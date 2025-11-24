const map = L.map('map');
const mapZoomLevel = 13;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: mapZoomLevel,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function showUserLocationOnMap(){  
    if (!navigator.geolocation) {
        console.log("Geolocatie wordt niet ondersteund.");
        return;
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        map.setView([lat, lon], mapZoomLevel);
        L.marker([lat, lon]).addTo(map)
            .bindPopup('Je bevindt je hier!')
            .openPopup();
    }, (error)=>{
        console.error(error.message);
    });

    showWeatherMapOverlay()
}

showUserLocationOnMap();

function showWeatherMapOverlay(){
    const apiKey = 'JOUW_SLEUTEL_HIER'; // Vervang door je OpenWeatherMap API-sleutel
    const layerType = 'clouds_new'; 
    // Beschikbare lagen (https://openweathermap.org/api/weathermaps): 
        //  'temp_new' -> Temperatuur,
        //  'clouds_new' -> Bewolking, 
        //  'precipitation_new' -> Neerslag, 
        //  'wind_new' -> Wind, 
        //  'pressure_new' -> Luchtdruk
    const tileUrl = `https://tile.openweathermap.org/map/${layerType}/{z}/{x}/{y}.png?appid=${apiKey}`; 
    
    const weatherLayer = L.tileLayer(tileUrl, {
        maxZoom: mapZoomLevel,
        attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
        opacity: 0.9 // Transparantie van de laag met weersinformatie
    });
    weatherLayer.addTo(map);
}
