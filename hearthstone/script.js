const mainEl = document.querySelector('div.main');
const searchBtn = document.getElementById('search-button');
const searchInputEl = document.getElementById('search-input');

async function getCards() {
    const response = await fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/Hall of Fame", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "5c595036e1msh4b062ad3737caf9p1bed68jsn50fef1552984",
            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
        }
    }).catch(err => {
        console.error(err);
    });

    const responseData = await response.json();
    console.log(responseData)
    displayCards(responseData);
}

async function searchCards(name) {
    const response = await fetch(`https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${name}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "5c595036e1msh4b062ad3737caf9p1bed68jsn50fef1552984",
            "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com"
        }
    }).catch(err => {
        console.error(err);
    });
    
    const responseData = await response.json();

    if(response.ok) {
        console.log(responseData);
        displayCards(responseData);
    } else {
        console.error(responseData.message);
        alert(`${responseData.message}\nPlease try again.`);
    }
}

function getDetails(id) {
    const cardDetails = JSON.parse(localStorage.getItem('cardsDetails')).filter(info => {
        return info.cardId == id;
    })[0];
    const {name, playerClass, type, cardSet} = cardDetails;

    const detailsEl = document.createElement('div');
    detailsEl.classList.add('details-box');
    let newEl = document.createElement('button');
    newEl.innerHTML = '<i class="fas fa-times"></i>'
    // onclick event for details box close button
    newEl.addEventListener('click', () => {
        const detailsEl = document.querySelector('.details-box');
        detailsEl.parentElement.removeChild(detailsEl);
    })
    detailsEl.appendChild(newEl);
    newEl = document.createElement('h2');
    newEl.innerText = name;
    detailsEl.appendChild(newEl);
    newEl = document.createElement('p');
    newEl.innerText = `${playerClass} ${type} from "${cardSet}" card set`;
    detailsEl.appendChild(newEl);
    document.body.appendChild(detailsEl);
}

function search() {
    const input = searchInputEl.value;
    if(input) {
        searchCards(input);
        searchInputEl.value = '';
    }
}

function displayCards(jsonData) {
    if(jsonData != undefined) {
        mainEl.innerHTML = '';
        const displayCards = [];
        jsonData.forEach(card => {
            if(card.img) {
                const cardEl = document.createElement('div');
                cardEl.classList.add('card');
                cardEl.id = card.cardId;
                const imgEl = document.createElement('img');
                imgEl.classList.add('card-img');
                imgEl.setAttribute('src', card.img);
                const nameEl = document.createElement('h3');
                nameEl.classList.add('card-name');
                nameEl.innerText = `${card.name}`;
                cardEl.appendChild(imgEl);
                cardEl.appendChild(nameEl);
                mainEl.appendChild(cardEl);
                
                // onclick event for card representation
                cardEl.addEventListener('click', () => {
                    if(document.querySelectorAll('.details-box').length == 0) {
                        getDetails(cardEl.id);
                    }
                });

                displayCards.push(card);
            }
        });
        if(displayCards.length > 0) {
            localStorage.setItem('cardsDetails', JSON.stringify(displayCards));
        } else {
            alert('No cards found for given criteria.\nPlease try again.');
        }
    }
}

// onclick event for search button
searchBtn.addEventListener('click', search);
// Enter key event for search textbox
searchInputEl.addEventListener('keypress', event => {
    if(event.key === 'Enter') {
        search();
    }
});

getCards();
