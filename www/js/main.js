import "./capacitor.js";

const { StatusBar, NavigationBar, App, SplashScreen } = Capacitor.Plugins;

StatusBar.setStyle({ style: "Light" });
NavigationBar.setTransparency({isTransparent: true});

let canGoBack = !['/', '/home.html'].includes(location.pathname.substring(location.pathname.lastIndexOf('/')))
App.addListener('backButton', e => {
    if (canGoBack) history.back();
    else App.exitApp();
});