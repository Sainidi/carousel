(function () {
  const container = document.querySelector(`#carousel`);
  const slides = container.querySelectorAll(`.slide`);
  const indicatorsContainer = container.querySelector(`#indicators-container`);
  const indicators = indicatorsContainer.querySelectorAll(`.indicator`);
  const pauseBtn = container.querySelector(`#pause-btn`);
  const prevBtn = container.querySelector(`#prev-btn`);
  const nextBtn = container.querySelector(`#next-btn`);

  const slidesCount = slides.length;
  const CODE_LEFT_ARROW = `ArrowLeft`;
  const CODE_RIGHT_ARROW = `ArrowRight`;
  const CODE_SPACE = `Space`;
  const FA_PAUSE = `<i class="fas fa-pause"></i>`;
  const FA_PLAY = `<i class="fas fa-play"></i>`;

  let currentSlide = 0;
  let isPlaying = true;
  let timerID = null;
  let swipeStartX = null;
  let swipeEndX = null;
  let interval = 2000;

  function gotoNth(n) {
    slides[currentSlide].classList.toggle(`active`);
    indicators[currentSlide].classList.toggle(`active`);
    currentSlide = (n + slidesCount) % slidesCount;
    slides[currentSlide].classList.toggle(`active`);
    indicators[currentSlide].classList.toggle(`active`);
  }

  const gotoPrev = () => gotoNth(currentSlide - 1);
  const gotoNext = () => gotoNth(currentSlide + 1);

  function pause() {
    if (isPlaying) {
      clearInterval(timerID);
      isPlaying = false;
      pauseBtn.innerHTML = FA_PLAY;
    }
  }

  function play() {
    timerID = setInterval(gotoNext, interval);
    isPlaying = true;
    pauseBtn.innerHTML = FA_PAUSE;
  }

  const pausePlay = () => (isPlaying ? pause() : play());

  function prev() {
    pause();
    gotoPrev();
  }

  function next() {
    pause();
    gotoNext();
  }

  function indicate(e) {
    const target = e.target;

    if (target && target.classList.contains(`indicator`)) {
      pause();
      gotoNth(+target.dataset.slideTo);
    }
  }

  function pressKey(e) {
    if (e.code === CODE_LEFT_ARROW) prev();
    if (e.code === CODE_RIGHT_ARROW) next();
    if (e.code === CODE_SPACE) pausePlay();
  }

  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX;
  }

  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX;
    swipeStartX - swipeEndX > 100 && next();
    swipeStartX - swipeEndX < -100 && prev();
  }

  pauseBtn.addEventListener(`click`, pausePlay);
  prevBtn.addEventListener(`click`, prev);
  nextBtn.addEventListener(`click`, next);
  indicatorsContainer.addEventListener(`click`, indicate);
  container.addEventListener(`touchstart`, swipeStart);
  container.addEventListener(`touchend`, swipeEnd);
  document.addEventListener(`keydown`, pressKey);

  timerID = setInterval(gotoNext, interval);
})();
