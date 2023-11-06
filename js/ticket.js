window.addEventListener("load", function () {
  const fileName = "ticket.json";
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
    let htmlTicketTag = ``;

    // total 만큼 반복하자
    // for은 반복을 하는데 true 인 경우만 반복한다.
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["ticket_" + index];
      const tempTag = `
      <div class="swiper-slide">

      <div class="ticket-slide-item">
      <a href="${obj.url}">

          <div class="tour-img-wrapper">
                  <img src="${obj.file}" alt="${obj.url}" />
      <span class="ticket-rank">${obj.rank}</span> 
      </div>
      
      <div class="ticket-info">
      <ul><li>
      <span class= "ticketing-title">${obj.title}</span></li>
      <li><span class= "ticket-place">${obj.place}</span></li>
      <li><span class= "ticket-date">${obj.date}</span></li>
      <li><span class= "ticket-status">${obj.status}</span>
      </li></ul>
      </div>

      </a>

          </div>
      </div>

  `;
      // console.log(TicketTemp);
      htmlTicketTag += tempTag;
    }
    viewHtmlTag(htmlTicketTag);
  }

  function viewHtmlTag(_html) {
    const ticketSlide = ".ticket-slide .swiper-wrapper";
    const tag = document.querySelector(ticketSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper(_html) {
    var ticketSwiper = new Swiper(".ticket-slide", {
      slidesPerView: 4, //슬라이드 몇장씩 보여줄거야
      spaceBetween: 27, //보여지는 슬라이드 간의 간격
      //  자동 실행
      speed: 1000, // 이동속도 : 1000은 1초
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".ticket-slide-wrapper .slide-next-bt",
        prevEl: ".ticket-slide-wrapper .slide-prev-bt",
      },
      slidePerGroup: 4,
    });
  }
});
