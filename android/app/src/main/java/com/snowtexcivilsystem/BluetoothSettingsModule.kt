package com.snowtexcivilsystem

import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.pm.PackageManager
import android.os.Build
import android.provider.Settings
import android.content.Context
import android.content.Intent
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.Manifest
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener

class BluetoothSettingsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), PermissionListener {

    private val bluetoothManager = reactContext.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
    private val bluetoothAdapter: BluetoothAdapter? = bluetoothManager.adapter
    private var permissionPromise: Promise? = null

    override fun getName(): String {
        return "BluetoothSettings"
    }

    @ReactMethod
    fun enableBluetooth(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && !hasBluetoothPermissions()) {
            requestBluetoothPermissions(promise)
            return
        }

        bluetoothAdapter?.let {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                openBluetoothSettings()
                promise.resolve("Redirected to Bluetooth settings for manual enable")
            } else {
                try {
                    if (!it.isEnabled) {
                        val enableIntent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
                        enableIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                        reactApplicationContext.startActivity(enableIntent)
                        promise.resolve("Bluetooth enable requested")
                    } else {
                        promise.resolve("Bluetooth is already enabled")
                    }
                } catch (e: SecurityException) {
                    promise.reject("SECURITY_EXCEPTION", "Bluetooth enable failed: ${e.message}")
                }
            }
        } ?: promise.reject("BLUETOOTH_ERROR", "Bluetooth is not supported on this device")
    }

    private fun requestBluetoothPermissions(promise: Promise) {
        permissionPromise = promise

        val permissions = arrayOf(
            Manifest.permission.BLUETOOTH_CONNECT,
            Manifest.permission.BLUETOOTH_SCAN
        )

        val activity = currentActivity as? PermissionAwareActivity
        if (activity != null) {
            activity.requestPermissions(permissions, 1, this)
        } else {
            promise.reject("ACTIVITY_ERROR", "Unable to get current activity")
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ): Boolean {
        if (requestCode == 1) {
            val allGranted = grantResults.all { it == PackageManager.PERMISSION_GRANTED }
            if (allGranted) {
                permissionPromise?.resolve("Permissions granted")
            } else {
                permissionPromise?.reject("PERMISSION_DENIED", "Bluetooth permissions denied")
            }
            permissionPromise = null
            return true
        }
        return false
    }

    private fun hasBluetoothPermissions(): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            ActivityCompat.checkSelfPermission(
                reactApplicationContext,
                Manifest.permission.BLUETOOTH_CONNECT
            ) == PackageManager.PERMISSION_GRANTED &&
                    ActivityCompat.checkSelfPermission(
                        reactApplicationContext,
                        Manifest.permission.BLUETOOTH_SCAN
                    ) == PackageManager.PERMISSION_GRANTED
        } else {
            true
        }
    }

    @ReactMethod
    fun openBluetoothSettings() {
        val intent = Intent(Settings.ACTION_BLUETOOTH_SETTINGS)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        reactApplicationContext.startActivity(intent)
    }
}
