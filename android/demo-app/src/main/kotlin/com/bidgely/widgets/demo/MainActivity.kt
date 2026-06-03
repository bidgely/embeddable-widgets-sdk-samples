package com.bidgely.widgets.demo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.bidgely.widgets.AccountType
import com.bidgely.widgets.BidgelyCallback
import com.bidgely.widgets.BidgelyInitConfig
import com.bidgely.widgets.BidgelyMessage
import com.bidgely.widgets.BidgelySdk
import com.bidgely.widgets.FuelType
import com.bidgely.widgets.demo.ui.InterleavedFeedScreen
import com.bidgely.widgets.demo.ui.SetupScreen
import com.bidgely.widgets.demo.ui.WidgetGalleryScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            BidgelyDemoTheme {
                Surface(modifier = Modifier.statusBarsPadding()) {
                    BidgelyDemoApp()
                }
            }
        }
    }
}

@Composable
private fun BidgelyDemoApp() {
    val context = LocalContext.current
    val navController = rememberNavController()
    var isLoading by remember { mutableStateOf(false) }
    var statusMessage by remember { mutableStateOf<String?>(null) }
    val savedConfig = remember { DemoPreferences.load(context) }

    NavHost(navController = navController, startDestination = "setup") {
        composable("setup") {
            SetupScreen(
                initial = savedConfig,
                isLoading = isLoading,
                statusMessage = statusMessage,
                onInitialize = { config ->
                    isLoading = true
                    statusMessage = null
                    DemoPreferences.save(context, config)

                    val initConfig = BidgelyInitConfig(
                        clientId = config.clientId,
                        apiUrl = config.apiUrl,
                        accessToken = config.accessToken,
                        aesKey = config.aesKey,
                        iv = config.iv,
                        utilityAccountIdentifier = config.userId,
                        fuelType = runCatching { FuelType.valueOf(config.fuelType.trim().uppercase()) }
                            .getOrDefault(FuelType.ELECTRIC),
                        accountType = runCatching { AccountType.valueOf(config.accountType.trim().uppercase()) }
                            .getOrDefault(AccountType.RESIDENTIAL),
                        csrId = config.csrId.ifBlank { null },
                        runMode = "PERF",
                    )

                    BidgelySdk.initialize(
                        context = context,
                        config = initConfig,
                        callback = object : BidgelyCallback {
                            override fun onMessage(message: BidgelyMessage) {
                                isLoading = false
                                when (message) {
                                    is BidgelyMessage.Success -> {
                                        statusMessage = null
                                        navController.navigate("gallery") {
                                            popUpTo("setup") { inclusive = false }
                                        }
                                    }
                                    is BidgelyMessage.Error -> {
                                        statusMessage = buildString {
                                            append(message.errorMessage)
                                            if (message.errorMessage.contains("origin", ignoreCase = true) ||
                                                message.errorCode.contains("ORIGIN", ignoreCase = true)
                                            ) {
                                                append("\n\nTip: Whitelist https://appassets.androidplatform.net")
                                            }
                                        }
                                    }
                                    else -> Unit
                                }
                            }
                        },
                    )
                },
            )
        }
        composable("gallery") {
            if (!BidgelySdk.isInitialized()) {
                navController.navigate("setup") {
                    popUpTo("gallery") { inclusive = true }
                }
            } else {
                WidgetGalleryScreen(
                    onOpenInterleavedFeed = {
                        navController.navigate("interleaved")
                    },
                )
            }
        }
        composable("interleaved") {
            if (!BidgelySdk.isInitialized()) {
                navController.navigate("setup") {
                    popUpTo("interleaved") { inclusive = true }
                }
            } else {
                InterleavedFeedScreen()
            }
        }
    }
}

@Composable
private fun BidgelyDemoTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = lightColorScheme(),
        content = content,
    )
}
