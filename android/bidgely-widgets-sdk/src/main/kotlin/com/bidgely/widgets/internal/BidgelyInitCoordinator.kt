package com.bidgely.widgets.internal

import com.bidgely.widgets.BidgelyInitConfig

internal object BidgelyInitCoordinator {

    @Volatile
    var config: BidgelyInitConfig? = null
        private set

    @Volatile
    var encryptedPayload: String? = null
        private set

    val isReady: Boolean
        get() = config != null && encryptedPayload != null

    fun cache(config: BidgelyInitConfig, encryptedPayload: String) {
        this.config = config
        this.encryptedPayload = encryptedPayload
    }

    fun clear() {
        config = null
        encryptedPayload = null
    }

    fun requireReady(): Pair<BidgelyInitConfig, String> {
        val c = config
        val p = encryptedPayload
        if (c == null || p == null) {
            throw IllegalStateException("Call BidgelySdk.initialize before showing BidgelyWidgetView")
        }
        return c to p
    }
}
