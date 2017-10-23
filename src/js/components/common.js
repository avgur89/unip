/**
 * Website's common scripts.
 *
 * @module Common
 */

/** Import utils */
import 'perfect-scrollbar/jquery';
import 'script-loader';
import objectFitImages from 'object-fit-images';
import {Resp, isIE, css, isScrolledIntoView} from '../modules/dev/helpers';
import Header from './header';
import ScrollController from './scrollController';
import ProgressBar from './progressBar';
import Animation from '../modules/dev/animation';
import 'slick-carousel';
import 'gsap';
import 'script-loader!gsap/CSSRulePlugin';
import 'script-loader!scrollmagic/scrollmagic/uncompressed/ScrollMagic.js';
import 'script-loader!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
// import 'script-loader!malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min';

export class Common {
  /**
   * Cache data.
   */
  constructor() {
    // jQuery objects
    this.$scrollableElements = $('.js-perfect-scrollbar');
    this.$upBtn = $('.upBtn, .footer__logo');
    this.$allControls = $('.functionality__slider-controls');
    this.$sliderItems = $('.functionality__slider-item');
    this.$sliderDesc = $('.functionality__desc');

    // jQuery classes
    this.activeControl = 'functionality__slider-controls-active';
    this.activeDesc = 'functionality__desc-active';
    this.activeSlider = 'functionality__slider-item-active';
  }

  /**
   * Initialize 'object-fit-images' polyfill.
   *
   * @returns {Common}
   */
  initObjectFitImages() {
    objectFitImages();

    return this;
  }

  /**
   * Initialize progress bar's click-to-page.
   *
   * @return {Common}
   */
  initProgressBar() {
    if (Resp.isDeskCustom) {
      ProgressBar.initScrollToSectionOnClick();
    }

    return this;
  }

  /**
   * Initialize perfect-scrollbar on scrollable elements.
   *
   * @return {Common}
   */
  initPerfectScrollbar() {
    if (Resp.isDeskCustom) {
      this.$scrollableElements.perfectScrollbar({
        wheelPropagation: true,
        wheelSpeed: 0.5
      });
    }

    return this;
  }

  /**
   * Init drivers slider
   *
   * @return {Common}
   */
  initSlider() {
    const _this = this;

    $('.functionality__slider-controls').on('click tap', function () {
      const dataControl = $(this).attr('data-control');
      const currentDesc = $('.functionality').find(`[data-desc='${dataControl}']`);
      const currentSlide = $('.functionality').find('.functionality__slider').find(`[data-slide='${dataControl}']`);

      // Remove active class for all controls
      $('.functionality__slider-controls').each(function () {
        $(this).removeClass(_this.activeControl);
      });
      // Add active class to the current control
      $(this).addClass(_this.activeControl);

      // Hide all sliders
      $('.functionality__slider-item').each(function () {
        $(this).removeClass(_this.activeSlider);
      });
      // Show current slider
      currentSlide.addClass(_this.activeSlider);

      // Hide all descriptions
      $('.functionality__desc').each(function () {
        const $this = $(this);
        if (!$this.hasClass('functionality__desc-active')) {
          $(this).css('opacity', '0');
        }
        if ($this.hasClass('functionality__desc-active')) {
          $(this).fadeTo(100, 0);
          setTimeout(function () {
            $this.removeClass(_this.activeDesc).css('display', 'none');
          }, 300);
        }
      });
      setTimeout(function () {
        currentDesc.addClass(_this.activeDesc).css('display', 'block').fadeTo(100, 1);
      }, 300);
    });

    return this;
  }

  /**
   * Init mobile slider
   *
   * @return {Common}
   */
  initMobileSlider() {
    $('.functionality__slider-mobile').slick({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 300,
      slidesToScroll: 1,
      slidesToShow: 1,
      adaptiveHeight: true
    });

    return this;
  }

