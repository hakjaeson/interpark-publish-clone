window.addEventListener("load", function () {
  const liveXhttp = new XMLHttpRequest();
  fileName = "live.json";
  liveXhttp.open("GET", fileName);
  liveXhttp.send();
  liveXhttp.onreadystatechange = function (event) {
    if (event.target.readyState == XMLHttpRequest.DONE) {
      const liveResult = JSON.parse(event.target.response);
      console.log(liveResult);
      makeliveSlideHtml(liveResult);
    }
  };

  function makeliveSlideHtml(_data) {
    const liveRes = _data;
    // 출력을 시켜줄 문장을 만들자.
    let liveHtml = "";
    liveHtml = "";

    // total 만큼 반복하자
    // for은 반복을 하는데 true 인 경우만 반복한다.
    for (let i = 1; i <= liveRes.total; i++) {
      let liveTemp = `
      <div class="swiper-slide">
          <div class="live-slide-item">
          <div class="live-item-info" "live-d-day">
          <a href="${liveRes["live_" + i].url}">
          <img src="${liveRes["live_" + i].file}" alt="${
        liveRes["live_" + i].url
      }" />
  
      <span class="live-date">${liveRes["live_" + i].date}</span>
      <span class="live-time">${liveRes["live_" + i].time}</span>
      
      </div>

      <div class="live-profile">
      <div class="live-status"><span>${liveRes["live_" + i].status}</span></div>
      <div class="live-company"><span>${
        liveRes["live_" + i].company
      }</span></div>
      </div>
      </a>
</div>

          </div>
      </div>
  `;
      console.log(liveTemp);
      liveHtml += liveTemp;
    }

    // 어디다가 자료를 출력할 것인지 지정
    const liveSlide = document.querySelector(".live-slide .swiper-wrapper");

    liveSlide.innerHTML = liveHtml;

    var liveSwiper = new Swiper(".live-slide", {
      slidesPerView: 4, //슬라이드 몇장씩 보여줄거야
      spaceBetween: 28, //보여지는 슬라이드 간의 간격

      speed: 1000, // 이동속도 : 1000은 1초
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".live-slide-next",
        prevEl: ".live-slide-prev",
      },
    });
  }
});
