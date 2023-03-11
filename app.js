//Load Meals from MealDB
const loadCategories = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((resp) => resp.json())
    .then((data) => displayCategories(data))
    .catch((error) => console.log(error));
};

// Preview of the data
function displayCategories(data) {
  const categories = data.categories;
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";
    const categoryInfo = `
        
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<a href="#">
    <img class="rounded-t-lg" src="${category.strCategoryThumb}" alt="" />
</a>
<div class="p-5">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${
          category.strCategory
        }</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${category.strCategoryDescription.substring(
      0,
      100
    )}...</p>
    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onclick="showMeal('${
      category.strCategory
    }')">
        Explore Food
        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
</div>
</div>
        `;
    categoryDiv.innerHTML = categoryInfo;
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.appendChild(categoryDiv);
  });
}

// Show Meals based on category
const showMeal = (category) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

// Display Meals
const displayMeals = (meals) => {
    console.log(meals);

    const mealsDiv = document.getElementById("category-container");
    mealsDiv.innerHTML = "";
    meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.className = "meal";
    const mealInfo = `
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="rounded-t-lg" src="${meal.strMealThumb}" alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${
                  meal.strMeal
                }</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Meal ID: ${meal.idMeal}</p>
            <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                Show Details
            </button>
        </div>
    </div>
        `;
    mealDiv.innerHTML = mealInfo;
    mealsDiv.appendChild(mealDiv);
  });
};

// Show Details
const showDetails = (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayDetails(data.meals[0]));
};

// Display Details
const displayDetails = (meal) => {
    console.log(meal);
    const detailsDiv = document.getElementById("category-container");
    detailsDiv.innerHTML = `
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="${meal.strMealThumb}" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${
        meal.strMeal
        }</h5>
        </a>

        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Meal ID: ${meal.idMeal}</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Category: ${meal.strCategory}</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Area: ${meal.strArea}</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Tags: ${meal.strTags}</p>


        <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onclick="showIngredients('${
        meal.idMeal
        }')">
            Show Ingredients

        </button>
    </div>
</div>
    `;  
};


loadCategories();
