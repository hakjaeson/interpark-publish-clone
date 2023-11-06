window.addEventListener("load", function () {
  const fileName = "tour.json";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", fileName);
  xhr.send();
  xhr.onreadystatechange = function (event) {
    if (event.target.readyState == XMLHttpRequest.DONE) {
      const res = event.target.response;
      const makeJson = JSON.parse(res);
      makeHtmlTag(makeJson);
    }
  };

  function makeHtmlTag(_res) {
    // 출력을 시켜줄 문장을 만들자.
    let htmlTourTag = ``; 

    // total 만큼 반복하자
    // for은 반복을 하는데 true 인 경우만 반복한다.
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["tour_" + index];
      const tempTag = `
      <div class="swiper-slide">
          <div class="tour-slide-item">
          <div class="tour-img-wrapper">
              <a href="${obj.url}" class="tour-link">
              <div class="tour-img"><img src="${obj.file}" alt="${obj.url}" /></div>
      
                  <div class="tour-deal-event">
                  <p class="tour-deal-txt">${obj.dealEvent}</p>
                  </div>
                  </div>
                  <div class="tour-info">
      <ul class="tour-good-list">
      <li><p class="tour-deal-desc">${obj.dealEventDesc}</p></li>
      <li><p class="tour-good-info-desc">${obj.desc}</p></li>
      <li>
      <span class="tour-good-info-price">
      <em>${obj.price}</em>원~
      </span>
      </li>
    
      </ul>
      </div>
              </a>
          </div>
      </div>


  `;
      // console.log(tourTemp);
      htmlTourTag += tempTag;
    }
    viewHtmlTag(htmlTourTag);
  }

  function viewHtmlTag(_html) {
    const tourSlide = ".tour-slide .swiper-wrapper";
    const tag = document.querySelector(tourSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper(_html) {
    var tourSwiper = new Swiper(".tour-slide", {
      slidesPerView: 4, //슬라이드 몇장씩 보여줄거야
      spaceBetween: 27, //보여지는 슬라이드 간의 간격
      //  자동 실행
      speed: 1000, // 이동속도 : 1000은 1초
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".tour-slide-wrapper .slide-next-bt",
        prevEl: ".tour-slide-wrapper .slide-prev-bt",
      },
      slidePerGroup: 4,
    });
  }
});