  /**
   * Check description height and recalc item height
   *
   * @return {Drivers}
   */
  whatItemHeight() {
    if (Resp.isDeskCustom) {
      $('.what__desc').each(function () {
        const elHeight = $(this).prop('scrollHeight') - 341;

        if (elHeight > 0) {
          $(this).closest('.what__item').css('height', 519 + elHeight + 'px');
        } else {
          $(this).closest('.what__item').css('height', 519 + 'px');
        }
      });

      $('.what__desc-reverse').each(function () {
        const elHeight = $(this).prop('scrollHeight') - 286;

        if (elHeight > 0) {
          $(this).closest('.what__item-reverse').css('height', 519 + elHeight + 'px');
        } else {
          $(this).closest('.what__item-reverse').css('height', 519 + 'px');
        }
      });
    }

    return this;
  }

  /**
   * Initialize header scripts.
   *
   * @return {Common}
   */
  initializeHeader() {
    Header.init();

    return this;
  }

  /**
   * requestAnimationFrame shim.
   *
   * @return {Common}
   */
  rafShim() {
    window.requestAnimationFrame = window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (f) {
          return setTimeout(f, 1000 / 60);
        };

    window.cancelAnimationFrame = window.cancelAnimationFrame
        || window.mozCancelAnimationFrame
        || function (requestID) {
          clearTimeout(requestID);
        };

    return this;
  }

  /**
   * Initialize 'up' button if exists.
   *
   * @return {Common}
   */
  initUpBtn() {
    if (this.$upBtn.length) {
      this.$upBtn.on('click tap', function () {
        if (Resp.isDeskCustom) {
          ScrollController.moveToSection(0);
        } else {
          Animation.scrollTo(1.2, {
            scrollTo: '#intro-section',
            ease: Power3.easeInOut
          });
        }
      });
    }

    return this;
  }

  /**
   * Check for IE and fix if needed.
   *
   * @return {Common}
   */
  initIEfix() {
    if (!isIE) return this;

    // fix svg hover (apps btns)
    const $btns = $('.btn');
    $btns.addClass(css.ieFix);

    // fix text block animation (words underline)
    const $textBlocks = $('.textBlock');
    $textBlocks.addClass(css.ieFix);

    return this;
  }

  /**
   * Animations gsap.
   *
   * @return {Common}
   */
  animationPages() {
    let animateFadeFirst = $('.animate-fade-first');
    let animateFadeLine = $('.animate-fade-line');
    let animateTopFirst = $('.animate-top-first');
    let animateTop = $('.animate-top');
    let animateStage = $('.drivers__cta-nav-link');
    let animateFadeUp = $('.animate-fade-up');
    let animateFadeIn = $('.animate-fade-in');
    let animateDelimeterHeight = $('.animate-delimeter-height');
    let animateDelimeterWidth = $('.animate-delimeter-width');

    if (Resp.isTablet) {
      // First screen
      let tl = new TimelineMax;

      tl
          .from(animateFadeFirst, 1.5, {autoAlpha: 0, y: 200}, 'firstScreen')
          .from(animateFadeLine, 1.5, {autoAlpha: 0, y: -200}, 'firstScreen')
          .from(animateTopFirst, 1.5, {autoAlpha: 0, y: -200}, 'firstScreen+=1')
          .staggerFrom(animateStage, 1, {autoAlpha: 0, y: 200}, 0.3, 'firstScreen+=0.5');

      // Scrollmagic
      animateTop.each(function () {
        let currentElement = this;
        let controller = new ScrollMagic.Controller();
        let tl = new TimelineMax;

        tl
            .from(currentElement, 2, {autoAlpha: 0, y: -200});

        let secondScreen = new ScrollMagic.Scene({
          triggerElement: currentElement
        })
            .reverse(false)
            .offset(0)
            .setTween(tl)
            .addTo(controller);
      });

      animateFadeUp.each(function () {
        let currentElement = this;
        let controller = new ScrollMagic.Controller();
        let tl = new TimelineMax;

        tl
            .from(currentElement, 1, {autoAlpha: 0, y: 200});

        let secondScreen = new ScrollMagic.Scene({
          triggerElement: currentElement
        })
            .reverse(false)
            .offset(-200)
            .setTween(tl)
            .addTo(controller);
      });

      animateFadeIn.each(function () {
        let currentElement = this;
        let controller = new ScrollMagic.Controller();
        let tl = new TimelineMax;

        tl
            .from(currentElement, 2, {css: {autoAlpha: 0}});

        let secondScreen = new ScrollMagic.Scene({
          triggerElement: currentElement
        })
            .reverse(false)
            .offset(0)
            .setTween(tl)
            .addTo(controller);
      });

      animateDelimeterWidth.each(function () {
        let currentElement = this;
        let controller = new ScrollMagic.Controller();
        let tl = new TimelineMax;

        tl
            .from(currentElement, 1, {scaleX: 0, delay: 0.5}); //{ css: {width: '166'},  delay: 0.5 }

        let secondScreen = new ScrollMagic.Scene({
          triggerElement: currentElement
        })
            .reverse(false)
            .offset(-300)
            .setTween(tl)
            .addTo(controller);
      });

      animateDelimeterHeight.each(function () {
        let currentElement = this;
        let controller = new ScrollMagic.Controller();
        let tl = new TimelineMax;

        tl
            .from(currentElement, 1, {scaleY: 0, delay: 0.5});

        let secondScreen = new ScrollMagic.Scene({
          triggerElement: currentElement
        })
            .reverse(false)
            .offset(-300)
            .setTween(tl)
            .addTo(controller);
      });
    }

    return this;
  }

