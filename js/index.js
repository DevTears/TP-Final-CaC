document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
    });
});

var personajes = [];

async function cargarPersonajesDesdeJSON(ruta) {
  try {
    const response = await fetch(ruta);

    if (!response.ok) {
      throw new Error(`Error al cargar el JSON. Código de estado: ${response.status}`);
    }

    const data = await response.json();
    console.log('Datos cargados correctamente:', data);

    return data;
  } catch (error) {
    console.error('Error al cargar el JSON:', error);
    return null;
  }
}

const rutaJSON = '/src/Json/personajes.json';
cargarPersonajesDesdeJSON(rutaJSON).then(personajesCargados => {
    if (personajesCargados) {
        // Asigna los personajes cargados a la variable global
        personajes = personajesCargados;

        // Funciones que dependan del Array
        actualizarCartaPersonaje();
    }
});

var indicePersonajeActual = 0;
// Función para actualizar la información del personaje en la carta
function actualizarCartaPersonaje() {
    var nombrePersonaje = document.querySelector('.informacion-personaje h2');
    var descripcionPersonaje = document.querySelector('.informacion-personaje p');
    var imagenPersonaje = document.querySelector('.imagen-personaje img');
    var habilidades = document.querySelectorAll('.habilidad');

    // Verificar si hay personajes y si el índice es válido
    if (personajes.length > 0 && indicePersonajeActual >= 0 && indicePersonajeActual < personajes.length) {
        var personajeActual = personajes[indicePersonajeActual];

        nombrePersonaje.textContent = personajeActual.nombre;
        descripcionPersonaje.textContent = personajeActual.descripcion;
        imagenPersonaje.src = personajeActual.imagen;

        // Actualiza las habilidades
        habilidades.forEach(function (habilidad, index) {
            var iconoHabilidad = habilidad.querySelector('img');
            var descripcionHabilidad = document.querySelector('#detalle-habilidad-' + (index + 1) + ' p');
            var imgHabilidad = document.querySelector('#detalle-habilidad-' + (index + 1) + ' img');

            // Verificar si hay habilidades y si el índice es válido
            if (personajeActual.habilidades && index < personajeActual.habilidades.length) {
                var habilidadActual = personajeActual.habilidades[index];

                iconoHabilidad.src = habilidadActual.icono;
                descripcionHabilidad.textContent = habilidadActual.descripcion;
                imgHabilidad.src = habilidadActual.img;
            } else {
                console.error('Error: Habilidad no encontrada en el índice ' + index);
            }
        });
    }
}


document.getElementById('anterior-personaje').addEventListener('click', function () {
    indicePersonajeActual = (indicePersonajeActual - 1 + personajes.length) % personajes.length;
    actualizarCartaPersonaje();
});
document.getElementById('siguiente-personaje').addEventListener('click', function () {
    indicePersonajeActual = (indicePersonajeActual + 1) % personajes.length;
    actualizarCartaPersonaje();
});
function toggleDetalleHabilidad(numero) {
    var detalleHabilidad = document.getElementById('detalle-habilidad-' + numero);
    var habilidadIcon = document.querySelector('.habilidad:nth-child(' + numero + ')');

    if (detalleHabilidad.style.display === 'block') {
        detalleHabilidad.style.display = 'none';
        habilidadIcon.classList.remove('habilidad-activa');
    } else {
        // Oculta todos los detalles de habilidades
        var detalles = document.querySelectorAll('.detalle-habilidad');
        detalles.forEach(function (detalle) {
            detalle.style.display = 'none';
        });

        // Quita la clase 'habilidad-activa' de todos los iconos de habilidades
        var iconosHabilidad = document.querySelectorAll('.habilidad');
        iconosHabilidad.forEach(function (icono) {
            icono.classList.remove('habilidad-activa');
        });

        // Muestra el detalle de la habilidad seleccionada y marca como activo el icono
        detalleHabilidad.style.display = 'block';
        habilidadIcon.classList.add('habilidad-activa');
    }
}

actualizarCartaPersonaje();

