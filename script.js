// Simple interactions and confetti
const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const surpriseBtn = document.getElementById('surprise');
const heart = document.querySelector('.heart');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const closeBtn = document.getElementById('close');
const confettiRoot = document.getElementById('confetti');

// Customize this text (or I'll do it for you)
const askerName = 'Harijayane';
const targetNamePlaceholder = ''; // e.g. 'Emma' — you can set it here or leave blank

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

function launchConfetti(cnt = 80){
  const colors = ['#ff3b6b','#ffd166','#ff8fab','#8ee3c6','#8ec5ff','#d7a9ff'];
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  for(let i=0;i<cnt;i++){
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.left = (Math.random()*vw) + 'px';
    el.style.top = (Math.random()*-20 - 10) + 'vh';
    el.style.width = (8 + Math.random()*10) + 'px';
    el.style.height = (12 + Math.random()*16) + 'px';
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    el.style.opacity = 0.95;
    // random duration and delay
    const dur = 2.6 + Math.random()*2.2;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = (Math.random()*0.15) + 's';
    confettiRoot.appendChild(el);
    // remove after animation
    setTimeout(()=> el.remove(), (dur + 0.6) * 1000);
  }
}

function clearConfetti(){
  confettiRoot.innerHTML = '';
}

function yesAction(){
  heart.classList.add('big');
  const nameText = targetNamePlaceholder ? `, ${targetNamePlaceholder}` : '';
  openModal(`<strong>Yes!</strong> ${askerName} is so happy${nameText} ❤️<div style="font-size:0.9rem;margin-top:8px">I can't wait to see you!</div>`);
  launchConfetti(120);
}

function noAction(){
  openModal(`<strong>It's okay.</strong> ${askerName} still cares a lot. 💌`);
}

function surpriseAction(){
  openModal(`<strong>Surprise!</strong> A kiss and a picnic? 🧺🌹`);
  launchConfetti(70);
}

yesBtn.addEventListener('click', yesAction);
noBtn.addEventListener('click', noAction);
surpriseBtn.addEventListener('click', surpriseAction);

// Make heart clickable to trigger yes
heart.addEventListener('click', yesAction);

// Optional gentle heart bounce when modal shows success
const observer = new MutationObserver((records)=>{
  records.forEach(r=>{
    if(r.target.getAttribute('aria-hidden') === 'false'){
      // bounce heart once
      heart.animate([{ transform: 'rotate(-45deg) scale(1)' }, { transform: 'rotate(-45deg) scale(1.12)' }, { transform: 'rotate(-45deg) scale(1)' }], { duration: 650 });
    }
  });
});
observer.observe(modal, { attributes: true, attributeFilter: ['aria-hidden'] });