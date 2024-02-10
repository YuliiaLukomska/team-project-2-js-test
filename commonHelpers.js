import{a as u}from"./assets/vendor-0cb09735.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const L=document.querySelector(".filter-buttons"),c=document.querySelector(".exercise-filters-list"),T=document.querySelector(".ExercisesHead"),p="https://energyflow.b.goit.study/api",y="Muscles",d=document.querySelector(".pagination");let n=1,m,g;L.addEventListener("click",F);async function F(t){t.preventDefault();const a=t.target.dataset.filter;if(console.log(a),t.target.tagName==="BUTTON")try{k(a).then(s=>{console.log(s),c.innerHTML=w(s)})}catch(s){console.log(s)}}async function k(t=y){try{return(await u.get(`${p}/filters`,{params:{filter:t,page:1,limit:12}})).data.results}catch(e){console.log(e)}}function w(t){return t.map(({name:a,filter:s,imgUrl:r})=>` <li class='ExercisesItem' data-filter='${s}' data-name='${a}'>
        <img class="img-exercises" src="${r}" alt="${s}">
        <div>
          <p>${a}</p>
          <p>${s}</p>
        </div>
      </li>`).join("")}c.addEventListener("click",M);async function M(t){if(t.target===t.currentTarget)return;c.classList.add("ExerciseCategoryList");const e=t.target.closest(".ExercisesItem");m=e.dataset.filter,g=e.dataset.name;try{const{page:a,perPage:s,totalPages:r,results:o}=await h(m,g);console.log(o),c.innerHTML=x(o),T.innerHTML=B(g),document.querySelector("#FilterBtn").addEventListener("click",C);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!НОВЕ
if(r>1){const l=b(r);console.log(l),d.innerHTML=l}//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!НОВЕ
d.addEventListener("click",$)}catch(a){console.log(a)}}async function h(t,e,a){try{return t==="Muscles"?(await u.get(`${p}/exercises`,{params:{muscles:e,page:a,limit:9}})).data:t==="Body parts"?(await u.get(`${p}/exercises`,{params:{bodypart:e,page:a,limit:9}})).data:(await u.get(`${p}/exercises`,{params:{equipment:e,page:a,limit:9}})).data}catch(s){console.log(s)}}function x(t){return t.map(({rating:a,name:s,burnedCalories:r,time:o,bodyPart:i,target:l})=>`<li class="WorkoutCard">
      <div class='CardHeader'>
        <div class='WorkoutWrapper'>
          <p class='Workout'>workout</p>
          <div class='RatingWrapper'><p>${a}</p>
          <svg class='StarIcon' width='13' height='13'>
          <use href='./img/symbol-defs.svg#icon-star'></use>
        </svg></div>
        </div>
        <div class='StartBtn'>
          <p>Start</p>
          <svg width='13' height='13'>
          <use href='./img/symbol-defs.svg#icon-arrow'></use>
        </svg>
        </div>
      </div>
      <div class='CardMainPart'>
      <div class='RunIconWrapper'><svg width='14' height='14'>
          <use href='./img/symbol-defs.svg#icon-running'></use>
        </svg></div>
        <p class='MainPartName'>${s}</p>
      </div>
      <ul class="CardFooter">
        <li>
          <p class='CardFooterTextDescr'>Burned calories: <span class='CardFooterTextValue'>${r} / ${o} min</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Body part: <span class='CardFooterTextValue'>${i}</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Target: <span class='CardFooterTextValue'>${l}</span></p>
        </li>
      </ul>
    </li>`).join("")}function B(t){return`<div>
  <h2 class="title-exercises">Exercises / <span class="NameValue"> ${t}</span></h2>
  <div class="ExercisesHeared">
  <div class="list-exercises filter-buttons" id='FilterBtn'>
    <button class="item-exercises" data-filter="Muscles">Muscles</button>
    <button class="item-exercises" data-filter="Body parts">Body parts</button>
    <button class="item-exercises" data-filter="Equipment">Equipment</button>
  </div>
    <form action="" class="ExercisesForm">
      <label for="#search" class="visually-hidden">Search</label>
      <input class='SearchInput' name="search" placeholder="Search" type="search" id="search" />
      <button class='SearchButton' type="submit">
        <svg class='IconSearch' width='18' height='18'>
          <use href='./img/symbol-defs.svg#icon-search'></use>
        </svg>
      </button>
    </form></div>
</div>
`}async function C(t){n=1,d.removeEventListener("click",$);const e=document.querySelector(".title-exercises");if(e.innerHTML="Exercises",document.querySelector(".ExercisesForm").remove(),console.log(e),t.target===t.currentTarget)return;const s=t.target.dataset.filter;console.log(s);try{const{page:r,perPage:o,totalPages:i,results:l}=await v(s);if(c.innerHTML=E(l),i>1){const f=b(r,i);console.log(f),d.innerHTML=f}//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!НОВЕ
d.addEventListener("click",S)}catch(r){console.log(r)}}async function v(t=y){try{return(await u.get(`${p}/filters`,{params:{filter:t,page:n,limit:12}})).data}catch(e){console.log(e)}}function E(t){return t.map(({name:a,filter:s,imgUrl:r})=>` <li class='ExercisesItem' data-filter='${s}' data-name='${a}'>
        <img class="img-exercises" src="${r}" alt="${s}">
        <div>
          <p>${a}</p>
          <p>${s}</p>
        </div>
      </li>`).join("")}//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!НОВЕ
function b(t){let e="";for(let a=1;a<=t;a+=1)e+=`<button class="pagination-btn" type="button">${a}</button>`;return e}async function $(t){n=t.target.textContent,console.log(n);try{const{results:e,page:a,totalPages:s}=await h(m,g,n);c.innerHTML=x(e)}catch(e){console.log(e)}}async function S(t){n=t.target.textContent,console.log(n);try{const{results:e,page:a,totalPages:s}=await v(m,n);console.log(e),c.innerHTML=E(e)}catch(e){console.log(e)}}
//# sourceMappingURL=commonHelpers.js.map
