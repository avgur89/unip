/**
 * Contacts page scripts.
 *
 * @module Contacts
 */

import 'slick-carousel';
import CommonSubPage from './_CommonSubPage';

export default class Contacts extends CommonSubPage {
  /**
   * Register afterSuccessFeedback callbask in global scope.
   * (Show thanks message on successful form submit)
   *
   * @return {Contacts}
   */
  showSubmitMessage() {
    window.afterSuccessFeedback = () => {
      $('.form').fadeOut(400, function() {
        const $this = $(this);
        $('.form__thank').fadeIn().delay(3000).fadeOut(400, function() {
          $this.fadeIn(400);
        });
      });
    };

    return this;
  }

  /**
   * Initialize Contacts page scripts.
   *
   * @override
   */
  init() {
    this
      .initHeaderAnimation()
      .enableBodyScroll()
      .showSubmitMessage();
  }
}
