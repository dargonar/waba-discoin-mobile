# Installation guide

## Instalación de servidor de aplicaciones

El servidor de aplicaciones es donde se codea y se compila la app, y donde corre el proveedor de los paquetes JS que utiliza la app en modo debug/dev.

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
unzip tools_r25.2.3-linux.zip -d ~/android-sdk
export ANDROID_HOME=~/android-sdk
export PATH=${PATH}:$ANDROID_HOME/tools
```

Upgrade Android SDK
```
android update sdk --no-ui --all --filter build-tools-25.0.1,android-25,extra-android-m2repository
```

Aceptar Licencias

```
sdkmanager "platforms;android-25" "build-tools;25.0.2" "extras;google;m2repository" "extras;android;m2repository"
```

## Install watchman
Como instalar watcham [https://facebook.github.io/watchman/docs/install.html](https://facebook.github.io/watchman/docs/install.html)

### Prerrequisitos

```
sudo apt-get install -y autoconf automake build-essential python-dev libssl-dev libtool
git clone https://github.com/facebook/watchman.git
cd watchman
git checkout v4.9.0  # the latest stable release
./autogen.sh
./configure
make
sudo make install
```

Por si acaso [https://gist.github.com/scr1p7ed/4fb6728613b6bd5b185cb3e8314f07a4](https://gist.github.com/scr1p7ed/4fb6728613b6bd5b185cb3e8314f07a4)

Puede haber errores con el watchman
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### Install JAVA JDK

```
apt-get install default-jdk
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

## Configurar APK

Para configurar url del sevidor de aplicaciones en la aplicación mobile, con la app corriendo hay que mover el dispositivo para que se visualize la pantalla DEV MENU. Alli se pueden configurar IP y PORT (8081) del servidor de aplicaciones. [Más info](https://facebook.github.io/react-native/docs/debugging.html)

## Ver log de App

```
adb logcat *:S ReactNative:V ReactNativeJS:V
```

## Error de ANDROID LICENSE

[https://stackoverflow.com/questions/39760172/you-have-not-accepted-the-license-agreements-of-the-following-sdk-components](https://stackoverflow.com/questions/39760172/you-have-not-accepted-the-license-agreements-of-the-following-sdk-components)
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

```
root
-src
	-modules
		-pixel2html
			-img
			-styles
	-app.android.js
	-screens.js

```


Las nuevas pantallas se agregan en el modulo `pixel2html`. 
Cada pantalla consta de al menos 2 archivos: uno de codigo y el otro de estilos. 
Se puede optar por utilizar un solo archivo de codigo y definir el estilo propio de la pantalla en este mismo archivo.
Para que pueda ser utilizada en el resto de la app, la pantalla se debe registrar en screens.js, es decir se importa `import` y se registra `registerScreen`.


[Mas info aqui](https://medium.com/react-native-training/learn-how-to-build-a-rn-redux-cryptocurrency-app-chapter-iii-a454dda156b).
[Source code](https://github.com/wesharehoodies/react-native-redux-crypto-tracker)