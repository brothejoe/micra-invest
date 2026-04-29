document.addEventListener('DOMContentLoaded',()=>{
// Reveal animations
const sections=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('show');}
 });
},{threshold:0.18});
sections.forEach(sec=>observer.observe(sec));

// 1) 3D Hero tilt effect
const hero=document.querySelector('.hero');
hero.addEventListener('mousemove',(e)=>{
 const x=(window.innerWidth/2-e.clientX)/40;
 const y=(window.innerHeight/2-e.clientY)/40;
 hero.style.transform=`perspective(1000px) rotateY(${-x}deg) rotateX(${y}deg)`;
});
hero.addEventListener('mouseleave',()=>hero.style.transform='perspective(1000px) rotateX(0) rotateY(0)');

// 2) Investor dashboard counters
const metrics=[
 {id:'rev',target:250000,label:'Projected Revenue'},
 {id:'roi',target:38,label:'ROI %'},
 {id:'sites',target:12,label:'Target Sites'}
];
const board=document.createElement('section');
board.className='card reveal';
board.innerHTML='<h2>Investor Dashboard</h2><div class="dash"></div>';
document.querySelector('#funding').before(board);
const dash=board.querySelector('.dash');
metrics.forEach(m=>{
 const el=document.createElement('div');
 el.innerHTML=`<strong id="${m.id}">0</strong><span>${m.label}</span>`;
 dash.appendChild(el);
 let n=0; const step=Math.ceil(m.target/60);
 const run=()=>{n=Math.min(n+step,m.target);document.getElementById(m.id).textContent=n.toLocaleString(); if(n<m.target) requestAnimationFrame(run)}; run();
});

// 4) Carbon credit calculator
const calc=document.createElement('section');
calc.className='card reveal';
calc.innerHTML=`<h2>Carbon Credit Calculator</h2>
<p>Estimate annual credits from restored hectares.</p>
<input id="hectares" type="range" min="1" max="500" value="50">
<p><span id="haVal">50</span> hectares = <strong id="credits">400</strong> credits/year</p>`;
document.querySelector('#funding').before(calc);
const hectares=document.getElementById('hectares');
const haVal=document.getElementById('haVal');
const credits=document.getElementById('credits');
const updateCalc=()=>{haVal.textContent=hectares.value;credits.textContent=(hectares.value*8).toLocaleString();};
hectares.addEventListener('input',updateCalc); updateCalc();
});