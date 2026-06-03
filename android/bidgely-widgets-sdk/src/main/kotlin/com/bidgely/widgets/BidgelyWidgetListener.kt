package com.bidgely.widgets

fun interface BidgelyWidgetListener {
    fun onWidgetEvent(tag: WidgetTag, message: BidgelyMessage)
}
