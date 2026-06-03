package com.bidgely.widgets.demo.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.bidgely.widgets.demo.DemoConfig

@Composable
fun SetupScreen(
    initial: DemoConfig,
    isLoading: Boolean,
    statusMessage: String?,
    onInitialize: (DemoConfig) -> Unit,
) {
    var clientId by rememberSaveable { mutableStateOf(initial.clientId) }
    var apiUrl by rememberSaveable { mutableStateOf(initial.apiUrl) }
    var accessToken by rememberSaveable { mutableStateOf(initial.accessToken) }
    var aesKey by rememberSaveable { mutableStateOf(initial.aesKey) }
    var iv by rememberSaveable { mutableStateOf(initial.iv) }
    var userId by rememberSaveable { mutableStateOf(initial.userId) }
    var csrId by rememberSaveable { mutableStateOf(initial.csrId) }
    var fuelType by rememberSaveable { mutableStateOf(initial.fuelType) }
    var accountType by rememberSaveable { mutableStateOf(initial.accountType) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Text("SDK Setup", style = MaterialTheme.typography.headlineSmall)
        Text(
            "Whitelist https://appassets.androidplatform.net with Bidgely before initializing.",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )

        OutlinedTextField(clientId, { clientId = it }, label = { Text("Client ID") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(apiUrl, { apiUrl = it }, label = { Text("API URL") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(accessToken, { accessToken = it }, label = { Text("Access Token") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(aesKey, { aesKey = it }, label = { Text("AES Key") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(iv, { iv = it }, label = { Text("IV") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(userId, { userId = it }, label = { Text("User ID") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(csrId, { csrId = it }, label = { Text("CSR ID (optional)") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(fuelType, { fuelType = it }, label = { Text("Fuel Type") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(accountType, { accountType = it }, label = { Text("Account Type") }, modifier = Modifier.fillMaxWidth())

        statusMessage?.let {
            Text(it, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodyMedium)
        }

        Button(
            onClick = {
                onInitialize(
                    DemoConfig(
                        clientId = clientId.trim(),
                        apiUrl = apiUrl.trim(),
                        accessToken = accessToken.trim(),
                        aesKey = aesKey.trim(),
                        iv = iv.trim(),
                        userId = userId.trim(),
                        csrId = csrId.trim(),
                        fuelType = fuelType.trim(),
                        accountType = accountType.trim(),
                    ),
                )
            },
            enabled = !isLoading,
            modifier = Modifier.fillMaxWidth(),
        ) {
            if (isLoading) {
                CircularProgressIndicator(modifier = Modifier.padding(end = 8.dp))
            }
            Text("Initialize SDK")
        }
    }
}
