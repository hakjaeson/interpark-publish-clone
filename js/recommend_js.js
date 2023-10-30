// window.onload = function () {};
const fileName = "recommend.json";
const xhr = new XMLHttpRequest();
xhr.open("GET", fileName);
xhr.send();
xhr.onreadystatechange = function (event) {
  console.log("test", event.target.readyState);
  if (event.target.readyState === XMLHttpRequest.DONE) {
    console.log("ok good", event.target.response);
  }
};
window.addEventListener("load", function () {
  const htmlRecommendTag = ``;
  const recommmendSlide = ".recommend-slide .slide-wrap";
  const recommendSwiper = new Swiper(".recommend-slide");
});
