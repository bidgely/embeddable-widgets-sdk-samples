# Bidgely Android Widgets SDK

Kotlin library (`bidgely-widgets-sdk`) and demo app wrapping the **Web Embeddable Widgets SDK v2** in a shared WebView runtime.

**Integration guide (implementers):** [docs/BIDGELY_ANDROID_SDK_INTEGRATION.md](../docs/BIDGELY_ANDROID_SDK_INTEGRATION.md)  
**Architecture & design:** [docs/BIDGELY_ANDROID_SDK.md](../docs/BIDGELY_ANDROID_SDK.md)

**Workspace:** Open [`demo.code-workspace`](../demo.code-workspace) (samples + meraki).

## Quick start

### 1. Build the JS SDK (meraki)

```bash
cd ../meraki
npm install   # first time only
npm run buildSdk
```

Output: `meraki/build/wc-sdk/`

### 2. Sync assets into the Android library

```bash
cd android
./gradlew :bidgely-widgets-sdk:syncWcSdkAssets
```

Copies bundles into `bidgely-widgets-sdk/src/main/assets/bidgely/` and writes `sdk-asset-manifest.json`.

**Note:** `static/` and `sdk-asset-manifest.json` are **gitignored** (large JS bundles). They are restored automatically on every Gradle build via `preBuild` → `syncWcSdkAssets`. If widgets fail to load, run the sync command above manually and confirm either meraki `build/wc-sdk` or `webapps/react-js/public/wc-sdk/static/js/main.*.js` exists.

> `preBuild` runs this task automatically. If meraki is not built, sync fails with instructions.

### 3. Run the demo app

Open the `android/` folder in Android Studio, or:

```bash
./gradlew :demo-app:assembleDebug
```

Install `demo-app/build/outputs/apk/debug/demo-app-debug.apk` on a device or emulator (API 26+).

### 4. Whitelist (required for init)

Register the WebView asset origin with Bidgely before `initialize` succeeds:

**`https://appassets.androidplatform.net`**

Use `POST /v3.0/whitelist-origin` (see technical spec). The demo Setup screen shows a hint if init fails with an origin error.

## Demo app flow

1. **Setup** — Enter client id, API URL, access token, AES key, IV, user id, fuel/account type → `BidgelySdk.initialize`
2. **Widget gallery** — Bottom tabs for five MVP widgets (lazy `renderWidget`)

Credentials are stored in `EncryptedSharedPreferences` for development only. Production apps must obtain short-lived tokens from a backend (see architecture doc).

## Modules

| Module | Description |
|--------|-------------|
| `bidgely-widgets-sdk` | Publishable AAR — `BidgelySdk`, `BidgelyWidgetView`, encryption, WebView runtime |
| `demo-app` | Internal QA / integrator reference |

## Integrate in your app

```kotlin
implementation(project(":bidgely-widgets-sdk"))
// or future: implementation("com.bidgely.widgets:bidgely-widgets-sdk:…")
```

```kotlin
BidgelySdk.initialize(context, config, callback)

// One or more stacked widgets in one BidgelyWidgetView / BidgelyWidget block
BidgelyWidget(
    widgets = listOf(WidgetTag.USAGE_INSIGHTS, WidgetTag.BILL_PROJECTION),
    modifier = Modifier.fillMaxWidth(),
    listener = BidgelyWidgetListener { tag, message -> … },
)

// Interleaved: native UI between blocks — use multiple BidgelyWidget composables (demo: Interleaved feed)
```

XML: `app:bidgelyWidgets="usage_insights,bill_projection"` on `BidgelyWidgetView`.

See [docs/BIDGELY_ANDROID_SDK.md §15](../docs/BIDGELY_ANDROID_SDK.md#15-phase-3-bidgelywidgetview-public-api).

## Tests

```bash
./gradlew :bidgely-widgets-sdk:test
```

Unit tests cover AES payload encryption (parity with the React sample).

## Status

MVP implemented: SDK core, asset sync, demo Setup + 5-widget gallery. Phase 3 (Maven publish, instrumented WebView tests, CI) is tracked in the architecture doc.
