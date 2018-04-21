import MicroModal from "./micromodal.min";

const deleteAccount = () => {
  const accountMail = document.querySelector(".account-email");
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
    .then(data => console.log(data));
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
