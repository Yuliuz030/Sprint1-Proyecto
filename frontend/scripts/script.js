const url = "http://localhost:3000/marcas";
const form = document.getElementById("form");
const tbody = document.getElementById("tbody");
let usuarios =
  localStorage.getItem("user") === null
    ? []
    : JSON.parse(localStorage.getItem("user"));
let count;

function ordenar() {
  if (localStorage.getItem("user") == null) {
    count = 0;
  } else {
    usuarios = JSON.parse(localStorage.getItem("user"));
    let posicion = usuarios.length - 1;
    count = usuarios[posicion].id;
    count++;
  }
}

mostrarReporte();

function Vehiculo(placa, marca, estados, modelo, color, seguro, tecno) {
  this.placa = placa;
  this.marca = marca;
  this.estados = estados;
  this.modelo = modelo;
  this.color = color;
  this.seguro = seguro;
  this.tecno = tecno;
  this.id = count;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const placa = document.getElementById("placa").value;
  const marca = document.getElementById("marca");
  const estados = document.getElementById("estados").value;
  const modelo = document.getElementById("modelo").value;
  const color = document.getElementById("color").value;
  const seguro = document.getElementById("seguro").value;
  const tecno = document.getElementById("tecno").value;
  const newV = new Vehiculo(
    placa,
    marca,
    estados,
    modelo,
    color,
    seguro,
    tecno
  );
  usuarios.push(newV);
  localStorage.setItem("user", JSON.stringify(usuarios));
  ordenar();
  mostrarReporte();
});

function mostrarReporte() {
  usuarios =
    localStorage.getItem("user") === null
      ? []
      : JSON.parse(localStorage.getItem("user"));
  tbody.innerHTML = "";
  usuarios.map((item) => {
    const { placa, marca, estados, modelo, color, seguro, tecno, id } = item;
    tbody.innerHTML += `
    <tr class="fila">
      <td class="celda">${placa}</td>
      <td class="celda">${marca}</td>
      <td class="celda">${estados}</td>
      <td class="celda">${modelo}</td>
      <td class="celda">${color}</td>
      <td class="celda">${seguro}</td>
      <td class="celda">${tecno}</td>
      <td class="celda"><button>Editar</button> <button onclick="eliminar(${id})">Borrar</button></td>
    </tr>
    `;
  });
}

function eliminar(id) {
  const newUsuarios = usuarios.filter((item) => item.id !== id);
  localStorage.setItem("user", JSON.stringify(newUsuarios));
  count = ordenar();
  mostrarReporte();
}
