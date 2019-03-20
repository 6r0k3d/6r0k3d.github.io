var btns=document.querySelectorAll('.cbtn');

for(var i=0;i<btns.length;i++){
btns[i].addEventListener('mouseleave',clearTooltip);
btns[i].addEventListener('blur',clearTooltip);
}

function clearTooltip(e){
e.currentTarget.setAttribute('class','cbtn');
e.currentTarget.removeAttribute('aria-label');
}

function showTooltip(elem,msg){
elem.setAttribute('class','cbtn tooltipped tooltipped-s');
elem.setAttribute('aria-label',msg);
}
