import Slide from "./slide/slide.js";
const slide = new Slide(".slide--gallery", ".slide--wrapper");

slide.init();
slide.changeSlide(1);
slide.activeNextSlide();
slide.activePrevSlide();
slide.changeActiveClass();

// tabs
const tabNav = document.querySelectorAll(".tabnav li");
const tabContent = document.querySelectorAll(".tab-content div");

tabContent[0].classList.add("active");
tabNav[0].classList.add("tab-active");

function activeTab(index) {
  tabContent.forEach(item => {
    item.classList.remove("active");
  });
  tabContent[index].classList.add("active");
}

function activeLink(index) {
  tabNav.forEach(item => {
    item.classList.remove("tab-active");
  });
  tabNav[index].classList.add("tab-active");
}

tabNav.forEach((item, index) => {
  item.addEventListener("click", e => {
    e.preventDefault();
    activeLink(index);
    activeTab(index);
  });
});
