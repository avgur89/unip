/**
 * Website's section slides (slider3d, preview)
 * scroll controller module (desktop).
 *
 * @module SectionSlideController
 */

/** Import utils */
import {
  randomString,
  css,
  bindMethods
} from '../modules/dev/helpers';
import ScrollController from './scrollController';
import WheelIndicator from 'wheel-indicator';

export default class SectionSlideController {
  constructor(
    $section,
    hasCarousel = true,
    slidesCount = 4,
    animationTime = 400,
    hasControls = true
  ) {
    this.$section = $section;

    // current active slide
    this.activeClass = 1;

    // class name pattern
    this.class = slideId => `js-slide-${slideId}`;

    // slider container
    this.$sliderContainer = $section.find('.js-slide-1');
    this.$controls = $section.find('.textBlock__pagination-item');

    // has carousel slider
    this.$carousel = hasCarousel ? $section.find('.carousel') : false;

    // slides count (section's scroll count)
    this.slidesCount = slidesCount;

    // delay before calls (ms)
    this.animationTime = animationTime;

    // flags
    this.activated = false;
    this.isAnimating = false;
    this.hasControls = hasControls;

    // uniq namespace
    this.namespace = randomString();

    // save context
    bindMethods.bind(this)(
      'activate',
      'deactivate',
      'handleScroll'
    );
  }

  bindControls() {
    const _this = this;

    _this.$controls.on('click tap', function () {
      const $this = $(this);

      if ($this.hasClass(css.active) || _this.isAnimating) return;

      _this.setActiveSlide($this.index() + 1);
    });

    return _this;
  }

  setActiveSlide(slideId) {
    this.isAnimating = true;

    this.$sliderContainer
      .removeClass(this.class(this.activeClass))
      .addClass(this.class(this.activeClass = slideId));

    this
      .$controls.removeClass(css.active)
      .eq(this.activeClass - 1).addClass(css.active);

    if (this.$carousel) this.$carousel.carousel('set', slideId);

    setTimeout(() => this.isAnimating = false, this.animationTime);

    return this;
  }

  moveToPrevSection() {
    if (this.activeClass === 1) return this.deactivate();

    this.setActiveSlide(this.activeClass - 1);

    return this;
  }

  moveToNextSection() {
    if (this.activeClass === this.slidesCount) return this.deactivate();

    this.setActiveSlide(this.activeClass + 1);

    return this;
  }

  handleScroll(e) {
    // do nothing if currently animating
    if (this.isAnimating) return;

    // change slides
    ScrollController.dispatchScroll.call(this, e.direction);
  }

  activate() {
    // kill global scroll controller
    ScrollController.kill();

    // bind event listener
    this.WheelIndicator = new WheelIndicator({
      elem: this.$section.get(0),
      callback: this.handleScroll
    });

    // bind controls (pagination)
    if (this.hasControls) this.bindControls();

    // set activation flag
    this.activated = true;

    return this;
  }

  deactivate() {
    // deactivate only if activated
    if (!this.activated) return this;

    // return main scroll event listener
    ScrollController.init(false);

    // kill event listener
    this.WheelIndicator.destroy();

    // set activation flag
    this.activated = false;

    return this;
  }
}
