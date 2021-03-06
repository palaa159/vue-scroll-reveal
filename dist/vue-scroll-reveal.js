'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var sr = process.client && require('scrollreveal').default();

function generateOptions(defaultOptions, bindingValue, bindingModifiers) {
  var options = _extends({}, defaultOptions, bindingValue);

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

var VueScrollReveal = {
  install: function install(Vue, defaultOptions) {
    Vue.directive('scroll-reveal', {
      inserted: function inserted(el, binding) {
        var options = generateOptions(defaultOptions, binding.value, binding.modifiers);

        if (typeof options.class === 'string') {
          el.classList.add(options.class);
          delete options.class;
        }

        process.client && sr.reveal(el, options);
      },
      update: function update(el, binding) {
        if (binding.value != binding.oldValue) {
          var options = generateOptions(defaultOptions, binding.value, binding.modifiers);

          process.client && sr.reveal(el, options);
        }
      }
    });

    var $sr = {
      isSupported: function isSupported() {
        return process.client && sr.isSupported();
      },
      sync: function sync() {
        process.client && sr.sync();
      },
      reveal: function reveal(target, config, interval, sync) {
        if (!process.client) return;
        var options = generateOptions(defaultOptions, config);

        sr.reveal(target, config, interval, sync);
      }
    };
    if (process.client) {
      Object.defineProperty(Vue.prototype, '$sr', {
        get: function get() {
          return $sr;
        }
      });
    }
  }
};

exports.default = VueScrollReveal;
