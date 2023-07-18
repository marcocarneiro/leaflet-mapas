const boxmapa = document.getElementById('map')


var renderRota = ()=>{
    var txt_inicio = document.getElementById('txt_inicio')
    var txt_final = document.getElementById('txt_final')
    var urlInicio = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + txt_inicio.value
    var urlFinal = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + txt_final.value
    
    fetch(urlInicio)
        .then(response => response.json())
        .then(data => {
            boxmapa.setAttribute('latinicio', data[0].lat)
            boxmapa.setAttribute('loninicio', data[0].lon)
        })
        .catch(err => console.log(err))
        
    fetch(urlFinal)
        .then(response => response.json())
        .then(data => {
            boxmapa.setAttribute('latfinal', data[0].lat)
            boxmapa.setAttribute('lonfinal', data[0].lon)
        })
        .catch(err => console.log(err))
}

var getDadosMapa = ()=>{    
    //Renderiza o mapa com a rota
    var map = L.map('map');
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'OSM'
    }).addTo(map);

    L.Routing.control({
        waypoints: [
            L.latLng(boxmapa.getAttribute('latinicio'), boxmapa.getAttribute('loninicio')), 
            L.latLng(boxmapa.getAttribute('latfinal'), boxmapa.getAttribute('lonfinal'))
        ],
        routeWhileDragging: true
    }).addTo(map); 
}