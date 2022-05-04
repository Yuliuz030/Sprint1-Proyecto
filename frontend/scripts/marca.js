const url = "http://localhost:3000/marca/";
const $nombre = document.getElementById("nombre");
const $estado = document.getElementById("estado");
const $descripcion = document.getElementById("descripcion");
const $btnCrear = document.getElementById("crearM");
const $btnBorrar = document.querySelector(".btn");

let resultados = "";

let $tbody = document.querySelector("#tbodyM");
let fragment = document.createDocumentFragment();

function listarMarcas() {
  fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log(error))
    .then((data) => {
      data.forEach((e) => {
        resultados += `
      <tr>
      <th>${e.id}</th>
      <td>${e.nombre}</td>
      <td>${e.descripcion}</td>
      <td>${e.estado}</td>
      <td><button type="button" btn btn-primary data-id=${e.id} class='btn'>Editar</button> <button type="button" btn btn-primary data-id=${e.id} class='btn'>Eliminar</button></td>
      </tr>
      `;
      });
      $tbody.innerHTML = resultados;
    });
}

function CrearMarcas() {
  let data = {
    nombre: $nombre.value,
    descripcion: $descripcion,
    estado: $estado.value,
  };
  
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data), 
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .catch((error) => console.error("Error:", error))
  .then((res) => console.log("Creado Correctamente:", res))
  .then(() => location.reload());
}

function ElimarMarcas(id) {
  fetch(url+id, {
    method: "DELETE",
    headers: { "Content-type": "Application/json; charset=utf-8" },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then(() => location.reload());
}

// const on = (element, event, selector, handler) => {
//   element.addEventListener(event, (e) => {
//     if (e.target.closest(selector)) {
//       handler(e);
//     }
//   });
// };

document.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e);
  if (e.target === $btnCrear) {
    CrearMarcas();
  }
  if (e.target.matches(".btn")) {
    ElimarMarcas(e.target.dataset.id);
  }
  if (e.target.matches(".btnActualizar")) {
    ElimarMarcas(e.target.dataset.id);
  }
});

document.addEventListener("DOMContentLoaded", (e) => {
  listarMarcas();
});
