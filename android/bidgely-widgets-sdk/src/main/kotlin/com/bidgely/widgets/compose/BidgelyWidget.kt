package com.bidgely.widgets.compose

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import com.bidgely.widgets.BidgelyWidgetListener
import com.bidgely.widgets.BidgelyWidgetView
import com.bidgely.widgets.WidgetTag

@Composable
fun BidgelyWidget(
    widgets: List<WidgetTag>,
    modifier: Modifier = Modifier,
    listener: BidgelyWidgetListener? = null,
) {
    AndroidView(
        modifier = modifier,
        factory = { context ->
            BidgelyWidgetView(context).apply {
                this.widgets = widgets
                this.listener = listener
            }
        },
        update = { view ->
            if (view.widgets != widgets) {
                view.widgets = widgets
            }
            view.listener = listener
        },
    )
}
