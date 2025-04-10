let ciudad = document.querySelector("#ciudad");
let pais = document.querySelector("#pais");
let formulario = document.querySelector("#formulario");
let resultado = document.querySelector("#resultado");

window.addEventListener("load", () => {
    formulario.addEventListener("submit", consultarTiempo);
});

function consultarTiempo(e) {
    e.preventDefault();
    let ciudadValor = ciudad.value;
    let paisValor = pais.value

    //console.log(e.target);//ESTUDIO DE preventDefault
    //console.log(ciudadValor, paisValor);

    if (ciudadValor === "" || paisValor === "") {
        mostrarError("Ambos campos son obligatorios");
        return;
    }
    leerapi(ciudadValor, paisValor);
}

function mostrarError(error) {
    resultado.classList.add(
        "bg",
        "bg-danger",
        "text-white",
        "p-3",
        "mt-3",
        "text-center",
        "fs-4",
        "fw-bold"
    );
    resultado.innerHTML = `<p>${error}</p>`;
}


function leerapi(ciudadValor, paisValor) {
    const ApiKey = "7fe161252244dfa3e7413a7b41fd4590"; //public
    const ApiUrl = `
        https://api.openweathermap.org/data/2.5/weather?q=${ciudadValor},${paisValor}&lang=es&appid=${ApiKey}
        `;

    fetch(ApiUrl)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            console.log(datos);
            let temperatua = Math.round(datos.main.temp - 273.15);
            let humedad = datos.main.humidity;
            let viento = datos.wind.speed;
            let ciudad = datos.name;
            let pais = datos.sys.country;
            let descripcion = datos.weather[0].description;
            let icono = datos.weather[0].icon;
            let name = datos.weather[0].main;
            
            if (temperatua < 0) {
                resultado.classList.add(
                    "bg",
                    "bg-primary",
                    "text-white",
                    "p-3",
                    "mt-3",
                    "text-center",
                    "fs-4",
                    "fw-bold"
                );
                resultado.innerHTML = `            
                <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt=" Nombre: ${name} " width="80" height="80" class="img-fluid" />
                Nombre: ${name} 
                <p>Ciudad: ${ciudad} || Pais: ${pais}</p>
                <p>Temperatura: ${temperatua}°C || Humedad: ${humedad}%</p>
                <p>Viento: ${viento} m/s || Descripción: ${descripcion}</p>
                <p>Temperatura bajo cero</p>
                `;
            } else if (temperatua > 0 && temperatua <= 18) {
                resultado.classList.add(
                    "bg",
                    "bg-info", 
                    "text-dark", 
                    "p-3",
                    "mt-3", 
                    "text-center", 
                    "fs-5", 
                    "fw-normal"
                );
                resultado.innerHTML = `            
                <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt=" Nombre: ${name} " width="80" height="80" class="img-fluid" />
                Nombre: ${name} 
                <p>Ciudad: ${ciudad} || Pais: ${pais}</p>
                <p>Temperatura: ${temperatua}°C || Humedad: ${humedad}%</p>
                <p>Viento: ${viento} m/s || Descripción: ${descripcion}</p>
                
                `;

            }
            else if (temperatua <= 19 && temperatua <= 25) {
                resultado.classList.add(
                    "bg",
                    "bg-warning", 
                    "text-dark", 
                    "p-3", 
                    "mt-3", 
                    "text-center",
                    "fs-5",
                    "fw-normal"
                );
                resultado.innerHTML = `            
                <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt=" Nombre: ${name} " width="80" height="80" class="img-fluid" />
                Nombre: ${name} 
                <p>Ciudad: ${ciudad} || Pais: ${pais}</p>
                <p>Temperatura: ${temperatua}°C || Humedad: ${humedad}%</p>
                <p>Viento: ${viento} m/s || Descripción: ${descripcion}</p>
                
                `;
            }
            else if (temperatua > 25) {
                resultado.classList.add(
                    "bg",
                    "bg-danger", 
                    "text-white",
                    "p-3",
                    "mt-3", 
                    "text-center",
                    "fs-5", 
                    "fw-bold"  
                );
                resultado.innerHTML = `            
                <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt=" Nombre: ${name} " width="80" height="80" class="img-fluid" />
                Nombre: ${name} 
                <p>Ciudad: ${ciudad} || Pais: ${pais}</p>
                <p>Temperatura: ${temperatua}°C || Humedad: ${humedad}%</p>
                <p>Viento: ${viento} m/s || Descripción: ${descripcion}</p>
                
                `;


            };

        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            mostrarError("No se pudo obtener la información del clima.");
        });
}

