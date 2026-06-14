(function(){
  const btn=document.getElementById('hamburger-sr'), menu=document.getElementById('mobile-menu-sr');
  if(!btn||!menu)return;
  btn.addEventListener('click',()=>{ const o=menu.classList.toggle('is-open'); btn.setAttribute('aria-expanded',String(o)); });
  document.addEventListener('click',e=>{ if(!btn.contains(e.target)&&!menu.contains(e.target)){ menu.classList.remove('is-open'); btn.setAttribute('aria-expanded','false'); } });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&menu.classList.contains('is-open')){ menu.classList.remove('is-open'); btn.setAttribute('aria-expanded','false'); btn.focus(); } });
  // filter tabs
  document.querySelectorAll('.filter-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{ document.querySelectorAll('.filter-tab').forEach(t=>{ t.classList.remove('active'); t.setAttribute('aria-selected','false'); }); tab.classList.add('active'); tab.setAttribute('aria-selected','true'); });
  });
  // budget toggle
  document.querySelectorAll('.budget-toggle').forEach(t=>{
    t.addEventListener('click',()=>{ t.classList.toggle('active'); t.setAttribute('aria-checked', String(t.classList.contains('active'))); });
  });
})();
