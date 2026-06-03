package com.bidgely.widgets.internal

import com.bidgely.widgets.BidgelyCallback
import com.bidgely.widgets.BidgelyMessage
import com.bidgely.widgets.BidgelyWidgetView
import com.bidgely.widgets.WidgetTag

internal class BidgelyWidgetController(
    private val view: BidgelyWidgetView,
) {
    private val runtime = BidgelyRuntimeRegistry.obtain(view)
    private var loadGeneration = 0

    fun load(widgets: List<WidgetTag>) {
        if (widgets.isEmpty()) return

        val generation = ++loadGeneration

        val (config, payload) = try {
            BidgelyInitCoordinator.requireReady()
        } catch (e: IllegalStateException) {
            notifyAll(widgets, BidgelyMessage.Error("NOT_INITIALIZED", "Call BidgelySdk.initialize first"))
            return
        }

        val pendingTags = widgets.toMutableList()
        var initCallbackFired = false

        runtime.setCallbacks(
            initCallback = {
                BidgelyCallback { message ->
                    if (generation != loadGeneration) return@BidgelyCallback
                    when (message) {
                        is BidgelyMessage.Success -> {
                            if (!initCallbackFired) {
                                initCallbackFired = true
                                renderNext(generation, pendingTags, clearFirst = true)
                            }
                        }
                        is BidgelyMessage.Error -> notifyAll(widgets, message)
                        else -> Unit
                    }
                }
            },
            widgetCallback = {
                BidgelyCallback { message ->
                    if (generation != loadGeneration) return@BidgelyCallback
                    when (message) {
                        is BidgelyMessage.WidgetUiReady -> {
                            val tag = WidgetTag.fromDomTag(message.widgetId) ?: pendingTags.firstOrNull()
                            if (tag != null) {
                                notify(tag, message)
                                pendingTags.remove(tag)
                            }
                            renderNext(generation, pendingTags, clearFirst = false)
                        }
                        is BidgelyMessage.Success -> {
                            // Some SDK builds report render completion via SUCCESS instead of WIDGET_UI_READY.
                            pendingTags.firstOrNull()?.let { pendingTags.remove(it) }
                            renderNext(generation, pendingTags, clearFirst = false)
                        }
                        is BidgelyMessage.Error -> {
                            val tag = pendingTags.firstOrNull()
                            if (tag != null) notify(tag, message) else notifyAll(widgets, message)
                        }
                        is BidgelyMessage.DownloadData -> {
                            notify(pendingTags.firstOrNull() ?: widgets.first(), message)
                        }
                        else -> Unit
                    }
                }
            },
        )

        runtime.attachTo(view)
        runtime.loadHostPage {
            if (generation != loadGeneration) return@loadHostPage
            if (runtime.jsInitialized && runtime.instanceId != null) {
                renderNext(generation, pendingTags, clearFirst = true)
            } else {
                HostPageController.initialize(runtime, config, payload)
            }
        }
    }

    fun release() {
        loadGeneration++
        runtime.clearSlots()
    }

    private fun renderNext(generation: Int, pending: MutableList<WidgetTag>, clearFirst: Boolean) {
        if (generation != loadGeneration) return
        val tag = pending.firstOrNull() ?: return
        HostPageController.renderWidget(
            runtime = runtime,
            tag = tag,
            instanceId = runtime.instanceId,
            append = !clearFirst,
            clearBefore = clearFirst,
        )
    }

    private fun notify(tag: WidgetTag, message: BidgelyMessage) {
        view.listener?.onWidgetEvent(tag, message)
    }

    private fun notifyAll(widgets: List<WidgetTag>, message: BidgelyMessage) {
        widgets.forEach { notify(it, message) }
    }
}
