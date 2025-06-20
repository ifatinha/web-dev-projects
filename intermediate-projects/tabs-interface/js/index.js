document.addEventListener("DOMContentLoaded", () => {
  const tabsButtons = document.querySelectorAll("[data-tab]");
  const contents = document.querySelectorAll(".content");

  const updateDisplay = function () {
    contents.forEach((content) => content.classList.remove("active"));
    tabsButtons.forEach((tab) => tab.classList.remove("active"));
  };

  tabsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateDisplay();
      const content = document.querySelector(`#${button.dataset.tab}`);
      content.classList.add("active");
      button.classList.add("active");
    });
  });
});
