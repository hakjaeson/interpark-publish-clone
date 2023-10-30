const recommendXttp = new XMLHttpRequest();
recommendXttp.open("GET", "recommend.json");
recommendXttp.send();
recommendXttp.onreadystatechange = function (event) {
  if (event.target.readyState == XMLHttpRequest.DONE) {
    const recommendResult = JSON.parse(event.target.response);
    console.log(recommendResult);
    makerecommendSlideHtml(recommendResult);
  }
};

function makerecommendSlideHtml(_data) {
  const recommendRes = _data;
  // 출력을 시켜줄 문장을 만들자.
  let recommendHtml = "";
  recommendHtml = "";

  // total 만큼 반복하자
  // for은 반복을 하는데 true 인 경우만 반복한다.
  for (let i = 1; i <= recommendRes.total; i++) {
    let recommendTemp = `
    <div class="swiper-slide">
        <div class="recommend-slide-item">
            <a href="${
              recommendRes["recommend_" + i].url
            }" class="recommend-link">
                <div class="recommend-img"><img src="${
                  recommendRes["recommend_" + i].file
                }" alt="${recommendRes["recommend_" + i].url}" /></div>
    <div class="recommend-info">
    <ul class="recommend-good-list">
    <li>
    <span class="recommend-good-info-price">
    <b>${recommendRes["recommend_" + i].discount}%</b>
    <em>${recommendRes["recommend_" + i].price}</em>원
    </span>
    </li>
    <li><p class="recommend-good-info-desc">${
      recommendRes["recommend_" + i].desc
    }</p></li>
  
    </ul>
    </div>
            </a>
        </div>
    </div>
`;
    console.log(recommendTemp);
    recommendHtml += recommendTemp;
  }

  // 어디다가 자료를 출력할 것인지 지정
  const recommendSlide = document.querySelector(
    ".recommend-slide .swiper-wrapper"
  );

  recommendSlide.innerHTML = recommendHtml;

  var recommendSwiper = new Swiper(".recommend-slide", {
    slidesPerView: 4, //슬라이드 몇장씩 보여줄거야
    spaceBetween: 27, //보여지는 슬라이드 간의 간격
    //  자동 실행
    speed: 1000, // 이동속도 : 1000은 1초
    // 좌측, 우측 이동 버튼
    navigation: {
      nextEl: ".recommend-slide-next",
      prevEl: ".recommend-slide-prev",
    },
  });
}
