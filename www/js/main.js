import "./capacitor.js";

document.body.style.height = innerHeight + 'px';

const { StatusBar, NavigationBar, App, SplashScreen } = Capacitor.Plugins;

StatusBar.setStyle({ style: "Light" });
StatusBar.setBackgroundColor({ color: "#ffffff" });
NavigationBar.setColor("white");

let canGoBack = !['/', '/home.html'].includes(location.pathname.substring(location.pathname.lastIndexOf('/')))
App.addListener('backButton', e => {
    if (canGoBack) history.back();
    else App.exitApp();
});