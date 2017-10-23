/**
 * Animations handler.
 *
 * @module Animation
 */

export default class Animation {
  /**
   * Checks tween target for errors.
   *
   * @param {jQuery|HTMLElement|String|Array} target
   * @returns {Boolean}
   */
  static checkForErrors(target) {
    if (Array.isArray(target)) {
      if (!target.length || typeof target[0] === 'undefined' || target[0] === null) {
        console.warn('Tween target not found');
        return false;
      }
    } else if (!target) {
      console.warn('Tween target not found');
      return false;
    }

    return true;
  }

  /**
   * Set css-props without animation.
   *
   * @param {jQuery|HTMLElement|String|Array} target
   * @param {Object} settings
   * @return {Animation}
   */
  static setTween(target, settings) {
    if (this.checkForErrors(target)) TweenMax.set(target, settings);

    return this;
  }

  /**
   * Delay function's call.
   *
   * @param {Number} timeout
   * @param {Function} func
   * @return {Animation}
   */
  static delay(timeout, func) {
    TweenMax.delayedCall(timeout, func);

    return this;
  }

  /**
   * Delay function's call on multiple items.
   *
   * @param {jQuery} $items - items
   * @param {Function} func - this passed as argument on each call
   * @param {Number} stagger - stagger time in seconds
   * @param {Number} timeout - timeout before animation start
   * @return {Animation}
   */
  static staggerDelay($items, stagger, func, timeout) {
    if (!$items) {
      console.warn('staggerDelay target was not found');
      return this;
    }

    let timeOut = 0;

    this.delay(timeout, () => {
      $items.each((index, element) => {
        Animation.delay(timeOut, () => func.call(null, element, index));
        timeOut += stagger;
      });
    });

    return this;
  }

  /**
   * Kill all tweens, or kill tweens of specified target.
   *
   * @param {Object|jQuery|HTMLElement|String|Array} target
   * @return {Animation}
   */
  static killTweens(target) {
    target ? TweenMax.killTweensOf(target) : TweenMax.killAll();

    return this;
  }

  /**
   * Scroll to specified element / position.
   *
   * @param {Number} speed
   * @param {Object} settings
   * @return {Animation}
   */
  static scrollTo(speed, settings) {
    TweenMax.to(window, speed, settings);

    return this;
  }

  /**
   * Perform tween animation with timeout.
   *
   * @param {Object|jQuery|HTMLElement|String|Array} target
   * @param {Number} timeout
   * @param {Object} settings
   * @param {String} [method = 'to'] - TweenMax method used for animation (doesn't support fromTo)
   * @return {Animation}
   */
  static tweenWithTimeout(target, timeout, settings, method = 'to') {
    if (!this.checkForErrors(target)) return this;

    this.delay(timeout, () => {
      if (method == 'staggerFrom' || method == 'staggerTo')
        return TweenMax[method](target, settings.time, settings.params, settings.stagger);

      if (method == 'fromTo')
        return TweenMax[method](target, settings.time, settings.from, settings.to);

      TweenMax[method](target, settings.time, settings.params);
    });

    return this;
  }

  /**
   * Stepped animation maximum of 5 steps.
   * Each step is a promise that must resolve on animation end.
   *
   * @param {Object} params - object with functions (animation steps)
   * @param {Function} params.one
   */
  static steppedAnimation(params) {
    const firstStep = params.one;
    const firstStepIsFunc = typeof firstStep === 'function';

    // first step required
    if (!firstStep) return console.error('First step required');

    // first step must be a function
    if (!firstStepIsFunc) return console.error('Step must be a function');

    const emptyStep = resolve => resolve();

    // run animation
    Promise.resolve()

      // first step
      .then(() => new Promise(params.one || emptyStep))

      // second step
      .then(() => new Promise(params.two || emptyStep))

      // third step
      .then(() => new Promise(params.three || emptyStep))

      // fourth step
      .then(() => new Promise(params.four || emptyStep))

      // fifth step
      .then(() => new Promise(params.five || emptyStep));
  }
}
