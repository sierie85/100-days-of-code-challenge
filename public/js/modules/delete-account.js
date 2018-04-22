import MicroModal from "./micromodal.min";

const deleteAccount = () => {
  const accountMail = document.querySelector(".account-email");
  const modalContent = document.querySelector(".modal__container");
  modalContent.innerHTML = `<h1><i class="fas fa-spinner fa-pulse color-dark"></i>loading</h1>`;
  const update = fetch("http://localhost:8000/delete-account", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email: accountMail.value })
  })
    .then(res => res.json())
    .then(data => {
      if (data === "error") {
        modalContent.innerHTML = `Error. Please try again or contact support.`;
      } else {
        const url = location.origin;
        window.location.href = url;
      }
    });
};

const deleteAccountModal = () => {
  const deleteAccountBtn = document.querySelector(".delete-account");
  deleteAccountBtn.addEventListener("click", deleteAccount);
  const modal = MicroModal.show("modal-1", {
    onClose: modal => {
      deleteAccountBtn.removeEventListener("click", deleteAccount, false);
    }
  });
};
export { deleteAccountModal };
