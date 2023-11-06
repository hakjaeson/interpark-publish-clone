window.addEventListener("load", function () {
  const fileName = "live.json";
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
    let htmlLiveTag = ``;

    // total 만큼 반복하자
    // for은 반복을 하는데 true 인 경우만 반복한다.
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["live_" + index];
      const discount = obj.sub_discount;
      const disValue = discount != 0 ? discount + "%" : "";
      const dateline = obj.date;
      const timeline = obj.time;
      const dateValue = dateline != 0 ? dateline : "";
      const timeValue = timeline != 0 ? timeline : "";
      // const valueRes = dateline == null || timeline == null ? "" : "";

      const tempTag = `
      <div class="swiper-slide">
      <div class="live-slide-item">
      
      <a href="${obj.url}">
      <div class="live-container">
      <div class="live-img">
      <img src ="${obj.file}"/>
      </div>

      <div class="live-profile">
      <div class="live-status">${obj.status}</div>
      <div class="live-company">${obj.company}</div>
      </div>

      <div class="live-d-day">
      <div class="live-date">${dateValue}</div>
      <div class="live-time">${timeValue}</div>
      </div>

      </div>
      </a>
<a href="${obj.sub_url}">
<div class="live-sub-container">

<div class = "live-sub-img">
<img src="${obj.sub_image}"/>
</div>

<div class= "live-sub-profile">
<ul>
      <li><span class="live-sub-title">${obj.sub_title}</span></li>
      <li><span class="live-discount">${disValue}</span>
      <span class="live-sub-price">${obj.sub_price}</span></li>
</ul>
</div>

</div>
</a>

      </div>
      </div>
  `;
      // console.log(liveTemp);
      htmlLiveTag += tempTag;
    }
    viewHtmlTag(htmlLiveTag);
  }

  function viewHtmlTag(_html) {
    const liveSlide = ".live-slide .swiper-wrapper";
    const tag = document.querySelector(liveSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper(_html) {
    var liveSwiper = new Swiper(".live-slide", {
      slidesPerView: 4, //슬라이드 몇장씩 보여줄거야
      spaceBetween: 27, //보여지는 슬라이드 간의 간격
      //  자동 실행
      speed: 1000, // 이동속도 : 1000은 1초
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".live-slide-wrapper .slide-next-bt",
        prevEl: ".live-slide-wrapper .slide-prev-bt",
      },
      slidePerGroup: 4,
    });
  }
});
