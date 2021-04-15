---
title: react-native接入原生Android
date: 2021-03-15 10:30:05
tags: [react, react-native, Android]
categories: [react]
hidden: true
---

# `React-native`接入原生`Android`

## 1. 背景

随着前端跨平台技术的发展，各端统一已是一个必然的趋势，在跨平台方案中，最津津乐道的莫过于`React-Native`（后续已`RN`代替`React-native`）。这个由`Facebook`工程师设计的跨平台方案与前端三大框架之一的`React`有着同宗同源的关系。他们的代码编写风格相差无几，工程师们针对不同的平台调用了不同平台的API，进行了针对各个平台的编译和优化，对熟悉`React`的同学来说，上手`RN`来说毫无难度。

在本次技术调研中，我负责调研如果将`RN`接入到我们公司原生的`Android`应用中。官方技术文档在此：[https://reactnative.dev/docs/integration-with-existing-apps](https://reactnative.dev/docs/integration-with-existing-apps)

## 2. 接入步骤

`RN`与`Android`融合是有两种方案的，一种是通过`RN`脚手架生成一个完整的项目目录，该目录中有`Android`和`ios`两个目录，此方案是以`RN`项目为主项目，`Android`和`ios`项目作为第三方包引入`RN`；另一种是以`Android`项目为主项目，`RN`打包成一个`Android`模块来接入。对我们来说，当前后者更适合我们这次技术调研。

### 2.1 创建`Android`项目

这一步是模拟一个现存的`Android`原生项目。简单点就是先安装一个`Android Studio`，然后通过`Android Studio`来创建一个空的`Android`项目。最后运行这个`Android`项目，保证能正常打开。

### 2.2 结构剖析

新建的`Android`项目结构如下图所示：`/src/main/java/com.example.second/MainActivity`为`Android`的入口文件，这里主要处理`Android`启动时的各种业务逻辑，类比于前端的`javascript`文件。`/src/res/layout/activity_main.xml`为`Android`启动时第一个页面的布局文件，类比于前端的`HTML`与`CSS`的结合体。由`MainActivity`文件第16行可以看出来，在`java`文件里需要设置与当前`java`文件绑定的`xml`视图文件，这样，我们才能在当前`java`文件中操作`xml`视图文件中的按钮，输入框等各种操作。

![image-20210315131943276](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/20210315132135.png)

在了解了`Android`的基础知识之后，我们就可以新建一个新的`java`文件来承载我们的`RN`项目，根据`java`文件和`xml`文件之间的关系，可以猜测下，只要把`java`文件绑定对应的`RN`视图，就能实现`RN`的接入，实际实现也是如此。

首先在`layout/activity_main.xml`中添加一个按钮，然后在`MainActivity`中添加一个路由跳转动作，实现点击按钮跳转一个新页面，然后在这个新页面上绑定`RN`项目。

### 2.3 创建`RN`项目

此处不能再通过`RN`脚手架来生成项目目录，只能自己新建。

1.  新建一个目录，并用`npm init`初始化；

2.  在`package.json`中添加如下内容，如果有重复内容适当合并：

    ```json
    {
      "name": "MyReactNativeApp",
      "version": "0.0.1",
      "private": true,
      "scripts": {
        "start": "yarn react-native start"
      }
    }
    ```

3.  添加`react-native`依赖，执行如下：

    ```bash
    yarn add react-native
    ```

4.  执行第3步命令时将会打印与`react-native`版本对应的`react`版本，这里需要强制要求按照提供的版本安装`react`：

    ```bash
    yarn add react@xx.xx.xx
    ```

5.  添加`.gitignore`文件，保证不影响`git`版本管理；

6.  在根目录下新建一个`index.js`文件，并编写`RN`代码如下，当然你可以自己定义`RN`中的内容：

    ```jsx
    import React from 'react';
    import {
      AppRegistry,
      StyleSheet,
      Text,
      View
    } from 'react-native';
    
    class HelloWorld extends React.Component {
      render() {
        return (
          <View style={styles.container}>
            <Text style={styles.hello}>Hello, World</Text>
          </View>
        );
      }
    }
    var styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center'
      },
      hello: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
      }
    });
    
    AppRegistry.registerComponent(
      'MyReactNativeApp',
      () => HelloWorld
    );
    ```

7.  完工。

以上就是新建一个`RN`项目的步骤，接下来我们要做的就是怎么把`RN`项目引入`Android`中。

### 2.4 `RN`接入`Android`

根据官网的提示：

1.  在`RN`项目下新建一个名为`android`的目录，并将之前新建的`Android`项目根目录下的内容全部拷贝到新建的`android`目录里，此时的目录结构如下所示：

    ![image-20210315135903761](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/20210315135903.png)

    这里我是将`index.js`里的代码拆分成了两份，与`HelloWorld class`有关的代码放在`App.js`里，`RN`的启动代码放在`index.js`中。

2.  在`android/app/build.gradle`文件中添加依赖如下：

    ```gradle
    dependencies {
        ...
        // From node_modules 此处可以指定react-native的具体版本
        implementation "com.facebook.react:react-native:x.xx.x"
        implementation "org.webkit:android-jsc:+"
    }
    ```

3.  在`android/build.gradle`中添加代码如下：

    从这里看出，当初将`Android`项目拷贝到`android`目录其实只是为了从路径寻找依赖时能输入尽量短的路径，这里就理解了即使不在当前目录下新建`android`目录也是可以的。

    ```gradle
    allprojects {
        repositories {
            maven {
                // All of React Native (JS, Android binaries) is installed from npm
                url "$rootDir/../node_modules/react-native/android"
            }
            maven {
                // Android JSC is installed from npm
                url("$rootDir/../node_modules/jsc-android/dist")
            }
            ...
        }
        ...
    }
    ```

4.  在`android/setting.gradle`文件中新增代码如下，来开启原生模块的自动链接:

    ```gradle
    apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
    ```

5.  在`android/app/build.gradle`文件最后新增代码如下：

    ```gradle
    apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
    ```

6.  开启`Android`对应的权限，在`android/app/src/AndroidManifest.xml`文件中添加权限代码，如：

    -   网络权限

    ```xml
    <uses-permission android:name="android.permission.INTERNET" />
    ```

    -   `debug`调试面板

    ```xml
    <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
    ```

7.  在新页面`.java`文件中添加代码，引入`RN` 的视图：

    ![image-20210315135242209](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/20210315143141.png)
    
    从以上代码尤其是第55, 57行可以看出来，所谓引入`RN`，其实是实例化了一个`ReactRootView`，用这个`mReactRootView`来找到并启动`RN`的项目，从而可以替代`Android`原生的`xml`视图文件。

```java
    public class MyReactActivity extends Activity implements DefaultHardwareBackBtnHandler {
        private ReactRootView mReactRootView;
        private ReactInstanceManager mReactInstanceManager;
    
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            SoLoader.init(this, false);
    
            mReactRootView = new ReactRootView(this);
            List<ReactPackage> packages = new PackageList(getApplication()).getPackages();
            // Packages that cannot be autolinked yet can be added manually here, for example:
            // packages.add(new MyReactNativePackage());
            // Remember to include them in `settings.gradle` and `app/build.gradle` too.
    
            mReactInstanceManager = ReactInstanceManager.builder()
                    .setApplication(getApplication())
                    .setCurrentActivity(this)
                    .setBundleAssetName("index.android.bundle")
                    .setJSMainModulePath("index")
                    .addPackages(packages)
                    .setUseDeveloperSupport(BuildConfig.DEBUG)
                    .setInitialLifecycleState(LifecycleState.RESUMED)
                    .build();
            // The string here (e.g. "MyReactNativeApp") has to match
            // the string in AppRegistry.registerComponent() in index.js
            mReactRootView.startReactApplication(mReactInstanceManager, "MyReactNativeApp", null);
    
            setContentView(mReactRootView);
        }
    
        @Override
        public void invokeDefaultOnBackPressed() {
            super.onBackPressed();
        }
    }
```

8.  在新开的`.java`文件中继续添加辅助代码：

```java
@Override
protected void onPause() {
    super.onPause();

    if (mReactInstanceManager != null) {
        mReactInstanceManager.onHostPause(this);
    }
}

@Override
protected void onResume() {
    super.onResume();

    if (mReactInstanceManager != null) {
        mReactInstanceManager.onHostResume(this, this);
    }
}

@Override
protected void onDestroy() {
    super.onDestroy();

    if (mReactInstanceManager != null) {
        mReactInstanceManager.onHostDestroy(this);
    }
    if (mReactRootView != null) {
        mReactRootView.unmountReactApplication();
    }
}

@Override
 public void onBackPressed() {
    if (mReactInstanceManager != null) {
        mReactInstanceManager.onBackPressed();
    } else {
        super.onBackPressed();
    }
}

@Override
public boolean onKeyUp(int keyCode, KeyEvent event) {
    if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
        mReactInstanceManager.showDevOptionsDialog();
        return true;
    }
    return super.onKeyUp(keyCode, event);
}
```

### 2.5 运行项目

在`RN`的根目录下运行`yarn start`来启动`RN`的`Metro`服务，该服务类似于一个本地开发服务器，然后使用`Android Studio`启动 `Android`模拟器，点击首页的按钮即可跳转到我们新开的`RnWrapper`页面，同时加载`RN`里的代码，完成视图构建，逻辑处理等。

如果点击按钮跳转后并不能出现`RN`项目的内容，则可以尝试使用命令`npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`进行打包，先将`RN`项目打包到`android/app/src/main/assets/`下，然后再启动`Android`项目，所以从这里就更可以理解，`Android`加载`RN`是加载`RN`打包后的一个`bundle`文件。

在后续的开发中可是使用`RN`的调试工具连接到`RN`的`Metro`服务进行热更新，效率大大提升。

<!-- more -->

