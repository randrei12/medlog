import "./capacitor.js";
const { StatusBar, NavigationBar, App } = Capacitor.Plugins;

StatusBar.setStyle({ style: "Light" });
StatusBar.setBackgroundColor({ color: "#ffffff" });
NavigationBar.setColor("white");
App.addListener('backButton', e => console.log(e))