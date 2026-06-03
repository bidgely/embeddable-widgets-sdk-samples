package com.bidgely.widgets.demo.ui

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.bidgely.widgets.BidgelyMessage
import com.bidgely.widgets.BidgelyWidgetListener
import com.bidgely.widgets.WidgetTag
import com.bidgely.widgets.compose.BidgelyWidget

@Composable
fun InterleavedFeedScreen() {
    var status by remember { mutableStateOf<String?>(null) }
    val scroll = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scroll)
            .padding(vertical = 8.dp),
    ) {
        status?.let {
            Text(
                text = it,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                style = MaterialTheme.typography.bodySmall,
            )
        }

        // WebView needs a definite height in a scrollable Column (unlike gallery's weight(1f)).
        key("interleaved-block-1") {
            BidgelyWidget(
                widgets = listOf(WidgetTag.HOME_SURVEY),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(720.dp),
                listener = rememberFeedListener("Block 1") { status = it },
            )
        }

        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Your utility promo", style = MaterialTheme.typography.titleMedium)
                Text(
                    "Native card between Bidgely blocks — not part of the SDK.",
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(top = 8.dp),
                )
            }
        }

        key("interleaved-block-2") {
            BidgelyWidget(
                widgets = listOf(WidgetTag.RECOMMENDATION_TOP_TIPS),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(480.dp),
                listener = rememberFeedListener("Block 2") { status = it },
            )
        }
    }
}

@Composable
private fun rememberFeedListener(
    blockLabel: String,
    onStatus: (String) -> Unit,
): BidgelyWidgetListener = remember(blockLabel) {
    feedListener(blockLabel, onStatus)
}

private fun feedListener(
    blockLabel: String,
    onStatus: (String) -> Unit,
): BidgelyWidgetListener = BidgelyWidgetListener { tag, message ->
    when (message) {
        is BidgelyMessage.WidgetUiReady -> {
            onStatus("$blockLabel: $tag ready")
        }
        is BidgelyMessage.Error -> {
            onStatus("$blockLabel error: ${message.errorMessage}")
        }
        else -> Unit
    }
}
