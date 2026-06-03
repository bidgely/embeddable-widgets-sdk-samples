package com.bidgely.widgets

data class BidgelySuccessData(
    val instanceId: String?,
)

data class BidgelyDownloadPayload(
    val fileName: String?,
    val mimeType: String?,
    val data: String?,
)

sealed class BidgelyMessage {
    data class Success(val data: BidgelySuccessData?) : BidgelyMessage()
    data class Error(val errorCode: String, val errorMessage: String) : BidgelyMessage()
    data class WidgetUiReady(val widgetId: String) : BidgelyMessage()
    data class DownloadData(val payload: BidgelyDownloadPayload) : BidgelyMessage()
}

fun interface BidgelyCallback {
    fun onMessage(message: BidgelyMessage)
}
