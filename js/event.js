const eventXhttp = new XMLHttpRequest();
eventXhttp.open("GET", "event.json");
eventXhttp.send();
eventXhttp.onreadystatechange = function (event) {
  if (event.target.readyState == XMLHttpRequest.DONE) {
    const eventResult = JSON.parse(event.target.response);
    console.log(eventResult);
    makeeventSlideHtml(eventResult);
  }
};

function makeeventSlideHtml(_data) {
  const eventRes = _data;
  // 출력을 시켜줄 문장을 만들자.
  let eventHtml = "";
  eventHtml = "";

  // total 만큼 반복하자
  // for은 반복을 하는데 true 인 경우만 반복한다.
  for (let i = 1; i <= eventRes.total; i++) {
    let eventTemp = `
    <div class="swiper-slide">
        <div class="event-slide-item">
            <a href="${eventRes["event_" + i].url}">
                <img src="${eventRes["event_" + i].file}" alt="${
      eventRes["event_" + i].url
    }" />
            </a>
        </div>
    </div>
`;
    console.log(eventTemp);
    eventHtml += eventTemp;
  }

  // 어디다가 자료를 출력할 것인지 지정
  const eventSlide = document.querySelector(".event-slide .swiper-wrapper");

  eventSlide.innerHTML = eventHtml;

  var eventSwiper = new Swiper(".event-slide", {
    slidesPerView: 2, //슬라이드 몇장씩 보여줄거야
    spaceBetween: 100, //보여지는 슬라이드 간의 간격
    loop: true, //반복해서 무한루프
    //  자동 실행
    autoplay: {
      delay: 2500, //대기시간
      disableOnInteraction: false, //사용자 터치후 자동실행 다시
    },
    speed: 1000, // 이동속도 : 1000은 1초
    // 좌측, 우측 이동 버튼
    navigation: {
      nextEl: ".event-slide-next",
      prevEl: ".event-slide-prev",
    },
  });
}
