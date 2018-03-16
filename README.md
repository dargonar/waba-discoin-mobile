# Installation guide

## node
```curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -```

## react-native client
```sudo npm install -g react-native-cli```

## install app packages
```npm install```

## android sdk
https://github.com/codepath/android_guides/wiki/Installing-Android-SDK-Tools
```wget https://dl.google.com/android/repository/tools_r25.2.3-linux.zip
unzip ~/android-sdk
export ANDROID_HOME=/home/ubuntu/android-sdk
export PATH=${PATH}:$ANDROID_HOME/tools```

## compile android apk
```react-native run-android```

> File destination: android/app/build/outputs/apk/app-armeabi-v7a-debug.apk

## install on your device

### install adb
Para Windows: https://dl.google.com/android/repository/platform-tools-latest-windows.zip

## install on your device
```adb install -r app-armeabi-v7a-debug.apk```

## Correr app en modo debug 

```react-native start```

Puede haber errores con el watchman

```echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p```

# cada vez que agreguen un npm package que van a utilizar, deben guardarlo en el package.json con el siguiente comando
```npm install xxxxx --save```


# comandos para resetear
```watchman watch-del-all
rm -rf node_modules && npm install
rm -fr $TMPDIR/react-*
npm start -- --reset-cache```
