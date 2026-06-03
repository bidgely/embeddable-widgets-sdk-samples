package com.bidgely.widgets

import android.content.Context
import com.bidgely.widgets.crypto.BidgelyPayloadEncryptor
import com.bidgely.widgets.internal.BidgelyInitCoordinator
import com.bidgely.widgets.internal.BidgelyRuntimeRegistry

object BidgelySdk {

    fun initialize(
        context: Context,
        config: BidgelyInitConfig,
        callback: BidgelyCallback,
    ) {
        val encrypted = try {
            BidgelyPayloadEncryptor.encrypt(
                utilityAccountIdentifier = config.utilityAccountIdentifier,
                fuelType = config.fuelType,
                accountType = config.accountType,
                accessToken = config.accessToken,
                aesKey = config.aesKey,
                iv = config.iv,
            )
        } catch (e: Exception) {
            callback.onMessage(BidgelyMessage.Error("ENCRYPTION_FAILED", e.message ?: "Check AES Key and IV"))
            return
        }

        BidgelyInitCoordinator.cache(config, encrypted)
        callback.onMessage(BidgelyMessage.Success(BidgelySuccessData(instanceId = null)))
    }

    fun release() {
        BidgelyInitCoordinator.clear()
        BidgelyRuntimeRegistry.releaseAll()
    }

    fun isInitialized(): Boolean = BidgelyInitCoordinator.isReady
}
