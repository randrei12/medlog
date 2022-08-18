class Loading {

    constructor() {
        this.loadingContainer = document.createElement('div');
        this.loadingContainer.classList.add('loadingContainer');
        this.loadingContainer.innerHTML = ' <div class="loadingContainer"><div class="loadingDiv"><img src="assets/loading.gif"></div>'
        document.body.appendChild(this.loadingContainer);
        this.loadingContainer.style = 'opacity: 0; pointer-events: none';
    }

    show() {
        this.loadingContainer.style = '';
    }

    hide() {
        this.loadingContainer.style = 'opacity: 0; pointer-events: none';
    }
}

export default Loading;