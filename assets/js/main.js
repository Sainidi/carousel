/* eslint-disable no-undef */

import Carousel from "./swipe-carousel.js";

let carousel = new Carousel({
  containerID: `#carousel`,
  slideID: `.item`,
  interval: 2000,
  // isPlaying: false,
});

carousel.init();
