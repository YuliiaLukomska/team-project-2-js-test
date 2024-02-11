import{a as d}from"./assets/vendor-0cb09735.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(i){if(i.ep)return;i.ep=!0;const n=s(i);fetch(i.href,n)}})();const q=document.querySelector(".FilterButtons"),h=document.querySelector(".ExerciseFiltersList"),x=document.querySelector(".Pagination"),A="https://energyflow.b.goit.study/api";let F="Muscles",m=1,B=window.innerWidth,p=0;q.addEventListener("click",D);x.addEventListener("click",T);B<=375?p=8:(B<=768,p=12);async function v(){try{return(await d.get(`${A}/filters`,{params:{filter:F,page:m,limit:p}})).data}catch(e){console.log(e)}}async function N(){try{const e=await v().then(t=>{const{results:s,totalPages:r,page:i}=t;if(s&&s.length>0){E(s);const n=$(i,r);x.innerHTML=n}else console.error("No exercises found.")})}catch(e){console.error("Error fetching exercises:",e)}}N();async function D(e){e.preventDefault(),m=1;const s=e.target.dataset.filter;if(F=s,h.innerHTML="",Array.from(e.currentTarget.children).map(r=>{r.textContent!==e.target.textContent?r.classList.remove("ButtonIsActive"):e.target.classList.add("ButtonIsActive")}),e.target.tagName==="BUTTON")try{v(s).then(r=>{const{results:i,totalPages:n,page:c}=r;E(i);{const y=$(c,n);x.innerHTML=y}})}catch(r){console.log(r)}}async function T(e){m=e.target.textContent,Array.from(e.currentTarget.children).map(t=>{t.textContent!==m?t.classList.remove("PaginationBtnIsActive"):e.target.classList.add("PaginationBtnIsActive")}),h.innerHTML="";try{const{results:t,page:s,totalPages:r}=await v();if(s===r)return;E(t)}catch(t){console.log(t)}}function E(e){const t=e.map(({name:s,filter:r,imgUrl:i})=>` <li class="FilterList ExercisesItem" data-filter='${r}' data-name='${s}'>
        <img class="ImgExercises" src="${i}" alt="${r}">
        <div class="FilterText">
          <p class="FilterExercises">${s}</p>
          <p class="FilterName">${r}</p>
        </div>
      </li>`).join("");h.insertAdjacentHTML("beforeend",t)}function $(e,t){let s="";for(let r=1;r<=t;r+=1)s+=`<button class="PaginationBtn PaginationBtnIsActive" type="button">${r}</button>`;return s}const a=document.querySelector(".ExerciseFiltersList"),W=document.querySelector(".ExercisesHead"),o=document.querySelector(".Pagination"),g="https://energyflow.b.goit.study/api";let l=1,u,f;a.addEventListener("click",L);async function L(e){if(a.removeEventListener("click",L),a.classList.add("ExerciseCategoryList"),o.removeEventListener("click",T),o.removeEventListener("click",H),e.target===e.currentTarget)return;a.classList.add("ExerciseCategoryList");const t=e.target.closest(".ExercisesItem");u=t.dataset.filter,f=t.dataset.name;try{W.innerHTML=O(f);const{totalPages:s,results:r}=await C(u,f);a.innerHTML=P(r);const i=document.querySelector(".StartBtn"),n=document.querySelector("#FilterBtn");if(n.addEventListener("click",V),n.addEventListener("click",b),o.innerHTML="",s>1){const c=w(s);o.innerHTML=c}o.addEventListener("click",S)}catch(s){console.log(s)}}function b(){document.querySelector(".ExercisesForm").remove(),FilterBtn.removeEventListener("click",b)}async function C(e,t,s){try{return e==="Muscles"?(await d.get(`${g}/exercises`,{params:{muscles:t,page:s,limit:9}})).data:e==="Body parts"?(await d.get(`${g}/exercises`,{params:{bodypart:t,page:s,limit:9}})).data:(await d.get(`${g}/exercises`,{params:{equipment:t,page:s,limit:9}})).data}catch(r){console.log(r)}}function P(e){return e.map(({rating:s,name:r,burnedCalories:i,time:n,bodyPart:c,target:y,_id:I})=>`<li class="WorkoutCard">
      <div class='CardHeader'>
        <div class='WorkoutWrapper'>
          <p class='Workout'>workout</p>
          <div class='RatingWrapper'><p>${s}</p>
          <svg class='StarIcon' width='13' height='13'>
          <use href='./img/symbol-defs.svg#icon-star'></use>
        </svg></div>
        </div>
        <div class='StartBtn' data-id='${I}'>
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
          <p class='CardFooterTextDescr'>Burned calories: <span class='CardFooterTextValue'>${i} / ${n} min</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Body part: <span class='CardFooterTextValue'>${c}</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Target: <span class='CardFooterTextValue'>${y}</span></p>
        </li>
      </ul>

    </li>`).join("")}function O(e){return`<div>
  <h2 class="TitleExercises">Exercises / <span class="NameValue"> ${e}</span></h2>
  <div class="ExercisesHeared">
  <div class="ListExercises FilterButtons" id='FilterBtn'>
    <button class="ItemExercises" data-filter="Muscles" id='MusclesBtn'>Muscles</button>
    <button class="ItemExercises" data-filter="Body parts" id='BodyPartBtn'>Body parts</button>
    <button class="ItemExercises" data-filter="Equipment" id='EquipmentBtn'>Equipment</button>
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
`}async function V(e){if(a.addEventListener("click",L),a.classList.remove("ExerciseCategoryList"),l=1,o.removeEventListener("click",S),Array.from(e.currentTarget.children).map(t=>{t.textContent!==e.target.textContent?t.classList.remove("ButtonIsActive"):e.target.classList.add("ButtonIsActive")}),e.target!==e.currentTarget){u=e.target.dataset.filter;try{const{totalPages:t,results:s}=await k(u);if(a.innerHTML=M(s),t>1){const i=w(t);o.innerHTML=i}else o.innerHTML="";o.addEventListener("click",H);const r=document.querySelector(".TitleExercises");r.innerHTML="Exercises"}catch(t){console.log(t)}}}async function k(e=filterValueDefault){try{return(await d.get(`${g}/filters`,{params:{filter:e,page:l,limit:12}})).data}catch(t){console.log(t)}}function M(e){return e.map(({name:s,filter:r,imgUrl:i})=>` <li class='FilterList ExercisesItem' data-filter='${r}' data-name='${s}'>
        <img class="ImgExercises" src="${i}" alt="${r}">
        <div class="FilterText">
          <p class="FilterExercises">${s}</p>
          <p class="FilterName">${r}</p>
        </div>
      </li>`).join("")}function w(e){let t="";for(let s=1;s<=e;s+=1)t+=`<button class="pagination-btn" type="button">${s}</button>`;return t}async function S(e){l=e.target.textContent;try{const{results:t}=await C(u,f,l);a.innerHTML=P(t)}catch(t){console.log(t)}}async function H(e){l=e.target.textContent;try{const{results:t}=await k(u,l);a.innerHTML=M(t)}catch(t){console.log(t)}}
//# sourceMappingURL=commonHelpers.js.map
