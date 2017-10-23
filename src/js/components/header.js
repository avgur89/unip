/**
 * Website's header scripts.
 *
 * @module Header
 */

/** Import utils */
import {
  css,
  $body,
  $window,
  $document,
  $htmlBody,
  throttle,
  Resp
} from 'js/modules/dev/helpers';
import Animation from 'js/modules/dev/animation';

export class Header {
  /**
   * Cache data and DOM elements.
   *
   * @param {jQuery} $header
   */
  constructor($header = $('#header')) {
    this.$header = $header;
    this.$headerInner = $header.find('.header__inner');

    this.$burger = $header.find('.header__burger');

    this.$languages = $header.find('.header__languages');
    this.$languagesInner = $header.find('.header__languages-inner');
    this.$languagesLine = $header.find('.header__languages-line');

    this.animationTime = 2.5;
  }

  /**
   * Run header's reveal animation.
   *
   * @return {Promise}
   */
  initAnimation() {
    return new Promise(resolve => {
      // reveal logo, actions, links, burger, log in
      this.$header.addClass(css.animationFinished);

      // finish animation
      setTimeout(() => {
        // show overflow (for languages)
        Animation.setTween(this.$headerInner, { css: { overflow: 'visible' } });

        // resolve promise when animation is finished
        resolve();
      }, this.animationTime * 1000);
    });
  }

  /**
   * Change header's background color if scrolled from top.
   *
   * @return {Header}
   */
  initToggleBgOnScroll() {
    const $header = this.$header;

    const toggleWithThrottle = throttle(() => {
      const additionalHeight = Resp.isDesk ? $header.height() : 0;
      const scrolledFromTop = $window.scrollTop() > (1 + additionalHeight);
      const menuIsClosed = !$body.data('menuIsOpened');

      if (scrolledFromTop) return $header.addClass(css.background);

      if (menuIsClosed) $header.removeClass(css.background);
    }, 50);

    $window.on('scroll', toggleWithThrottle);

    return this;
  }

  /**
   * Change header's fixed / unfixed position if scrolled from top.
   *
   * @return {Header}
   */
  initToggleFixOnScroll() {
    // only on desktop
    if (!Resp.isDeskCustom) return this;

    const $header = this.$header;
    const fixAnimationTime = 0.4;

    const toggleHideWithThrottle = throttle(() => {
      const scrolledFromTop = $window.scrollTop();
      const heightToHide = $header.height();
      const scrollToHide = scrolledFromTop > heightToHide;

      scrollToHide
        ? $header.addClass(css.fixed)
        : $header.removeClass(css.fixed);
    }, 50);

    let isHidden = true;
    const $introSection = $('#intro-section');
    const toggleShowWithThrottle = throttle(() => {
      const scrolledFromTop = $window.scrollTop();
      const heightToFix = $introSection.height() - 100;
      const scrollToShowFixed = scrolledFromTop >= heightToFix;
      const scrolledToHide = scrolledFromTop < heightToFix + 50;
      const paramsForAnimation = y =>
        ({ time: fixAnimationTime, params: { ease: Power2.easeInOut, css: { y } } });

      if (scrollToShowFixed && isHidden) {
        Animation.tweenWithTimeout($header, 0, paramsForAnimation('0%'));

        isHidden = false;
      } else if (scrolledToHide && !isHidden) {
        Animation.tweenWithTimeout($header, 0, paramsForAnimation('-100%'));

        isHidden = true;
      }
    }, fixAnimationTime * 1000);

    $window.on('scroll', toggleHideWithThrottle);
    $window.on('scroll', toggleShowWithThrottle);

    return this;
  }

  /**
   * Animate language line's height on hover.
   *
   * @return {Header}
   */
  initLanguagesHover() {
    const _this = this;
    const initialHeight = _this.$languagesInner.height();
    const fullHeight = _this.$languagesInner.prop('scrollHeight');
    const animateLine = height =>
      () => Animation.tweenWithTimeout(_this.$languagesLine, 0, {
        time: 0.6,
        params: { css: { height } }
      });

    // animate languages line on hover
    _this.$languages.hover(
      animateLine(fullHeight),
      animateLine(initialHeight)
    );

    return this;
  }

  /**
   * Toggle menu on burger's click.
   *
   * @return {Header}
   */
  initMenuToggle() {
    // close/open menu on burger click
    this.$burger.on('click tap', () => {
      const menuIsOpened = $body.hasClass(css.menuOpened);

      menuIsOpened
        ? requestAnimationFrame(closeMenu)
        : requestAnimationFrame(openMenu);
    });

    // save scrollTop pos
    let menuScrollTop;

    // open menu function
    function openMenu() {
      menuScrollTop = $window.scrollTop();

      $body
        .data('menuIsOpened', true)
        .css('top', -menuScrollTop)
        .addClass(css.menuOpened);
    }

    // close menu function
    function closeMenu() {
      $body
        .data('menuIsOpened', false)
        .removeAttr('style')
        .removeClass(css.menuOpened);

      $htmlBody
        .scrollTop(menuScrollTop);
    }

    return this;
  }

  /**
   * Initialize header's scripts.
   *
   * @return {Header}
   */
  init() {
    this
      .initLanguagesHover()
      .initMenuToggle()
      .initToggleBgOnScroll()
      .initToggleFixOnScroll();

    return this;
  }
}

/** Export new Header class instance by default */
export default new Header;
