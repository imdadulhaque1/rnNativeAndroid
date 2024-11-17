package com.snowtexcivilsystem

import android.content.pm.PackageManager // Add this import
import android.os.Build
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity(), PermissionAwareActivity {

  private var permissionListener: PermissionListener? = null

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  override fun getMainComponentName(): String = "snowtexCivilSystem"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flag [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  /**
   * Handles runtime permission requests.
   */
  override fun requestPermissions(permissions: Array<String>, requestCode: Int, listener: PermissionListener) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      // Only request permissions if API level is 23 or higher
      permissionListener = listener
      requestPermissions(permissions, requestCode)
    } else {
      // For API level < 23, permissions are granted at install time
      listener.onRequestPermissionsResult(requestCode, permissions, IntArray(permissions.size) { PackageManager.PERMISSION_GRANTED })
    }
  }

  /**
   * Passes the permission result back to the React Native module.
   */
  override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
    if (permissionListener != null && permissionListener!!.onRequestPermissionsResult(requestCode, permissions, grantResults)) {
      permissionListener = null
    } else {
      super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    }
  }
}
