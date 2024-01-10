const nombre_d = document.querySelector(".n_day");
const nombre_m = document.querySelector(".n_month");
const nombre_y = document.querySelector(".n_year");
const mens_d = document.querySelector(".m_day");
const mens_m = document.querySelector(".m_month");
const mens_y = document.querySelector(".m_year");
const dia = document.querySelector(".dia");
const mes = document.querySelector(".mes");
const anio = document.querySelector(".anio");
const btn = document.querySelector(".btn");

// OBJETO FECHA
const fecha = new Date();
const d_dia = fecha.getDate();
const d_mes = fecha.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por lo que debemos sumar 1
const d_año = fecha.getFullYear();

btn.addEventListener("click", (e) => {
  e.preventDefault();
  validacion();
});

function validacion() {
  if ( isNaN(parseInt(dia.value)) ||  isNaN(parseInt(mes.value)) || isNaN(parseInt(anio.value))) {
    invalido();
    return;
  }else{
    calcular();
    mens_d.classList.remove("txt_invalido");
    mens_m.classList.remove("txt_invalido");
    mens_y.classList.remove("txt_invalido");
    mens_d.classList.add("invalido_disable");
    mens_m.classList.add("invalido_disable");
    mens_y.classList.add("invalido_disable");
    nombre_d.style.color = "black";
    nombre_m.style.color = "black";
    nombre_y.style.color = "black";  }

  if (dia.value > obtenerDiasDelMes(mes.value, anio.value) || dia.value < 0) {
    mens_d.classList.remove("invalido_disable");
    mens_d.classList.add("txt_invalido");
        nombre_d.style.color = "red";

  }

  if (mes.value > 12 || mes.value < 0) {
    mens_m.classList.remove("invalido_disable");
    mens_m.classList.add("txt_invalido");
        nombre_m.style.color = "red";

    return;
  }
  if (anio.value > d_año || anio.value < 0) {
    mens_y.classList.remove("invalido_disable");
    mens_y.classList.add("txt_invalido");
    nombre_y.style.color = "red";

  }
}

function obtenerDiasDelMes(mes, año) {
  const fecha = new Date(año, mes, 0);
  return fecha.getDate();
}

function invalido() {
  const nombre_day = document.querySelectorAll(".invalido_disable");

  nombre_day.forEach((element) => {
    element.classList.remove("invalido_disable");
    element.classList.add("txt_invalido");
    nombre_d.style.color = "red";
    nombre_m.style.color = "red";
    nombre_y.style.color = "red";
  });
}

function calcular() {
  const anioValue = parseInt(anio.value);
  const mesValue = parseInt(mes.value);
  const diaValue = parseInt(dia.value);

  let años;
  let meses;
  let dias;

  if (mesValue < d_mes || (mesValue === d_mes && diaValue <= d_dia)) {
    años = d_año - anioValue;
  } else {
    años = d_año - anioValue - 1;
  }

  if (mesValue < d_mes) {
    meses = d_mes - mesValue;
  } else if (mesValue === d_mes && diaValue <= d_dia) {
    meses = 0;
  } else {
    meses = 12 - (mesValue - d_mes);
  }

  if (diaValue < d_dia) {
    dias = d_dia - diaValue;
    meses--; // Restar 1 mes si estamos en un día anterior al día actual
    if (meses < 0) {
      meses = 11; // Ajustar meses para evitar valores negativos
      años--; // Restar 1 año si estamos en un mes anterior y un día anterior al mes y día actual
    }
  } else if (diaValue === d_dia) {
    dias = 0;
  } else {
    dias = obtenerDiasDelMes(mesValue, anioValue) - (diaValue - d_dia);
  }

  if (anioValue > d_año) {
    invalido();
  } else {
    cambiar(dias, meses, años);
  }

}

function cambiar(dias, meses, años) {
  const fecha_d = document.querySelector(".date_fecha_d");
  const fecha_m = document.querySelector(".date_fecha_m");
  const fecha_y = document.querySelector(".date_fecha_y");

  fecha_d.textContent = dias;
  fecha_m.textContent = meses;
  fecha_y.textContent = años;
}
