package com.bidgely.widgets.internal

import com.bidgely.widgets.BidgelyWidgetView
import com.bidgely.widgets.engine.BidgelyRuntime

internal object BidgelyRuntimeRegistry {

    private val runtimes = mutableMapOf<Int, BidgelyRuntime>()

    fun obtain(view: BidgelyWidgetView): BidgelyRuntime {
        val key = System.identityHashCode(view)
        return runtimes.getOrPut(key) {
            BidgelyRuntime(view.context.applicationContext, hostKey = key)
        }
    }

    fun release(view: BidgelyWidgetView) {
        val key = System.identityHashCode(view)
        runtimes.remove(key)?.destroy()
    }

    fun releaseAll() {
        runtimes.values.toList().forEach { it.destroy() }
        runtimes.clear()
    }
}
