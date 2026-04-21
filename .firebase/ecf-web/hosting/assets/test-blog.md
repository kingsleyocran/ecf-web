
### Introduction
Welcome to the first part of our exciting “Flutter Foundations” series. If you’re eager to start building top-notch mobile apps with Flutter, you’ve come to the right place. In this article, we’re diving into the essential first step: setting up your Flutter application using the best practices from Very Good Ventures (VGV).

We’ll kick off by harnessing the power of the Very Good CLI to swiftly create your Flutter projects, ensuring you start with a solid foundation. This method not only accelerates the initial setup but also incorporates a robust architecture, thorough testing, and cutting-edge features like null safety and build flavors right from the get-go.

By the end of this guide, you’ll have a fully configured Flutter development environment, complete with Android and iOS simulators running your first app. We’ll also walk through troubleshooting common issues, so you’re well-prepared to handle any bumps in the road.

Ready to embark on this journey and set up your Flutter app with a rock-solid foundation? Let’s dive in and get started!


*Italized*

**Bold**

***Bold Italized***

> Block Quote Welcome to the first part of our exciting “Flutter Foundations” series. Block Quote Welcome to the first part of our exciting “Flutter Foundations” series.


-------

![Today](https://www.keyweo.com/wp-content/uploads/2022/04/google-logo-history.jpg)

![Yers](https://lh3.googleusercontent.com/tRfu1KvmJn1aHAbGs92QLk9A2e-M73U_c8mV6S8HD1RxTxxoY-cWI-fq_r3e5JO3Ru9kTdZJoZzcs61E9j0sIw6Ac6cLDe4f4qzEjkQ)

| Product   | Price | Quantity |
|-----------|-------|----------|
| Apples    | $1    | 5        |
| Oranges   | $0.5  | 10       |
| Bananas   | $0.75 | 7        |

| Product   | Price | Quantity | In Stock |
|-----------|-------|----------|----------|
| Apples    | $1    | 5        | Yes      |
| Oranges   | $0.5  | 10       | No       |
| Bananas   | $0.75 | 7        | Yes      |

### Creating a Flutter application with Very Good Core
We’ll be leveraging the powerful tools and best practices developed by Very Good Ventures (VGV) to create our Flutter application. Very Good Ventures is a renowned software consultancy that specializes in Flutter development. They have contributed significantly to the Flutter ecosystem. One of their standout contributions is the Very Good CLI, which simplifies creating your Flutter application with an opinionated architecture that ensures high-quality, maintainable code.


##### Why Very Good Core?
VGV provides two frameworks: Very Good Start and Very Good Core. I wish I knew why “Very Good” needs to be in every name. For this guide, we’ll be using Very Good Core, and you guessed it—it’s because it’s the free framework! But don’t let the price tag fool you; Very Good Core is packed with powerful features that set a solid foundation for any Flutter project.  Here’s what you get with a Very Good Core:

* Multi-Platform Support - Support for iOS, Android, Web, and Windows (macOS and Linux coming soon!)

* Build Flavors - Multiple flavor support for development, staging, and production

* Internationalization Support - Internationalization support using synthetic code generation to streamline the development process

* Sound Null Safety - No more null-dereference exceptions at runtime. Develop with a sound, static type system.

* [Bloc](https://pub.dev/packages/bloc) - Layered architecture with bloc for scalable, testable code which offers a clear separation between business logic and presentation

* Testing - Unit and widget tests with 100% line coverage (integration tests coming soon!)

* Logging - Extensible logging to capture uncaught Dart and Flutter exceptions

* [Very Good Analysis](https://github.com/VeryGoodOpenSource/very_good_analysis) - Lint rules for Dart and Flutter used internally at Very Good Ventures

* Continuous Integration - Lint, format, test, and enforce code coverage using GitHub Actions


#### 1. Install Very Good CLI
Note here that Very Good CLI requires Dart `">=3.1.0 <4.0.0"`
```bash 
dart pub global activate very_good_cli
```

#### 2. Create apps with Very Good CLI
##### * Creating a flutter package

```bash 
very_good create flutter_package <package name> --desc "<package description>"
```
For projects where you need to create multiple apps, it is advisable to create a flutter package where you’ll keep shared code between the various apps.

##### * Creating a Flutter application
```bash 
very_good create flutter_app <app name> --desc "<app description>" --org "<app org>"
```

#### 3. Add run configurations in IDE (Android Studio only) [Optional]

Enter the name of the configuration
Add path of the entry file
flutter run 
--flavor development --target lib/main_development.dart
Do the same for staging and production
[See screenshot 7]

You might be asked to add Dart SDK to the project
Check the box for “Enable Dart support for the project ‘<YOUR PROJECT NAME>’” [See screenshot 5]

Add Dart SDK path. Tip: You the use the dropdown button for suggestion on where your dart SDK in your flutter installation path is. [See screenshot 3]

Enable Dart support for your modules as well [See screenshot 4]
You should have this [See screenshot 6]

Now run on both an android and IOS simulator to make sure everything works fine

#### 4. Run Flutter application in IDE (VSCode)
You'll realize your project was created with 3 build flavors. To run the desired flavor either use the launch configuration in VSCode, or use the following commands:

```bash 
# Development
flutter run --flavor development --target lib/main_development.dart

# Staging
flutter run --flavor staging --target lib/main_staging.dart

# Production
flutter run --flavor production --target lib/main_production.dart
``` 

#### 5. Using the Localization setup
This project relies on [flutter_localizations](https://api.flutter.dev/flutter/flutter_localizations/flutter_localizations-library.html) and follows the [official internationalization guide for Flutter](https://docs.flutter.dev/development/accessibility-and-localization/internationalization).


##### Adding Strings

1. To add a new localizable string, open the app_en.arb file at `lib/l10n/arb/app_en.arb`.

```dart
{
    "@@locale": "en",
    "counterAppBarTitle": "Counter",
    "@counterAppBarTitle": {
        "description": "Text shown in the AppBar of the Counter Page"
    }
}
```

2. Then add a new key/value and description
```dart
{
    "@@locale": "en",
    "counterAppBarTitle": "Counter",
    "@counterAppBarTitle": {
        "description": "Text shown in the AppBar of the Counter Page"
    },
    "helloWorld": "Hello World",
    "@helloWorld": {
        "description": "Hello World Text"
    }
}
```
3. How to use the new string
```dart
import 'package:very_good_core/l10n/l10n.dart';

@override
Widget build(BuildContext context) {
  final l10n = context.l10n;
  return Text(l10n.helloWorld);
}
```

##### Adding Supported Locales
Update the CFBundleLocalizations array in the `Info.plist` at `ios/Runner/Info.plist` to include the new locale.
```dart
    ...

    <key>CFBundleLocalizations</key>
	<array>
		<string>en</string>
		<string>es</string>
	</array>

    ...
```

##### Adding Translations
1. For each supported locale, add a new ARB file in `lib/l10n/arb`.
```dart
├── l10n
│   ├── arb
│   │   ├── app_en.arb
│   │   └── app_es.arb
```

2. Add the translated strings to each .arb file

In the `app_en.arb` for English translation file:
```dart
{
    "@@locale": "en",
    "counterAppBarTitle": "Counter",
    "@counterAppBarTitle": {
        "description": "Text shown in the AppBar of the Counter Page"
    }
}
```
Then in the `app_es.arb` for Spanish translation:
```dart
{
    "@@locale": "es",
    "counterAppBarTitle": "Contador",
    "@counterAppBarTitle": {
        "description": "Texto mostrado en la AppBar de la página del contador"
    }
}
```


#### 6. Running Tests
Very Good Core ships with 100% code coverage.

- To run all unit and widget tests use the following command:
```bash
flutter test --coverage --test-randomize-ordering-seed random
```

To view the generated coverage report you can use [lcov](https://github.com/linux-test-project/lcov).

- Generate Coverage Report
```bash
genhtml coverage/lcov.info -o coverage/
```

- Open Coverage Report
```bash
open coverage/index.html
```


### Conclusion
Now that you have both apps running, you’ll realize that VGV did a good job of adding splash screens and app icons but that’s not what we want. I’m going to walk you through how to have custom app icons and splash screens.



### Troubleshooting and Fixing errors
####  Error 1: Occurs when you use underscore in app name in Very Good CLI's create flutter app command.
```bash
Does not match the module's namespace Error
This usually happens because your app name with an underscore is replaced with a dot as you can see in the error log below
Launching lib/main_development.dart on sdk gphone64 arm64 in debug mode...
Running Gradle task 'assembleDevelopmentDebug'...
/Users/apple/Documents/CODE_PROJECTS/FLUTTER/flutter_starter/flutter_starter/android/app/src/debug/AndroidManifest.xml Error:
	Overlay manifest:package attribute declared at AndroidManifest.xml:2:5-54 value=(com.flutter.starter.org.flutter_starter)
	does not match the module's namespace (com.flutter_starter.org.flutter_starter).
	Suggestion: remove the overlay declaration at AndroidManifest.xml.
	If you want to customize the applicationId for a buildType or productFlavor, consider setting applicationIdSuffix or using the Variant API.
	For more information, see https://developer.android.com/studio/build/build-variants

FAILURE: Build failed with an exception.

\* What went wrong:
Execution failed for task ':app:processDevelopmentDebugMainManifest'.
\> Manifest merger failed : Overlay manifest:package attribute declared at AndroidManifest.xml:2:5-54 value=(com.flutter.starter.org.flutter_starter)
  	does not match the module's namespace (com.flutter_starter.org.flutter_starter).
  	Suggestion: remove the overlay declaration at AndroidManifest.xml.
  	If you want to customize the applicationId for a buildType or productFlavor, consider setting applicationIdSuffix or using the Variant API.
  	For more information, see https://developer.android.com/studio/build/build-variants

\* Try:
\> Run with --stacktrace option to get the stack trace.
\> Run with --info or --debug option to get more log output.
\> Run with --scan to get full insights.

\* Get more help at https://help.gradle.org

BUILD FAILED in 3m 34s
Error: Gradle task assembleDevelopmentDebug failed with exit code 1
```

#### Fix:
Change the package name in these 5 locations
1. android/app/src/debug/AndroidManifest.xml
2. android/app/src/main/AndroidManifest.xml
3. android/app/src/profile/AdroidManifest.xml
4. android/app/build.gradle file defaultConfig { applicationId ""}
5. MainActivity.java on "package" OR MainActivity.kotlin android/app/src/main/kotlin/com/flutter/starter/org/MainActivity.kt

#### Useful Links
* Very Good CLI's official documentation [here](https://cli.vgv.dev/docs/overview)
* Learn more about [Very Good Start](https://verygood.ventures/solution/very-good-start)