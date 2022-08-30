const topNavChilds = document.querySelector('.topNavContainer').children;

topNavChilds[0].onclick = history.back;
topNavChilds[1].onclick = () => {
    firebase.auth().signOut();
    sessionStorage.clear();
    location = '../../index.html';
}