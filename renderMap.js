//FUNÇÕES ///////////////////////

//Renderiza mapa com localização do usuário
var renderLocalUser = async ()=>{
    //captura latitudeitude e longitudeitude do usuário
    //e renderiza o mapa
    let longitude = 0
    let latitude = 0
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((posic)=>{
            longitude = posic.coords.longitude
            latitude = posic.coords.latitude            
            
            let map = L.map('map').setView([latitude, longitude], 20)

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map)

            L.marker([latitude, longitude]).addTo(map).bindPopup('Você está aqui. <br>(O GPS do navegador pode ter imprecisões)').openPopup()
        })            
    }
}

//Renderiza mapa e rota a partir de 2 endereços fornecidos pelo usuário
var renderizaMap = async()=>{
    var txt_inicio = document.getElementById('txt_inicio')
    var txt_final = document.getElementById('txt_final')
    var urlInicio = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + txt_inicio.value
    var urlFinal = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + txt_final.value

    //retorna latitude e longitude dos 2 endereços (openStreetMap)
    await fetch(urlInicio)
        .then(response => response.json())
        .then(data => {
            latinicio = data[0].lat
            loninicio = data[0].lon
        })
        .catch(err => errCoords = 1)
        
    await fetch(urlFinal)
        .then(response => response.json())
        .then(data => {
            latfinal = data[0].lat
            lonfinal = data[0].lon
        })
        .catch(err => errCoords = 1)

    //errCoords = 1 houve erro na consulta
    if(errCoords == 1){
        alert('Um dos endereços contém erro, ou não existem. Tente adicionar a cidade.')
        txt_inicio.value = ''
        txt_final.value = ''
        boxmapa.innerHTML = ''
    }
    
    //Renderiza o mapa com a rota
    boxmapa.innerHTML = ''
    boxmapa.innerHTML = '<div id="map"></div>'
    var map = L.map('map');
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'OSM'
    }).addTo(map);

    L.Routing.control({
        waypoints: [
            L.latLng(latinicio,loninicio), 
            L.latLng(latfinal, lonfinal)
        ],
        routeWhileDragging: true
    }).addTo(map);

}



//VARIÁVEIS GLOBAIS
const boxmapa = document.getElementById('boxmapa')
var errCoords = 0
var latinicio, loninicio, latfinal, lonfinal

boxmapa.innerHTML = ''
boxmapa.innerHTML = '<div id="map"></div>'

//Inicia mostrando mapa com localização do usuário
renderLocalUser()