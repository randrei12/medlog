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
    try {
        Capacitor.Plugins.NavigationBar.setColor({color: '#7F7F7F'})
    } catch {}
  }

  hide() {
    this.loadingContainer.style = "opacity: 0; pointer-events: none";
    try {
        Capacitor.Plugins.NavigationBar.setColor({color: '#FFFFFF'});
    } catch {}
  }
}

export default Loading;
