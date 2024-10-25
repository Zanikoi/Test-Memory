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
    'teste_aceitaçãoT',
    'teste_desempenhoT',
    'teste_exploraçãoT',
    'teste_fumaçaT',
    'teste_integraçãoT',
    'teste_regressãoT',
    'teste_sanidadeT',
    'teste_segurançaT',
    'teste_unitárioT',
];

// Função para criar elementos com uma classe
const createElement = (tag, classname) => {
    const element = document.createElement(tag);
    element.className = classname;
    return element;
};

// Função para criar cartas de texto
const createCardText = (cardText) => {
    const card = createElement('div', 'card');
    const frontText = createElement('div', 'face frontText');
    const backText = createElement('div', 'face backText');

    frontText.style.backgroundImage = `url('../images/${cardText}.png')`;

    card.appendChild(frontText);
    card.appendChild(backText);

    return card;
};

// Função para criar cartas de tipo
const createCardType = (cardType) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${cardType}.png')`;

    card.appendChild(front);
    card.appendChild(back);

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
