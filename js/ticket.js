const ticketXhttp = new XMLHttpRequest();
ticketXhttp.open("GET", "ticket.json");
ticketXhttp.send();
ticketXhttp.onreadystatechange = function (event) {
  if (event.target.readyState == XMLHttpRequest.DONE) {
    const ticketResult = JSON.parse(event.target.response);
    console.log(ticketResult);
    maketicketSlideHtml(ticketResult);
  }
};

function maketicketSlideHtml(_data) {
  const ticketRes = _data;
  // 출력을 시켜줄 문장을 만들자.
  let ticketHtml = "";
  ticketHtml = "";

  // total 만큼 반복하자
  // for은 반복을 하는데 true 인 경우만 반복한다.
  for (let i = 1; i <= ticketRes.total; i++) {
    let ticketTemp = `
    <div class="swiper-slide">
        <div class="ticket-slide-item">
            <a href="${ticketRes["ticket_" + i].url}">
                <img src="${ticketRes["ticket_" + i].file}" alt="${
      ticketRes["ticket_" + i].url
    }" />
            </a>
        </div>
    </div>
`;
    console.log(ticketTemp);
    ticketHtml += ticketTemp;
  }

  // 어디다가 자료를 출력할 것인지 지정
  const ticketSlide = document.querySelector(".ticket-slide .swiper-wrapper");

  ticketSlide.innerHTML = ticketHtml;

  var ticketSwiper = new Swiper(".ticket-slide", {
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
      nextEl: ".ticket-slide-next",
      prevEl: ".ticket-slide-prev",
    },
  });
}
