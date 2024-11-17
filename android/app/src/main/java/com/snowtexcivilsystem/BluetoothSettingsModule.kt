package com.snowtexcivilsystem

import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.provider.Settings
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

    // Enable Bluetooth if not already enabled
    @ReactMethod
    fun enableBluetooth(promise: Promise) {
        if (bluetoothAdapter == null) {
            promise.reject("BLUETOOTH_ERROR", "Bluetooth is not supported on this device")
            return
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && !hasBluetoothPermissions()) {
            requestBluetoothPermissions(promise)
            return
        }

        bluetoothAdapter?.let {
            if (it.isEnabled) {
                promise.resolve(true)  // Bluetooth is already enabled, return true
            } else {
                try {
                    val enableIntent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
                    enableIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                    reactApplicationContext.startActivity(enableIntent)
                    promise.resolve(false)  // Bluetooth enable requested, return false
                } catch (e: SecurityException) {
                    promise.reject("SECURITY_EXCEPTION", "Bluetooth enable failed: ${e.message}")
                }
            }
        } ?: promise.reject("BLUETOOTH_ERROR", "Bluetooth is not supported on this device")
    }

    // Request Bluetooth permissions
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

    // Handle permission results
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

    // Check if the app has the required Bluetooth permissions
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

    // Open Bluetooth settings for manual enabling
    @ReactMethod
    fun openBluetoothSettings() {
        val intent = Intent(Settings.ACTION_BLUETOOTH_SETTINGS)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        reactApplicationContext.startActivity(intent)
    }

    // Check if Bluetooth is enabled
    @ReactMethod
    fun isBluetoothEnabled(promise: Promise) {
        bluetoothAdapter?.let {
            promise.resolve(it.isEnabled) // Return true if Bluetooth is enabled, false otherwise
        } ?: promise.reject("BLUETOOTH_ERROR", "Bluetooth is not supported on this device")
    }

    // Disable Bluetooth if it is enabled
    @ReactMethod
    fun disableBluetooth(promise: Promise) {
        if (bluetoothAdapter == null) {
            promise.reject("BLUETOOTH_ERROR", "Bluetooth is not supported on this device")
            return
        }

        bluetoothAdapter?.let {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                // For Android 13+ (API level 33), we cannot disable Bluetooth programmatically
                openBluetoothSettings()  // Redirect user to Bluetooth settings to disable manually
                promise.resolve(false)  // Return false because Bluetooth couldn't be disabled programmatically
            } else {
                // For older Android versions, we can disable Bluetooth programmatically
                if (it.isEnabled) {
                    try {
                        it.disable()
                        promise.resolve(true)  // Return true because Bluetooth is now disabled
                    } catch (e: SecurityException) {
                        promise.reject("SECURITY_EXCEPTION", "Bluetooth disable failed: ${e.message}")
                        promise.resolve(false)  // Return false in case of failure
                    }
                } else {
                    promise.resolve(false)  // Return false if Bluetooth is already disabled
                }
            }
        } ?: promise.reject("BLUETOOTH_ERROR", "Bluetooth is not supported on this device")
    }
}
