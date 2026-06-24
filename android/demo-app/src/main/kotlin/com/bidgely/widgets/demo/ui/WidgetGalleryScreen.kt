package com.bidgely.widgets.demo.ui

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
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
fun WidgetGalleryScreen() {
    var selectedTab by remember { mutableIntStateOf(0) }
    var status by remember { mutableStateOf<String?>(null) }
    var isWidgetLoading by remember { mutableStateOf(true) }

    val current = demoTabs[selectedTab]

    Column(modifier = Modifier.fillMaxSize()) {
        status?.let {
            Text(
                text = it,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                style = MaterialTheme.typography.bodySmall,
            )
        }

        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth(),
        ) {
            BidgelyWidget(
                widgets = listOf(current.tag),
                modifier = Modifier
                    .fillMaxSize()
                    .heightIn(min = 400.dp),
                listener = BidgelyWidgetListener { _, message ->
                    when (message) {
                        is BidgelyMessage.WidgetUiReady -> {
                            isWidgetLoading = false
                        }
                        is BidgelyMessage.Error -> {
                            isWidgetLoading = false
                            status = "Error: ${message.errorMessage}"
                        }
                        is BidgelyMessage.Success -> Unit
                        else -> Unit
                    }
                },
            )

            if (isWidgetLoading) {
                CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
            }
        }

        NavigationBar {
            demoTabs.forEachIndexed { index, tab ->
                NavigationBarItem(
                    selected = selectedTab == index,
                    onClick = {
                        selectedTab = index
                        isWidgetLoading = true
                        status = null
                    },
                    icon = { Text(tab.label.take(1)) },
                    label = { Text(tab.label) },
                )
            }
        }
    }
}
