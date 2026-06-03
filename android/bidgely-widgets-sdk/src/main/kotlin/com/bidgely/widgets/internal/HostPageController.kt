package com.bidgely.widgets.internal

import com.bidgely.widgets.BidgelyInitConfig
import com.bidgely.widgets.WidgetTag
import com.bidgely.widgets.engine.BidgelyRuntime
import com.google.gson.Gson
import org.json.JSONObject

internal object HostPageController {

    private val gson = Gson()

    fun initialize(runtime: BidgelyRuntime, config: BidgelyInitConfig, encryptedPayload: String) {
        val params = JSONObject().apply {
            put("clientId", config.clientId)
            put("apiUrl", config.apiUrl)
            put("payload", encryptedPayload)
            put("runMode", config.runMode)
            put("renderWidgetsImmediate", config.renderWidgetsImmediate)
            put("relayFileDownloads", config.relayFileDownloads)
            config.csrId?.let { put("csrId", it) }
            config.requestLocale?.let { put("requestLocale", it) }
            config.palette?.let { put("palette", JSONObject(gson.toJson(it))) }
        }
        runtime.evaluateJs("BidgelyHost.initialize($params);")
    }

    fun renderWidget(
        runtime: BidgelyRuntime,
        tag: WidgetTag,
        instanceId: String?,
        append: Boolean,
        clearBefore: Boolean,
    ) {
        val params = JSONObject().apply {
            put("widgetId", tag.tag)
            put("append", append)
            put("clearBefore", clearBefore)
            instanceId?.let { put("instanceId", it) }
        }
        runtime.evaluateJs("BidgelyHost.renderWidget($params);")
    }
}
