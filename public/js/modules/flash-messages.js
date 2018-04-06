const removeFlashMsg = () => {
  const flashMsg = document.querySelector(".flash-msg");
  if (typeof flashMsg !== "undefined" && flashMsg !== null) {
    setTimeout(() => {
      flashMsg.remove();
    }, 3000);
  }
};

export { removeFlashMsg };
