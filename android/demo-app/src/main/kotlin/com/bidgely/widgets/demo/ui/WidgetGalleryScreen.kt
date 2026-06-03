package com.bidgely.widgets.demo.ui

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.bidgely.widgets.BidgelyMessage
import com.bidgely.widgets.BidgelyWidgetListener
import com.bidgely.widgets.WidgetTag
import com.bidgely.widgets.compose.BidgelyWidget

data class DemoWidgetTab(
    val label: String,
    val tag: WidgetTag,
)

private val demoTabs = listOf(
    DemoWidgetTab("Usage", WidgetTag.USAGE_INSIGHTS),
    DemoWidgetTab("Bill", WidgetTag.BILL_PROJECTION),
    DemoWidgetTab("Tips", WidgetTag.RECOMMENDATION_TOP_TIPS),
    DemoWidgetTab("Survey", WidgetTag.HOME_SURVEY),
    DemoWidgetTab("HBA", WidgetTag.HIGH_BILL_ANALYSER),
)

@Composable
fun WidgetGalleryScreen(
    onOpenInterleavedFeed: () -> Unit = {},
) {
    var selectedTab by remember { mutableIntStateOf(0) }
    var status by remember { mutableStateOf<String?>(null) }

    val current = demoTabs[selectedTab]

    Column(modifier = Modifier.fillMaxSize()) {
        TextButton(
            onClick = onOpenInterleavedFeed,
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp),
        ) {
            Text("Open interleaved feed demo")
        }

        status?.let {
            Text(
                text = it,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                style = MaterialTheme.typography.bodySmall,
            )
        }

        BidgelyWidget(
            widgets = listOf(current.tag),
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .heightIn(min = 400.dp),
            listener = BidgelyWidgetListener { tag, message ->
                when (message) {
                    is BidgelyMessage.WidgetUiReady -> {
                        status = "${demoTabs.find { it.tag == tag }?.label ?: tag.name} ready"
                    }
                    is BidgelyMessage.Error -> {
                        status = "Error: ${message.errorMessage}"
                    }
                    is BidgelyMessage.Success -> {
                        if (message.data?.instanceId != null) {
                            status = "Session ready"
                        }
                    }
                    else -> Unit
                }
            },
        )

        NavigationBar {
            demoTabs.forEachIndexed { index, tab ->
                NavigationBarItem(
                    selected = selectedTab == index,
                    onClick = {
                        selectedTab = index
                        status = "Loading ${tab.label}…"
                    },
                    icon = { Text(tab.label.take(1)) },
                    label = { Text(tab.label) },
                )
            }
        }
    }
}
