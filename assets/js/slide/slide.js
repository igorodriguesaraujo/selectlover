export default class Slide {
  // função construtora do slide
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }
  // Método para suavizar transição
  transitionSlide(active) {
    this.slide.style.transition = active ? "transform .3s" : "";
  }

  // Animando movimento do slide
  animaSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0,0)`;
  }

  // Atualizar posicionamento
  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  // função que previne o evento
  onStart(e) {
    let movetype;
    if (event.type === "mousedown") {
      e.preventDefault();
      this.dist.startX = e.clientX;
      movetype = "mousemove";
    } else {
      this.dist.startX = e.changedTouches[0].clientX;
      movetype = "touchmove";
    }
    this.wrapper.addEventListener(movetype, this.onMove);
    this.transitionSlide(false);
  }

  // Movendo o slide
  onMove(e) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.animaSlide(finalPosition);
  }

  // Removendo metodo de slide
  onEnd(e) {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
    this.changeSlideOnEnd();
    this.transitionSlide(true);
  }

  // Método changeSlideOnEnd
  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide();
    } else if (this.dist.movement < 120 && this.index.prev !== undefined) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }

  // Adiciona o evento de slide
  addSlideEvents() {
    // Desktop
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);

    // Mobile
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  // Bind
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // Centralizando slide ativo
  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  // slide config
  slidesConfig() {
    this.slideArray = [...this.slide.children].map(element => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.animaSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
  }

  //Mudando classe do slide ativo
  changeActiveClass() {
    console.log(this.slideArray);
  }

  // Navegação de proximo e anterior
  activePrevSlide() {
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }
  activeNextSlide() {
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  // Init
  init() {
    this.bindEvents();
    this.transitionSlide(true);
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}