// Define las categorías y las armas
var categorias = ["Pistolas", "Subfusiles", "Escopetas", "Rifles", "Francotiradores", "Ametralladoras Pesadas", "Cuerpo a Cuerpo"];
var armasPorCategoria = {
    "Pistolas": [
        { nombre: "Classic", imagen: "/src/Valorant/Armas/Pistolas/Classic.webp", descripcion: "El disparo principal realiza disparos precisos al estar quieto y tiene un modo de disparo alternativo para encuentros cercanos." },
        { nombre: "Shorty", imagen: "/src/Valorant/Armas/Pistolas/Shorty.webp", descripcion: "Una escopeta de cañón corto y ágil; letal a corta distancia, pero solo puede disparar dos veces antes de tener que recargarla. Se combina bien con las armas de largo alcance." },
        { nombre: "Frenzy", imagen: "/src/Valorant/Armas/Pistolas/Frenzy.webp", descripcion: "Ametralladora ligera que destaca al disparar en movimiento. Su alta velocidad de disparo puede llegar a ser difícil de controlar, así que prueba ráfagas cortas a media distancia." },
        { nombre: "Ghost", imagen: "/src/Valorant/Armas/Pistolas/Ghost.webp", descripcion: "La Ghost es precisa y tiene un gran cargador en caso de que falles. Los objetivos distantes requieren una tasa de fuego controlada. Presiona rápidamente el gatillo cuando veas lo blanco de sus ojos." },
        { nombre: "Sheriff", imagen: "/src/Valorant/Armas/Pistolas/Sheriff.webp", descripcion: "Sus balas de alto impacto tienen mucho retroceso y se necesitan muchas agallas para dominarlas. Si dominas la Sheriff correctamente, tus enemigos sabrán que no tenían oportunidad." },
    ],
    "Subfusiles": [
        { nombre: "Stinger", imagen: "/src/Valorant/Armas/Subfusiles/Stinger.webp", descripcion: "Este subfusil tiene mayor potencia a corta y larga distancia que los demás, pero a costa de velocidad de disparo y movilidad. Su cargador de 20 rondas se desperdicia en ráfagas llenas de retroceso, pero asesta golpes letales a media distancia con la mira y fuego controlado." },
        { nombre: "Spectre", imagen: "/src/Valorant/Armas/Subfusiles/Spectre.webp", descripcion: "Un arma todoterreno con gran equilibrio de daño, velocidad de disparo y precisión, tanto a corta como larga distancia. Acecha los rincones de cada mapa y solo requiere que apuntes firme para derribar a los enemigos a larga distancia." }
    ],
    "Escopetas": [
        { nombre: "Bucky", imagen: "/src/Valorant/Armas/Escopetas/Bucky.webp", descripcion: "Pesada, pero estable. El disparo principal de la Bucky es para mantener las esquinas cerradas o disparar a corta distancia. El disparo secundario sirve para los objetivos a medio alcance." },
        { nombre: "Judge", imagen: "/src/Valorant/Armas/Escopetas/Judge.webp", descripcion: "La Judge es estable con disparos premeditados, pero volátil si la disparas rápidamente. El disparo principal ataca a los objetivos a corta distancia y tendrás que ser firme para alcanzar todo lo que esté más allá de la longitud de tu brazo." },
    ],
    "Rifles": [
        { nombre: "Bulldog", imagen: "/src/Valorant/Armas/Rifles/Bulldog.webp", descripcion: "Es una bestia a la hora de intercambiar fuego. El disparo alternativo te permite utilizar una mira y lanzar ráfagas cortas y precisas a todo aquel que intente cazarte a media o larga distancia." },
        { nombre: "Guardian", imagen: "/src/Valorant/Armas/Rifles/Guardian.webp", descripcion: "Es el rifle para los tiradores entrenados. Más pesado y menos móvil en comparación con otros rifles, pero más preciso y potente. Comienza la cacería de tus enemigos a media y larga distancia." },
        { nombre: "Phantom", imagen: "/src/Valorant/Armas/Rifles/Phantom.webp", descripcion: "Úsala en automático contra cualquiera que te ponga a prueba de cerca. Por otro lado, sus ráfagas cortas y controladas permiten derribar enemigos a cualquier distancia. Funciona mejor cuando no estás en movimiento." },
        { nombre: "Vandal", imagen: "/src/Valorant/Armas/Rifles/Vandal.webp", descripcion: "El Vandal tiene un alto daño a distancia y recompensa a quienes se enfocan en un solo disparo a la cabeza. Sin embargo, su disparo extendido da como resultado menor estabilidad." },
    ],
    "Francotiradores": [
        { nombre: "Marshal", imagen: "/src/Valorant/Armas/Francotiradores/Marshal.webp", descripcion: "Un ágil rifle de palanca con un solo zoom que puede mantener a raya a los enemigos. Una velocidad de disparo lenta significa que tienes que dar en el blanco o quedarás expuesto a los ataques." },
        { nombre: "Operator", imagen: "/src/Valorant/Armas/Francotiradores/Operator.webp", descripcion: "Un rifle de francotirador con doble zoom de alta potencia. Extremadamente inmóvil, pero sus poderosas balas podrían devastar a un equipo con un solo disparo." },
    ],
    "Ametralladoras Pesadas": [
        { nombre: "Ares", imagen: "/src/Valorant/Armas/Ametralladoras Pesadas/Ares.webp", descripcion: "El enorme cargador del Ares significa que sobresale en el fuego continuo e inflige daño masivo a grupos de enemigos." },
        { nombre: "Odin", imagen: "/src/Valorant/Armas/Ametralladoras Pesadas/Odin.webp", descripcion: "Disparos continuos de alto daño con una gran estabilidad. Pulveriza a los enemigos a corta distancia y usa el disparo alternativo para convertirte en una torreta viviente." },
    ],
    "Cuerpo a Cuerpo": [
        { nombre: "Cuchillo Táctico", imagen: "/src/Valorant/Armas/Cuerpo a Cuerpo/Cuchillo.webp", descripcion: "Cuando tengas dudas o se te acaben las balas, atácalos con esto. Te permite correr rápido, destruir objetos o lanzárselo a los enemigos por la espalda con el disparo alternativo." },
    ]
};

