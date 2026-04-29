document.addEventListener('DOMContentLoaded',()=>{
 const items=document.querySelectorAll('.reveal');
 const observer=new IntersectionObserver(entries=>{
   entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show');});
 },{threshold:0.15});
 items.forEach(i=>observer.observe(i));

 const counters=document.querySelectorAll('[data-count]');
 counters.forEach(counter=>{
   const target=+counter.dataset.count;
   let n=0;
   const tick=()=>{
     n += Math.ceil(target/40);
     if(n>target) n=target;
     counter.textContent=n;
     if(n<target) requestAnimationFrame(tick);
   };
   tick();
 });
});