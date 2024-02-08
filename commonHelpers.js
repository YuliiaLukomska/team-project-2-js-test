import{a as c}from"./assets/vendor-0cb09735.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(e){if(e.ep)return;e.ep=!0;const a=t(e);fetch(e.href,a)}})();const d=document.querySelector(".filter-buttons"),l=document.querySelector(".exercise-filters-list"),n="https://energyflow.b.goit.study/api",p="Muscles";d.addEventListener("click",f);async function f(s){s.preventDefault();const t=s.target.dataset.filter;if(console.log(t),s.target.tagName==="BUTTON")try{g(t).then(o=>{console.log(o),l.innerHTML=m(o)})}catch(o){console.log(o)}}async function g(s=p){try{return(await c.get(`${n}/filters`,{params:{filter:s,page:1,limit:20}})).data.results}catch(r){console.log(r)}}function m(s){return s.map(({name:t,filter:o,imgUrl:e})=>` <li class='ExercisesItem' data-filter='${o}' data-name='${t}'>
        <img class="img-exercises" src="${e}" alt="${o}">
        <div>
          <p>${t}</p>
          <p>${o}</p>
        </div>
      </li>`).join("")}l.addEventListener("click",y);async function y(s){if(s.target===s.currentTarget)return;l.classList.add("ExerciseCategoryList");const r=s.target.closest(".ExercisesItem"),t=r.dataset.filter,o=r.dataset.name;console.log(t),console.log(o);try{const e=await h(t,o);l.innerHTML=v(e)}catch(e){console.log(e)}}async function h(s,r){try{return s==="Muscles"?(await c.get(`${n}/exercises`,{params:{muscles:r}})).data.results:s==="Body parts"?(await c.get(`${n}/exercises`,{params:{bodypart:r}})).data.results:(await c.get(`${n}/exercises`,{params:{equipment:r}})).data.results}catch(t){console.log(t)}}function v(s){return s.map(({rating:t,name:o,burnedCalories:e,time:a,bodyPart:i,target:u})=>`<li class="WorkoutCard">
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
        <p class='MainPartName'>${o}</p>
      </div>
      <ul class="CardFooter">
        <li>
          <p class='CardFooterTextDescr'>Burned calories: <span class='CardFooterTextValue'>${e} / ${a} min</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Body part: <span class='CardFooterTextValue'>${i}</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Target: <span class='CardFooterTextValue'>${u}</span></p>
        </li>
      </ul>
    </li>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
