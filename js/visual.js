window.addEventListener("load", function () {
  const xhttp = new XMLHttpRequest(); //XHR
  fileName = "visual.json";
  xhttp.open("GET", fileName);
  xhttp.send();
  xhttp.onreadystatechange = function (event) {
    // console.log(event.target);

    if (event.target.readyState === XMLHttpRequest.DONE) {
      // console.log(event.target.response);
      const result = JSON.parse(event.target.response);
      makeVisualSlideHtml(result);
    } else console.log("problem");
  };

  function makeVisualSlideHtml(_data) {
    const visualRes = _data;

    let visualHtml = "";

    for (let i = 1; i <= visualRes.total; i++) {
      let temp = `
      <div class="swiper-slide">
          <div class="visual-slide-item">
              <a href="${visualRes["visual_" + i].url}">
                  <img src="${visualRes["visual_" + i].file}" alt="${
        visualRes["visual_" + i].url
      }" />
              </a>
          </div>
      </div>
  `;
      console.log(temp);
      visualHtml += temp;
    }

    const visualSlide = document.querySelector(".visual-slide .swiper-wrapper");

    visualSlide.innerHTML = visualHtml;

    var visualSwiper = new Swiper(".visual-slide", {
      slidesPerView: 2,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      speed: 500,
      navigation: {
        nextEl: ".visual-slide-next",
        prevEl: ".visual-slide-prev",
      },
    });
  }
});
