(function () {
  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme) {
    root.dataset.theme = storedTheme;
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      localStorage.setItem('theme', nextTheme);
    });
  }

  function encodeUnicodeBase64(value) {
    return btoa(unescape(encodeURIComponent(value)));
  }

  function decodeUnicodeBase64(value) {
    return decodeURIComponent(escape(atob(value)));
  }

  function setStatus(form, message, isError) {
    const status = form.querySelector('[data-status]');
    if (!status) {
      return;
    }

    status.textContent = message;
    status.style.color = isError ? '#b91c1c' : '';
  }

  function obfuscate(input) {
    const base64 = encodeUnicodeBase64(input);
    let hexEncoded = '';

    for (let index = 0; index < base64.length; index += 1) {
      hexEncoded += '\\x' + base64.charCodeAt(index).toString(16).padStart(2, '0');
    }

    return 'eval(atob("' + hexEncoded + '"));';
  }

  function deobfuscate(input) {
    const match = input.trim().match(/atob\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/);
    if (!match) {
      throw new Error("Invalid input. Couldn't extract HEX string.");
    }

    const base64 = match[1].replace(/\\x([0-9A-Fa-f]{2})/g, function (_, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    });

    return decodeUnicodeBase64(base64);
  }

  document.querySelectorAll('[data-tool]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const inputField = form.querySelector('#input');
      const outputField = form.querySelector('#output');
      const toolName = form.getAttribute('data-tool');
      const input = inputField ? inputField.value : '';

      if (!inputField || !outputField) {
        return;
      }

      if (!input.trim()) {
        outputField.value = '';
        setStatus(form, 'Enter JavaScript to continue.', true);
        inputField.focus();
        return;
      }

      try {
        outputField.value = toolName === 'deobfuscator' ? deobfuscate(input) : obfuscate(input);
        setStatus(form, toolName === 'deobfuscator' ? 'JavaScript recovered successfully.' : 'JavaScript obfuscated successfully.', false);
      } catch (error) {
        outputField.value = '';
        setStatus(form, error instanceof Error ? error.message : 'Processing failed.', true);
      }
    });
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register((body.dataset.baseurl || '') + '/service-worker.js').catch(function () {
      });
    });
  }
}());
