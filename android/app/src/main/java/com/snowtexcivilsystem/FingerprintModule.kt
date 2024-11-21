package com.nativeandroid

import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import androidx.fragment.app.FragmentActivity

class FingerprintModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val biometricManager: BiometricManager = BiometricManager.from(reactContext)

    override fun getName(): String {
        return "FingerprintModule"
    }

    /**
     * Method to check if fingerprint authentication is available on the device.
     */
    @ReactMethod
    fun isFingerprintAvailable(promise: Promise) {
        try {
            val canAuthenticate = biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG)
            when (canAuthenticate) {
                BiometricManager.BIOMETRIC_SUCCESS -> promise.resolve(true)
                else -> promise.resolve(false)
            }
        } catch (e: Exception) {
            promise.reject("ERROR_CHECKING_AVAILABILITY", e.message)
        }
    }

    /**
     * Method to authenticate using the fingerprint.
     */
    @ReactMethod
    fun authenticate(promise: Promise) {
        val activity = currentActivity as? FragmentActivity
        if (activity == null) {
            promise.reject("ACTIVITY_NULL", "Current activity is null")
            return
        }

        val executor = ContextCompat.getMainExecutor(reactApplicationContext)

        activity.runOnUiThread {
            try {
                // Create BiometricPrompt instance
                val biometricPrompt = BiometricPrompt(
                    activity,
                    executor,
                    object : BiometricPrompt.AuthenticationCallback() {
                        override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                            super.onAuthenticationSucceeded(result)
                            promise.resolve("Authentication Succeeded")
                        }

                        override fun onAuthenticationFailed() {
                            super.onAuthenticationFailed()
                            promise.reject("AUTH_FAILED", "Authentication Failed")
                        }

                        override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                            super.onAuthenticationError(errorCode, errString)
                            promise.reject(errorCode.toString(), errString.toString())
                        }
                    }
                )

                // Configure the BiometricPrompt PromptInfo
                val promptInfo = BiometricPrompt.PromptInfo.Builder()
                    .setTitle("Fingerprint Authentication")
                    .setSubtitle("Log in using your fingerprint")
                    .setNegativeButtonText("Cancel")
                    .build()

                // Call authenticate on the BiometricPrompt
                biometricPrompt.authenticate(promptInfo)
            } catch (e: Exception) {
                promise.reject("AUTH_ERROR", e.message)
            }
        }
    }

}
