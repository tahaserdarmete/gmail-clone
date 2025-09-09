import {mails} from "./main.js";

const uiElement = {
  menuBtn: document.querySelector("#menu-btn"),
  modal: document.querySelector(".modal-wrapper"),
  closeBtn: document.querySelector("#close-btn"),
  navigation: document.querySelector(".left-aside-middle"),
  createBtn: document.querySelector(".create"),
  leftAside: document.querySelector(".left-aside"),
  form: document.querySelector("#mail-form"),
  mailArea: document.querySelector(".mails-area"),
  searchForm: document.querySelector(".search-form"),
};

const renderMails = (outlet, data) => {
  outlet.innerHTML = data
    .map(
      (mail) =>
        `
     <div class="mail" data-id="${mail.id}">
            <div class="left">
              <input type="checkbox" />
              <i class="bi bi-star${mail.stared ? "-fill" : ""} "></i>
              <span>${mail.reciver}</span>
            </div>

            <div class="center">
              <p class="mail-title">${mail.title}</p>
              <p class="mail-desc">${mail.message}</p>
            </div>

            <div class="right">
              <p class="mail-date">${mail.date}</p>
              <div class="delete">
                <i class="bi bi-trash-fill"></i>
              </div>
            </div>
          </div>
    `
    )
    .join("");
};

const updateMail = (e) => {
  if (e.target.classList.contains("bi-trash-fill")) {
    const res = confirm("Silme İşlemini Onaylıyor Musunuz?");

    if (res) {
      const mail = e.target.closest(".mail");

      const mailId = +mail.dataset.id;

      const filteredMails = mails.filter((mail) => mail.id != mailId);

      localStorage.setItem("mails", JSON.stringify(filteredMails));

      mail.remove();

      Toastify({
        text: "Mail Silindi",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, tomato, #eaf097ff)",
        },
        onClick: function () {},
      }).showToast();
    }
  }

  if (
    e.target.classList.contains("bi-star") ||
    e.target.classList.contains("bi-star-fill")
  ) {
    const mail = e.target.closest(".mail");

    const mailId = parseInt(mail.dataset.id);

    const foundedMail = mails.find((i) => i.id == mailId);

    const updateMail = {...foundedMail, stared: !foundedMail.stared};

    const index = mails.findIndex((i) => i.id == mailId);

    mails[index] = updateMail;

    localStorage.setItem("mails", JSON.stringify(mails));

    renderMails(uiElement.mailArea, mails);
  }
};

export {uiElement, renderMails, updateMail};
