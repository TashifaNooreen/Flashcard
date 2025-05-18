const flashcardsData = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
    { question: "Who developed the theory of relativity?", answer: "Albert Einstein" },
    { question: "What is the boiling point of water?", answer: "100°C (212°F)" },
    { question: "What is 2 + 2?", answer: "4" }
  ];
  
  const flashcardsContainer = document.querySelector('.flashcards-container');
  const knowBtn = document.getElementById('knowBtn');
  const dontKnowBtn = document.getElementById('dontKnowBtn');
  const flipBtn = document.getElementById('flipBtn');
  const knownCountSpan = document.getElementById('knownCount');
  const dontKnowCountSpan = document.getElementById('dontKnowCount');
  
  let knownCount = 0;
  let dontKnowCount = 0;
  
  // Create flashcards in reverse order to form a stack
  function createFlashcards() {
    for (let i = flashcardsData.length - 1; i >= 0; i--) {
      const cardData = flashcardsData[i];
      const card = document.createElement('div');
      card.classList.add('flashcard');
  
      const front = document.createElement('div');
      front.classList.add('front');
      front.textContent = cardData.question;
  
      const back = document.createElement('div');
      back.classList.add('back');
      back.textContent = cardData.answer;
  
      card.appendChild(front);
      card.appendChild(back);
  
      flashcardsContainer.appendChild(card);
    }
  }
  
  function getTopCard() {
    // The last child is top of stack visually and logically
    return flashcardsContainer.lastElementChild;
  }
  
  function flipCard() {
    const card = getTopCard();
    if (!card) return; // no cards left
    card.classList.toggle('flipped');
  }
  
  function markKnown() {
    const card = getTopCard();
    if (!card) return;
    
    knownCount++;
    updateProgress();
    removeTopCard();
  }
  
  function markDontKnow() {
    const card = getTopCard();
    if (!card) return;
    
    dontKnowCount++;
    updateProgress();
    removeTopCard();
  }
  
  function updateProgress() {
    knownCountSpan.textContent = knownCount;
    dontKnowCountSpan.textContent = dontKnowCount;
  }
  
  function removeTopCard() {
    const card = getTopCard();
    if (!card) return;
    // Remove card from DOM with a fade-out animation (optional)
    card.classList.add('remove');
    
    // After animation, remove completely and check deck status
    setTimeout(() => {
      if (card.parentNode) card.parentNode.removeChild(card);
  
      if (flashcardsContainer.children.length === 0) {
        showDoneMessage();
      }
    }, 300); // match CSS animation duration if you add animation
  }
  
  function showDoneMessage() {
    // Disable Know and Don't Know buttons
    knowBtn.disabled = true;
    dontKnowBtn.disabled = true;
  
    // Clear any remaining cards
    flashcardsContainer.innerHTML = '';
  
    // Create done card
    const doneCard = document.createElement('div');
    doneCard.classList.add('flashcard');
  
    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = "🎉 Done!";
  
    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = "Thank you for reviewing the flashcards!";
  
    doneCard.appendChild(front);
    doneCard.appendChild(back);
    flashcardsContainer.appendChild(doneCard);
  
    // Allow flipping the done card
    doneCard.classList.remove('flipped');
    flipBtn.disabled = false;
  }
  
  function init() {
    createFlashcards();
    updateProgress();
  
    knowBtn.addEventListener('click', markKnown);
    dontKnowBtn.addEventListener('click', markDontKnow);
    flipBtn.addEventListener('click', flipCard);
  }
  
  init();
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");
  let stars = [];
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
    });
  }
  
  function animateStars() {
    ctx.fillStyle = "#050716";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    for (let i = 0; i < stars.length; i++) {
      let star = stars[i];
      star.z -= 2;
      if (star.z <= 0) {
        star.z = canvas.width;
      }
      let k = 128.0 / star.z;
      let px = (star.x - canvas.width / 2) * k + canvas.width / 2;
      let py = (star.y - canvas.height / 2) * k + canvas.height / 2;
  
      if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
        let size = (1 - star.z / canvas.width) * 3;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    }
  
    requestAnimationFrame(animateStars);
  }
  animateStars();