var categoriaActual = "Pistolas"; // Inicialmente muestra las pistolas

// Función para actualizar la galería de armas
function actualizarGaleriaArmas() {
    var galeriaArmas = document.querySelector('.galeria-armas');
    galeriaArmas.innerHTML = '';

    armasPorCategoria[categoriaActual].forEach(function (arma) {
        var armaElement = document.createElement('div');
        armaElement.classList.add('arma');

        var nombreArma = document.createElement('h3');
        nombreArma.textContent = arma.nombre;

        var imagenArma = document.createElement('img');
        imagenArma.src = arma.imagen;

        var descripcionArma = document.createElement('div');
        descripcionArma.classList.add('descripcion-arma');
        descripcionArma.textContent = arma.descripcion;

        armaElement.appendChild(nombreArma);
        armaElement.appendChild(imagenArma);
        armaElement.appendChild(descripcionArma);

        galeriaArmas.appendChild(armaElement);
    });
}

// Función para cambiar de categoría hacia adelante
document.getElementById('categoria-siguiente').addEventListener('click', function () {
    var indiceCategoria = categorias.indexOf(categoriaActual);
    if (indiceCategoria < categorias.length - 1) {
        categoriaActual = categorias[indiceCategoria + 1];
    } else {
        // Si es la última categoría, cambia a la primera
        categoriaActual = categorias[0];
    }
    document.getElementById('categoria-actual').textContent = categoriaActual;
    actualizarGaleriaArmas();
});

// Función para cambiar de categoría hacia atrás
document.getElementById('categoria-anterior').addEventListener('click', function () {
    var indiceCategoria = categorias.indexOf(categoriaActual);
    if (indiceCategoria > 0) {
        categoriaActual = categorias[indiceCategoria - 1];
    } else {
        // Si es la primera categoría, cambia a la última
        categoriaActual = categorias[categorias.length - 1];
    }
    document.getElementById('categoria-actual').textContent = categoriaActual;
    actualizarGaleriaArmas();
});

