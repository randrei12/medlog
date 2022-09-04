import "./capacitor.js";

const { StatusBar, NavigationBar, App, SplashScreen } = Capacitor.Plugins;

StatusBar.setStyle({ style: "Light" });
StatusBar.setOverlaysWebView()
NavigationBar.setColor({darkButtons: false})

let canGoBack = !['/', '/home.html'].includes(location.pathname.substring(location.pathname.lastIndexOf('/')))
App.addListener('backButton', e => {
    if (canGoBack) history.back();
    else App.exitApp();
});