document.addEventListener("DOMContentLoaded", () => {
  const modalOpenBtn = document.querySelector("#openModal");
  const closeModalBtn = document.querySelector("#closeModal");
  const modalOverlay = document.querySelector("#modalOverlay");

  const openModal = function () {
    modalOverlay.classList.add("active");
    setTimeout(() => {
      closeModalBtn.focus();
    }, 100);
  };

  const closeModal = function () {
    modalOverlay.classList.remove("active");
  };

  const closeModalWindow = function (event) {
    if (event.currentTarget === modalOverlay) {
      modalOverlay.classList.remove("active");
    }
  };

  const keydowndCloseModal = function (event) {
    if (event.key === "Escape" && modalOverlay.classList.contains("active")) {
      modalOverlay.classList.remove("active");
    }
  };

  modalOpenBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModalWindow);
  document.addEventListener("keydown", keydowndCloseModal);
});
