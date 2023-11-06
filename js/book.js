window.addEventListener("load", function () {
  const fileName = "book.json";
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
    let htmlbookTag = ``;

    // total 만큼 반복하자
    // for은 반복을 하는데 true 인 경우만 반복한다.
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["book_" + index];
      const tempTag = `
      <div class="swiper-slide">
      <div class="book-slide-item">
      <a href="">
<img src="${obj.file}"/>
<div class="book-info">
  <div class="book-title">
    <span>${obj.book_title}</span>
  </div>
  <div class="book-price">
    <span>${obj.book_price}</span>
  </div>
</div>
      </a>
      </div>
  </div>



  `;
      // console.log(bookTemp);
      htmlbookTag += tempTag;
    }
    viewHtmlTag(htmlbookTag);
  }

  function viewHtmlTag(_html) {
    const bookSlide = ".book-slide .swiper-wrapper";
    const tag = document.querySelector(bookSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper(_html) {
    var bookSwiper = new Swiper(".book-slide", {
      slidesPerView: 4, //슬라이드 몇장씩 보여줄거야
      spaceBetween: 27, //보여지는 슬라이드 간의 간격
      //  자동 실행
      speed: 1000, // 이동속도 : 1000은 1초
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".book-slide-wrapper .slide-next-bt",
        prevEl: ".book-slide-wrapper .slide-prev-bt",
      },
      slidePerGroup: 4,
    });
  }
});
