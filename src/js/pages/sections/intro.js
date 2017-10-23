/**
 * Intro section module.
 *
 * @module IntroSection
 */

/** Import utils */
import { Resp, css } from '../../modules/dev/helpers';
import Animation from '../../modules/dev/animation';
import ScrollController from '../../components/scrollController';

export class IntroSection {
  /**
   * Cache elements etc.
   *
   * @param {jQuery} [$introSection]
   */
  constructor($introSection = $('#intro-section')) {
    this.$section = $introSection;

    // text
    this.$title = $introSection.find('.intro__title');

    // background
    this.$bg = $introSection.find('.intro__background');

    // pin & circles
    this.$animation = $introSection.find('.intro__animation');
    this.$pin = $introSection.find('.intro__pin');
    this.$circles = $introSection.find('.intro__circle');
    this.circlesCount = this.$circles.length;
    this.animationTime = 15;
    this.circlesAnimationDelay = this.animationTime / this.circlesCount;

    // 'learn more'
    this.$learnMore = $introSection.find('.bottomBtn');
  }

  /**
   * Reveal section's title.
   *
   * @return {IntroSection}
   */
  animateTitle() {
    // show title
    requestAnimationFrame(() => {
      this.$title.addClass(css.animationFinished);
    });

    return this;
  }

  /**
   * Reveal section's background.
   *
   * @return {IntroSection}
   */
  animateBackground() {
    // reveal background
    requestAnimationFrame(() => {
      this.$bg.addClass(css.animationFinished);
    });

    return this;
  }

  /**
   * Run and loop section's circles animation.
   *
   * @return {IntroSection}
   */
  animateCircles() {
    // animate circle with delay helper func
    const animateCircle = ($element, animationDelay) =>
      setTimeout(() => $element.addClass(css.animationFinished), animationDelay * 1000);

    // circles animation function
    const circlesAnimation = () => {
      let delay = 0, i = 1;
      while (i <= this.circlesCount) {
        const $element = this.$circles.filter(`.intro__circle--${i++}`);

        animateCircle($element, delay);

        delay += this.circlesAnimationDelay;
      }
    };

    // animate pin
    this.$pin.addClass(css.animationFinished);

    if (!Resp.isDeskCustom) {
      // don't animate circles on devices, just show them
      this.$animation.addClass(css.animationFinished);
    } else {
      // then run circles animation
      setTimeout(circlesAnimation, 1000);
    }

    return this;
  }

  /**
   * Stop circles animation.
   *
   * @return {IntroSection}
   */
  stopCirclesAnimation() {
    this.$circles.removeClass(css.animationFinished);

    return this;
  }

  /**
   * Reveal 'learn more' and pin's line elements.
   *
   * @return {IntroSection}
   */
  animateLines() {
    // reveal animation func
    const animatePinAndLearnMore = () => {
      requestAnimationFrame(() => {
        // animate pin's line
        this.$pin.addClass(css.animationFinished2);

        // animate 'learn more' line and text
        this.$learnMore.addClass(css.animationFinished);
      });
    };

    // reveal with delay
    setTimeout(animatePinAndLearnMore, 1500);

    return this;
  }

  /**
   * Run section's revealing animation.
   *
   * @return {IntroSection}
   */
  initAnimation() {
    this
      .animateTitle()
      .animateBackground()
      .animateCircles()
      .animateLines();

    return this;
  }

  /**
   * Scroll to the next section on 'learn more' click.
   *
   * @return {IntroSection}
   */
  initLearnMore() {
    const nextSectionId = this.$section.next().attr('id');

    this.$learnMore.on('click tap', () => {
      if (Resp.isDeskCustom) {
        ScrollController.moveToNextSection();
      } else {
        Animation.scrollTo(1.2, {
          scrollTo: `#${nextSectionId}`,
          ease: Power3.easeInOut
        });
      }
    });

    return this;
  }

  /**
   * Initialize section's scripts.
   *
   * @return {IntroSection}
   */
  initScripts() {
    this
      .initLearnMore();

    return this;
  }
}

/** Export initialized class instance by default */
export default new IntroSection;
