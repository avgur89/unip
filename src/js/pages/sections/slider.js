/**
 * Slider section module.
 *
 * @module SliderSection
 */

/** Import utils */
import {
  Resp,
  css,
  isScrolledIntoView,
  throttle,
  $window
} from '../../modules/dev/helpers';
import { Slider3dSection } from './slider3d';

export class SliderSection extends Slider3dSection {
  /**
   * Cache elements etc.
   *
   * @param {jQuery} [$sliderSection]
   */
  constructor($sliderSection = $('#slider-section')) {
    super($sliderSection);

    this.mainContentAnimationDelay = 1;
    this.$carousel = this.$section.find('.slider__carousel');
  }

  /**
   * Go to the next slide when slick in viewport (demo).
   *
   * @return {SliderSection}
   */
  slickDemo() {
    const $section = this.$section;
    const $carousel = this.$carousel;
    const $scrollEventListener = Resp.isDeskCustom ? $section : $window;

    $scrollEventListener.on('scroll.slickDemo', throttle(() => {
      if (isScrolledIntoView($carousel, 250)) {
        $carousel.slick('slickNext');
        $scrollEventListener.unbind('scroll.slickDemo');
      }
    }, 100));

    return this;
  }

  /**
   * Reveal section's main content.
   *
   * @return {SliderSection}
   */
  revealMainContent() {
    const $inner = this.$section.find('.slider__inner');

    // show carousel and button
    requestAnimationFrame(() => {
      $inner.addClass(css.animationFinished);
    });

    return this;
  }

  /**
   * Activate full-width slider.
   *
   * @return {SliderSection}
   */
  initSlider() {
    const $carousel = this.$section.find('.slider__carousel');
    const $nextBtn = this.$section.find('.slider__nextBtn');

    $carousel
      .on('beforeChange', (event, slick, currentSlide, nextSlide) => {
        const $clonedSlide = $('.slick-cloned').eq(2);

        if (!nextSlide) {
          $clonedSlide.addClass(css.active);
        } else {
          $clonedSlide.removeClass(css.active);
        }
      })
      .slick({
        arrows: false,
        dots: false,
        speed: 1500,
        adaptiveHeight: true,
        infinite: true,
        draggable: false,
        slidesToShow: 2,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 1260,
            settings: {
              slidesToShow: 2,
              speed: 250,
              cssEase: 'ease'
            }
          }
        ]
      });

    // bind events listener
    $nextBtn.on('click tap', () => $carousel.slick('slickNext'));

    // initialize slider demo
    this.slickDemo();

    return this;
  }
}

/** Export initialized class instance by default */
export default new SliderSection;
