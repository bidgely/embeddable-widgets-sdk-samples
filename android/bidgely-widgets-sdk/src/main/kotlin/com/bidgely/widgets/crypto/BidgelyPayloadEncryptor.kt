package com.bidgely.widgets.crypto

import com.bidgely.widgets.AccountType
import com.bidgely.widgets.FuelType
import com.google.gson.Gson
import java.nio.charset.StandardCharsets
import java.util.Base64
import javax.crypto.Cipher
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.SecretKeySpec

object BidgelyPayloadEncryptor {

    private val gson = Gson()

    fun encrypt(
        utilityAccountIdentifier: String,
        fuelType: FuelType,
        accountType: AccountType,
        accessToken: String,
        aesKey: String,
        iv: String,
    ): String {
        val payload = mapOf(
            "utilityAccountIdentifier" to utilityAccountIdentifier,
            "fuelType" to fuelType.name,
            "accountType" to accountType.name,
            "accessToken" to accessToken,
        )

        val plainBytes = gson.toJson(payload).toByteArray(StandardCharsets.UTF_8)
        val keyBytes = aesKey.toKeyBytes()
        val ivBytes = iv.toIvBytes()

        val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")
        cipher.init(
            Cipher.ENCRYPT_MODE,
            SecretKeySpec(keyBytes, "AES"),
            IvParameterSpec(ivBytes),
        )
        val encrypted = cipher.doFinal(plainBytes)
        return Base64.getEncoder().encodeToString(encrypted)
    }

    /** Matches web sample: char codes of the aesKey string (btoa/atob round-trip). */
    fun String.toKeyBytes(): ByteArray {
        return ByteArray(length) { index -> this[index].code.toByte() }
    }

    /** Matches web sample: each char of IV string → byte. */
    fun String.toIvBytes(): ByteArray {
        return ByteArray(length) { index -> this[index].code.toByte() }
    }
}
