const colors = ['red', 'green', 'blue', 'yellow'];
const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let deck = [];
let playerHand = [];
let discardPile = [];

function createDeck() {
  deck = [];
  for (let color of colors) {
    for (let value of values) {
      deck.push({ color, value });
      if (value !== '0') deck.push({ color, value }); // Two of each card except 0
    }
  }
  shuffle(deck);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
  createDeck();
  playerHand = [];
  for (let i = 0; i < 7; i++) {
    playerHand.push(deck.pop());
  }
  discardPile = [deck.pop()];
  render();
}

function drawCard() {
  if (deck.length === 0) return;
  playerHand.push(deck.pop());
  render();
}

function playCard(index) {
  const card = playerHand[index];
  const top = discardPile[discardPile.length - 1];
  if (card.color === top.color || card.value === top.value) {
    discardPile.push(card);
    playerHand.splice(index, 1);
    render();
  } else {
    alert("Invalid move!");
  }
}

function render() {
  const handDiv = document.getElementById('player-hand');
  handDiv.innerHTML = '';
  playerHand.forEach((card, i) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = `card ${card.color}`;
    cardDiv.innerText = card.value;
    cardDiv.onclick = () => playCard(i);
    handDiv.appendChild(cardDiv);
  });

  const discard = discardPile[discardPile.length - 1];
  document.getElementById('discard-pile').innerHTML = `Top Card: <span class="card ${discard.color}">${discard.value}</span>`;
}

function playCard(index) {
  const card = playerHand[index];
  const top = discardPile[discardPile.length - 1];
  if (card.color === top.color || card.value === top.value || card.value === 'Wild') {
    discardPile.push(card);
    playerHand.splice(index, 1);
    handleSpecialCard(card);
    render();
  } else {
    alert("Invalid move!");
  }
}

function handleSpecialCard(card) {
  switch (card.value) {
    case 'Skip':
      // Skip next player's turn
      break;
    case 'Reverse':
      // Reverse the turn order
      break;
    case 'Draw Two':
      // Next player draws two cards
      break;
    case 'Wild':
      // Change the current color
      break;
    case 'Wild Draw Four':
      // Next player draws four cards and changes the color
      break;
  }
}

const socket = io('http://localhost:3000');

socket.emit('joinGame', { playerId: socket.id });

socket.on('gameState', (state) => {
  // Update game state based on server data
});

function playCard(index) {
  const card = playerHand[index];
  socket.emit('playCard', card);
}

startGame();
