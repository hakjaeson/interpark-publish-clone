window.addEventListener("load", function () {
  const fileName = "recommend.json";
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
    let htmlRecommendTag = ``;

    // total 만큼 반복하자
    // for은 반복을 하는데 true 인 경우만 반복한다.
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["recommend_" + index];
      const dis_cut = obj.discount;
      const discValue = dis_cut != 0 ? dis_cut + "%" : "";
      let tempTag = ``;
      //     const tempTag = `
      //     <div class="swiper-slide">
      //         <div class="recommend-slide-item">
      //             <a href="${obj.url}" class="recommend-link">
      //                 <div class="recommend-img"><img src="${obj.file}" alt="${obj.url}" /></div>
      //               <div class="recommend-info">
      //                 <ul class="recommend-good-list">
      //                   <li><span class="recommend-good-info-price">
      //                         <b>${discValue}</b>
      //                         <em>${obj.price}</em>원
      //                       </span>
      //                    </li>
      //     <li><p class="recommend-good-info-desc">${obj.desc}</p></li>
      //     </ul>
      //     </div>
      //             </a>
      //         </div>
      //     </div>
      // `;
      if (index !== _res.total - 1) {
        tempTag = `
      <div class="swiper-slide">
          <div class="recommend-slide-item">
              <a href="${obj.url}" class="recommend-link">
                  <div class="recommend-img"><img src="${obj.file}" alt="${obj.url}" /></div>
                <div class="recommend-info">
                  <ul class="recommend-good-list">
                    <li><span class="recommend-good-info-price">
                          <b>${discValue}</b>
                          <em>${obj.price}</em>원
                        </span>
                     </li>
      <li><p class="recommend-good-info-desc">${obj.desc}</p></li>
      </ul>
      </div>
              </a>
          </div>
      </div>
  `;
      } else {
        tempTag = `
        <div class="swiper-slide">
        <h1> GO </h1>
        </div>
        `;
      }

      // console.log(recommendTemp);
      htmlRecommendTag += tempTag;
    }
    viewHtmlTag(htmlRecommendTag);
  }

  function viewHtmlTag(_html) {
    const recommendSlide = ".recommend-slide .swiper-wrapper";
    const tag = document.querySelector(recommendSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper(_html) {
    var recommendSwiper = new Swiper(".recommend-slide", {
      slidesPerView: 4, //슬라이드 몇장씩 보여줄거야
      spaceBetween: 27, //보여지는 슬라이드 간의 간격
      //  자동 실행
      speed: 1000, // 이동속도 : 1000은 1초
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".recommend-slide-wrapper .slide-next-bt",
        prevEl: ".recommend-slide-wrapper .slide-prev-bt",
      },
      slidePerGroup: 4,
    });
  }
});
