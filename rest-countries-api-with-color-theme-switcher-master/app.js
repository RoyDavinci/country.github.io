// SELECT ALL ELEMENT VALUES

const inputText = document.querySelector(".input-text");
const card = document.querySelector(".country-card");
const searchButton = document.querySelector(".search");
const modeChange = document.querySelector(".mode");
const bodyDiv = document.querySelectorAll(".check");
const changePara = document.querySelector(".change");
const svgIcon = document.querySelector(".svg");
const detailDiv = document.querySelector(".detail");
const bodyElement = document.querySelector(".body");
const regionSearch = document.getElementById("region");

// DECLARE ALL APIS
const APIALL = `https://restcountries.eu/rest/v2/all`;
const SEARCHAPI = `https://restcountries.eu/rest/v2/name/`;
const APIREGION = `https://restcountries.eu/rest/v2/region/`;

//LOAD ELEMENTS ON BROWSER OPEN
window.addEventListener("DOMContentLoaded", function () {
	getApi(APIALL);
});

//API FUNCTION

async function getApi(url) {
	const response = await fetch(url);
	const responseData = await response.json();
	renderPage(responseData);
    details(responseData)
}

//SEARCH FOR COUNTRY
searchButton.addEventListener("click", function () {
	const searchITem = inputText.value;
	if (searchITem) {
		getApi(SEARCHAPI + searchITem);
	}
});

//SEARCH BY REGION

function regions() {
	var value = regionSearch.value;
	console.log(value);
	if (value) {
		getApi(APIREGION + value);
	}
}
regions();

//SHOW ALL COUNTRIES

function renderPage(countries) {
	card.innerHTML = "";
	countries.forEach((country) => {
		const { flag, name, population, region, capital } = country;
		const divContainer = document.createElement("div");
		divContainer.classList.add("first");
		divContainer.innerHTML = `<img src="${flag}" alt="" />
        <div class="country-detail">
            <h3 class="country-name">${name}</h3>
            <p>
                Population: <span class="population-number">${population}</span>
            </p>
            <p>Region<span class="region"> ${region}</span></p>
            <p>Capital: <span class="capital"> ${capital}</span></p>
        </div>`;
		card.appendChild(divContainer);
	});
}
//LIGHT AND DARK MODE CHANGE

modeChange.addEventListener("click", function () {
	var firstDiv = document.querySelectorAll(".first");
	if (changePara.innerHTML === "Dark Mode") {
		changePara.innerHTML = "Light Mode";
		document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
		svgIcon.setAttribute("src", "images/icon-sun.svg");
		svgIcon.style.color = "rgb(32,44,55)";

		bodyDiv.forEach((container) => {
			container.style.backgroundColor = "rgb(250, 250, 250)";
			container.style.color = "rgb(32, 44, 55)";
			container.classList.add("border");
			if (container.classList.contains("input")) {
				container.classList.remove("border");
			}
			if (container.classList.contains("input-text")) {
				container.classList.remove("border");
			}
		});
		firstDiv.forEach((div) => {
			div.style.backgroundColor = "hsl(0, 0%, 98%)";
			div.style.color = "hsl(207, 26%, 17%)";
			div.classList.add("border");
		});
	} else {
		changePara.innerHTML = "Dark Mode";
		document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
		svgIcon.setAttribute("src", "images/icon-moon.svg");
		svgIcon.style.color = "rgb(250,250,250)";
		bodyDiv.forEach((container) => {
			container.style.backgroundColor = "hsl(209, 23%, 22%)";
			container.style.color = "hsl(0, 0%, 98%)";
			container.classList.remove("border");
		});
		firstDiv.forEach((div) => {
			div.style.backgroundColor = "hsl(209, 23%, 22%)";
			div.style.color = "hsl(0, 0%, 98%)";
			div.classList.remove("border");
		});
	}
});

//DETAILS FUNCTION

function details(data) {
	let divContained = document.querySelectorAll(".first");
	divContained.forEach((divs) => {
		divs.addEventListener("click", function (e) {
			const childElement = e.currentTarget.children[1];
			const childs = childElement.children[0].innerHTML;
			const result = data.find(
				(countryName) => countryName.name === `${childs}`
			);
			bodyElement.classList.add("hide");
			detailDiv.classList.add("show");
			detailDiv.innerHTML = `<div class="buttons">
				<a href=""><i class="fa fa-arrow-left" aria-hidden="true"></i> back</a>
			</div>
			<div class="container">
				<img src="${result.flag}" alt="country-flag" class="country-flag">
				<div class="detail-flex">
					<h2>${result.name}</h2>
					<div class="primary">
						<div class="primary-details">
							<p>Native Name: <span>${result.nativeName}</span></p>
							<p>Population: <span>${result.population}</span></p>
							<p>Region: <span>${result.region}</span></p>
							<p>Sub Region: <span>${result.subregion}</span></p>
							<p>Capital: <span>${result.capital}</span></p>
						</div>
		
						<div class="secondary-details">
							<p>Top Level Domain: <span>${result.topLevelDomain[0]}</span></p>
							<p>Currency: <span>${result.currencies[0].name}</span></p>
							<p>Languages: <span>${result.languages[0].name}</span></p>
						</div>
					</div>
					<div class="borders">
						<span>Border Countries:</span>
					</div>
				</div>
			</div>`;
			const buttonDiv = document.querySelector(".buttons");
			buttonDiv.addEventListener("click", function () {
				detailDiv.classList.remove("show");
				bodyElement.classList.remove("hide");
			});
			result.borders.forEach((border) => {
				const element = document.createElement("span");
				element.setAttribute("class", "border-country");
				element.innerHTML = border;
				const borderParent = document.querySelector(".borders");
				borderParent.appendChild(element);
			});
		});
	});
}
