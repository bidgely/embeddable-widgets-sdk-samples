package com.bidgely.widgets.crypto

import com.bidgely.widgets.AccountType
import com.bidgely.widgets.FuelType
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Test
import java.util.Base64
import javax.crypto.Cipher
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.SecretKeySpec

class BidgelyPayloadEncryptorTest {

    @Test
    fun encrypt_producesBase64Ciphertext() {
        val result = BidgelyPayloadEncryptor.encrypt(
            utilityAccountIdentifier = "user-123",
            fuelType = FuelType.ELECTRIC,
            accountType = AccountType.RESIDENTIAL,
            accessToken = "test-token",
            aesKey = "01234567890123456789012345678901",
            iv = "1234567890123456",
        )
        assertNotNull(result)
        Base64.getDecoder().decode(result)
    }

    @Test
    fun encrypt_matchesWebKeyAndIvDerivation() {
        val aesKey = "01234567890123456789012345678901"
        val iv = "1234567890123456"
        val keyBytes = with(BidgelyPayloadEncryptor) { aesKey.toKeyBytes() }
        val ivBytes = with(BidgelyPayloadEncryptor) { iv.toIvBytes() }

        assertEquals(32, keyBytes.size)
        assertEquals(16, ivBytes.size)
        assertEquals('0'.code.toByte(), keyBytes[0])
    }

    @Test
    fun encrypt_decryptRoundTrip() {
        val aesKey = "01234567890123456789012345678901"
        val iv = "1234567890123456"
        val encrypted = BidgelyPayloadEncryptor.encrypt(
            utilityAccountIdentifier = "user-123",
            fuelType = FuelType.ELECTRIC,
            accountType = AccountType.RESIDENTIAL,
            accessToken = "test-token",
            aesKey = aesKey,
            iv = iv,
        )

        val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")
        cipher.init(
            Cipher.DECRYPT_MODE,
            SecretKeySpec(with(BidgelyPayloadEncryptor) { aesKey.toKeyBytes() }, "AES"),
            IvParameterSpec(with(BidgelyPayloadEncryptor) { iv.toIvBytes() }),
        )
        val plain = String(cipher.doFinal(Base64.getDecoder().decode(encrypted)))
        assert(plain.contains("utilityAccountIdentifier"))
        assert(plain.contains("user-123"))
        assert(plain.contains("fuelType"))
        assert(plain.contains("ELECTRIC"))
        assert(plain.contains("accessToken"))
        assert(plain.contains("test-token"))
    }

    @Test
    fun encrypt_matchesWebSampleCiphertext() {
        val encrypted = BidgelyPayloadEncryptor.encrypt(
            utilityAccountIdentifier = "user-123",
            fuelType = FuelType.ELECTRIC,
            accountType = AccountType.RESIDENTIAL,
            accessToken = "test-token",
            aesKey = "01234567890123456789012345678901",
            iv = "1234567890123456",
        )
        assertEquals(
            "S7zC06DDN/6e52h0DTvttS/dEOZPyiN85x56KWbz5WJDQgkslr1AHZAImqR40sQaOzX8zrRz0PH5B3XA3t+Hw+LUXjiT+IdO69ik5O5GswmgBy7WIvY/+DDqMSyScKUFqxbFSOQIp8C72x+XNVm1gIPP06pur3uAp3rmQWs6RnQ=",
            encrypted,
        )
    }
}
