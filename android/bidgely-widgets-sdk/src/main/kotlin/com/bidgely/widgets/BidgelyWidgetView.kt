package com.bidgely.widgets

import android.content.Context
import android.util.AttributeSet
import android.widget.FrameLayout
import com.bidgely.widgets.internal.BidgelyRuntimeRegistry
import com.bidgely.widgets.internal.BidgelyWidgetController

class BidgelyWidgetView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : FrameLayout(context, attrs, defStyleAttr) {

    private val controller = BidgelyWidgetController(this)
    private var hasActiveLoad = false

    var widgets: List<WidgetTag> = emptyList()
        set(value) {
            if (field == value) return
            field = value
            if (isAttachedToWindow) reload()
        }

    var listener: BidgelyWidgetListener? = null

    init {
        if (attrs != null) {
            val a = context.obtainStyledAttributes(attrs, R.styleable.BidgelyWidgetView)
            try {
                val attrWidgets = a.getString(R.styleable.BidgelyWidgetView_bidgelyWidgets)
                if (!attrWidgets.isNullOrBlank()) {
                    widgets = WidgetTag.parseList(attrWidgets)
                }
            } finally {
                a.recycle()
            }
        }
    }

    /**
     * Scrollable Compose layouts often pass AT_MOST with an effectively unbounded max height.
     * A MATCH_PARENT WebView then measures to 0 and nothing is visible — use a definite minimum.
     */
    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        val minHeightPx = (DEFAULT_MIN_HEIGHT_DP * resources.displayMetrics.density).toInt()
        val maxSaneHeightPx = (resources.displayMetrics.heightPixels * 2).coerceAtLeast(minHeightPx)

        val heightMode = MeasureSpec.getMode(heightMeasureSpec)
        val heightSize = MeasureSpec.getSize(heightMeasureSpec)

        val resolvedHeightSpec = when (heightMode) {
            MeasureSpec.EXACTLY -> heightMeasureSpec
            MeasureSpec.UNSPECIFIED -> MeasureSpec.makeMeasureSpec(minHeightPx, MeasureSpec.EXACTLY)
            MeasureSpec.AT_MOST -> {
                val height = when {
                    heightSize <= 0 -> minHeightPx
                    heightSize > maxSaneHeightPx -> minHeightPx
                    else -> heightSize.coerceAtLeast(minHeightPx)
                }
                MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
            }
            else -> MeasureSpec.makeMeasureSpec(minHeightPx, MeasureSpec.EXACTLY)
        }

        super.onMeasure(widthMeasureSpec, resolvedHeightSpec)
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        reload()
    }

    override fun onDetachedFromWindow() {
        hasActiveLoad = false
        controller.release()
        BidgelyRuntimeRegistry.release(this)
        super.onDetachedFromWindow()
    }

    private fun reload() {
        if (widgets.isEmpty()) return
        if (hasActiveLoad) controller.release()
        hasActiveLoad = true
        controller.load(widgets)
    }

    companion object {
        private const val DEFAULT_MIN_HEIGHT_DP = 400
    }
}
