// Interactions: evasive No button and Yes with special message + confetti
const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const heart = document.querySelector('.heart');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const closeBtn = document.getElementById('close');
const confettiRoot = document.getElementById('confetti');
const card = document.getElementById('card');
const buttonsContainer = document.getElementById('buttons');

const askerName = 'Harijayane';

function openModal(text){
  modalText.innerHTML = text;
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){
  modal.setAttribute('aria-hidden','true');
  clearConfetti();
}
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });

function launchConfetti(cnt = 100){
  const colors = ['#ff3b6b','#ffd166','#ff8fab','#8ee3c6','#8ec5ff','#d7a9ff'];
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  for(let i=0;i<cnt;i++){
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.left = (Math.random()*vw) + 'px';
    el.style.top = (Math.random()*-20 - 10) + 'vh';
    el.style.width = (8 + Math.random()*12) + 'px';
    el.style.height = (12 + Math.random()*18) + 'px';
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    const dur = 2.6 + Math.random()*2.8;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = (Math.random()*0.2) + 's';
    confettiRoot.appendChild(el);
    setTimeout(()=> el.remove(), (dur + 0.6) * 1000);
  }
}
function clearConfetti(){ confettiRoot.innerHTML = ''; }

// Yes action: show loving message
function yesAction(){
  openModal(`<div style="font-family: 'Great Vibes', cursive; font-size:2rem; color:var(--accent-dark)">I love you soooo much ❤️</div><div style="margin-top:8px;font-size:0.95rem">- ${askerName}</div>`);
  launchConfetti(160);
}

// No button: evade attempts to click
function moveNoButton(){
  // ensure container has positioning so absolute moves are inside it
  buttonsContainer.classList.add('positioned');

  const container = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const btnWidth = btnRect.width;
  const btnHeight = btnRect.height;

  // compute safe area inside card where button can go
  const padding = 12;
  const minX = container.left + padding;
  const maxX = container.right - btnWidth - padding;
  const minY = container.top + padding + 90; // leave room for title/heart
  const maxY = container.bottom - btnHeight - padding - 20;

  // fallback small nudges if not enough space
  if(maxX <= minX || maxY <= minY){
    noBtn.style.transform = `translate(${(Math.random()*80-40)}px, ${(Math.random()*36-18)}px)`;
    setTimeout(()=> noBtn.style.transform = '', 700);
    return;
  }

  // choose a point inside the allowed rectangle
  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;

  const left = x - container.left;
  const top = y - container.top;

  // set absolute positioning relative to the card's content box
  // make sure the button stays visible and doesn't overflow
  noBtn.style.position = 'absolute';
  noBtn.style.left = `${Math.max(8, Math.min(left, container.width - btnWidth - 8))}px`;
  noBtn.style.top = `${Math.max(8, Math.min(top, container.height - btnHeight - 8))}px`;
  noBtn.style.transform = ''; // reset any translate
}

// Attach handlers to evade on mouseenter and focus (keyboard)
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('focus', moveNoButton);
noBtn.addEventListener('click', (e)=>{
  // prevent clicking No; bounce it away
  e.preventDefault();
  moveNoButton();
});

// Yes button and heart both accept and show message
yesBtn.addEventListener('click', yesAction);
heart.addEventListener('click', yesAction);

// observe modal to pulse heart on success
const observer = new MutationObserver((records)=>{
  records.forEach(r=>{
    if(r.target.getAttribute('aria-hidden') === 'false'){
      heart.animate([{ transform: 'rotate(-45deg) scale(1)' }, { transform: 'rotate(-45deg) scale(1.14)' }, { transform: 'rotate(-45deg) scale(1)' }], { duration: 700 });
    }
  });
});
observer.observe(modal, { attributes: true, attributeFilter: ['aria-hidden'] });

// reset no button positioning on resize to avoid being out-of-bounds
window.addEventListener('resize', ()=>{
  noBtn.style.position = '';
  noBtn.style.left = '';
  noBtn.style.top = '';
  noBtn.style.transform = '';
  buttonsContainer.classList.remove('positioned');
});
