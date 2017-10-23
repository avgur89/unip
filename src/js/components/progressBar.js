/**
 * Website's progress bar module.
 *
 * @module ProgressBar
 */

/** Import utils */
import {
  css,
  bindMethods
} from '../modules/dev/helpers';
import ScrollController from './scrollController';

export class ProgressBar {
  /**
   * Cache data, save context.
   */
  constructor() {
    this.$progressBar = $('#progressBar');
    this.$bar = this.$progressBar.find('.progressBar__bar');
    this.$pages = this.$progressBar.find('.progressBar__pages-page');

    // save context
    bindMethods.bind(this)(
      'unfix',
      'fix',
      'paintBlack',
      'paintWhite',
      'paintHalfWhite'
    );
  }

  /**
   * Unfix progress bar's position.
   *
   * @param {Boolean} [atBottom] - fix progress bar at bottom.
   * @return {ProgressBar}
   */
  unfix(atBottom) {
    const top = atBottom ? '455vh' : '155vh';
    this.$progressBar
      .css({ top })
      .removeClass(css.fixed);

    return this;
  }

  /**
   * Fix progress bar's position.
   *
   * @return {ProgressBar}
   */
  fix() {
    this.$progressBar
      .css('top', '')
      .addClass(css.fixed);

    return this;
  }

  /**
   * Change progress bar's color to black.
   *
   * @return {ProgressBar}
   */
  paintBlack() {
    this.$progressBar
      .removeClass(`${css.background} ${css.background2}`);

    return this;
  }

  /**
   * Change progress bar's section buttons bg to white.
   *
   * @return {ProgressBar}
   */
  paintHalfWhite() {
    this.$progressBar
      .removeClass(css.background)
      .addClass(css.background2);

    return this;
  }

  /**
   * Change progress bar's color to white.
   *
   * @return {ProgressBar}
   */
  paintWhite() {
    this.$progressBar
      .removeClass(css.background2)
      .addClass(css.background);

    return this;
  }

  /**
   * Reveal progress bar.
   *
   * @return {ProgressBar}
   */
  initAnimation() {
    this.$progressBar.addClass(css.animationFinished);

    return this;
  }

  /**
   * Change progress bar's %.
   *
   * @param {Number} height - height in %.
   * @return {ProgressBar}
   */
  changeProgress(height) {
    this.$bar.css('height', `${height}%`);

    return this;
  }

  /**
   * Scroll to specified section on click.
   *
   * @return {ProgressBar}
   */
  initScrollToSectionOnClick() {
    this.$pages.on('click tap', function () {
      const sectionIndex = $(this).data('section');

      ScrollController.moveToSection(sectionIndex);
    });

    return this;
  }
}

/** Export initialized ProgressBar class instance by default */
export default new ProgressBar;
