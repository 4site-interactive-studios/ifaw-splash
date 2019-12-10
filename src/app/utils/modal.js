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
        background_credit: "",
        align: "left",
        debug: false
      },
      options
    );
    if (!this.shouldRun()) {
      // If we're not between the running dates, get out
      return false;
    }
    const markup = `
    <div class="desktop_bg" style="background-image: url('${
      this.options.background_desktop
    }');"></div>
    <div class="mobile_bg" style="background-image: url('${
      this.options.background_mobile
    }');"></div>
    <div class="ifawSplash-container">
        <a href="#" class="button-close"></a>
        <span href="#" class="logo">IFAW</span>
        <div class="container ${this.options.align}">
          <h1 class="title"><span>${this.options.title}</span></h1>
          <p>${this.options.paragraph}</p>
          <a class="cta" href="${this.options.cta_link}">${
      this.options.cta_label
    }</a>
        </div>
        ${
          this.options.background_credit
            ? "<p class='credits'>© " + this.options.background_credit + "</p>"
            : ""
        }
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
  shouldRun() {
    let start = new Date(this.options.start_date);
    let end = new Date(this.options.end_date);
    start.setHours(0, 0, 0);
    end.setHours(23, 59, 59);
    let now = new Date();
    if (this.options.debug) {
      console.log("Start", start);
      console.log("End", end);
      console.log("Now", now);
    }
    return now >= start || now <= end;
  }
  open() {
    let hideSplash = crumbs.get("hideSplash"); // Get cookie
    if (!hideSplash || this.options.debug) {
      this.overlay.classList.remove("is-hidden");
    }
  }
  close(e) {
    e.preventDefault();
    crumbs.set("hideSplash", 1, { type: "day", value: 1 }); // Create one day cookie
    this.overlay.classList.add("is-hidden");
  }
}
