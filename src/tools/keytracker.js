export default function Keytracker() {

  const callbacks = {};

  const api = {
    onkey (...args) {
      if (args.length < 2) throw 'Keytracker::onkey requires at least two arguments -> .onkey(key, callback);';

      const callback = args.pop();
      const key = args.shift();
      const modDetect = args.reduce((result, mod) => {
        if (mod === 'alt') result.alt = 'alt';
        if (mod === 'ctrl') result.ctrl = 'ctrl';
        if (mod === 'shift') result.shift = 'shift';
        return result;
      } , {alt: '', ctrl: '', shift: ''});

      let modifiers = modDetect.alt + modDetect.ctrl + modDetect.shift;
      if (modifiers.length === 0) modifiers = '*';

      if (callbacks[key]) {
        callbacks[key][modifiers]
          ? callbacks[key][modifiers].push(callback)
          : callbacks[key][modifiers] = [callback];
      }
      else {
        callbacks[key] = {};
        callbacks[key][modifiers] = [callback];
      }

      return api;
    },

    test (event) {
      const {target, keyCode, key, shiftKey, ctrlKey, altKey} = event;
      const keyHandel = callbacks[key] || callbacks[keyCode];

      if (keyHandel) {
        const modifiers =
          (altKey ? 'alt' : '')
          + (ctrlKey ? 'ctrl' : '')
          + (shiftKey ? 'shift' : '');

        const callback =
          modifiers.length === 0
            ? keyHandel['*']
            : keyHandel[modifiers];

        if (callback) {
          event.preventDefault();
          callback.forEach(call => call(target))
        }
      }
    }
  };

  return api;
}
