package com.bidgely.widgets.engine

import android.os.Handler
import android.os.Looper
import android.util.Log
import android.webkit.JavascriptInterface
import com.bidgely.widgets.BidgelyCallback

internal class BidgelyJsBridge(
    private val isJsInitialized: () -> Boolean,
    private val onInitSuccess: (String?) -> Unit,
    private val initCallback: () -> BidgelyCallback?,
    private val widgetCallback: () -> BidgelyCallback?,
) {
    private val TAG = "BidgelyJsBridge"
    private val mainHandler = Handler(Looper.getMainLooper())

    @JavascriptInterface
    fun onSdkMessage(json: String) {
        Log.d(TAG, "JS -> Android: $json")
        val message = BridgeMessageParser.parse(json) ?: run {
            Log.e(TAG, "Failed to parse message from JS: $json")
            return
        }

        mainHandler.post {
            when (message) {
                is com.bidgely.widgets.BidgelyMessage.Success -> {
                    val instanceId = message.data?.instanceId
                    val isInitMessage = !isJsInitialized() || instanceId != null
                    if (isInitMessage) {
                        onInitSuccess(instanceId)
                        initCallback()?.onMessage(message)
                    } else {
                        widgetCallback()?.onMessage(message) ?: initCallback()?.onMessage(message)
                    }
                }
                is com.bidgely.widgets.BidgelyMessage.Error -> {
                    if (!isJsInitialized()) {
                        initCallback()?.onMessage(message)
                    } else {
                        widgetCallback()?.onMessage(message) ?: initCallback()?.onMessage(message)
                    }
                }
                is com.bidgely.widgets.BidgelyMessage.WidgetUiReady -> {
                    widgetCallback()?.onMessage(message) ?: initCallback()?.onMessage(message)
                }
                is com.bidgely.widgets.BidgelyMessage.DownloadData -> {
                    widgetCallback()?.onMessage(message) ?: initCallback()?.onMessage(message)
                }
            }
        }
    }
}
