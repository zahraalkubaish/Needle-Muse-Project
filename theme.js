(() => {
  const storageKey = "needle-and-muse-theme";
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(isDark) {
    root.dataset.theme = isDark ? "dark" : "light";
    if (themeColor) {
      themeColor.content = isDark ? "#1b1918" : "#f5f0e5";
    }
    updateThemeButton();
  }

  function updateThemeButton() {
    const button = document.getElementById("theme-toggle");
    if (button) {
      button.textContent = root.dataset.theme === "dark" ? "Original Theme" : "Dark Mode";
    }
  }

  function loadTheme() {
    try {
      const preferredTheme = window.localStorage.getItem(storageKey);
      applyTheme(preferredTheme === "summer" || preferredTheme === "dark");
    } catch {
      applyTheme(root.dataset.theme === "dark");
    }
  }

  loadTheme();

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("theme-toggle");
    if (button) {
      updateThemeButton();
      button.addEventListener("click", () => {
        const isDark = root.dataset.theme !== "dark";
        applyTheme(isDark);
        try {
          window.localStorage.setItem(storageKey, root.dataset.theme);
        } catch {
          // The theme still works on this page when storage is unavailable.
        }
      });
    }
  });

  window.addEventListener("pageshow", loadTheme);
})();
