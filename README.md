# honestvote.io client
This is the front-end client for the honestvote application.

## build and run
This app targets both web and mobile using react and react-native. You'll need node v10.16.3 and npm.

``` bash
# install dependencies
npm install
```

### Web
``` bash
# build
npm run web
```

### Android
You need to have node v10.16.3 or lower. More recent versions have issues
with react-native. 

To build the android target, you first need to setup the Android development environment. To find directions on this, look [here](https://facebook.github.io/react-native/docs/getting-started).

``` bash
# build
npm run android
```

## Troubleshooting
If you get the error ``` Error: spawnSync ./gradlew EACCES ```, you need to
fix the permissions for ```android/gradlew```

``` bash
chmod 755 android/gradlew
```
