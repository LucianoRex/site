

let selectMarca = document.getElementById("marcas");
let selectVeiculo = document.getElementById("veiculos");
let selectModelo = document.getElementById("modelos");
let selectAno = document.getElementById("ano");



let marca = new XMLHttpRequest();
marca.open("GET", "http://fipeapi.appspot.com/api/1/carros/marcas.json");
marca.send();

marca.onload = function () {
  if (marca.status != 200) {
  } else {
    let marcas = JSON.parse(marca.response).map((e) => {
      return { name: e.name, id: e.id };
    });
    console.log(marca.response);
    for (index in marcas) {
      selectMarca.options[selectMarca.options.length] = new Option(
        marcas[index].name,
        marcas[index].id
      );
    }
  }
};


selectMarca.addEventListener("change", function () {
  selectVeiculo.length = 0;
  selectModelo.length = 0;
  let veiculo = new XMLHttpRequest();
  veiculo.open(
    "GET",
    `http://fipeapi.appspot.com/api/1/carros/veiculos/${this.value}.json`
  );
  veiculo.send();
  veiculo.onload = function () {
    if (veiculo.status != 200) {
    } else {
      let veiculos = JSON.parse(veiculo.response).map((e) => {
        return { name: e.name, id: e.id };
      });
      for (index in veiculos) {
        selectVeiculo.options[selectVeiculo.options.length] = new Option(
          veiculos[index].name,
          veiculos[index].id
        );
      }
    }
  };
});

selectVeiculo.addEventListener("change", function (e) {
  selectModelo.length = 0;
  let modelo = new XMLHttpRequest();
  modelo.open(
    "GET",
    `http://fipeapi.appspot.com/api/1/carros/veiculo/${
      selectMarca.options[selectMarca.selectedIndex].value
    }/${this.value}.json`
  );
  modelo.send();
  modelo.onload = function () {
    if (modelo.status != 200) {
    } else {
      let veiculos = JSON.parse(modelo.response).map((e) => {
        return { name: e.name, id: e.id };
      });
      for (index in veiculos) {
        selectModelo.options[selectModelo.options.length] = new Option(
          veiculos[index].name,
          veiculos[index].id
        );
      }
    }
  };
});

selectModelo.addEventListener("click", function (e) {
  //selectModelo.length = 0;
  let ano = new XMLHttpRequest();
  ano.open(
    "GET",
    `http://fipeapi.appspot.com/api/1/carros/veiculo/${
      selectMarca.options[selectMarca.selectedIndex].value
    }/${selectVeiculo.options[selectVeiculo.selectedIndex].value}/${
      this.value
    }.json`
  );
  ano.send();
  ano.onload = function () {
    if (ano.status != 200) {
    } else {
      console.log(ano.response)
    }
  };
});