  /**
   * Progress Bar animate.
   *
   * @return {Common}
   */
  animateProgressBar() {
    const sections = $("[data-progress]");
    const _25 = '25%';
    const _33 = '33.3333%';
    const _50 = '50%';
    const _66 = '66.6666%';
    const _75 = '75%';
    const _100 = '100%';

    $('.progress-bar__pages-page').on('click tap', function () {
      const data = $(this).data('section');
      const sectionToScroll = $(`[data-scrollTo=${data}]`).offset().top;
      const headerHeight = $('.header').outerHeight();

      $('body,html').stop().animate({scrollTop: sectionToScroll - headerHeight}, 500, 'swing');
    });

    sections.each(function () {
      let currentElement = this;
      let controller = new ScrollMagic.Controller();

      let secondScreen = new ScrollMagic.Scene({
        triggerElement: currentElement,
        reverse: true,
        triggerHook: 0,
        offset: -80
      })
          .on('start', function () {
            const currentSection = $(currentElement).data('progress');
            const isWhite = $(currentElement).data('white');

            $('.progress-bar__current').text(`0${currentSection}`);

            if (isWhite === true) {
              $('.progress-bar').addClass('progress-bar--white', 1000, 'ease');
            } else {
              $('.progress-bar').removeClass('progress-bar--white', 1000, 'ease');
            }

            if (sections.length === 4) {
              if (currentSection === 2) {
                $('.progress-bar__bar').css('height', _50);
              } else if (currentSection === 3) {
                $('.progress-bar__bar').css('height', _75);
              } else if (currentSection === 4) {
                $('.progress-bar__bar').css('height', _100);
              } else {
                $('.progress-bar__bar').css('height', _25);
              }
            }

            if (sections.length === 3) {
              if (currentSection === 2) {
                $('.progress-bar__bar').css('height', _66);
              } else if (currentSection === 3) {
                $('.progress-bar__bar').css('height', _100);
              } else {
                $('.progress-bar__bar').css('height', _33);
              }
            }
          })
          .addTo(controller);
    });

    return this;
  }

  /**
   * Initialize custom scroll bar plugin
   *
   * @return {Common}
   */
  initCustomScrollbar() {
    $(window).on("load", function () {
      $('.banner-secondary__desc-scroll').mCustomScrollbar({
        theme: "light-thick",
        mouseWheel: {enable: true}
      });
    });
  }

  /**
   * Initialize common scripts.
   *
   * @returns {Common}
   */
  init() {
    this
        .initObjectFitImages()
        .initializeHeader()
        .rafShim()
        .initPerfectScrollbar()
        .initProgressBar()
        .initUpBtn()
        .initSlider()
        .initIEfix()
        .whatItemHeight()
        .initMobileSlider()
        .animationPages()
        .animateProgressBar();

    return this;
  }
}

/** Export initialized common scripts by default */
export default new Common().init();
