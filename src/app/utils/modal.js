import crumbs from "./crumbs";
export class Modal {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        title: "",
        paragraph: "",
        cta_label: "",
        cta_link: "",
        start_date: "",
        end_date: "",
        background_desktop: "",
        background_mobile: "",
        debug: false
      },
      options
    );
    const markup = `
    <div class="desktop_bg" style="background-image: url('${this.options.background_desktop}');"></div>
    <div class="mobile_bg" style="background-image: url('${this.options.background_mobile}');"></div>
    <div class="ifawSplash-container">
        <a href="#" class="button-close"></a>
        <span href="#" class="logo">IFAW</span>
        <div class="container">
        <h1 class="title">${this.options.title}</h1>
        <p>${this.options.paragraph}</p>
        <a class="cta" href="${this.options.cta_link}">${this.options.cta_label}</a>
        </div>
    </div>`;
    let overlay = document.createElement("div");
    overlay.id = "ifawSplash";
    overlay.classList.add("is-hidden");
    overlay.innerHTML = markup;
    const closeButton = overlay.querySelector(".button-close");
    closeButton.addEventListener("click", this.close.bind(this));
    document.addEventListener("keyup", e => {
      if (e.key === "Escape") {
        closeButton.click();
      }
    });
    this.overlay = overlay;
    document.body.appendChild(overlay);
    window.setTimeout(this.open.bind(this), 5000); //Delay before opening splash screen
  }
  open() {
    let hideSplash = crumbs.get("hideSplash"); // Get cookie
    if (!hideSplash || this.options.debug) {
      const now = new Date();
      let startDate = new Date(this.options.start_date);
      startDate = startDate.setHours(0, 0, 0);
      let endDate = new Date(this.options.end_date);
      endDate = endDate.setHours(11, 59, 59);

      // Right now is on or after the Start Date AND on or before the End Date
      if (startDate <= now && now <= endDate) {
        this.overlay.classList.remove("is-hidden");
      }
    }
  }
  close(e) {
    e.preventDefault();
    crumbs.set("hideSplash", 1, { type: "day", value: 1 }); // Create one day cookie
    this.overlay.classList.add("is-hidden");
  }
}
