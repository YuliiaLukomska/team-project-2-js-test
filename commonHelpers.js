import{a as c}from"./assets/vendor-0cb09735.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(e){if(e.ep)return;e.ep=!0;const i=t(e);fetch(e.href,i)}})();const d=document.querySelector(".filter-buttons"),l=document.querySelector(".exercise-filters-list"),p=document.querySelector(".ExercisesHead"),n="https://energyflow.b.goit.study/api",f="Muscles";d.addEventListener("click",g);async function g(s){s.preventDefault();const t=s.target.dataset.filter;if(console.log(t),s.target.tagName==="BUTTON")try{m(t).then(r=>{console.log(r),l.innerHTML=h(r)})}catch(r){console.log(r)}}async function m(s=f){try{return(await c.get(`${n}/filters`,{params:{filter:s,page:1,limit:20}})).data.results}catch(a){console.log(a)}}function h(s){return s.map(({name:t,filter:r,imgUrl:e})=>` <li class='ExercisesItem' data-filter='${r}' data-name='${t}'>
        <img class="img-exercises" src="${e}" alt="${r}">
        <div>
          <p>${t}</p>
          <p>${r}</p>
        </div>
      </li>`).join("")}l.addEventListener("click",y);async function y(s){if(s.target===s.currentTarget)return;l.classList.add("ExerciseCategoryList");const a=s.target.closest(".ExercisesItem"),t=a.dataset.filter,r=a.dataset.name;console.log(t),console.log(r);try{const e=await v(t,r);l.innerHTML=x(e),p.innerHTML=b(r)}catch(e){console.log(e)}}async function v(s,a){try{return s==="Muscles"?(await c.get(`${n}/exercises`,{params:{muscles:a}})).data.results:s==="Body parts"?(await c.get(`${n}/exercises`,{params:{bodypart:a}})).data.results:(await c.get(`${n}/exercises`,{params:{equipment:a}})).data.results}catch(t){console.log(t)}}function x(s){return s.map(({rating:t,name:r,burnedCalories:e,time:i,bodyPart:o,target:u})=>`<li class="WorkoutCard">
      <div class='CardHeader'>
        <div class='WorkoutWrapper'>
          <p class='Workout'>workout</p>
          <div class='RatingWrapper'><p>${t}</p>
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
        <p class='MainPartName'>${r}</p>
      </div>
      <ul class="CardFooter">
        <li>
          <p class='CardFooterTextDescr'>Burned calories: <span class='CardFooterTextValue'>${e} / ${i} min</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Body part: <span class='CardFooterTextValue'>${o}</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Target: <span class='CardFooterTextValue'>${u}</span></p>
        </li>
      </ul>
    </li>`).join("")}function b(s){return`<div>
  <h2 class="title-exercises">Exercises / ${s}</h2>
  <div class="ExercisesHeared">
  <div class="list-exercises filter-buttons">
    <button class="item-exercises" data-filter="Muscles">Muscles</button>
    <button class="item-exercises" data-filter="Body parts">Body parts</button>
    <button class="item-exercises" data-filter="Equipment">Equipment</button>
  </div>
    <form action="" class="ExercisesForm">
      <label for="#search" class="visually-hidden">Search</label>
      <input name="search" placeholder="Search" type="search" id="search" />
      <button type="submit">
        <svg width='18' height='18'>
          <use ></use>
        </svg>
      </button>
    </form></div>
</div>
`}
//# sourceMappingURL=commonHelpers.js.map
