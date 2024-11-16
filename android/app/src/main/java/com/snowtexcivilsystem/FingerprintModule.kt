package com.snowtexcivilsystem

import android.os.CancellationSignal
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import androidx.fragment.app.FragmentActivity

class FingerprintModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val biometricManager: BiometricManager = BiometricManager.from(reactApplicationContext)

    override fun getName(): String {
        return "FingerprintModule"
    }

    @ReactMethod
    fun isFingerprintAvailable(promise: Promise) {
        when (biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG)) {
            BiometricManager.BIOMETRIC_SUCCESS -> promise.resolve(true)
            else -> promise.resolve(false)
        }
    }

    @ReactMethod
    fun authenticate(promise: Promise) {
        val executor = ContextCompat.getMainExecutor(reactApplicationContext)
        val activity = currentActivity as? FragmentActivity
        if (activity == null) {
            promise.reject("ACTIVITY_NULL", "Current activity is null")
            return
        }

        val biometricPrompt = BiometricPrompt(activity, executor, object : BiometricPrompt.AuthenticationCallback() {
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
        })

        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Fingerprint Authentication")
            .setSubtitle("Log in using your fingerprint")
            .setNegativeButtonText("Cancel")
            .build()

        biometricPrompt.authenticate(promptInfo)
    }
}
