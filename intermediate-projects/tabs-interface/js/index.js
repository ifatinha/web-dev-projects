document.addEventListener("DOMContentLoaded", () => {
  const tabsButtons = document.querySelectorAll("[data-tab]");
  const contents = document.querySelectorAll(".content");
  const indicator = document.querySelector("#tabIndicador");

  const updateDisplay = function () {
    contents.forEach((content) => content.classList.remove("active"));
    tabsButtons.forEach((tab) => tab.classList.remove("active"));
  };

  const updateIndicator = function (button) {
    indicator.style.width = `${button.offsetWidth}px`;
    indicator.style.left = `${button.offsetLeft}px`;
  };

  updateIndicator(tabsButtons[0]);

  tabsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateDisplay();

      const content = document.querySelector(`#${button.dataset.tab}`);
      content.classList.add("active");
      button.classList.add("active");
      updateIndicator(button);
    });
  });
});
