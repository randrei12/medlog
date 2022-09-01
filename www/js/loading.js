class Loading {
  constructor(isDeep = true) {
    this.loadingContainer = document.createElement("div");
    this.loadingContainer.classList.add("loadingContainer");
    this.loadingContainer.innerHTML = `<div class="loadingDiv"><img src="${
      isDeep ? "../../" : "./"
    }assets/loading.gif"></div>`;
    document.body.appendChild(this.loadingContainer);
    this.loadingContainer.style = "opacity: 0; pointer-events: none";
  }

  show() {
    this.loadingContainer.style = "";
  }

  hide() {
    this.loadingContainer.style = "opacity: 0; pointer-events: none";
  }
}

export default Loading;
