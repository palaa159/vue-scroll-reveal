const sr = process.client && require('scrollreveal').default();

function generateOptions(defaultOptions, bindingValue, bindingModifiers) {
  const options = Object.assign({}, defaultOptions, bindingValue);

  if (bindingModifiers) {
    if (bindingModifiers.reset) {
      options.reset = true;
    }

    if (bindingModifiers.nomobile) {
      options.mobile = false;
    }

    if (bindingModifiers.nodesktop) {
      options.desktop = false;
    }
  }

  return options;
}

const VueScrollReveal = {
  install(Vue, defaultOptions) {
    Vue.directive('scroll-reveal', {
      inserted: (el, binding) => {
        const options = generateOptions(defaultOptions, binding.value, binding.modifiers);

        if (typeof options.class === 'string') {
          el.classList.add(options.class);
          delete options.class;
        }

        process.client && sr.reveal(el, options);
      },
      update: (el, binding) => {
        if (binding.value != binding.oldValue) {
          const options = generateOptions(defaultOptions, binding.value, binding.modifiers);

          process.client && sr.reveal(el, options);
        }
      },
    });

    const $sr = {
      isSupported() {
        return process.client && sr.isSupported();
      },
      sync() {
        process.client && sr.sync();
      },
      reveal(target, config, interval, sync) {
        if (!process.client) return
        const options = generateOptions(defaultOptions, config);

        sr.reveal(target, config, interval, sync);
      },
    };
    if (process.client) {
      Object.defineProperty(Vue.prototype, '$sr', {
        get() {
          return $sr;
        },
      });
    }
  },
};

export default VueScrollReveal;
