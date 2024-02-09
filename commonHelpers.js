import{a as c}from"./assets/vendor-0cb09735.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(e){if(e.ep)return;e.ep=!0;const i=a(e);fetch(e.href,i)}})();const p=document.querySelector(".filter-buttons"),l=document.querySelector(".exercise-filters-list"),m=document.querySelector(".ExercisesHead"),n="https://energyflow.b.goit.study/api",u="Muscles";p.addEventListener("click",f);async function f(s){s.preventDefault();const a=s.target.dataset.filter;if(console.log(a),s.target.tagName==="BUTTON")try{g(a).then(t=>{console.log(t),l.innerHTML=h(t)})}catch(t){console.log(t)}}async function g(s=u){try{return(await c.get(`${n}/filters`,{params:{filter:s,page:1,limit:20}})).data.results}catch(r){console.log(r)}}function h(s){return s.map(({name:a,filter:t,imgUrl:e})=>` <li class='ExercisesItem' data-filter='${t}' data-name='${a}'>
        <img class="img-exercises" src="${e}" alt="${t}">
        <div>
          <p>${a}</p>
          <p>${t}</p>
        </div>
      </li>`).join("")}l.addEventListener("click",y);async function y(s){if(s.target===s.currentTarget)return;l.classList.add("ExerciseCategoryList");const r=s.target.closest(".ExercisesItem"),a=r.dataset.filter,t=r.dataset.name;console.log(a),console.log(t);try{const e=await x(a,t);l.innerHTML=v(e),m.innerHTML=E(t);const i=document.querySelector("#FilterBtn");console.log(i),i.addEventListener("click",$)}catch(e){console.log(e)}}async function x(s,r){try{return s==="Muscles"?(await c.get(`${n}/exercises`,{params:{muscles:r}})).data.results:s==="Body parts"?(await c.get(`${n}/exercises`,{params:{bodypart:r}})).data.results:(await c.get(`${n}/exercises`,{params:{equipment:r}})).data.results}catch(a){console.log(a)}}function v(s){return s.map(({rating:a,name:t,burnedCalories:e,time:i,bodyPart:o,target:d})=>`<li class="WorkoutCard">
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
        <p class='MainPartName'>${t}</p>
      </div>
      <ul class="CardFooter">
        <li>
          <p class='CardFooterTextDescr'>Burned calories: <span class='CardFooterTextValue'>${e} / ${i} min</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Body part: <span class='CardFooterTextValue'>${o}</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Target: <span class='CardFooterTextValue'>${d}</span></p>
        </li>
      </ul>
    </li>`).join("")}function E(s){return`<div>
  <h2 class="title-exercises">Exercises / <span class="NameValue"> ${s}</span></h2>
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
`}async function $(s){const r=document.querySelector(".title-exercises");if(r.innerHTML="Exercises",document.querySelector(".ExercisesForm").remove(),console.log(r),s.target===s.currentTarget)return;const t=s.target.dataset.filter;console.log(t);try{const e=await b(t);l.innerHTML=F(e)}catch(e){console.log(e)}}async function b(s=u){try{return(await c.get(`${n}/filters`,{params:{filter:s,page:1,limit:20}})).data.results}catch(r){console.log(r)}}function F(s){return s.map(({name:a,filter:t,imgUrl:e})=>` <li class='ExercisesItem' data-filter='${t}' data-name='${a}'>
        <img class="img-exercises" src="${e}" alt="${t}">
        <div>
          <p>${a}</p>
          <p>${t}</p>
        </div>
      </li>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
