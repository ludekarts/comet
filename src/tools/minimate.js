// minimate.js v 0.1.0
// by Wojciech Ludwin 2017, ludekarts@gmail.com, wldesign.pl
// Your best pal in CSS classes joggling.

export default (element) => {
  let globalTime = 0, isStagger = false, globalOffset = 0;

  // Gobal API object with initial reference to serving element.
  const api = {ref: element};

  // Class helpers.
  const addClasss = (klass) => element.classList.add(...klass.split(' '));
  const removeClasss = (klass) => element.classList.remove(...klass.split(' '));
  const toggleClasss = (klass) => klass.split(' ').forEach(tog => element.classList.toggle(tog));

  // Control globalTime.
  const manageTime = (time) => {
    time = time * 1000;
    if (!isStagger) return time + globalOffset;
    const finalTime = time + globalTime + globalOffset;
    globalTime += time + globalOffset;
    // console.log('glob:', globalTime, 'final:', finalTime); // Debug.
    return finalTime;
  }

  // Add classes.
  api.add = (klass, time) => {
    time !== undefined ? setTimeout(addClasss.bind(this, klass), manageTime(time)) : addClasss(klass);
    return api;
  };

  // Remove classes.
  api.remove = (klass, time) => {
    time !== undefined ? setTimeout(removeClasss.bind(this, klass), manageTime(time)) : removeClasss(klass);
    return api;
  };

  // Toggle classes.
  api.toggle = (klass, time) => {
    time !== undefined ? setTimeout(toggleClasss.bind(this, klass), manageTime(time)) : toggleClasss(klass);
    return api;
  };

  // Clear all classes excluding those in 'keep'.
  api.clear = (keep) => {
    const keepClass = keep.split(' ');
    element.classList.remove(...element.className.split(' ').filter(klass => !keepClass.includes(klass)))
  }

  // ---- Animation End LIstener --------------

  const browserEvent = () =>
    (!!window.opera || ~navigator.userAgent.indexOf(' OPR/'))
      ? 'oanimationend' : ~Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor')
      ? 'webkitAnimationEnd' : !!window.chrome ? 'webkitAnimationEnd' : !!document.documentMode
      ? 'MSAnimationEnd' : 'animationend';

  // Fires at the end of CSS animation.
  api.end = (config) => {
    animationEvent = browserEvent();
    element.addEventListener(animationEvent, function animationEnd (event) {
      typeof config === "function" ? config() : api.setup(config);
      element.removeEventListener(animationEvent, animationEnd, false);
    }, false);
    return api;
  };

  // ---- Global Setup Methods ----------------

  // Configure curent minimate state with single configuration object.
  api.setup = (config) => {
    isStagger = config.isStagger || false;
    globalTime = config.globalTime || 0;
    globalOffset = config.globalOffset || 0;
    config.add && api.add(config.add);
    config.clear && api.clear(config.clear);
    config.remove && api.remove(config.remove);
    config.toggle && api.toggle(config.toggle);
    return api;
  };

  // Set Time offset (Can be use to set length of CSS tarsitions).
  api.offset = (value) => {
    globalOffset = value * 1000;
    return api;
  }

  // Set Stagget mode & reset Global time value
  api.stagger = (flag = true) => {
    isStagger = flag;
    globalTime = 0;
    return api;
  };

  // Set Global time value.
  api.time = (value) => {
    globalTime = value * 1000;
    return api;
  }

  // Public API.
  return api;
};
