package com.bidgely.widgets

data class BidgelyInitConfig(
    val clientId: String,
    val apiUrl: String,
    val accessToken: String,
    val aesKey: String,
    val iv: String,
    val utilityAccountIdentifier: String,
    val fuelType: FuelType,
    val accountType: AccountType,
    val csrId: String? = null,
    val requestLocale: String? = null,
    val palette: Map<String, Any>? = null,
    val renderWidgetsImmediate: Boolean = false,
    val relayFileDownloads: Boolean = true,
    val runMode: String = "PROD",
)
