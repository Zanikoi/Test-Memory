const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const time = document.querySelector('.time')

const cardsType = [
    'teste_aceitação',
    'teste_desempenho',
    'teste_exploração',
    'teste_fumaça',
    'teste_integração',
    'teste_regressão',
    'teste_sanidade',
    'teste_segurança',
    'teste_unitário',
];

const cardsText = [
    'teste_aceitação',
    'teste_desempenho',
    'teste_exploração',
    'teste_fumaça',
    'teste_integração',
    'teste_regressão',
    'teste_sanidade',
    'teste_segurança',
    'teste_unitário',
];

let fistCard = '';
let secondCard = '';
let firstCardTextTurned = false; // Para rastrear se uma carta de texto foi virada

// Função para criar elementos com uma classe
const createElement = (tag, classname) => {
    const element = document.createElement(tag);
    element.className = classname;
    return element;
};

// Verifica se todas as cartas foram desabilitadas e exibe o alerta
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.diseble-card');
    if (disabledCards.length === 18) {
        setTimeout(() => {
            alert(`Parabéns, ${spanPlayer.innerHTML} você ganhou o jogo!, seu tempo foi ${time.innerHTML} segundos`);
            clearInterval(this.loop);
        }, 600);
    }
};

// Verifica se as cartas combinam e desabilita as cartas correspondentes
const checkCard = () => {
    const fistcharacter = fistCard.getAttribute('data-character');
    const secontcharacter = secondCard.getAttribute('data-character');

    if (fistcharacter === secontcharacter) {
        fistCard.firstChild.classList.add('diseble-card');
        secondCard.firstChild.classList.add('diseble-card');

        fistCard = '';
        secondCard = '';
        firstCardTextTurned = false; // Reseta a variável ao desabilitar as cartas

        checkEndGame();
    } else {
        setTimeout(() => {
            fistCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            fistCard = '';
            secondCard = '';
            firstCardTextTurned = false; // Reseta a variável ao não combinar
        }, 500);
    }
};

// Revela a carta ao clicar
const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return; // Não faz nada se a carta já está virada
    }

    // Verifica se a carta clicada é uma carta de texto
    const isTextCard = target.parentNode.querySelector('.face.frontText');

    if (fistCard === '') {
        if (isTextCard) {
            target.parentNode.classList.add('reveal-card');
            fistCard = target.parentNode;
            firstCardTextTurned = true; // Marca que uma carta de texto foi virada
        } else {
            alert('Você precisa virar uma carta de texto primeiro!');
            return; // Não faz nada se tentar virar uma carta de tipo
        }
    } else if (secondCard === '') {
        if (firstCardTextTurned || isTextCard) {
            target.parentNode.classList.add('reveal-card');
            secondCard = target.parentNode;
            checkCard();
        } else {
            alert('Você precisa virar uma carta de texto primeiro!');
            return; // Se a primeira carta não for texto, não faz nada
        }
    }
};

// Função para criar cartas de texto
const createCardText = (cardText) => {
    const card = createElement('div', 'card');
    const frontText = createElement('div', 'face frontText');
    const backText = createElement('div', 'face backText');

    frontText.style.backgroundImage = `url('../images/cardsText/${cardText}.png')`;

    card.appendChild(frontText);
    card.appendChild(backText);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', cardText);

    return card;
};

// Função para criar cartas de tipo
const createCardType = (cardType) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/cardsType/${cardType}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', cardType);

    return card;
};

// Função para embaralhar um array (Fisher-Yates)
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Função para carregar as cartas misturadas no grid
const loadGame = () => {
    const combinedCards = [
        ...cardsType.map((type) => ({ type: 'type', value: type })),
        ...cardsText.map((text) => ({ type: 'text', value: text })),
    ];

    const shuffledCards = shuffle(combinedCards);

    shuffledCards.forEach((card) => {
        let cardElement;
        if (card.type === 'type') {
            cardElement = createCardType(card.value);
        } else {
            cardElement = createCardText(card.value);
        }
        grid.appendChild(cardElement);
    });
};

const startTime = () => {

    this.loop = setInterval(()=>{
        const correntTime = +time.innerHTML;
        time.innerHTML = correntTime + 1;
    }, 1000);
}

window.onload = () =>{
    spanPlayer.innerHTML = localStorage.getItem('player');
startTime();
loadGame(); 
}


