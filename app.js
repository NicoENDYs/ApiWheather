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
    let paisValor = pais.value;

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
        https://api.openweathermap.org/data/2.5/weather?q=${ciudadValor},${paisValor}&appid=${ApiKey}
        `;

    fetch(ApiUrl)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            console.log(datos);
        });

}