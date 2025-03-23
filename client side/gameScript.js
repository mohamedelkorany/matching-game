// startSCript.js

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const timerDisplay = document.getElementById('timer');
    const restartButton = document.getElementById('restart');
    let cards = [];
    let firstCard, secondCard;
    let lockBoard = false;
    let matchedPairs = 0;
    let timer;
    let seconds = 0, minutes = 0;
  
    // Array of symbols for the cards
    const symbols = ['🧸', '🚗', '🏀', '🎮', '🪀', '🎲', '🪁', '🤖'];
  
    // Duplicate the symbols to create pairs
    const cardSymbols = [...symbols, ...symbols];
  
    // Shuffle the card symbols
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    // Create the card elements and add them to the grid
    function createBoard() {
      const shuffledCards = shuffle(cardSymbols);
      grid.innerHTML = '';
      shuffledCards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.textContent = symbol;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
      });
      cards = document.querySelectorAll('.card');
    }
  
    // Flip a card when clicked
    function flipCard() {
      if (lockBoard || this === firstCard || this.classList.contains('match')) return;
  
      this.classList.add('flipped');
  
      if (!firstCard) {
        firstCard = this;
        return;
      }
  
      secondCard = this;
      checkForMatch();
    }
  
    // Check if the two flipped cards match
    function checkForMatch() {
      const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
  
      if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === symbols.length) {
          clearInterval(timer);
          alert('Congratulations! You won!');
        }
      } else {
        unflipCards();
      }
    }
  
    // Disable matched cards
    function disableCards() {
      firstCard.classList.add('match');
      secondCard.classList.add('match');
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      resetBoard();
    }
  
    // Unflip unmatched cards
    function unflipCards() {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
      }, 1000);
    }
  
    // Reset the board after each turn
    function resetBoard() {
      [firstCard, secondCard] = [null, null];
      lockBoard = false;
    }
  
    // Start the timer
    function startTimer() {
      timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
          minutes++;
          seconds = 0;
        }
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }, 1000);
    }
  
    // Restart the game
    function restartGame() {
      clearInterval(timer);
      seconds = 0;
      minutes = 0;
      timerDisplay.textContent = '00:00';
      matchedPairs = 0;
      createBoard();
      startTimer();
    }
  
    // Initialize the game
    createBoard();
    startTimer();
  
    // Event listener for the restart button
    restartButton.addEventListener('click', restartGame);
  });