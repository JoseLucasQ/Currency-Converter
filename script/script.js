var objCoin = {};

var myHeaders = new Headers();
myHeaders.append("apikey", "Z6SQpGbV5laUVAl7xO0ljuzP9rTiChuv");

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders
};

fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
  .then((response) => response.text())
  .then(function (result) {
    var converted = JSON.parse(result).symbols;
    $.each(JSON.parse(result).symbols, function (index, value) {
      $("#coinFrom").append(
        '<option value="' + index + '">' + value + "</option>"
      );
      $("#coinTo").append(
        '<option value="' + index + '">' + value + "</option>"
      );
      objCoin[index] = value;
    });
  })
  .catch((error) => console.log("error", error));

//button part

$(".btn").click(function () {
    console.log('entrou')
});

$(document).ready(function($){
  $(".maskMoney").maskMoney({
      decimal: ".",
      thousands: ","
  });

  $( "#btn" ).click(function() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "Z6SQpGbV5laUVAl7xO0ljuzP9rTiChuv");
  
    var valor = document.getElementById("valor");
  
    var coinFrom = document.getElementById("coinFrom").value;
    var coinTo = document.getElementById("coinTo").value;
    var amount = parseFloat(valor.value);
    var elementoConvertido = document.getElementById("valorConvertido");
  
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders
    };
  
    fetch(
      "https://api.apilayer.com/exchangerates_data/convert?to=" +
        coinTo +
        "&from=" +
        coinFrom +
        "&amount=" +
        amount,
      requestOptions
    )
      .then((response) => response.text())
      .then(function (result) {
        var converted = JSON.parse(result).result;
  
        var coinSymbol = objCoin[coinTo];
  
        elementoConvertido.innerHTML =
          "The Value in " + coinSymbol + " is : " + converted.toFixed(2);
      })
      .catch((error) => console.log("error", error));
  });
})

function empty() {
  var x = document.getElementById("valor").value;
  if (x == "") {
      alert("Enter the Amount to be converted");
      return false;
  };
}