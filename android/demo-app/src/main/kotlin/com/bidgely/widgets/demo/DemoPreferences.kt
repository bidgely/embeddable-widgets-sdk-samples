package com.bidgely.widgets.demo

import android.content.Context
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey

data class DemoConfig(
    val clientId: String = "uat_avista_widget",
    val apiUrl: String = "https://avistauatapi.bidgely.com",
    val accessToken: String = "8cdd903d-1ecc-4991-bb2e-c3d489fddbc4",
    val aesKey: String = "hemnxfsR//NSjP9o+dV5o6vz3eXkMGEh",
    val iv: String = "lt9SKKJ0hnWE9Ht+",
    val userId: String = "_8189733837_2470123017",
    val csrId: String = "",
    val fuelType: String = "ELECTRIC",
    val accountType: String = "RESIDENTIAL",
)

object DemoPreferences {
    private const val PREFS = "bidgely_demo_prefs"

    private fun prefs(context: Context) = EncryptedSharedPreferences.create(
        context,
        PREFS,
        MasterKey.Builder(context).setKeyScheme(MasterKey.KeyScheme.AES256_GCM).build(),
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM,
    )

    fun load(context: Context): DemoConfig {
        val p = prefs(context)
        val default = DemoConfig()
        return DemoConfig(
            clientId = p.getString("clientId", default.clientId) ?: default.clientId,
            apiUrl = p.getString("apiUrl", default.apiUrl) ?: default.apiUrl,
            accessToken = p.getString("accessToken", default.accessToken) ?: default.accessToken,
            aesKey = p.getString("aesKey", default.aesKey) ?: default.aesKey,
            iv = p.getString("iv", default.iv) ?: default.iv,
            userId = p.getString("userId", default.userId) ?: default.userId,
            csrId = p.getString("csrId", default.csrId) ?: default.csrId,
            fuelType = p.getString("fuelType", default.fuelType) ?: default.fuelType,
            accountType = p.getString("accountType", default.accountType) ?: default.accountType,
        )
    }

    fun save(context: Context, config: DemoConfig) {
        prefs(context).edit()
            .putString("clientId", config.clientId)
            .putString("apiUrl", config.apiUrl)
            .putString("accessToken", config.accessToken)
            .putString("aesKey", config.aesKey)
            .putString("iv", config.iv)
            .putString("userId", config.userId)
            .putString("csrId", config.csrId)
            .putString("fuelType", config.fuelType)
            .putString("accountType", config.accountType)
            .apply()
    }
}
