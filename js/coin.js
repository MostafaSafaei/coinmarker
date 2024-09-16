const coin = {
  coinsPerPage : 15,
  currentPage : 1,
  results : null
}

const listPage = document.getElementById("paginated-list");
const pagianation = document.getElementById("pagination-numbers");

const getAPI = function(){
    
  // const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
  const url = "../files/coinAPI.txt";

  // fetch(url)
  // .then(Response => Response.json())
  // .then(response => coin.results = response)
  // .then(function(data){
  //   loadPage(coin.currentPage);
  // })
  // .catch(function(error){
  //   console.log(error);
  // })

  axios.get('../files/coinAPI.txt')
  .then(function (response) {
    coin.results = response.data;
    loadPage(coin.currentPage);
  });
}
console.log(coin.results);

const loadPage = function(pg){
  coin.currentPage = pg;
  listPage.innerHTML = "";
  pagianation.innerHTML = "";
  let startIndex = (coin.currentPage - 1) * coin.coinsPerPage;
  let endIndex = startIndex + coin.coinsPerPage > coin.results.length ? coin.results.length : startIndex + coin.coinsPerPage;
  let totalPages = Math.ceil(coin.results.length / coin.coinsPerPage);

  console.log(totalPages);
  console.log(startIndex);
  console.log(endIndex);

  for (let x = 0; x < totalPages; x++){
    let button = document.createElement("button");
    button.classList = "btn btn-primary";
    button.textContent = x+1;
    button.addEventListener("click", function(){
      loadPage(x+1);
      
    })

    if(x+1 === coin.currentPage){
      button.classList.add("active");
      
    }
    pagianation.appendChild(button);
  }

  for (let i = startIndex; i < endIndex; i++){
      let tr = document.createElement("tr");
      tr.className = "row text-center mt-2 d-flex align-items-center";
  
      let rank = document.createElement("td");
      rank.className = "col-1 text-start";
      tr.append(rank);
      let span = document.createElement("span");
      span.innerText = coin.results[i].market_cap_rank;
      rank.append(span);
  
      let nameTd = document.createElement("td");
      nameTd.className = "col-4";
      rank.after(nameTd);
  
      let rowName = document.createElement("div");
      rowName.className = "row d-flex align-items-center";
      nameTd.append(rowName);
  
      let imageParent = document.createElement("div");
      imageParent.className="col-2";
      rowName.append(imageParent);
  
      let image = document.createElement("img");
      image.setAttribute("src",coin.results[i].image);
      image.className = "img-fluid";
      imageParent.append(image);
  
      let nameSpan = document.createElement("span");
      nameSpan.innerText = coin.results[i].name;
      nameSpan.className = "col-6";
      imageParent.after(nameSpan);
  
      let coinSymbol = document.createElement("span");
      coinSymbol.className = "col-4 text-secondary fw-bold";
      coinSymbol.innerText = capitalism(coin.results[i].symbol);
      nameSpan.after(coinSymbol);
  
      let price = document.createElement("td");
      price.className = "col-3";
      let priceSpan = document.createElement("span");
      priceSpan.innerText = coin.results[i].current_price;
      price.append(priceSpan);
      nameTd.after(price);
  
      let pch24 = document.createElement("td");
      pch24.className = "col-1";
      let pch24Span = document.createElement("span");
      pch24Span.innerText = coin.results[i].price_change_percentage_24h;
      pch24.append(pch24Span);
      price.after(pch24);
  
      let mCap = document.createElement("td");
      mCap.className = "col-3 text-end";
      let mCapSpan = document.createElement("span");
      mCapSpan.innerText = coin.results[i].market_cap;
      mCap.append(mCapSpan);
      pch24.after(mCap);
  
      listPage.appendChild(tr);
    }
}

const capitalism = function(str){
  return str.toUpperCase();
}

window.addEventListener("load",function(){getAPI();});
// setInterval(getAPI,5000);
