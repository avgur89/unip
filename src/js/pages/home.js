/**
 * Main page scripts.
 *
 * @module Main
 */

import Preloader from '../components/preloader';
import ScrollController from '../components/scrollController';
import Header from 'js/components/header';
import { Resp } from 'js/modules/dev/helpers';

import IntroSection from './sections/intro';
import Slider3dSection from './sections/slider3d';
import PreviewSection from './sections/preview';
import SliderSection from './sections/slider';
import CanvasSection from './sections/canvas';

export default class Home {
  /**
   * Cache data.
   */
  constructor() {
    // preloader
    this.preloader = new Preloader();

    // sections
    this.firstSection = IntroSection;
    this.secondSection = Slider3dSection;
    this.thirdSection = PreviewSection;
    this.fourthSection = SliderSection;
    this.fifthSection = CanvasSection;

    // initialize after construction
    this.init();
  }

  /**
   * Run header's reveal animation.
   *
   * @return {Home}
   */
  initHeaderAnimation() {
    Header.initAnimation();

    return this;
  }

  /**
   * Run intro section's reveal animation.
   *
   * @return {Home}
   */
  initFirstSectionAnimation() {
    this.firstSection.initAnimation();

    return this;
  }

  /**
   * Initialize all sections scripts.
   *
   * @return {Home}
   */
  initAllSectionsScripts() {
    // intro section
    this.firstSection.initScripts();

    // slider3d section
    this.secondSection.initScripts();

    // preview section
    this.thirdSection.initScripts();

    // slider section
    this.fourthSection.initScripts();

    // canvas section
    this.fifthSection.initScripts();

    return this;
  }

  /**
   * Initialize full-page scroll controller.
   *
   * @return {Home}
   */
  initializeScrollController() {
    if (Resp.isDeskCustom) ScrollController.init();

    return this;
  }

  /**
   * Initialize Main page scripts.
   */
  init() {
    // run preloader
    this.preloader.init()

      // run intro section's and header's animations
      // after preloader is finished
      .then(() => {
        this
          .initFirstSectionAnimation()
          .initHeaderAnimation();
      });

    // initialize main scripts
    this
      .initAllSectionsScripts()
      .initializeScrollController();
  }
}
