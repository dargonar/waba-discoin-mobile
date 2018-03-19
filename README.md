# Installation guide

## Instalación de servidor de aplicaicones

El servidor de aplciaciones es donde se codea y se compila la app, y donde correr el proveedor de los paquetes JS que utiliza la app en modo debug/dev.

Para mas info ver [React Native](https://facebook.github.io/react-native/)


### Clonar repo 
```
git clone https://github.com/dargonar/waba.git
```

### Install node v8
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
```

### Install react-native client
```
sudo npm install -g react-native-cli
```

### Install app packages
```
npm install
```

### Install Android SDK
Como instalar [Android SDK Tools](https://github.com/codepath/android_guides/wiki/Installing-Android-SDK-Tools)

```
wget https://dl.google.com/android/repository/tools_r25.2.3-linux.zip
unzip ~/android-sdk
export ANDROID_HOME=/home/ubuntu/android-sdk
export PATH=${PATH}:$ANDROID_HOME/tools
```

### Compile Android APK
```
react-native run-android
```

> File destination: android/app/build/outputs/apk/app-armeabi-v7a-debug.apk

## APK installation 

### Install adb
Para Windows: https://dl.google.com/android/repository/platform-tools-latest-windows.zip

### Install on your device
```
adb install -r app-armeabi-v7a-debug.apk
```

## Correr app en modo debug 

En el servidor, correr el comando:

```
react-native start
```

Puede haber errores con el watchman

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## Configurar APK

Para configurar url del sevidor de aplicaciones en la aplicación mobile, con la app corriendo hay que mover el dispositivo para que se visualize la pantalla DEV MENU. Alli se pueden configurar IP y PORT (8081) del servidor de aplicaciones. [Más info](https://facebook.github.io/react-native/docs/debugging.html)

## Paquetes NPM

Cada vez que agreguen un npm package que formará parte del producto final, deben guardarlo en el package.json a mano, o instalarlo con el siguiente comando:

```
npm install xxxxx --save
```


## Comandos para resetear cache del servidor

```
watchman watch-del-all
rm -rf node_modules && npm install
rm -fr $TMPDIR/react-*
npm start -- --reset-cache
```

# Guia

## Estructura de directorio

'''
-root
--src
---app.android.js
---screens.js


'''

Las nuevas pantallas se agregan en screens, en doble 

[Mas info aqui](https://medium.com/react-native-training/learn-how-to-build-a-rn-redux-cryptocurrency-app-chapter-iii-a454dda156b).
[Source code](https://github.com/wesharehoodies/react-native-redux-crypto-tracker)