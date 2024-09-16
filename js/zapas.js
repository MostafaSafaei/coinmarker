
const cardsPerPage = 20;
const dataContainer = document.getElementById('data-container');
const pagination = document.getElementById('pagination');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageNumbers = document.getElementById('page-numbers');
const pageLinks = document.getElementsByClassName("page-link");

const cards = Array.from(dataContainer.getElementsByClassName("cardRow"));

const totalPages = Math.ceil(coinsCount / cardsPerPage);
console.log(totalPages);
console.log(cardsPerPage);
console.log(coinsCount);
let currentPage = 1;

function displayPage(page) {
	const startIndex = (page - 1) * cardsPerPage;
	const endIndex = startIndex + cardsPerPage;
	cards.forEach((card, index) => {
		if (index >= startIndex && index < endIndex) {
			card.style.display = 'block';
		} else {
			card.style.display = 'none';
		}
	});
} 

function updatePagination() {
	pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`; 
	prevButton.disabled = currentPage === 1;
	nextButton.disabled = currentPage === totalPages;
	pageLinks.forEach((link) => {
		const page = parseInt(link.getAttribute('data-page'));
		link.classList.toggle('active', page === currentPage);
	});
} 

prevButton.addEventListener('click', () => {
	if (currentPage > 1) {
		currentPage--;
		displayPage(currentPage);
		updatePagination();
	}
}); 

nextButton.addEventListener('click', () => {
	if (currentPage < totalPages) {
		currentPage++;
		displayPage(currentPage);
		updatePagination();
	} 
}); 

pageLinks.foreach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const page = parseInt(link.getAttribute('data-page'));
		if (page !== currentPage) {
			currentPage = page;
			displayPage(currentPage);
			updatePagination();
		}
	});
});

displayPage(currentPage);
updatePagination();


function getApi(){
    const xhr = new XMLHttpRequest();

    xhr.open("GET","https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",true);

    // xhr.setRequestHeader("X-CMC_PRO_API_KEY","0b92b95c-a24f-4bff-88d4-908f661b0764");
    // xhr.setRequestHeader("Accept","application/json");

    xhr.onload = function (){
        if(this.status == 200){
            let coins = JSON.parse(this.responseText);

            for (let i in coins){
                let tr = document.createElement("tr");
                tr.className = "row text-center mt-2 d-flex align-items-center";

                let rank = document.createElement("td");
                rank.className = "col-1 text-start";
                tr.append(rank);
                let span = document.createElement("span");
                span.innerText = coins[i].market_cap_rank;
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
                image.setAttribute("src",coins[i].image);
                image.className = "img-fluid";
                imageParent.append(image);

                let nameSpan = document.createElement("span");
                nameSpan.innerText = coins[i].name;
                nameSpan.className = "col-6";
                imageParent.after(nameSpan);

                let coinSymbol = document.createElement("span");
                coinSymbol.className = "col-4 text-secondary fw-bold";
                coinSymbol.innerText = coins[i].symbol;
                nameSpan.after(coinSymbol);

                let price = document.createElement("td");
                price.className = "col-3";
                let priceSpan = document.createElement("span");
                priceSpan.innerText = coins[i].current_price;
                price.append(priceSpan);
                nameTd.after(price);

                let pch24 = document.createElement("td");
                pch24.className = "col-1";
                let pch24Span = document.createElement("span");
                pch24Span.innerText = coins[i].price_change_percentage_24h;
                pch24.append(pch24Span);
                price.after(pch24);

                let mCap = document.createElement("td");
                mCap.className = "col-3 text-end";
                let mCapSpan = document.createElement("span");
                mCapSpan.innerText = coins[i].market_cap;
                mCap.append(mCapSpan);
                pch24.after(mCap);

                document.querySelector(".tableHead").append(tr);

            }
        }
    };

    xhr.send();
}

getApi();

// fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
//     // {method: 'GET',
//     //     headers: {
//     //         'X-CMC_PRO_API_KEY':'0b92b95c-a24f-4bff-88d4-908f661b0764',
//     //         'Accept':'application/json'
//     //     }
//     // }
// )

// .then(Response => Response.json())
// .then(response => console.log(JSON.stringify(response)))