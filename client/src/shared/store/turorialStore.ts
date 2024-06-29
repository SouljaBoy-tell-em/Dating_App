import { makeAutoObservable } from "mobx";

export enum Slides {
  GREETING,
  MENU,
  CHAT,
  SWIPER,
}

export default class TutorialStore {
  slide: Slides = Slides.GREETING;
  numsOfAnimation: Map<Slides, number> = new Map();
  indexOfAnimation: Map<Slides, number> = new Map();

  constructor() {
    makeAutoObservable(this);
    this.numsOfAnimation.set(Slides.GREETING, 3);
    this.indexOfAnimation.set(Slides.GREETING, 0);
    this.numsOfAnimation.set(Slides.MENU, 4);
    this.indexOfAnimation.set(Slides.MENU, 0);
  }

  nextAnimation(slide: Slides) {
    const number = this.numsOfAnimation.get(slide);
    const index = this.indexOfAnimation.get(slide);
    if (number!=null && index!=null && number > index + 1) {
      this.indexOfAnimation.set(slide, index + 1);

    }

  }

  prevAnimation(slide: Slides) {
    const number = this.numsOfAnimation.get(slide);
    const index = this.indexOfAnimation.get(slide);
    if (number!=null && index!=null && index > 1) {
      this.indexOfAnimation.set(slide, index - 1);
    }
  }

  setAnimation(slide: Slides, index:number) {
    const number = this.numsOfAnimation.get(slide);
    if (number!=null && index>=0 && index >=number) {
      this.indexOfAnimation.set(slide, index);
    }
  }

  setSlide(slide: Slides) {
    this.slide = slide;
  }

  getAnimationIndex(slide:Slides) {
    return this.indexOfAnimation.get(slide) ?? 0;
  }
}
