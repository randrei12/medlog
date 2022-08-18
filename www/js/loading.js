class Loading {
    
    cconstructor() {
         this.loadingContainer = document.createElement('div');
         this.loadingContainer.classList.add('loadingContainer');
         this.loadingContainer.innerHTML = ' <div class="loadingContainer"><div class="loadingDiv"><img src="assets/loading.gif"></div>'
         document.body.appendChild(this.loadingContainer);
         this.loadingContainer.style.opacity = '0';
     }
 
     show() {
         this.loadingContainer.style.opacity = '1';
     }
 
     hide() {
         this.loadingContainer.style.opacity = '0';
     }
 }
 
 export default Loading;