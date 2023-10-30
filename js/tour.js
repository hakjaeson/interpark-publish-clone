const tourXhttp = new XMLHttpRequest();
tourXhttp.open("GET", "tour.json");
tourXhttp.send();
tourXhttp.onreadystatechange = function (event) {
  if (event.target.readyState == XMLHttpRequest.DONE) {
    const tourResult = JSON.parse(event.target.response);
    console.log(tourResult);
    makeTourSlideHtml(tourResult);
  }
};

function makeTourSlideHtml(_data) {
  const tourRes = _data;
  // 출력을 시켜줄 문장을 만들자.
  let tourHtml = "";
  tourHtml = "";

  // total 만큼 반복하자
  // for은 반복을 하는데 true 인 경우만 반복한다.
  for (let i = 1; i <= tourRes.total; i++) {
    let tourTemp = `
    <div class="swiper-slide">
        <div class="tour-slide-item">
            <a href="${tourRes["tour_" + i].url}" class="tour-link">
                <div class="tour-img-wrapper">
            <div class="tour-img"><img src="${
              tourRes["tour_" + i].file
            }" alt="${tourRes["tour_" + i].url}" /></div>
    
                <div class="tour-deal-event">
                <p class="tour-deal-txt">${tourRes["tour_" + i].dealEvent}</p>
                </div>
                </div>
                <div class="tour-info">
    <ul class="tour-good-list">
    <li><p class="tour-deal-desc">${tourRes["tour_" + i].dealEventDesc}</p></li>
    <li><p class="tour-good-info-desc">${tourRes["tour_" + i].desc}</p></li>
    <li>
    <span class="tour-good-info-price">
    <em>${tourRes["tour_" + i].price}</em>원~
    </span>
    </li>
  
    </ul>
    </div>
            </a>
        </div>
    </div>
`;
    console.log(tourTemp);
    tourHtml += tourTemp;
  }

  // 어디다가 자료를 출력할 것인지 지정
  const tourSlide = document.querySelector(".tour-slide .swiper-wrapper");

  tourSlide.innerHTML = tourHtml;

  var tourSwiper = new Swiper(".tour-slide", {
    slidesPerView: 3, //슬라이드 몇장씩 보여줄거야
    spaceBetween: 26, //보여지는 슬라이드 간의 간격
    //  자동 실행

    speed: 1000, // 이동속도 : 1000은 1초
    // 좌측, 우측 이동 버튼
    navigation: {
      nextEl: ".tour-slide-next",
      prevEl: ".tour-slide-prev",
    },
  });
}
