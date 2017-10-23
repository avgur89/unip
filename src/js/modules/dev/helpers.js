/**
 * Commonly used constants and functions.
 *
 * @module Helpers
 */

/**
 * Cache body DOM element.
 *
 * @constant
 * @type {jQuery}
 */
export const $body = $('body');

/**
 * Cache document.
 *
 * @constant
 * @type {jQuery}
 */
export const $document = $(document);

/**
 * Cache window.
 *
 * @constant
 * @type {jQuery}
 */
export const $window = $(window);

/**
 * Cache header.
 *
 * @constant
 * @type {jQuery}
 */
export const $header = $('header');

/**
 * Cache main.
 *
 * @constant
 * @type {jQuery}
 */
export const $main = $('main');

/**
 * Cache footer.
 *
 * @constant
 * @type {jQuery}
 */
export const $footer = $('footer');

/**
 * Elements for cross-browser window scroll.
 *
 * @constant
 * @type {jQuery}
 */
export const $htmlBody = $('html, body');

/**
 * Window width.
 *
 * @constant
 * @type {Number}
 */
export const winWidth = $window.width();

/**
 * Detect MacBook.
 *
 * @constant
 * @type {boolean}
 */
export const isMac = /mac/i.test(navigator.platform);

/**
 * Detect IE / Edge.
 *
 * @constant
 * @type {Boolean}
 */
export const isIE = !!document.documentMode || /Edge/.test(navigator.userAgent);

/**
 * Class names strings.
 *
 * @constant
 * @type {String}
 */
export const classNames = 'js-slide-1 js-slide-2 js-slide-3 js-slide-4 js-slide-5';

/**
 * Match media device indicator.
 */
export class Resp {
  /**
   * Get window's current width.
   *
   * @get
   * @static
   * @return {Number}
   */
  static get currWidth() {
    return window.innerWidth;
  }

  /**
   * Detect touch events.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isTouch() {
    return 'ontouchstart' in window;
  }

  /**
   * Detect desktop device.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isDesk() {
    return window.matchMedia(`(min-width: 1280px)`).matches;
  }

  /**
   * Detect desktop device (custom width).
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isDeskCustom() {
    return window.matchMedia(`(min-width: 1260px)`).matches;
  }

  /**
   * Detect tablet device.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isTablet() {
    return window.matchMedia(`(min-width: 768px)`).matches;
  }

  /**
   * Detect mobile device.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isMobile() {
    return window.matchMedia(`(max-width: 767px)`).matches;
  }
}

/**
 * Detect current page.
 *
 * @constant
 * @type {String}
 */
export const currentPage = $main.data('page');

/**
 * Css class names.
 *
 * @constant
 * @type {Object}
 */
export const css = {
  active: 'js-active',
  ieFix: 'js-ie-fix',
  animationFinished: 'js-animation-finished',
  animationFinished2: 'js-animation-finished-2',
  isHiddenForAnimation: 'js-is-hidden-for-animation',
  hasPreloader: 'js-has-preloader',
  menuOpened: 'js-menu-opened',
  background: 'js-background',
  background2: 'js-background-2',
  fixed: 'js-fixed'
};

/**
 * Check specified item to be target of the event.
 *
 * @param {Object} e - Event object.
 * @param {jQuery} item - Item to compare with.
 * @returns {Boolean} - Indicate whether clicked target is the specified item or no.
 */
export const checkClosest = (e, item) => $(e.target).closest(item).length > 0;

/**
 * Generate string of random letters.
 *
 * @param {Number} length
 */
export const randomString = (length = 10) => Math.random().toString(36).substr(2, length > 10 ? length : 10);

/**
 * Toggle class on specified element on click.
 *
 * @param {jQuery} clickHandler
 * @param {jQuery} element
 */
export const toggleClass = (clickHandler, element) => {
  clickHandler.on('click tap', () => element.toggleClass(css.active));
};

/**
 * Check if element is in viewport.
 *
 * @param {jQuery} $element
 * @param {Boolean} [fullyInView = false] - element should be fully in viewport?
 * @param {Number} [offsetTop = 0]
 * @returns {Boolean}
 */
export const isScrolledIntoView = ($element, offsetTop = 0, fullyInView = false) => {
  const pageTop = $window.scrollTop();
  const pageBottom = pageTop + $window.height();
  const elementTop = $element.offset().top;
  const elementBottom = elementTop + $element.height();

  if (fullyInView === true) {
    return ((pageTop < elementTop) && (pageBottom > elementBottom));
  } else {
    return (((elementTop + offsetTop) <= pageBottom) && (elementBottom >= pageTop));
  }
};

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 *
 * @param {Function} func
 * @param {Object} context
 * @param {Number} wait
 * @param {Boolean} [immediate]
 * @returns {Function}
 */
export const debounce = (func, context, wait, immediate) => {
  let timeout;

  return () => {
    const args = arguments;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

/**
 * Throttle function.
 *
 * @param {Function} fn
 * @param {Number} [threshold]
 * @param {Object} [scope]
 * @returns {Function}
 */
export const throttle = (fn, threshold = 250, scope) => {
  let last, deferTimer;

  return function () {
    const context = scope || this;

    let now = +new Date,
      args = arguments;
    if (last && now < last + threshold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

/**
 * Shuffle items in array (Fisher–Yates shuffle).
 *
 * @param {Array} array
 * @return {Array}
 */
export const shuffleArray = array => {
  let m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

/**
 * Transform matrix into array.
 *
 * @param {String} matrix
 * @return {Array}
 */
export const matrixToArray = matrix =>
  matrix.substr(7, matrix.length - 8).split(', ');

/**
 * Bind specified method's context.
 *
 * @param {String} methods
 */
export const bindMethods = function (...methods) {
  methods.forEach(method => this[method] = this[method].bind(this));
};
