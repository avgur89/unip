/**
 * About page scripts.
 *
 * @module About
 */

/** Import utils */
import {
  throttle, $window, css,
  bindMethods,
  Resp,
  classNames
} from 'js/modules/dev/helpers';
import CommonSubPage from './_CommonSubPage';
import 'dotdotdot';
import 'slick-carousel';
import 'materialize-css/js/global';
import aboutSlide from '../components/aboutSlide';
import '../modules/dep/materialize.carousel';

export default class About extends CommonSubPage {
  /**
   * Cache data.
   */
  constructor() {
    super();

    this.$dotElements = () => $('.dot');
    this.$section = $('.techno');
    bindMethods.bind(this)
    ('revealOverlay', 'revealMainContent');

    this.overlayAnimationDelay = 0;
    this.mainContentAnimationDelay = 0;

    // initialize other scripts
    this.subInit();
  }

  /**
   * Initialize 3d slider
   *
   * @return {About}
   */
  initMaterialize() {
    const $carousel = this.$section.find('.slider3d__carousel');
    const $container = this.$section.find('.slider3d__container');

    $carousel
        .carousel({
          dist: -48,
          onCycleTo: element => {
            if (Resp.isMobile) {
              const currentSlide = $(element).index() + 1;

              $container
                  .removeClass(classNames)
                  .addClass(`js-slide-${currentSlide}`);
            }
          }
        })
        .carousel('set', 1);

    return this;
  }

  /**
   * Reveal 3d slider
   *
   * @return {About}
   */
  revealMainContent() {
    const $container = this.$section.find('.slider3d__container');
    const $overlay = $container.find('.slider3d__overlay');
    const $text = $container.find('.slider3d__text');
    const $carousel = $container.find('.slider3d__carousel');

    // show circles overlay, text block and carousel
    requestAnimationFrame(() => {
      [$overlay, $text, $carousel]
          .forEach(el => el.addClass(css.animationFinished));
    });

    return this;
  }

  /**
   * Initialize dotdotdot plugin.
   *
   * @returns {About}
   */
  initDot() {
    this.$dotElements().each(function () {
      const $this = $(this);
      const height = +$this.data('height');

      $this.dotdotdot({height, watch: true});
    });

    return this;
  }

  /**
   * Re-initialize dotdot plugin on window resize
   *
   * @return {About}
   */
  onResize() {
    // reinit dotdotdot
    const reinitDot = throttle(() => {
      this.initDot();
    }, 250, this);

    // reinit dotdotdot on resize
    $window.on('resize orientationchange', reinitDot);

    return this;
  }

  /**
   * Init slider
   *
   * @return {About}
   */
  initSlider() {
    $('.partners__slider').slick({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 600,
      slidesToScroll: 1,
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        }
      ]
    });

    return this;
  }

  /**
   * Init active slider element
   *
   * @return {About}
   */
  initActiveElement() {
    $('.partners__slider').on('afterChange', function (event, slick, currentSlide) {
      const current = slick.$slides.get(currentSlide);

      slick.$slides.each(function () {
        $(this).find('.partners__slider-desc').css('opacity', 0);
        $(this).find('.partners__slider-img').css('transform', 'scale(1)');
        $(this).find('.partners__slider-dot').css('transform', 'scale(1) rotate(45deg)');
        $(this).blur();
      });

      $(current).find('.partners__slider-desc').css('opacity', 1);
      $(current).find('.partners__slider-img').css('transform', 'scale(1.1)');
      $(current).find('.partners__slider-dot').css('transform', 'scale(2) rotate(45deg)');
    });

    return this;
  }

  /**
   * Reveal UI elements
   *
   * @return {About}
   */
  revealOverlay() {
    // show 'skip' button, page number, text block
    requestAnimationFrame(() => {
      [this.$pageNumber, this.$textBlock]
          .forEach(el => el.addClass(css.animationFinished));
    });

    return this;
  }

  /**
   * Init active heading slider element
   *
   * @return {Drivers}
   */
  revealSliderHeading() {
    const activeSlide = $('.slider3d__text-item.js-active').data('slide');
    const activeHeading = $('.slider3d__heading-item' + `[data-slide='${activeSlide}']`);
    const activeDesc = $('.slider3d__text-item' + `[data-slide='${activeSlide}']`);
    const _this = this;

    activeHeading.fadeIn(400);

    // if (Resp.isDeskCustom) {
    //   $('.slider3d__text-item').on('click tap', function() {
    //     const index = $('.slider3d__text-item').index($(this));
    //
    //     $('.slider3d__heading-item').fadeOut(400);
    //     $(`.slider3d__heading-item:eq(${index})`).delay(500).fadeIn(400);
    //   });
    // }

    if (Resp.isTablet || Resp.isDesk) {
      activeDesc.fadeIn(400);

      $('.slider3d__pagination-item').on('click tap', function() {
        const index = $('.slider3d__pagination-item').index($(this));
        const $carousel = _this.$section.find('.slider3d__carousel');

        $('.slider3d__pagination-item').removeClass('js-active');
        $(this).addClass('js-active');

        $('.slider3d__container').attr('class', 'slider3d__container').addClass(`js-slide-${index + 1}`);
        $carousel.carousel('set', index + 1);

        $('.slider3d__heading-item').fadeOut(400);
        $(`.slider3d__heading-item:eq(${index})`).delay(500).fadeIn(400);

        $('.slider3d__text-item').fadeOut(400);
        $(`.slider3d__text-item:eq(${index})`).delay(500).fadeIn(400);
      });
    }

    return this;
  }

  /**
   * Show team image desc on click
   *
   * @return {About}
   */
  showImgDesc() {
    $('.team__item-link').on('click tap', function() {
      $(this).toggleClass('team__item-link-active');
    });
    
    return this;
  }

  /**
   * Initialize About page scripts.
   *
   * @override
   */
  init() {
    this
      .initHeaderAnimation()
      .enableBodyScroll();
  }

  /**
   * Initialize other About page scripts.
   */
  subInit() {
    this.initSlider()
      .initActiveElement()
      .revealMainContent()
      .initMaterialize()
      .revealSliderHeading()
      .showImgDesc();

    new aboutSlide(this.$section).bindControls();
    $window.on('load', () => {
      this.initDot();
      this.onResize();
    });
  }
}
