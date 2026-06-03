package com.bidgely.widgets.engine

import com.bidgely.widgets.BidgelyDownloadPayload
import com.bidgely.widgets.BidgelyMessage
import com.bidgely.widgets.BidgelySuccessData
import com.google.gson.JsonObject
import com.google.gson.JsonParser

internal object BridgeMessageParser {

    fun parse(json: String): BidgelyMessage? {
        val root = runCatching { JsonParser.parseString(json).asJsonObject }.getOrNull() ?: return null
        val messageType = root.getString("messageType") ?: return null
        val data = root.getAsJsonObject("data")

        return when (messageType) {
            "SUCCESS" -> {
                val instanceId = data?.getString("instanceId")
                BidgelyMessage.Success(BidgelySuccessData(instanceId))
            }
            "ERROR" -> {
                val code = data?.getString("errorCode") ?: "UNKNOWN_ERROR"
                val message = data?.getString("errorMessage") ?: "Unknown error"
                BidgelyMessage.Error(code, message)
            }
            "WIDGET_UI_READY" -> {
                val widgetId = data?.getString("widgetId")
                    ?: data?.getString("id")
                    ?: ""
                BidgelyMessage.WidgetUiReady(widgetId)
            }
            "DOWNLOAD_DATA" -> {
                BidgelyMessage.DownloadData(parseDownload(data))
            }
            else -> null
        }
    }

    private fun parseDownload(data: JsonObject?): BidgelyDownloadPayload {
        if (data == null) {
            return BidgelyDownloadPayload(null, null, null)
        }
        var fileName = data.getString("fileName")
        if (fileName == null) {
            fileName = fileNameFromContentDisposition(data.getString("contentDisposition"))
        }
        return BidgelyDownloadPayload(
            fileName = fileName,
            mimeType = data.getString("mimeType"),
            data = data.getString("data") ?: data.getString("content"),
        )
    }

    private fun fileNameFromContentDisposition(disposition: String?): String? {
        if (disposition == null) return null
        val parts = disposition.split(" = ")
        if (parts.size == 2) return parts[1].trim().trim('"')
        val match = Regex("filename=([^;\\s]+)").find(disposition) ?: return null
        return match.groupValues[1].trim('"')
    }

    private fun JsonObject.getString(key: String): String? {
        val element = get(key) ?: return null
        return if (element.isJsonPrimitive && element.asJsonPrimitive.isString) {
            element.asString
        } else {
            null
        }
    }
}
