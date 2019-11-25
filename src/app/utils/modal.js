import crumbs from "./crumbs";
export class Modal {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        title: "do you know <strong>4Site</strong>?",
        paragraph:
          "4Site Interactive Studios has been providing creative digital services to the <strong>non-profit</strong> and small business community in Washington, DC since 2001.",
        cta_label: "Go To 4Site",
        cta_link: "https://www.4sitestudios.com",
        background_desktop: "https://picsum.photos/3840/2160",
        background_mobile: "https://picsum.photos/1242/2688",
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
    window.setTimeout(this.open.bind(this), 0); //Delay before opening splash screen
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