// Llama a la función para mostrar las pistolas al cargar la página
actualizarGaleriaArmas();

let mapaActual = 0; // Índice del mapa actual

const mapas = document.querySelectorAll('.map');
const botonAnterior = document.getElementById('anterior-map');
const botonSiguiente = document.getElementById('siguiente-map');

function mostrarMapa(index) {
    mapas.forEach(map => map.style.display = 'none');
    mapas[index].style.display = 'block';
}

function mostrarMapaAnterior() {
    mapaActual = (mapaActual - 1 + mapas.length) % mapas.length;
    mostrarMapa(mapaActual);
}

function mostrarMapaSiguiente() {
    mapaActual = (mapaActual + 1) % mapas.length;
    mostrarMapa(mapaActual);
}

// Mostrar el primer mapa por defecto
mostrarMapa(mapaActual);

let clinetId = "0n3pnpn28t148yej9ez3ikabv7896u";
let clinetSecret = "1avebadh5nkp5ms4y4f6389d9dw0ph";

function getTwitchAuthorization() {
    let url = `https://id.twitch.tv/oauth2/token?client_id=${clinetId}&client_secret=${clinetSecret}&grant_type=client_credentials`;

    return fetch(url, {
        method: "POST",
    })
    .then((res) => res.json())
    .then((data) => {
        return data;
    });
}

async function getGameId(gameName, accessToken) {
    const url = `https://api.twitch.tv/helix/games?name=${gameName}`;
    const headers = {
        "Client-Id": clinetId,
        "Authorization": `Bearer ${accessToken}`
    };

    const response = await fetch(url, {
        headers,
    });

    const data = await response.json();
    
    if (data.data.length > 0) {
        // Si se encontró el juego, devuelve el ID del primer resultado
        return data.data[0].id;
    } else {
        // El juego no se encontró
        return null;
    }
}

async function getStreams(gameId, accessToken) {
    const endpoint = `https://api.twitch.tv/helix/streams?game_id=${gameId}`;
    const headers = {
        "Client-Id": clinetId,
        "Authorization": `Bearer ${accessToken}`
    };

    const response = await fetch(endpoint, {
        headers,
    });

    return response.json();
}

function renderStreams(data) {
    let { data: streams } = data;
    let streamsContainer = document.querySelector("div.streams");

    streamsContainer.innerHTML = ''; // Limpia el contenedor antes de agregar los nuevos streams
    var contador = 0
    streams.forEach((stream) => {
        if (contador < 6) {
            let { thumbnail_url: thumbnail, title, viewer_count, user_name } = stream;
            let hdThumbnail = thumbnail
                .replace("{width}", "1280")
                .replace("{height}", "720");

            // Crea un hipervínculo para redirigir al canal del streamer
            const streamLink = document.createElement('a');
            streamLink.href = `https://www.twitch.tv/${user_name}`;
            streamLink.target = '_blank'; // Abre el enlace en una nueva pestaña

            // Crea el contenedor del stream
            const streamContainer = document.createElement('div');
            streamContainer.classList.add('stream-container');

            // Crea la imagen del stream
            const streamImage = document.createElement('img');
            streamImage.src = hdThumbnail;

            // Crea el título del stream
            const streamTitle = document.createElement('h2');
            streamTitle.textContent = title;

            // Crea la descripción del número de espectadores
            const viewerCount = document.createElement('p');
            viewerCount.textContent = `${viewer_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} watching`;

            // Agrega elementos al contenedor del stream
            streamContainer.appendChild(streamImage);
            streamContainer.appendChild(streamTitle);
            streamContainer.appendChild(viewerCount);

            // Agrega el contenedor del stream al hipervínculo
            streamLink.appendChild(streamContainer);

            // Agrega el hipervínculo al contenedor principal de streams
            streamsContainer.appendChild(streamLink);

            contador += 1;
        }
    });
}

async function getTwitchData() {
    const authData = await getTwitchAuthorization();
    const gameId = await getGameId('Valorant', authData.access_token);
    const streamsData = await getStreams(gameId, authData.access_token);

    renderStreams(streamsData);
}
getTwitchData();