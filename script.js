// Create the map object
var map = L.map('map', {
    maxZoom: 18, // Set maximum zoom level to 18
    zoomControl: false, // Disable zoom control
    scrollWheelZoom: false // Disable scroll wheel zooming
}).setView([12.842666, 80.154612], 17);

// Add the tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to handle marker click events
function onMarkerClick(e) {
    var markerTitle = e.target.getPopup().getContent(); // Get marker title
    fetch('mapsheet.csv') // Fetch CSV file
        .then(response => response.text()) // Get response as text
        .then(data => {
            var lines = data.split('\n');
            var eventData = '';
            for (var i = 0; i < lines.length; i++) {
                var parts = lines[i].split(',');
                if (parts[0] === markerTitle) {
                    for (var j = 1; j < parts.length; j++) {
                        eventData += parts[j] + '<br>'; // Concatenate event data vertically downwards
                    }
                }
            }
            if (eventData) {
                // Display event data in the event list
                var eventList = document.getElementById('event-list');
                eventList.innerHTML = '<h2>' + markerTitle + '</h2>' + '<p>' + eventData + '</p>';
            }
        });
}

// Add custom markers with popups
var customIcon = L.icon({
    iconUrl: 'marker2.png',
    iconSize: [45, 60],
    iconAnchor: [16, 32],
    popupAnchor: [0, 0]
});

var markers = [
    L.marker([12.843995, 80.153438], {icon: customIcon}).bindPopup("AB1"),
    L.marker([12.842947, 80.156505], {icon: customIcon}).bindPopup("AB2"),
    L.marker([12.839659, 80.155106], {icon: customIcon}).bindPopup("MG Auditorium")
];

// Add click event listeners to markers
markers.forEach(function(marker) {
    marker.on('click', onMarkerClick);
    marker.addTo(map);
});

// Resize map height dynamically based on viewport size
function resizeMap() {
    var mapElement = document.getElementById('map');
    mapElement.style.height = 100//(window.innerHeight - document.getElementById('header').offsetHeight) + 'px';
}

// Trigger the resize event initially to set the correct height
window.addEventListener('resize', resizeMap);
window.addEventListener('DOMContentLoaded', resizeMap);
