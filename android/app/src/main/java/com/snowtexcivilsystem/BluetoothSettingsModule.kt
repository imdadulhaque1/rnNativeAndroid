package com.snowtexcivilsystem

import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.Context
import android.content.pm.PackageManager
import android.content.Intent  // Import Intent here
import android.os.Build
import android.provider.Settings // Ensure this import for Bluetooth settings
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.Manifest

class BluetoothSettingsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val bluetoothManager = reactContext.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
    private val bluetoothAdapter: BluetoothAdapter? = bluetoothManager.adapter

    override fun getName(): String {
        return "BluetoothSettings"
    }

    @ReactMethod
    fun enableBluetooth(promise: Promise) {
        // Check for Bluetooth permissions before enabling Bluetooth
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) { // Android 12 and above
            if (ActivityCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                promise.reject("PERMISSION_ERROR", "Bluetooth permission is required")
                return
            }
        } else {
            if (ActivityCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.BLUETOOTH_ADMIN) != PackageManager.PERMISSION_GRANTED) {
                promise.reject("PERMISSION_ERROR", "Bluetooth Admin permission is required")
                return
            }
        }

        bluetoothAdapter?.let {
            if (!it.isEnabled) {
                it.enable()  // This enables Bluetooth
                promise.resolve("Bluetooth enabled successfully")
            } else {
                promise.resolve("Bluetooth is already enabled")
            }
        } ?: promise.reject("BLUETOOTH_ERROR", "Bluetooth is not supported on this device")
    }

    @ReactMethod
    fun isBluetoothEnabled(promise: Promise) {
        bluetoothAdapter?.let {
            promise.resolve(it.isEnabled)
        } ?: promise.reject("BLUETOOTH_ERROR", "Bluetooth is not supported on this device")
    }

    @ReactMethod
    fun openBluetoothSettings() {
        val intent = Intent(Settings.ACTION_BLUETOOTH_SETTINGS)  // Use Intent properly
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        reactApplicationContext.startActivity(intent)
    }
}
