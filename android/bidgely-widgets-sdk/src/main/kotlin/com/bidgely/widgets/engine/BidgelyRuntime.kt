package com.bidgely.widgets.engine

import android.annotation.SuppressLint
import android.content.Context
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.ViewGroup
import android.webkit.ConsoleMessage
import android.webkit.CookieManager
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat
import com.bidgely.widgets.BidgelyCallback

internal class BidgelyRuntime(
    private val appContext: Context,
    val hostKey: Int,
) {
    private val TAG = "BidgelyRuntime"
    private val mainHandler = Handler(Looper.getMainLooper())
    private var webView: WebView? = null

    @Volatile
    var instanceId: String? = null
        private set

    @Volatile
    var jsInitialized: Boolean = false
        private set

    private val bridge = BidgelyJsBridge(
        isJsInitialized = { jsInitialized },
        onInitSuccess = { id ->
            instanceId = id
            jsInitialized = id != null
        },
        initCallback = { initCallbackProvider() },
        widgetCallback = { widgetCallbackProvider() },
    )

    private var hostReady = false
    private var initCallbackProvider: () -> BidgelyCallback? = { null }
    private var widgetCallbackProvider: () -> BidgelyCallback? = { null }
    private val onReadyCallbacks = mutableListOf<() -> Unit>()

    private val assetLoader = WebViewAssetLoader.Builder()
        .setDomain(ASSET_HOST)
        .addPathHandler("/", WebViewAssetLoader.AssetsPathHandler(appContext))
        .build()

    private val webViewClient = object : WebViewClientCompat() {
        override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? {
            if (request.url.host == ASSET_HOST) {
                return assetLoader.shouldInterceptRequest(request.url)
            }
            return null
        }

        override fun onPageFinished(view: WebView?, url: String?) {
            Log.d(TAG, "Page loaded: $url (host=$hostKey)")
            super.onPageFinished(view, url)
            jsInitialized = false
            instanceId = null
            hostReady = true
            onReadyCallbacks.forEach { it() }
            onReadyCallbacks.clear()
        }
    }

    private val webChromeClient = object : WebChromeClient() {
        override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
            consoleMessage?.let {
                val level = when (it.messageLevel()) {
                    ConsoleMessage.MessageLevel.ERROR -> Log.ERROR
                    ConsoleMessage.MessageLevel.WARNING -> Log.WARN
                    else -> Log.DEBUG
                }
                Log.println(level, "BidgelyJS", "[${it.sourceId()}] ${it.message()}")
            }
            return true
        }
    }

    fun setCallbacks(initCallback: () -> BidgelyCallback?, widgetCallback: () -> BidgelyCallback?) {
        initCallbackProvider = initCallback
        widgetCallbackProvider = widgetCallback
    }

    fun attachTo(container: ViewGroup) {
        runOnMain {
            val wv = ensureWebView()
            if (wv.parent === container) return@runOnMain
            (wv.parent as? ViewGroup)?.removeView(wv)
            container.removeAllViews()
            container.addView(wv, ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT,
            ))
            wv.requestLayout()
        }
    }

    fun detach() {
        runOnMain { (webView?.parent as? ViewGroup)?.removeView(webView) }
    }

    fun loadHostPage(onReady: () -> Unit) {
        runOnMain {
            ensureWebView()
            if (hostReady) {
                onReady()
                return@runOnMain
            }
            onReadyCallbacks.add(onReady)
            if (webView?.url == null) webView?.loadUrl(HOST_URL)
        }
    }

    fun evaluateJs(script: String) {
        runOnMain {
            val run = { webView?.evaluateJavascript(script, null) }
            if (hostReady) run() else loadHostPage { run() }
        }
    }

    fun clearSlots() {
        evaluateJs("BidgelyHost.clearWidgets();")
    }

    fun destroy() {
        runOnMain {
            detach()
            webView?.destroy()
            webView = null
            hostReady = false
            instanceId = null
            jsInitialized = false
            onReadyCallbacks.clear()
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun ensureWebView(): WebView {
        if (webView != null) return webView!!

        WebView.setWebContentsDebuggingEnabled(true)

        val wv = WebView(appContext)
        CookieManager.getInstance().setAcceptCookie(true)
        CookieManager.getInstance().setAcceptThirdPartyCookies(wv, true)

        wv.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            loadWithOverviewMode = true
            useWideViewPort = true
            mixedContentMode = android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }

        wv.webChromeClient = webChromeClient
        wv.webViewClient = webViewClient
        wv.addJavascriptInterface(bridge, BRIDGE_NAME)

        webView = wv
        return wv
    }

    private fun runOnMain(block: () -> Unit) {
        if (Looper.myLooper() == Looper.getMainLooper()) block() else mainHandler.post(block)
    }

    companion object {
        private const val BRIDGE_NAME = "BidgelyAndroidBridge"
        private const val ASSET_HOST = "appassets.androidplatform.net"
        private const val HOST_URL = "https://$ASSET_HOST/bidgely/host.html"
    }
}
