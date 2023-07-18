var map = L.map('map');

L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'OSM'
}).addTo(map);

L.Routing.control({
    waypoints: [
        L.latLng(-23.1805885, -45.8620117),  
        L.latLng(-23.1574846, -45.79224672423055)  
    ],
    routeWhileDragging: true
}).addTo(map);