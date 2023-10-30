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
        <div class="tour-img-wrapper">
            <a href="${ticketRes["ticket_" + i].url}">
                <img src="${ticketRes["ticket_" + i].file}" alt="${
      ticketRes["ticket_" + i].url
    }" />
    <span class="ticket-rank">${ticketRes["ticket_" + i].rank}</span> 
    </div>
    <div class="ticket-info">
    <ul><li>
    <span class= "ticketing-title">${ticketRes["ticket_" + i].title}</span></li>
    <li><span class= "ticket-place">${
      ticketRes["ticket_" + i].place
    }</span></li>
    <li><span class= "ticket-date">${ticketRes["ticket_" + i].date}</span></li>
    <li><span class= "ticket-status">${ticketRes["ticket_" + i].status}</span>
    </li></ul>
    </a>
    </div>
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
    slidesPerView: 4, //슬라이드 몇장씩 보여줄거야
    spaceBetween: 28, //보여지는 슬라이드 간의 간격
    //  자동 실행

    speed: 1000, // 이동속도 : 1000은 1초
    // 좌측, 우측 이동 버튼
    navigation: {
      nextEl: ".ticket-slide-wrapper .slide-next-bt",
      prevEl: ".ticket-slide-wrapper .slide-prev-bt",
    },
  });
}
