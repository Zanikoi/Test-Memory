const grid = document.querySelector('.grid');

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

let fistCard='';
let secondCard='';

// Função para criar elementos com uma classe
const createElement = (tag, classname) => {
    const element = document.createElement(tag);
    element.className = classname;
    return element;
};

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disable-card');
    if (disabledCards.length === 18) {
        // Exibir o alert após o efeito do giro
        setTimeout(() => {
            alert('Parabéns, você ganhou o jogo!');
        }, 500); // Ajuste este valor se a animação durar mais
    }
};

const checkCard = () =>{

    const fistcharacter = fistCard.getAttribute('data-character');

    const secontcharacter = secondCard.getAttribute('data-character');

    if (fistcharacter == secontcharacter ) {
        fistCard.firstChild.classList.add('diseble-card');
        secondCard.firstChild.classList.add('diseble-card');

        fistCard = '';
        secondCard = '';

        checkEndGame();
        
    }else{
        setTimeout(()=>{
        fistCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        fistCard = '';
        secondCard = '';

    },500);}

}

const revealCard =({target})=>{
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
    if(fistCard == ''){
        target.parentNode.classList.add('reveal-card');
        fistCard = target.parentNode;
    }
    else if(secondCard == ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCard();
    }

}

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
    // Combine os dois arrays de cartas
    const combinedCards = [...cardsType.map(type => ({ type: 'type', value: type })), 
                          ...cardsText.map(text => ({ type: 'text', value: text }))];

    // Embaralhe as cartas
    const shuffledCards = shuffle(combinedCards);

    // Crie as cartas embaralhadas e adicione ao grid
    shuffledCards.forEach((card) => {
        let cardElement;
        if (card.type === 'type') {
            cardElement = createCardType(card.value); // Cria uma carta de tipo
        } else {
            cardElement = createCardText(card.value); // Cria uma carta de texto
        }
        grid.appendChild(cardElement);
    });
};

// Chama a função para carregar o jogo com as cartas misturadas e embaralhadas
loadGame();
