(function(){
  const btn=document.getElementById('hamburger-pd'), menu=document.getElementById('mobile-menu-pd');
  if(!btn||!menu)return;
  btn.addEventListener('click',()=>{ const o=menu.classList.toggle('is-open'); btn.setAttribute('aria-expanded',String(o)); });
  document.addEventListener('click',e=>{ if(!btn.contains(e.target)&&!menu.contains(e.target)){ menu.classList.remove('is-open'); btn.setAttribute('aria-expanded','false'); } });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ menu.classList.remove('is-open'); btn.setAttribute('aria-expanded','false'); btn.focus(); } });
  document.querySelectorAll('.detail-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{ document.querySelectorAll('.detail-tab').forEach(t=>{ t.classList.remove('active'); t.setAttribute('aria-selected','false'); }); tab.classList.add('active'); tab.setAttribute('aria-selected','true'); });
  });
})();
