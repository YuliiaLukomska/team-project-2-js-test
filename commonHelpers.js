import{a as p}from"./assets/vendor-0cb09735.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const L=document.querySelector(".filter-buttons"),c=document.querySelector(".exercise-filters-list"),$=document.querySelector(".ExercisesHead"),d="https://energyflow.b.goit.study/api",m="Muscles",l=document.querySelector(".pagination");let n=1,u,f;L.addEventListener("click",T);async function T(t){t.preventDefault();const s=t.target.dataset.filter;if(console.log(s),t.target.tagName==="BUTTON")try{M(s).then(a=>{console.log(a),c.innerHTML=k(a)})}catch(a){console.log(a)}}async function M(t=m){try{return(await p.get(`${d}/filters`,{params:{filter:t,page:1,limit:12}})).data.results}catch(e){console.log(e)}}function k(t){return t.map(({name:s,filter:a,imgUrl:r})=>` <li class='ExercisesItem' data-filter='${a}' data-name='${s}'>
        <img class="img-exercises" src="${r}" alt="${a}">
        <div>
          <p>${s}</p>
          <p>${a}</p>
        </div>
      </li>`).join("")}c.addEventListener("click",w);async function w(t){if(t.target===t.currentTarget)return;c.classList.add("ExerciseCategoryList");const e=t.target.closest(".ExercisesItem");u=e.dataset.filter,f=e.dataset.name;try{const{page:s,perPage:a,totalPages:r,results:o}=await y(u,f);console.log(o),c.innerHTML=h(o),$.innerHTML=B(f),document.querySelector("#FilterBtn").addEventListener("click",C);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!НОВЕ
if(r>1){const g=E(r);console.log(g),l.innerHTML=g}//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!НОВЕ
l.addEventListener("click",b)}catch(s){console.log(s)}}async function y(t,e,s){try{return t==="Muscles"?(await p.get(`${d}/exercises`,{params:{muscles:e,page:s,limit:9}})).data:t==="Body parts"?(await p.get(`${d}/exercises`,{params:{bodypart:e,page:s,limit:9}})).data:(await p.get(`${d}/exercises`,{params:{equipment:e,page:s,limit:9}})).data}catch(a){console.log(a)}}function h(t){return t.map(({rating:s,name:a,burnedCalories:r,time:o,bodyPart:i,target:g})=>`<li class="WorkoutCard">
      <div class='CardHeader'>
        <div class='WorkoutWrapper'>
          <p class='Workout'>workout</p>
          <div class='RatingWrapper'><p>${s}</p>
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
        <p class='MainPartName'>${a}</p>
      </div>
      <ul class="CardFooter">
        <li>
          <p class='CardFooterTextDescr'>Burned calories: <span class='CardFooterTextValue'>${r} / ${o} min</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Body part: <span class='CardFooterTextValue'>${i}</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Target: <span class='CardFooterTextValue'>${g}</span></p>
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
`}async function C(t){n=1,l.removeEventListener("click",b);const e=document.querySelector(".title-exercises");if(e.innerHTML="Exercises",document.querySelector(".ExercisesForm"),console.log(e),t.target!==t.currentTarget){u=t.target.dataset.filter;try{const{page:s,perPage:a,totalPages:r,results:o}=await x(u);if(console.log(r),c.innerHTML=v(o),r>1){const i=E(r);console.log(i),l.innerHTML=i}else l.innerHTML="";//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!НОВЕ
l.addEventListener("click",F)}catch(s){console.log(s)}}}async function x(t=m){try{return(await p.get(`${d}/filters`,{params:{filter:t,page:n,limit:12}})).data}catch(e){console.log(e)}}function v(t){return t.map(({name:s,filter:a,imgUrl:r})=>` <li class='ExercisesItem' data-filter='${a}' data-name='${s}'>
        <img class="img-exercises" src="${r}" alt="${a}">
        <div>
          <p>${s}</p>
          <p>${a}</p>
        </div>
      </li>`).join("")}//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!НОВЕ
function E(t){let e="";for(let s=1;s<=t;s+=1)e+=`<button class="pagination-btn" type="button">${s}</button>`;return e}async function b(t){n=t.target.textContent,console.log(n);try{const{results:e,page:s,totalPages:a}=await y(u,f,n);c.innerHTML=h(e)}catch(e){console.log(e)}}async function F(t){n=t.target.textContent,console.log(n);try{const{results:e,page:s,totalPages:a}=await x(u,n);console.log(e),c.innerHTML=v(e)}catch(e){console.log(e)}}
//# sourceMappingURL=commonHelpers.js.map
