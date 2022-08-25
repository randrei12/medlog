import "./capacitor.js";

const { StatusBar, NavigationBar, App, SplashScreen } = Capacitor.Plugins;

StatusBar.setStyle({ style: "Light" });
Capacitor.Plugins.StatusBar.setOverlaysWebView()
StatusBar.setBackgroundColor({ color: "#ffffff" });
NavigationBar.setColor("white");

let canGoBack = !['/', '/home.html'].includes(location.pathname.substring(location.pathname.lastIndexOf('/')))
App.addListener('backButton', e => {
    if (canGoBack) history.back();
    else App.exitApp();
});