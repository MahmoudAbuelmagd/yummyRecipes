/// <reference types="../@types/jquery" />
const pageContent = document.querySelector('#pageContent');


$('#toggleSide').on('click', function () {
  $('.nav-menu').animate({ width: "toggle", paddingInline: "toggle" }, 1000)
  $('.nav-menu').css("display", "flex")
  $(this).removeClass("fa-bars")
  $(this).addClass("fa-times")
})

// $(document).ready(function () {
//   getSearchData().then(() => {
//     $(".loading").fadeOut(500)
//     $("body").css("overflow", "visible")
//   })
// })
getSearchData()
async function getCategories() {
  document.getElementById("searchHolder").innerHTML = "";
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const responseData = await response.json();
  displayCategories(responseData.categories);
}
document.getElementById("catLi").addEventListener('click', function () {
  getCategories()
})

function displayCategories(arr) {
  let box = ``
  for (let i = 0; i < arr.length; i++) {
    box += `
          <div class=" imgContainer col-md-3 rounded-3 " id="${arr[i].idCategory}">
            <div class="image h-100 position-relative overflow-hidden ">
              <img src="${arr[i].strCategoryThumb}" class="w-100 rounded-3" alt="meal">
              <div id="${arr[i].idCategory}" class="layer d-flex align-items-center justify-content-center h-100 rounded-3 w-100 position-absolute start-0">
                <h3> ${arr[i].strCategory} </h3>
              </div>
            </div>
          </div>
    `
  }
  pageContent.innerHTML = box;
  let cats = document.querySelectorAll(".imgContainer")
  for (let i = 0; i < cats.length; i++) {
    cats[i].addEventListener('click', function (e) {
      let currentCat = e.target.innerText
      getMeals("c", currentCat);
    })
  }
}
async function getMeals(key, meal) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${key}=${meal}`);
  const responseData = await response.json();
  displayMeals(responseData.meals)
}
function displayMeals(arr) {
  let box = ``
  for (let i = 0; i < arr.length; i++) {
    box += `
          <div class=" imgContainer col-md-3 rounded-3 " id="${arr[i].idMeal}">
            <div class="image h-100 position-relative overflow-hidden ">
              <img src="${arr[i].strMealThumb}" class="w-100 rounded-3" alt="meal">
              <div id="${arr[i].idMeal}" class="layer d-flex align-items-center justify-content-center h-100 rounded-3 w-100 position-absolute start-0">
                <h3> ${arr[i].strMeal} </h3>
              </div>
            </div>
          </div>
    `
  }
  pageContent.innerHTML = box;
  let meals = document.querySelectorAll(".imgContainer");
  meals.forEach(meal => {
    meal.addEventListener("click", () => {
      let mealId = meal.getAttribute("id")
      getMealId(mealId)
    })
  });
}
async function getMealId(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  const mealRes = await response.json();
  disMeal(mealRes.meals[0])

}
function disMeal(arr) {
  ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (arr[`strIngredient${i}`]) {
      ingredients += `
                    <span class="recip rounded-5 mt-3 d-inline-block bg-info-subtle text-black p-2"> ${arr[`strIngredient${i}`]}</span>
          `
    }
  }

  pageContent.innerHTML = `
          <div class="col-md-4">
            <div class="image ">
              <img src="${arr.strMealThumb}" alt="" class="rounded-3 object-fit-contain bg-body w-100">
            </div>
            <h2 class="text-white fs-1 mt-3"> ${arr.strMeal}</h2>
          </div>
          <div class="col-md-8 text-white">
            <h2>Instructions</h2>
            <p> ${arr.strInstructions}</p>
            <h3 class="fw-bolder"> Area : <span class="fw-semibold"> ${arr.strArea}</span></h3>
            <h3 class="fw-bolder"> Category : <span class="fw-semibold"> ${arr.strCategory}</span></h3>
            <h3> Recipes:</h3>
            <div class="allrecipes mb-3">
            ${ingredients}
            </div>
            <h3 class="mb-4"> Tags :</h3>
            <span class="alert alert-danger p-0"> ${arr.strTags ? arr.strTags : ""}</span>
            <div class="mt-4">
              <a target="_blank" href="${arr.strSource}" class="btn btn-success"> Source</a>
              <a target="_blank" href="${arr.strYoutube}" class="btn btn-danger"> Youtube</a>
            </div>
          </div>
  `
}

async function getAreas() {
  document.getElementById("searchHolder").innerHTML = "";
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const responseData = await response.json();
  displayAreas(responseData.meals)
}
document.getElementById("areaLi").addEventListener('click', function () {
  getAreas()
})

function displayAreas(arr) {
  let box = ``
  for (let i = 0; i < arr.length; i++) {
    box += `
            <div class="area col-md-3 text-center text-white">
            <i class="fa-solid fa-house-laptop fa-5x"></i>
            <h3 class="fs-2"> ${arr[i].strArea}</h3>
          </div>
    `
  }
  pageContent.innerHTML = box;
  let areas = document.querySelectorAll('.area');
  for (let i = 0; i < areas.length; i++) {
    areas[i].addEventListener('click', function (e) {
      currentArea = e.currentTarget.innerText;
      getMeals("a", currentArea)
    })

  }
}
async function getIngreds() {
  document.getElementById("searchHolder").innerHTML = "";
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const responseData = await response.json();
  displayIngreds(responseData.meals)
}

document.getElementById("ingredientsLi").addEventListener('click', function () {
  getIngreds()
})


function displayIngreds(arr) {
  let box = ``
  for (let i = 0; i < 20; i++) {
    box += `
    <div class="col-md-3 text-center text-white" id="${arr[i].idIngredient}">
    <i class="fa-solid fa-drumstick-bite fa-5x"></i>
            <h3 class="fs-2" data-ingred = "${arr[i].strIngredient}"> ${arr[i].strIngredient}</h3>
            <p> ${arr[i].strDescription.split(" ").slice(0, 25).join(" ")}...</p>
            </div>
    `
  }
  pageContent.innerHTML = box;
  let ingreds = document.querySelectorAll(".col-md-3")
  for (let i = 0; i < ingreds.length; i++) {
    ingreds[i].addEventListener('click', function () {
      let currentIngred = arr[i].strIngredient;
      getMeals("i", currentIngred);
    })
  }
}

document.getElementById("contactLi").addEventListener('click', function () {
  pageContent.innerHTML = `<form class=" vh-100 d-flex flex-column justify-content-center ">
          <div class="innerInputs ps-3">
            <div class="row mb-3">
              <div class="col">
              <input type="text" class="form-control" placeholder="Enter your Name" aria-label="First name">
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Enter your Email" autocomplete="username" aria-label="Last name">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <input type="number" class="form-control" placeholder="Enter your Phone" aria-label="First name">
            </div>
            <div class="col">
              <input type="number" class="form-control" placeholder="Enter your Age" aria-label="Last name">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <input type="password" class="form-control" placeholder="Enter your password" autocomplete="new-password" aria-label="First name">
            </div>
            <div class="col">
              <input type="password" class="form-control" placeholder=" repassword" autocomplete="new-password" aria-label="Last name">
            </div>
          </div>
          <button type="submit" class="btn btn-outline-danger d-block m-auto" disabled> Submit</button>
        </div>
        </form>`;
})
async function getSearchData() {
  document.getElementById("searchHolder").innerHTML = "";
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  const resData = await response.json();
  displaySearchAllMeals(resData.meals)
}
function displaySearchAllMeals(arr) {
  box = ``;
  for (let i = 0; i < arr.length; i++) {
    box += `
    <div class=" imgContainer col-md-3 rounded-3 " id="${arr[i].idMeal}">
            <div class="image h-100 position-relative overflow-hidden ">
              <img src="${arr[i].strMealThumb}" class="w-100 rounded-3" alt="meal">
              <div class="layer d-flex align-items-center justify-content-center h-100 rounded-3 w-100 position-absolute start-0">
                <h3> ${arr[i].strMeal} </h3>
              </div>
            </div>
          </div>`
  }
  pageContent.innerHTML = box;
}
document.getElementById("searchLi").addEventListener('click', function () {
  pageContent.innerHTML = "";
  document.getElementById("searchHolder").innerHTML = ` <div class="col">
            <input type="text" class="byName form-control" placeholder="Search by Name" aria-label="search name">
          </div>
          <div class="col">
            <input type="text" class="byLetter form-control" maxlength="1" placeholder="Search by First letter" aria-label="search letter">
          </div>`
  const nameInput = document.querySelector(".byName")
  const letterInput = document.querySelector(".byLetter")
  nameInput.addEventListener("keyup", function () {
    let inpValue = nameInput.value
    getSearchbyName(inpValue)
  })
  letterInput.addEventListener("keyup",function () {
    let letterValue = letterInput.value
      getSearchbyLetter(letterValue)
  })
})

async function getSearchbyName(name) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  const resData = await response.json();
  displayMeals(resData.meals)

}
function disNameSearch(arr) {
  box = ``
  for (let i = 0; i < arr.length; i++) {
    box += `
    <div class=" imgContainer col-md-3 rounded-3 " id="${arr[i].idMeal}">
            <div class="image h-100 position-relative overflow-hidden ">
              <img src="${arr[i].strMealThumb}" class="w-100 rounded-3" alt="meal">
              <div class="layer d-flex align-items-center justify-content-center h-100 rounded-3 w-100 position-absolute start-0">
                <h3> ${arr[i].strMeal} </h3>
              </div>
            </div>
          </div>`
  }
  pageContent.innerHTML = box
}

async function getSearchbyLetter(letter) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  const resData = await response.json();
  disNameSearch(resData.meals)
}
