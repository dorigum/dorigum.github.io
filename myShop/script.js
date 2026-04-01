// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {
  // data는 과일 또는 야채의 배열
  console.log(data);
  container.innerHTML = "";
  data.forEach((item) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}

// -------------------------------------------------------------------------------
// ★★★★★아래 filterAndSortFruits()와 loadVeggies()를 완성하세요.

// 과일 출력
function filterAndSortFruits() {
  // 화면에 다시 출력
  // 1. 현재 검색창에 입력된 글자 가져오기(비교하기 쉽게 소문자로 변환하기!)
  const searchText = searchBox.value.trim().toLowerCase();

  // 2. 검색어와 일치하는 과일만 걸러내기(filter)
  let filteredFruits = fruits.filter((fruits) =>
    fruits.name.toLowerCase().includes(searchText),
  );

  // 3. 정렬 기준(이름, 낮은 가격순, 높은 가격순)
  const sortValue = sortSelect.value;

  // 4. 기준에 맞춰서 정렬하기
  if (sortValue === "name") {
    // 이름순(가나다순)
    filteredFruits.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "low") {
    // 낮은 가격순
    filteredFruits.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high") {
    // 높은 가격순
    filteredFruits.sort((a, b) => b.price - a.price);
  }

  // 5. 화면에 다시 출력!
  renderProducts(filteredFruits, fruitList);
}

// -------------------------------------------------------------------------------
// 채소 출력 (3개씩 증가)
function loadVeggies() {
  // 1. 페이지 숫자를 1씩 증가시키기(처음 누르면 1, 다음엔 2, 3...)
  veggiePage++;

  // 2. 보여줄 개수 계산하기(1페이지면 3개, 2페이지면 6개...)
  const itemsToShow = veggiePage * 3;

  // 3. 전체 채소 배열에서 딱 필요한 만큼만 잘라내기(slice)
  const slicedVeggies = veggies.slice(0, itemsToShow);

  // 4. 화면에 다시 출력
  renderProducts(slicedVeggies, veggieList);

  // 이건 추가 기능!!!
  // 만약 준비된 채소를 다 보여줬다면 '더보기' 버튼 숨기기
  if(slicedVeggies.length >= veggies.length) {
    loadMoreBtn.style.display = "none";
  }
}

// -------------------------------------------------------------------------------
// 이벤트 리스너
searchBox.addEventListener("input", filterAndSortFruits);
sortSelect.addEventListener("change", filterAndSortFruits);
loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();
