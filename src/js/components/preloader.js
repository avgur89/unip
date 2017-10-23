/**
 * Website's preloader module (promise-based).
 *
 * @module Preloader
 */

/** Import utils */
import {
  css,
  matrixToArray,
  $window,
  $body,
  bindMethods,
  Resp
} from 'js/modules/dev/helpers';
import Animation from 'js/modules/dev/animation';

export default class Preloader {
  /**
   * Create new preloader instance.
   *
   * @param {jQuery} $preloader - DOM element to activate preloader on.
   */
  constructor($preloader = $('#preloader')) {
    // cache DOM elements
    this.$preloader = $preloader;
    this.$lines = $preloader.find('.preloader__line');
    this.$linesText = this.$lines.find('.preloader__text');
    this.$leftLines = $preloader.find('.preloader__line--left .preloader__line-inner');
    this.$rightLines = $preloader.find('.preloader__line--right .preloader__line-inner');

    // settings
    this.finishAnimationTime = Resp.isDeskCustom ? 1.5 : 0.7;

    // save context
    bindMethods.bind(this)
    ('startAnimation', 'stopAnimation', 'highlightText', 'finishAnimation');
  }

  /**
   * Start preloader's animation.
   *
   * @return {Promise}
   */
  startAnimation() {
    return new Promise(resolve => {
      // preloader must work at least 3 seconds
      const countTimeAndFinish = function () {
        const currentTime = new Date().getTime() / 1000;
        const passedTime = Math.floor(currentTime - this.startTime);

        // 3 seconds passed, finish preloader
        if (passedTime > 1) return resolve();

        // check again after 500 ms
        setTimeout(countTimeAndFinish, 500);
      }.bind(this);

      // initiate preloader's finish
      $window.load(countTimeAndFinish);
    });
  }

  /**
   * Stop text animation.
   *
   * @return {Promise}
   */
  stopAnimation() {
    return new Promise(resolve => {
      // stop moving animation
      this.$linesText
        .each(function () {
          const $this = $(this);
          const translateValue = matrixToArray($this.css('transform'))[4];

          $this.css('transform', `translate3d(${translateValue}px, 0, 0)`);
        })
        .addClass(css.animationFinished);

      // animation is stopped
      resolve();
    });
  }

  /**
   * Highlight random (not really) words.
   *
   * @return {Promise}
   */
  highlightText() {
    return new Promise(resolve => {
      const randomNumber = Math.floor(Math.random() * 10);

      // highlight text
      this.$lines.each((lineIndex, line) => {
        const words = $(line).find('span');
        const randomRule = randomNumber > 5
          ? lineIndex === 0 || lineIndex === 2
          : lineIndex === 1 || lineIndex === 3;

        words.map((wordIndex, word) => {
          const $word = $(word);
          const divider = randomRule ? 3 : 2;

          if (wordIndex % divider) $word.addClass(css.active);
        });
      });

      // wait for animation to finish and resolve
      setTimeout(resolve, 1000);
    });
  }

  /**
   * Finish preloader's animation.
   *
   * @return {Promise}
   */
  finishAnimation() {
    const time = this.finishAnimationTime;

    return new Promise(resolve => {
      // resolve promise after animation
      Animation.delay(time, resolve);

      // hide shadow
      this.$preloader.addClass(css.animationFinished);

      // animate preloader's lines
      Animation
        .tweenWithTimeout(this.$leftLines, 0, {
          time: 1,
          params: { css: { opacity: 0 } }
        })
        .tweenWithTimeout(this.$rightLines, 0, {
          time: 1,
          params: {
            css: { opacity: 0 },
            onComplete: () => {
              // hide preloader
              $body.removeClass(css.hasPreloader);
            }
          }
        });
    });
  }

  /**
   * Initialize preloader.
   *
   * @return {Promise}
   */
  init() {
    // set timer (in seconds)
    this.startTime = new Date().getTime() / 1000;

    // preloader's animation
    return new Promise(resolve => {
      this
        .startAnimation()
        .then(this.stopAnimation)
        .then(this.highlightText)
        .then(this.finishAnimation)
        .then(resolve);
    });
  }
}
