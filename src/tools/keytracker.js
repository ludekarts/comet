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
        // This modifier will not block event default.
        if (mod === '!prevent') result.def = true;
        return result;
      } , {alt: '', ctrl: '', shift: '', def: false});

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

      // Do not prevent default for this key.
      if (modDetect.def) callbacks[key].passEvent = true;

      return api;
    },

    test (event) {
      const {target, keyCode, key, shiftKey, ctrlKey, altKey} = event;
      const keyHandel = callbacks[key] || callbacks[keyCode];

      if (keyHandel) {
        const passEvent = keyHandel.passEvent || false;
        const modifiers =
          (altKey ? 'alt' : '')
          + (ctrlKey ? 'ctrl' : '')
          + (shiftKey ? 'shift' : '');

        const callback =
          modifiers.length === 0
            ? keyHandel['*']
            : keyHandel[modifiers];

        if (callback) {
          !passEvent && event.preventDefault();
          callback.forEach(call => call(event))
        }
      }
    }
  };

  return api;
}
