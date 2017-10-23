/**
 * Website's scroll controller module (desktop).
 *
 * @module ScrollController
 */

/** Import utils */
import { bindMethods } from '../modules/dev/helpers';
import WheelIndicator from 'wheel-indicator';
import SectionSlideController from './sectionSlideController';
import Animation from '../modules/dev/animation';
import IntroSection from '../pages/sections/intro';
import ProgressBar from '../components/progressBar';
import Slider3dSection from '../pages/sections/slider3d';
import PreviewSection from '../pages/sections/preview';
import SliderSection from '../pages/sections/slider';
import CanvasSection from '../pages/sections/canvas';

export class ScrollController {
  /**
   * Set defaults, cache data, save context.
   */
  constructor() {
    this.currentlyScrolling = false;

    this.currentSection = 0;
    this.fullPageSections = [
      'intro-section',
      'slider3d-section',
      'preview-section',
      'slider-section',
      'canvas-section',
      'scrollInside'
    ];

    // save context
    bindMethods.bind(this)(
      'handleScroll',
      'moveToPrevSection',
      'moveToNextSection',
      'beforeChange'
    );

    // animation flags
    this.secondSectionIsRevealed = false;
    this.thirdSectionIsRevealed = false;
    this.fourthSectionIsRevealed = false;
    this.fifthSectionIsRevealed = false;

    // inner sections slide controller
    this.$secondSectionSlider =
      new SectionSlideController(Slider3dSection.$section);
    this.$thirdSectionSlider =
      new SectionSlideController(PreviewSection.$section, false, 5, 850);
  }

  /**
   * Performed before screen change.
   *
   * CAREFUL! ANTI-PATTERN CODE
   * @TODO: refactor (remove half to 'leaving section' method)
   *
   * @return {ScrollController}
   */
  beforeChange() {
    switch (this.currentSection) {
      // entering intro section
      case 0: {
        ProgressBar.unfix();
        this.$secondSectionSlider.deactivate();

        break;
      }

      // entering slider3d section
      case 1: {
        if (!this.secondSectionIsRevealed) {
          Animation.delay(1, () => {
            Slider3dSection.initAnimation();
            ProgressBar.initAnimation();
            this.secondSectionIsRevealed = true;
          });
          Animation.delay(1.19, this.$secondSectionSlider.activate);
        }
        this.$thirdSectionSlider.deactivate();
        Animation.delay(0.4, ProgressBar.paintBlack);
        Animation.delay(1.2, ProgressBar.fix);
        ProgressBar.changeProgress(25);
        window.clearInterval(window.textChangeInterval);
        window.stopCanvasAnimate();
        break;
      }

      // entering preview section
      case 2: {
        if (!this.thirdSectionIsRevealed) {
          Animation.delay(1, () => {
            PreviewSection.initAnimation();
            this.thirdSectionIsRevealed = true;
          });
          Animation.delay(1.19, this.$thirdSectionSlider.activate);
        }
        this.$secondSectionSlider.deactivate();
        Animation.delay(0.4, ProgressBar.paintBlack);
        ProgressBar.changeProgress(50);
        window.clearInterval(window.textChangeInterval);
        window.stopCanvasAnimate();
        break;
      }

      // entering slider section
      case 3: {
        if (!this.fourthSectionIsRevealed) {
          Animation.delay(1, () => {
            SliderSection.initAnimation();
            this.fourthSectionIsRevealed = true;
          });
        }
        this.$secondSectionSlider.deactivate();
        this.$thirdSectionSlider.deactivate();
        Animation.delay(0.4, ProgressBar.paintWhite);
        ProgressBar.changeProgress(75);
        window.clearInterval(window.textChangeInterval);
        window.stopCanvasAnimate();
        break;
      }

      // entering canvas section
      case 4: {
        if (!this.fifthSectionIsRevealed) {
          Animation.delay(1, () => {
            CanvasSection.initAnimation();
            this.fifthSectionIsRevealed = true;
          });
        }
        if (this.fifthSectionIsRevealed) CanvasSection.runTextChange();
        window.startCanvasAnimate();
        this.$secondSectionSlider.deactivate();
        this.$thirdSectionSlider.deactivate();
        Animation.delay(0.4, ProgressBar.paintHalfWhite);
        Animation.delay(1.2, ProgressBar.fix);
        ProgressBar.changeProgress(100);
        break;
      }

      // entering scroll section
      case 5: {
        ProgressBar.unfix(true);
        window.clearInterval(window.textChangeInterval);
        window.stopCanvasAnimate();
        break;
      }
    }

    return this;
  }

  /**
   * Move to specified section.
   *
   * @param {Number} sectionIndex
   * @return {ScrollController}
   */
  moveToSection(sectionIndex = this.currentSection) {
    this.currentlyScrolling = true;
    this.currentSection = sectionIndex;

    const sectionName = this.fullPageSections[sectionIndex];

    // before changing sections
    requestAnimationFrame(this.beforeChange);

    // animate scroll
    Animation.scrollTo(1.2, {
      scrollTo: `#${sectionName}`,
      ease: Power3.easeInOut,
      onComplete: () => this.currentlyScrolling = false
    });

    return this;
  }

  /**
   * Move to the previous section.
   *
   * @return {ScrollController}
   */
  moveToPrevSection() {
    // no previous sections left
    if (this.currentSection === 0) return this;

    // change section params
    this.currentSection--;

    // animate
    requestAnimationFrame
    (this.moveToSection.bind(this, this.currentSection));

    return this;
  }

  /**
   * Move to the next section.
   *
   * @return {ScrollController}
   */
  moveToNextSection() {
    // no sections left
    const fpSectionsCount = this.fullPageSections.length - 1;
    if (this.currentSection === fpSectionsCount) return this;

    // change section params
    this.currentSection++;

    // animate
    requestAnimationFrame
    (this.moveToSection.bind(this, this.currentSection));

    return this;
  }

  /**
   * Go the next/prev section according to scroll direction.
   * @TODO: refactor dispatcher and moveToPrev/Next methods
   *
   * @return {ScrollController}
   */
  dispatchScroll(scrollDirection) {
    switch (scrollDirection) {
      case 'up': {
        this.moveToPrevSection();
        break;
      }

      case 'down': {
        this.moveToNextSection();
        break;
      }

      default: {
        console.warn('Scrolling direction wasn\'t set');
      }
    }

    return this;
  }

  /**
   * Get scroll direction and dispatch.
   *
   * @return {ScrollController}
   */
  handleScroll(e) {
    // do nothing if scrolling in progress
    if (this.currentlyScrolling) return this;

    // dispatch event
    this.dispatchScroll(e.direction);
  }

  /**
   * Attach event listener to the window.
   *
   * @param {Boolean} moveToSection - animate to specified section
   * @return {ScrollController}
   */
  init(moveToSection = true) {
    // move to the current section
    if (moveToSection) this.moveToSection();

    // bind event listener
    this.WheelIndicator = new WheelIndicator({
      elem: window,
      callback: this.handleScroll
    });

    return this;
  }

  /**
   * Remove event listener from the window.
   *
   * @return {ScrollController}
   */
  kill() {
    // unbind event listener
    this.WheelIndicator.destroy();

    return this;
  }
}

/** Export initialized ScrollController class instance by default */
export default new ScrollController;
