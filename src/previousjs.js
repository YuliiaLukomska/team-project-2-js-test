import axios from 'axios';

const filterButtons = document.querySelector('.filter-buttons');
const exerciseFiltersList = document.querySelector('.exercise-filters-list');
const ExercisesHead = document.querySelector('.ExercisesHead');

const BASE_URL = 'https://energyflow.b.goit.study/api';
const filterValueDefault = 'Muscles';

const pagination = document.querySelector('.pagination');
let currentPage = 1;
let screenWidth = window.innerWidth;
let currentLimit = 0;
let filterValue;
let nameValue;

// на div з кнопками вішаємо слухача
filterButtons.addEventListener('click', filterBtnClick);

async function filterBtnClick(event) {
  // preventDefault напево нетреба (нема посилань і сабміту)
  event.preventDefault();
  // тут посилання на ДОМ-ел на який клікнули
  const filterValue = event.target;
  // дістаємо значення дата-атрибута елемента, на який клацнули
  const qwer = filterValue.dataset.filter;
  // чому робиш пустим ul при виклику функції?
  // exerciseFiltersList.innerHTML = '';
  console.log(qwer);
  // tagName чи nodeName?
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  try {
    // передаємо аргументом значення дата атрибута кнопки на яку клікнули
    getExercises(qwer).then(data => {
      console.log(data);
      exerciseFiltersList.innerHTML = markupExercises(data);
    });
  } catch (error) {
    console.log(error);
  }
}
// по замовчувнню значення фільтра буде 'Muscles'
async function getExercises(filter = filterValueDefault) {
  try {
    const response = await axios.get(`${BASE_URL}/filters`, {
      params: {
        filter: filter,
        page: 1,
        limit: 12,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
}
// функція отримує масив об'єктів
function markupExercises(results) {
  const markup = results
    .map(
      ({
        name,
        filter,
        imgUrl,
      }) => ` <li class='ExercisesItem' data-filter='${filter}' data-name='${name}'>
        <img class="img-exercises" src="${imgUrl}" alt="${filter}">
        <div>
          <p>${name}</p>
          <p>${filter}</p>
        </div>
      </li>`
    )
    .join('');
  return markup;
  // треба іннерhtml, щоб при кліку відбувалась заміна розмітки, а не продовження
  // exerciseFiltersList.insertAdjacentHTML('beforeend', markup);
}
// -------------------------------------------------------------------------------------------------------------------------------
exerciseFiltersList.addEventListener('click', onCardClick);

async function onCardClick(event) {
  if (event.target === event.currentTarget) {
    return;
  }
  // при кліку на картку додаємо клас до ul (бо він має інші стилі)
  exerciseFiltersList.classList.add('ExerciseCategoryList');
  // при кліку на картку шукаємо найближчий елемент у якого буде заданий селектор (це li)
  const liEl = event.target.closest('.ExercisesItem');
  // тепер можемо отримати li дата-атрибути
  filterValue = liEl.dataset.filter; //Muscles
  nameValue = liEl.dataset.name; // abductors
  // передаємо ці атрибути в функцію , яка робить запит
  try {
    const { page, perPage, totalPages, results } = await getExercisesByFilter(
      filterValue,
      nameValue
    );
    // це буде масив об'єктів
    console.log(results);
    exerciseFiltersList.innerHTML = createMarkUp(results);
    // оновлюємо хедер секції Exercises
    ExercisesHead.innerHTML = updateExercisesHeaderMarkup(nameValue);
    // додаємо на три кнопки фільтрів слухача по кліку--------------------------------------------------------------------------
    const FilterBtn = document.querySelector('#FilterBtn');
    FilterBtn.addEventListener('click', onBtnClick);
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!НОВЕ
    if (totalPages > 1) {
      // const pag це буде рядок розмітки кнопок(нумерація сторінок)
      const pag = paginationPages(totalPages);
      console.log(pag);
      // додаємо в div розмітку сторінок
      pagination.innerHTML = pag;
    }
    // else {
    //   pagination.innerHTML = '';
    // }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!НОВЕ
    // вішаємо на дів з кнопками нумерації сторінок слухача подій при кліку
    pagination.addEventListener('click', onPaginationPages);
  } catch (error) {
    console.log(error);
  }
}

async function getExercisesByFilter(filterValue, nameValue, currentPage) {
  // в запиті можливі три ключі, тому відповідно до значення фільтра пишемо цей ключ
  try {
    if (filterValue === 'Muscles') {
      const response = await axios.get(`${BASE_URL}/exercises`, {
        params: {
          muscles: nameValue,
          page: currentPage,
          limit: 9,
        },
      });
      return response.data;
    } else if (filterValue === 'Body parts') {
      const response = await axios.get(`${BASE_URL}/exercises`, {
        params: {
          bodypart: nameValue,
          page: currentPage,
          limit: 9,
        },
      });
      return response.data;
    } else {
      const response = await axios.get(`${BASE_URL}/exercises`, {
        params: {
          equipment: nameValue,
          page: currentPage,
          limit: 9,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

function createMarkUp(array) {
  const markup = array
    .map(({ rating, name, burnedCalories, time, bodyPart, target }) => {
      return `<li class="WorkoutCard">
      <div class='CardHeader'>
        <div class='WorkoutWrapper'>
          <p class='Workout'>workout</p>
          <div class='RatingWrapper'><p>${rating}</p>
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
        <p class='MainPartName'>${name}</p>
      </div>
      <ul class="CardFooter">
        <li>
          <p class='CardFooterTextDescr'>Burned calories: <span class='CardFooterTextValue'>${burnedCalories} / ${time} min</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Body part: <span class='CardFooterTextValue'>${bodyPart}</span></p>
        </li>
        <li>
          <p class='CardFooterTextDescr'>Target: <span class='CardFooterTextValue'>${target}</span></p>
        </li>
      </ul>
    </li>`;
    })
    .join('');
  return markup;
}

function updateExercisesHeaderMarkup(nameValue) {
  return `<div>
  <h2 class="title-exercises">Exercises / <span class="NameValue"> ${nameValue}</span></h2>
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
`;
}
// ==================================================================================================

// це виклик функції Данила. Треба щоб він зробив експорт
// функція, яка спрацбовує коли ми клікаємо по фільтру (Muscle, Body Part, Equipment)
async function onBtnClick(event) {
  // робимо поточну сторінку першою
  currentPage = 1;
  // видаляємо з нумерації сторінок слухача попереднього
  pagination.removeEventListener('click', onPaginationPages);
  // pagination.addEventListener('click', onPaginationPagesbyFilter);
  // тут видалення тексту після слеша та форми
  const titleExercises = document.querySelector('.title-exercises');
  titleExercises.innerHTML = 'Exercises';
  const ExercisesForm = document.querySelector('.ExercisesForm');
  // ?????????????????????????????????????????форма видаляється при першому кліку, а при другому знову хоче видалити, а її вже нема
  // ExercisesForm.remove(); /////????????????????????????????????????????????????????????
  console.log(titleExercises);
  if (event.target === event.currentTarget) {
    return;
  }
  // дістаємо значення дата-атрибута елемента, на який клацнули
  filterValue = event.target.dataset.filter; //muscle, body part, equipment

  // чому робиш пустим ul при виклику функції?
  // exerciseFiltersList.innerHTML = '';
  // робимо запит по фільтру muscle, body part, equipment
  try {
    const { page, perPage, totalPages, results } = await getExercise(
      filterValue
    );
    console.log(totalPages);
    // робимо розмітку всередині ul по фільтру починаюxи з першої сторінки
    exerciseFiltersList.innerHTML = markupExercise(results);
    if (totalPages > 1) {
      // const pag це буде рядок розмітки кнопок(нумерація сторінок)
      const pag = paginationPages(totalPages);
      console.log(pag);
      // додаємо в div розмітку сторінок
      pagination.innerHTML = pag;
    } else {
      pagination.innerHTML = '';
    }
    // else {
    //   pagination.innerHTML = '';
    // }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!НОВЕ

    pagination.addEventListener('click', onPaginationPagesbyFilter);
  } catch (error) {
    console.log(error);
  }
}
// по замовчувнню значення фільтра буде 'Muscles'
async function getExercise(filter = filterValueDefault) {
  try {
    const response = await axios.get(`${BASE_URL}/filters`, {
      params: {
        filter: filter,
        page: currentPage,
        limit: 12,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
// функція отримує масив об'єктів
function markupExercise(results) {
  const markup = results
    .map(
      ({
        name,
        filter,
        imgUrl,
      }) => ` <li class='ExercisesItem' data-filter='${filter}' data-name='${name}'>
        <img class="img-exercises" src="${imgUrl}" alt="${filter}">
        <div>
          <p>${name}</p>
          <p>${filter}</p>
        </div>
      </li>`
    )
    .join('');
  return markup;
  // треба іннерhtml, щоб при кліку відбувалась заміна розмітки, а не продовження
  // exerciseFiltersList.insertAdjacentHTML('beforeend', markup);
}
// --------------------------------------------------------------------------------------

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!НОВЕ
function paginationPages(totalPages) {
  let paginationHtml = '';
  for (let i = 1; i <= totalPages; i += 1) {
    paginationHtml += `<button class="pagination-btn" type="button">${i}</button>`;
  }
  // в залежності від к-ті сторінок повертає таку кількість кнопок в розмітці
  return paginationHtml;
}

async function onPaginationPages(e) {
  // при кліку на цифру сторінки будемо діставати цифру (текст-контент кнопки: 1, 4, 7...)
  currentPage = e.target.textContent;
  console.log(currentPage); // 7
  // очищує ul з картками
  // exerciseFiltersList.innerHTML = '';
  try {
    // запит на картки по фільтру
    const { results, page, totalPages } = await getExercisesByFilter(
      filterValue,
      nameValue,
      currentPage
    );

    // const filter = results[0].filter;

    // if (page === totalPages) {
    //   return;
    // }
    // робимо розмітку підкатегорій відповідно до номеру сторінки
    exerciseFiltersList.innerHTML = createMarkUp(results);
  } catch (error) {
    console.log(error);
  }
}

// вішаємо слухач на дів з цифрами сторінок

async function onPaginationPagesbyFilter(e) {
  // при кліку на цифру сторінки будемо діставати цифру (текст-контент кнопки)
  currentPage = e.target.textContent;
  console.log(currentPage); // 7
  // очищує ul з картками
  // exerciseFiltersList.innerHTML = '';
  try {
    // запит на картки по фільтру
    const { results, page, totalPages } = await getExercise(
      filterValue,
      currentPage
    );
    console.log(results);
    // const filter = results[0].filter;

    // if (page === totalPages) {
    //   return;
    // }
    exerciseFiltersList.innerHTML = markupExercise(results);
  } catch (error) {
    console.log(error);
  }
}
