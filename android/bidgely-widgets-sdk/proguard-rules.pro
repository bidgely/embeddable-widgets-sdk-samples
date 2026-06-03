# SDK module ProGuard rules (library release builds)

# Keep the JS Bridge
-keepclassmembers class com.bidgely.widgets.engine.BidgelyJsBridge {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep the data classes used for JSON parsing
-keep class com.bidgely.widgets.BidgelyMessage { *; }
-keep class com.bidgely.widgets.BidgelySuccessData { *; }
-keep class com.bidgely.widgets.BidgelyDownloadPayload { *; }
-keep class com.bidgely.widgets.BidgelyMessage$* { *; }

