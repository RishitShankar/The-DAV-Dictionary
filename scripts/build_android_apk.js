import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Environment & Paths
const SDK = 'C:\\Users\\HP\\AppData\\Local\\Android\\Sdk';
const BUILD_TOOLS_VER = '34.0.0';
const BUILD_TOOLS = path.join(SDK, 'build-tools', BUILD_TOOLS_VER);
const PLATFORMS = path.join(SDK, 'platforms', 'android-34');
const ANDROID_JAR = path.join(PLATFORMS, 'android.jar');

const AAPT2 = path.join(BUILD_TOOLS, 'aapt2.exe');
const D8 = path.join(BUILD_TOOLS, 'd8.bat');
const ZIPALIGN = path.join(BUILD_TOOLS, 'zipalign.exe');
const APKSIGNER = path.join(BUILD_TOOLS, 'apksigner.bat');

process.env.JAVA_HOME = 'C:\\Program Files\\Eclipse Adoptium\\jdk-25.0.0.36-hotspot';

const BUILD_DIR = path.join(ROOT_DIR, 'android_build');
const FINAL_APK_NAME = 'DAV_Smart_Portal.apk';
const FINAL_APK_PATH = path.join(ROOT_DIR, FINAL_APK_NAME);
const PUBLIC_APK_PATH = path.join(ROOT_DIR, 'public', FINAL_APK_NAME);

function log(step, msg) {
  console.log(`\n======================================================`);
  console.log(`🚀 [Step ${step}] ${msg}`);
  console.log(`======================================================`);
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

async function main() {
  console.log('📱 STARTING FEATHERWEIGHT ANDROID APK BUILD (1.2 MB - 1.8 MB TARGET)');
  console.log(`SDK: ${SDK}`);
  console.log(`Build Tools: ${BUILD_TOOLS_VER}`);
  console.log(`Target: ${FINAL_APK_PATH}`);

  // 1. Verify Android SDK Tools
  log(1, 'Verifying Android SDK & JDK Tools');
  if (!fs.existsSync(ANDROID_JAR)) throw new Error(`Missing android.jar at ${ANDROID_JAR}`);
  if (!fs.existsSync(AAPT2)) throw new Error(`Missing aapt2 at ${AAPT2}`);
  if (!fs.existsSync(D8)) throw new Error(`Missing d8 at ${D8}`);
  if (!fs.existsSync(ZIPALIGN)) throw new Error(`Missing zipalign at ${ZIPALIGN}`);
  if (!fs.existsSync(APKSIGNER)) throw new Error(`Missing apksigner at ${APKSIGNER}`);
  console.log('✅ Android build tools verified successfully!');

  // Remove any previously generated APK in public/ before Vite build so Vite does not package it into dist/
  if (fs.existsSync(PUBLIC_APK_PATH)) fs.unlinkSync(PUBLIC_APK_PATH);

  // 2. Build Fresh Production Web Bundle via Vite
  log(2, 'Building Fresh Production Web Bundle via Vite');
  const distDir = path.join(ROOT_DIR, 'dist');
  if (process.argv.includes('--rebuild') || !fs.existsSync(distDir)) {
    try {
      console.log('Running production vite build...');
      execSync('npx vite build --emptyOutDir false', { cwd: ROOT_DIR, stdio: 'inherit' });
      console.log('✅ Fresh production build generated in dist/.');
    } catch (e) {
      console.warn('Vite build warning (proceeding with dist):', e.message);
    }
  } else {
    console.log('✅ Utilizing fresh production web bundle in dist/.');
  }

  // 3. Setup Android Build Directory Structure
  log(3, 'Setting up Android Project Architecture');
  ensureDir(BUILD_DIR);
  const resDir = path.join(BUILD_DIR, 'res');
  const srcDir = path.join(BUILD_DIR, 'src', 'com', 'davsmartportal', 'app');
  const assetsDir = path.join(BUILD_DIR, 'assets');
  const outBuildDir = path.join(BUILD_DIR, 'build');

  ensureDir(resDir);
  ensureDir(srcDir);
  ensureDir(outBuildDir);

  // Clean stale assets in assetsDir before copying
  if (fs.existsSync(assetsDir)) {
    fs.rmSync(assetsDir, { recursive: true, force: true });
  }
  ensureDir(assetsDir);

  // 4. Populate Assets from dist/ (Code-Only Architecture: 1.2 MB - 1.8 MB Target)
  log(4, 'Copying Active Web App Assets (Pure Lines of Code + Cloud Streaming Fallback)');
  
  // Read dist/index.html to find the exact active production JS and CSS bundles
  const indexHtmlPath = path.join(distDir, 'index.html');
  const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
  const jsMatch = indexHtmlContent.match(/src=["']\.\/assets\/(index-[^"']+\.js)["']/);
  const cssMatch = indexHtmlContent.match(/href=["']\.\/assets\/(index-[^"']+\.css)["']/);

  const activeJs = jsMatch ? jsMatch[1] : null;
  const activeCss = cssMatch ? cssMatch[1] : null;

  console.log(`Active Production JS: ${activeJs}`);
  console.log(`Active Production CSS: ${activeCss}`);

  // 1. Copy index.html
  fs.copyFileSync(indexHtmlPath, path.join(assetsDir, 'index.html'));

  // 2. Copy ALL active JS and CSS production code bundles (Prevents runtime chunk 404s!)
  const assetsSubDir = path.join(assetsDir, 'assets');
  ensureDir(assetsSubDir);
  const distAssetsDir = path.join(distDir, 'assets');
  if (fs.existsSync(distAssetsDir)) {
    for (const f of fs.readdirSync(distAssetsDir)) {
      if (f.endsWith('.js') || f.endsWith('.css')) {
        fs.copyFileSync(path.join(distAssetsDir, f), path.join(assetsSubDir, f));
      }
    }
  }

  // 3. Copy essential lightweight UI icons and graphics
  const coreFiles = [
    'favicon.ico',
    'logo.png',
    'logo-512.png',
    'apple-touch-icon.png',
    'blackboard_desk.jpg'
  ];
  for (const f of coreFiles) {
    const s = path.join(distDir, f);
    if (fs.existsSync(s)) {
      fs.copyFileSync(s, path.join(assetsDir, f));
    }
  }

  // 4. Copy vendor (pdf.min.js and pdf.worker.min.js)
  const vendorDir = path.join(distDir, 'vendor');
  if (fs.existsSync(vendorDir)) {
    const destVendor = path.join(assetsDir, 'vendor');
    ensureDir(destVendor);
    for (const f of fs.readdirSync(vendorDir)) {
      fs.copyFileSync(path.join(vendorDir, f), path.join(destVendor, f));
    }
  }

  // Log asset sizes
  let totalAssetBytes = 0;
  function logWalk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) logWalk(full);
      else {
        const sz = fs.statSync(full).size;
        totalAssetBytes += sz;
        console.log(`   📦 ${(sz / 1024).toFixed(1)} KB : ${path.relative(assetsDir, full)}`);
      }
    }
  }
  logWalk(assetsDir);
  console.log(`✅ Pure Code Assets Staged: ${(totalAssetBytes / 1024 / 1024).toFixed(2)} MB uncompressed.`);

  // 5. Create Android Resources (strings, colors, styles, network_security_config, icons)
  log(5, 'Creating Android Manifest & Resources');
  
  // values/
  const valuesDir = path.join(resDir, 'values');
  ensureDir(valuesDir);
  fs.writeFileSync(path.join(valuesDir, 'strings.xml'), `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">DAV Smart Portal</string>
    <string name="accessibility_service_description">DAV ReGain Focus OS App Blocker intercepts distracting apps like YouTube, Instagram, and games during study hours to enforce deep concentration.</string>
</resources>
`);

  fs.writeFileSync(path.join(valuesDir, 'colors.xml'), `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_navy">#0f172a</color>
    <color name="primary_dark">#020617</color>
    <color name="accent_teal">#0f766e</color>
    <color name="bg_dark">#0f172a</color>
</resources>
`);

  fs.writeFileSync(path.join(valuesDir, 'styles.xml'), `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="android:Theme.Material.Light.NoActionBar">
        <item name="android:colorPrimary">@color/primary_navy</item>
        <item name="android:colorPrimaryDark">@color/primary_dark</item>
        <item name="android:colorAccent">@color/accent_teal</item>
        <item name="android:windowBackground">@color/bg_dark</item>
        <item name="android:statusBarColor">@color/primary_navy</item>
        <item name="android:navigationBarColor">@color/primary_navy</item>
    </style>
</resources>
`);

  // xml/
  const xmlDir = path.join(resDir, 'xml');
  ensureDir(xmlDir);
  fs.writeFileSync(path.join(xmlDir, 'accessibility_service_config.xml'), `<?xml version="1.0" encoding="utf-8"?>
<accessibility-service xmlns:android="http://schemas.android.com/apk/res/android"
    android:description="@string/accessibility_service_description"
    android:accessibilityEventTypes="typeWindowStateChanged"
    android:accessibilityFeedbackType="feedbackGeneric"
    android:notificationTimeout="50"
    android:canRetrieveWindowContent="false"
    android:accessibilityFlags="flagDefault" />
`);

  fs.writeFileSync(path.join(xmlDir, 'network_security_config.xml'), `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">127.0.0.1</domain>
        <domain includeSubdomains="true">appassets.androidplatform.net</domain>
        <domain includeSubdomains="true">davportal.local</domain>
        <domain includeSubdomains="true">thedavdictionary.vercel.app</domain>
        <domain includeSubdomains="true">vercel.app</domain>
    </domain-config>
</network-security-config>
`);

  // Icons (quantized mipmap densities: mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)
  const backupLogo = path.join(ROOT_DIR, 'scratch', 'logo_backup_original.png');
  const iconSource = fs.existsSync(backupLogo) ? backupLogo : path.join(ROOT_DIR, 'public', 'logo.png');
  console.log(`Generating optimized Android mipmap icons from: ${iconSource}`);
  execSync(`python scripts/generate_density_icons.py "${iconSource}" "${resDir}"`, { stdio: 'inherit' });

  // AndroidManifest.xml
  const manifestContent = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.davsmartportal.app"
    android:versionCode="3"
    android:versionName="1.0.2">

    <uses-sdk android:minSdkVersion="24" android:targetSdkVersion="34" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.PACKAGE_USAGE_STATS" />
    <uses-permission android:name="android.permission.KILL_BACKGROUND_PROCESSES" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="28" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:hardwareAccelerated="true"
        android:largeHeap="true"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true"
        android:networkSecurityConfig="@xml/network_security_config">

        <activity
            android:name="com.davsmartportal.app.MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:configChanges="orientation|screenSize|keyboardHidden|smallestScreenSize|screenLayout"
            android:windowSoftInputMode="adjustResize"
            android:label="@string/app_name">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <service
            android:name="com.davsmartportal.app.FocusBlockerAccessibilityService"
            android:permission="android.permission.BIND_ACCESSIBILITY_SERVICE"
            android:label="DAV ReGain Focus App Blocker"
            android:exported="true">
            <intent-filter>
                <action android:name="android.accessibilityservice.AccessibilityService" />
            </intent-filter>
            <meta-data
                android:name="android.accessibilityservice"
                android:resource="@xml/accessibility_service_config" />
        </service>
    </application>
</manifest>
`;
  fs.writeFileSync(path.join(BUILD_DIR, 'AndroidManifest.xml'), manifestContent);
  console.log('✅ AndroidManifest.xml & resources created.');

  // 6. Create High-Performance Native MainActivity.java with On-Demand Cloud Streaming
  log(6, 'Authoring High-Performance MainActivity.java with On-Demand Cloud Streaming');
  const javaContent = `package com.davsmartportal.app;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.DownloadManager;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.PermissionRequest;
import android.webkit.SslErrorHandler;
import android.webkit.URLUtil;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends Activity {

    public static final String TAG = "DAV_PORTAL";
    public WebView mWebView;
    public ProgressBar mProgressBar;
    public ValueCallback<Uri[]> mUploadCallback;
    public final static int FILE_CHOOSER_REQUEST_CODE = 1001;
    public long mLastBackPressedTime = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Customize Status Bar & Navigation Bar
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(Color.parseColor("#0f172a"));
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                window.setNavigationBarColor(Color.parseColor("#0f172a"));
            }
        }

        // Enable Chromium Remote Debugging
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        // Root Layout
        FrameLayout rootLayout = new FrameLayout(this);
        rootLayout.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
        rootLayout.setBackgroundColor(Color.parseColor("#0f172a"));

        // WebView
        mWebView = new WebView(this);
        mWebView.setLayoutParams(new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
        mWebView.setBackgroundColor(Color.parseColor("#0f172a"));

        // Progress Bar
        mProgressBar = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        FrameLayout.LayoutParams pbParams = new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, 8);
        mProgressBar.setLayoutParams(pbParams);
        mProgressBar.setProgress(0);
        mProgressBar.setMax(100);
        mProgressBar.setVisibility(View.GONE);

        rootLayout.addView(mWebView);
        rootLayout.addView(mProgressBar);
        setContentView(rootLayout);

        configureWebView();

        // High-Speed Direct In-Memory Virtual App Origin (No TCP sockets, 100% reliable)
        String targetUrl = "https://appassets.androidplatform.net/index.html";
        Log.i(TAG, "Loading Application Entrypoint: " + targetUrl);
        mWebView.loadUrl(targetUrl);
        handleBlockedAppIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleBlockedAppIntent(intent);
    }

    public static class AppBlockedRunner implements Runnable {
        private final WebView wv;
        private final String pkg;
        public AppBlockedRunner(WebView w, String p) { this.wv = w; this.pkg = p; }
        @Override
        public void run() {
            if (wv != null) {
                wv.evaluateJavascript("window.onNativeAppBlocked && window.onNativeAppBlocked('" + pkg + "');", null);
            }
        }
    }

    private void handleBlockedAppIntent(Intent intent) {
        if (intent != null && intent.hasExtra("blocked_package")) {
            final String pkg = intent.getStringExtra("blocked_package");
            Toast.makeText(this, "🚫 App Blocked: Stay in DAV ReGain Focus OS!", Toast.LENGTH_LONG).show();
            if (mWebView != null) {
                mWebView.post(new AppBlockedRunner(mWebView, pkg));
            }
        }
    }

    private void configureWebView() {
        WebSettings settings = mWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setMediaPlaybackRequiresUserGesture(false);

        // Cookies
        try {
            CookieManager cookieManager = CookieManager.getInstance();
            cookieManager.setAcceptCookie(true);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                cookieManager.setAcceptThirdPartyCookies(mWebView, true);
            }
        } catch (Exception ignored) {}

        // Custom User Agent to identify DAV Mobile App & Super Dimensions
        String originalUA = settings.getUserAgentString();
        settings.setUserAgentString(originalUA + " DAVSmartPortalApp/1.0.0 (Android-APK; SuperDimension3; UltraSuperDimension2; Featherweight)");

        // Expose Native Android JS Bridge for ReGain Focus OS, Real Haptics, Toasts & System Intents
        mWebView.addJavascriptInterface(new AndroidBridge(this), "Android");

        mWebView.setWebViewClient(new LocalWebViewClient(this));
        mWebView.setWebChromeClient(new LocalChromeClient(this));
        mWebView.setDownloadListener(new LocalDownloadListener(this));
    }

    public static String getMimeType(String path) {
        String lower = path.toLowerCase();
        if (lower.endsWith(".html") || lower.endsWith(".htm")) return "text/html";
        if (lower.endsWith(".js") || lower.endsWith(".mjs")) return "application/javascript";
        if (lower.endsWith(".css")) return "text/css";
        if (lower.endsWith(".json")) return "application/json";
        if (lower.endsWith(".png")) return "image/png";
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
        if (lower.endsWith(".svg")) return "image/svg+xml";
        if (lower.endsWith(".gif")) return "image/gif";
        if (lower.endsWith(".ico")) return "image/x-icon";
        if (lower.endsWith(".webp")) return "image/webp";
        if (lower.endsWith(".pdf")) return "application/pdf";
        if (lower.endsWith(".woff")) return "font/woff";
        if (lower.endsWith(".woff2")) return "font/woff2";
        if (lower.endsWith(".ttf")) return "font/ttf";
        if (lower.endsWith(".otf")) return "font/otf";
        if (lower.endsWith(".wasm")) return "application/wasm";
        if (lower.endsWith(".mp3")) return "audio/mpeg";
        if (lower.endsWith(".wav")) return "audio/wav";
        return "application/octet-stream";
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == FILE_CHOOSER_REQUEST_CODE) {
            if (mUploadCallback != null) {
                Uri[] results = null;
                if (resultCode == Activity.RESULT_OK && data != null) {
                    if (data.getData() != null) {
                        results = new Uri[]{ data.getData() };
                    } else if (data.getClipData() != null) {
                        int count = data.getClipData().getItemCount();
                        results = new Uri[count];
                        for (int i = 0; i < count; i++) {
                            results[i] = data.getClipData().getItemAt(i).getUri();
                        }
                    }
                }
                mUploadCallback.onReceiveValue(results);
                mUploadCallback = null;
            }
        }
    }

    @Override
    public void onBackPressed() {
        if (mWebView != null && mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            if (mLastBackPressedTime + 2000 > System.currentTimeMillis()) {
                super.onBackPressed();
            } else {
                Toast.makeText(this, "Press back again to exit", Toast.LENGTH_SHORT).show();
                mLastBackPressedTime = System.currentTimeMillis();
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (mWebView != null) mWebView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (mWebView != null) mWebView.onPause();
    }

    @Override
    protected void onDestroy() {
        if (mWebView != null) mWebView.destroy();
        super.onDestroy();
    }

    public static class ToastRunner implements Runnable {
        private final Context ctx;
        private final String msg;
        public ToastRunner(Context c, String m) { this.ctx = c; this.msg = m; }
        @Override
        public void run() {
            Toast.makeText(ctx, msg, Toast.LENGTH_SHORT).show();
        }
    }

    public static class AndroidBridge {
        private final MainActivity act;
        private final android.os.Handler mainHandler;
        public AndroidBridge(MainActivity a) {
            this.act = a;
            this.mainHandler = new android.os.Handler(android.os.Looper.getMainLooper());
        }

        @android.webkit.JavascriptInterface
        public void showToast(final String msg) {
            mainHandler.post(new ToastRunner(act, msg));
        }

        @android.webkit.JavascriptInterface
        public void vibrate(long ms) {
            try {
                android.os.Vibrator v = (android.os.Vibrator) act.getSystemService(Context.VIBRATOR_SERVICE);
                if (v != null && v.hasVibrator()) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        v.vibrate(android.os.VibrationEffect.createOneShot(ms, android.os.VibrationEffect.DEFAULT_AMPLITUDE));
                    } else {
                        v.vibrate(ms);
                    }
                }
            } catch (Exception ignored) {}
        }

        @android.webkit.JavascriptInterface
        public void openUsageAccessSettings() {
            try {
                Intent intent = new Intent(android.provider.Settings.ACTION_USAGE_ACCESS_SETTINGS);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                act.startActivity(intent);
            } catch (Exception e) {
                showToast("Cannot open usage settings: " + e.getMessage());
            }
        }

        @android.webkit.JavascriptInterface
        public void openAccessibilitySettings() {
            try {
                Intent intent = new Intent(android.provider.Settings.ACTION_ACCESSIBILITY_SETTINGS);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                act.startActivity(intent);
            } catch (Exception e) {
                showToast("Cannot open accessibility: " + e.getMessage());
            }
        }

        @android.webkit.JavascriptInterface
        public void openNotificationSettings() {
            try {
                Intent intent = new Intent();
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    intent.setAction(android.provider.Settings.ACTION_APP_NOTIFICATION_SETTINGS);
                    intent.putExtra(android.provider.Settings.EXTRA_APP_PACKAGE, act.getPackageName());
                } else {
                    intent.setAction("android.settings.APP_NOTIFICATION_SETTINGS");
                    intent.putExtra("app_package", act.getPackageName());
                    intent.putExtra("app_uid", act.getApplicationInfo().uid);
                }
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                act.startActivity(intent);
            } catch (Exception e) {
                showToast("Cannot open notifications: " + e.getMessage());
            }
        }

        @android.webkit.JavascriptInterface
        public void openOverlaySettings() {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    Intent intent = new Intent(android.provider.Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                            Uri.parse("package:" + act.getPackageName()));
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    act.startActivity(intent);
                }
            } catch (Exception e) {
                showToast("Cannot open overlay settings: " + e.getMessage());
            }
        }

        @android.webkit.JavascriptInterface
        public boolean hasUsageStatsPermission() {
            try {
                android.app.AppOpsManager appOps = (android.app.AppOpsManager) act.getSystemService(Context.APP_OPS_SERVICE);
                int mode = appOps.checkOpNoThrow(android.app.AppOpsManager.OPSTR_GET_USAGE_STATS, 
                        android.os.Process.myUid(), act.getPackageName());
                return mode == android.app.AppOpsManager.MODE_ALLOWED;
            } catch (Exception e) {
                return false;
            }
        }

        @android.webkit.JavascriptInterface
        public boolean canDrawOverlays() {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                return android.provider.Settings.canDrawOverlays(act);
            }
            return true;
        }

        @android.webkit.JavascriptInterface
        public int getBatteryLevel() {
            try {
                android.os.BatteryManager bm = (android.os.BatteryManager) act.getSystemService(Context.BATTERY_SERVICE);
                if (bm != null) {
                    return bm.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CAPACITY);
                }
            } catch (Exception ignored) {}
            return 85;
        }

        @android.webkit.JavascriptInterface
        public String getDeviceInfo() {
            return Build.MANUFACTURER + " " + Build.MODEL + " (SDK " + Build.VERSION.SDK_INT + ")";
        }

        @android.webkit.JavascriptInterface
        public boolean isNativeApk() {
            return true;
        }

        @android.webkit.JavascriptInterface
        public boolean isAccessibilityServiceEnabled() {
            return FocusBlockerAccessibilityService.isServiceRunning();
        }

        @android.webkit.JavascriptInterface
        public void setFocusActive(boolean active) {
            try {
                SharedPreferences prefs = act.getSharedPreferences(FocusBlockerAccessibilityService.PREFS_NAME, Context.MODE_PRIVATE);
                prefs.edit().putBoolean(FocusBlockerAccessibilityService.KEY_FOCUS_ACTIVE, active).apply();
                if (active) {
                    showToast("🔒 DAV ReGain Focus Active: Distracting apps locked!");
                }
            } catch (Exception ignored) {}
        }

        @android.webkit.JavascriptInterface
        public void setBlockedPackages(String jsonArrayStr) {
            try {
                JSONArray arr = new JSONArray(jsonArrayStr);
                Set<String> set = new HashSet<String>();
                for (int i = 0; i < arr.length(); i++) {
                    set.add(arr.getString(i));
                }
                SharedPreferences prefs = act.getSharedPreferences(FocusBlockerAccessibilityService.PREFS_NAME, Context.MODE_PRIVATE);
                prefs.edit().putStringSet(FocusBlockerAccessibilityService.KEY_BLOCKED_PKGS, set).apply();
                Log.i(MainActivity.TAG, "Blocked packages updated: " + set.size() + " apps");
            } catch (Exception e) {
                Log.e(MainActivity.TAG, "Error setting blocked packages: " + e.getMessage());
            }
        }

        @android.webkit.JavascriptInterface
        public String getRealUsageStatsJson() {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    UsageStatsManager usm = (UsageStatsManager) act.getSystemService(Context.USAGE_STATS_SERVICE);
                    if (usm != null) {
                        Calendar cal = Calendar.getInstance();
                        cal.set(Calendar.HOUR_OF_DAY, 0);
                        cal.set(Calendar.MINUTE, 0);
                        cal.set(Calendar.SECOND, 0);
                        long start = cal.getTimeInMillis();
                        long end = System.currentTimeMillis();

                        List<UsageStats> statsList = usm.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, start, end);
                        if (statsList != null && !statsList.isEmpty()) {
                            JSONObject result = new JSONObject();
                            JSONArray appArray = new JSONArray();
                            long totalForegroundMs = 0;
                            long usefulForegroundMs = 0;
                            long distractedForegroundMs = 0;

                            for (UsageStats u : statsList) {
                                long timeInFg = u.getTotalTimeInForeground();
                                if (timeInFg > 0) {
                                    totalForegroundMs += timeInFg;
                                    String pkg = u.getPackageName();
                                    boolean isDistracted = pkg.contains("youtube") || pkg.contains("instagram") || pkg.contains("whatsapp") || pkg.contains("facebook") || pkg.contains("tiktok") || pkg.contains("hotstar") || pkg.contains("snapchat") || pkg.contains("netflix");
                                    if (isDistracted) {
                                        distractedForegroundMs += timeInFg;
                                    } else {
                                        usefulForegroundMs += timeInFg;
                                    }

                                    JSONObject item = new JSONObject();
                                    item.put("package", pkg);
                                    item.put("minutes", Math.round(timeInFg / 60000.0));
                                    item.put("lastTimeUsed", u.getLastTimeUsed());
                                    item.put("isDistracted", isDistracted);
                                    appArray.put(item);
                                }
                            }
                            result.put("totalMinutes", Math.round(totalForegroundMs / 60000.0));
                            result.put("usefulMinutes", Math.round(usefulForegroundMs / 60000.0));
                            result.put("distractedMinutes", Math.round(distractedForegroundMs / 60000.0));
                            result.put("apps", appArray);
                            result.put("isRealData", true);
                            return result.toString();
                        }
                    }
                }
            } catch (Exception e) {
                Log.e(MainActivity.TAG, "Error querying real usage stats: " + e.getMessage());
            }
            try {
                JSONObject fallback = new JSONObject();
                fallback.put("isRealData", false);
                fallback.put("totalMinutes", 0);
                fallback.put("usefulMinutes", 0);
                fallback.put("distractedMinutes", 0);
                return fallback.toString();
            } catch (Exception ignored) {}
            return "{}";
        }

        @android.webkit.JavascriptInterface
        public String getRealInstalledAppsJson() {
            try {
                PackageManager pm = act.getPackageManager();
                List<ApplicationInfo> apps = pm.getInstalledApplications(PackageManager.GET_META_DATA);
                JSONArray list = new JSONArray();
                for (ApplicationInfo app : apps) {
                    if ((app.flags & ApplicationInfo.FLAG_SYSTEM) == 0 || 
                        app.packageName.contains("youtube") || 
                        app.packageName.contains("chrome")) {
                        JSONObject item = new JSONObject();
                        item.put("package", app.packageName);
                        item.put("name", pm.getApplicationLabel(app).toString());
                        list.put(item);
                    }
                }
                return list.toString();
            } catch (Exception e) {
                return "[]";
            }
        }

        @android.webkit.JavascriptInterface
        public void killBackgroundProcesses(String packageName) {
            try {
                ActivityManager am = (ActivityManager) act.getSystemService(Context.ACTIVITY_SERVICE);
                if (am != null) {
                    am.killBackgroundProcesses(packageName);
                    showToast("Stopped background processes for " + packageName);
                }
            } catch (Exception e) {
                Log.e(MainActivity.TAG, "Cannot kill background processes: " + e.getMessage());
            }
        }
    }

    public static class LocalWebViewClient extends WebViewClient {
        private final MainActivity act;
        public LocalWebViewClient(MainActivity a) { this.act = a; }

        @Override
        public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
            Log.w(MainActivity.TAG, "SSL Notice handled: " + error.toString());
            handler.proceed();
        }

        @Override
        public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
            Log.e(MainActivity.TAG, "WebView Resource Error: " + request.getUrl() + " -> " + error.getDescription());
        }

        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
            Uri uri = request.getUrl();
            String host = uri.getHost();

            // Intercept all local virtual asset domain requests directly from memory
            if (host != null && (
                host.equalsIgnoreCase("appassets.androidplatform.net") ||
                host.equalsIgnoreCase("appassets.davportal.local") ||
                host.equalsIgnoreCase("localhost") ||
                host.equalsIgnoreCase("127.0.0.1")
            )) {
                // Handle CORS preflight OPTIONS
                if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
                    WebResourceResponse preflight = new WebResourceResponse("text/plain", "UTF-8", new ByteArrayInputStream(new byte[0]));
                    Map<String, String> h = new HashMap<>();
                    h.put("Access-Control-Allow-Origin", "*");
                    h.put("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD");
                    h.put("Access-Control-Allow-Headers", "*");
                    preflight.setResponseHeaders(h);
                    return preflight;
                }

                String path = uri.getPath();
                if (path == null || path.isEmpty() || path.equals("/")) {
                    path = "index.html";
                } else if (path.startsWith("/")) {
                    path = path.substring(1);
                }

                int qIdx = path.indexOf('?');
                if (qIdx >= 0) path = path.substring(0, qIdx);
                int hIdx = path.indexOf('#');
                if (hIdx >= 0) path = path.substring(0, hIdx);

                path = Uri.decode(path);

                try {
                    InputStream stream = act.getAssets().open(path);
                    String mime = MainActivity.getMimeType(path);
                    String encoding = (mime.startsWith("text/") || mime.equals("application/javascript") || mime.equals("application/json")) ? "UTF-8" : null;
                    Map<String, String> headers = new HashMap<>();
                    headers.put("Access-Control-Allow-Origin", "*");
                    headers.put("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD");
                    headers.put("Access-Control-Allow-Headers", "*");
                    headers.put("Cache-Control", "no-cache");
                    WebResourceResponse response = new WebResourceResponse(mime, encoding, stream);
                    response.setResponseHeaders(headers);
                    return response;
                } catch (IOException e) {
                    // SPA route navigation fallback: return index.html for extension-less routes
                    if (!path.contains(".")) {
                        try {
                            InputStream stream = act.getAssets().open("index.html");
                            Map<String, String> headers = new HashMap<>();
                            headers.put("Access-Control-Allow-Origin", "*");
                            headers.put("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD");
                            headers.put("Access-Control-Allow-Headers", "*");
                            headers.put("Cache-Control", "no-cache");
                            WebResourceResponse response = new WebResourceResponse("text/html", "UTF-8", stream);
                            response.setResponseHeaders(headers);
                            return response;
                        } catch (IOException ignored) {}
                    }

                    // On-Demand Cloud Streaming: If asset is not bundled in the lightweight APK,
                    // stream it live from the official DAV Dictionary Cloud CDN!
                    try {
                        String cloudUrl = "https://thedavdictionary.vercel.app/" + path;
                        Log.i(MainActivity.TAG, "On-Demand Cloud Stream: " + cloudUrl);
                        URL url = new URL(cloudUrl);
                        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                        conn.setRequestProperty("User-Agent", "DAVSmartPortalApp/1.0.0 (Android-APK; CloudStream)");
                        conn.setConnectTimeout(8000);
                        conn.setReadTimeout(20000);
                        if (conn.getResponseCode() == 200) {
                            InputStream cloudStream = conn.getInputStream();
                            String mime = MainActivity.getMimeType(path);
                            String enc = (mime.startsWith("text/") || mime.equals("application/javascript") || mime.equals("application/json")) ? "UTF-8" : null;
                            WebResourceResponse cloudResp = new WebResourceResponse(mime, enc, cloudStream);
                            Map<String, String> h = new HashMap<>();
                            h.put("Access-Control-Allow-Origin", "*");
                            cloudResp.setResponseHeaders(h);
                            return cloudResp;
                        }
                    } catch (Exception cloudErr) {
                        Log.w(MainActivity.TAG, "Cloud stream fallback notice: " + cloudErr.getMessage());
                    }
                    Log.w(MainActivity.TAG, "Asset not found in APK assets or Cloud CDN: " + path);
                }
            }
            return super.shouldInterceptRequest(view, request);
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            Uri uri = request.getUrl();
            String scheme = uri.getScheme();
            String host = uri.getHost();

            if (scheme != null && (scheme.equals("tel") || scheme.equals("mailto") || scheme.equals("sms") || scheme.equals("whatsapp"))) {
                try {
                    act.startActivity(new Intent(Intent.ACTION_VIEW, uri));
                    return true;
                } catch (Exception ignored) {}
            }

            if (host != null && (
                host.equalsIgnoreCase("appassets.androidplatform.net") ||
                host.contains("docs.google.com") ||
                host.contains("vercel.app")
            )) {
                return false;
            }

            return false;
        }
    }

    public static class LocalChromeClient extends WebChromeClient {
        private final MainActivity act;
        public LocalChromeClient(MainActivity a) { this.act = a; }

        @Override
        public boolean onConsoleMessage(ConsoleMessage cm) {
            Log.d(MainActivity.TAG, "[Console " + cm.messageLevel() + "] " + cm.message() + " (" + cm.sourceId() + ":" + cm.lineNumber() + ")");
            return true;
        }

        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            if (newProgress < 100) {
                act.mProgressBar.setVisibility(View.VISIBLE);
                act.mProgressBar.setProgress(newProgress);
            } else {
                act.mProgressBar.setVisibility(View.GONE);
            }
        }

        @Override
        public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
            if (act.mUploadCallback != null) {
                act.mUploadCallback.onReceiveValue(null);
            }
            act.mUploadCallback = filePathCallback;

            try {
                Intent intent = fileChooserParams.createIntent();
                act.startActivityForResult(intent, MainActivity.FILE_CHOOSER_REQUEST_CODE);
                return true;
            } catch (Exception e) {
                act.mUploadCallback = null;
                return false;
            }
        }

        @Override
        public void onPermissionRequest(PermissionRequest request) {
            request.grant(request.getResources());
        }
    }

    public static class LocalDownloadListener implements DownloadListener {
        private final MainActivity act;
        public LocalDownloadListener(MainActivity a) { this.act = a; }

        @Override
        public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimeType, long contentLength) {
            // Suppress downloads for inline PDF viewer streams to keep reading experience inside the app
            if (url != null && (url.contains("docs.google.com/viewer") || url.contains("embedded=true") || url.contains("view_in_app=true"))) {
                Log.i(MainActivity.TAG, "Suppressing download for in-app inline PDF viewer: " + url);
                return;
            }

            try {
                DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
                request.setMimeType(mimeType);
                request.allowScanningByMediaScanner();
                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                String fileName = URLUtil.guessFileName(url, contentDisposition, mimeType);
                request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName);

                DownloadManager dm = (DownloadManager) act.getSystemService(Context.DOWNLOAD_SERVICE);
                if (dm != null) {
                    dm.enqueue(request);
                    Toast.makeText(act, "Downloading " + fileName + "...", Toast.LENGTH_SHORT).show();
                }
            } catch (Exception e) {
                Toast.makeText(act, "Download notice: " + e.getMessage(), Toast.LENGTH_SHORT).show();
            }
        }
    }
}
`;
  fs.writeFileSync(path.join(srcDir, 'MainActivity.java'), javaContent);
  console.log('✅ MainActivity.java authored.');

  const serviceContent = `package com.davsmartportal.app;

import android.accessibilityservice.AccessibilityService;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.accessibility.AccessibilityEvent;
import java.util.Set;

public class FocusBlockerAccessibilityService extends AccessibilityService {

    public static final String TAG = "DAV_FOCUS_SERVICE";
    public static final String PREFS_NAME = "dav_focus_prefs";
    public static final String KEY_BLOCKED_PKGS = "blocked_packages";
    public static final String KEY_FOCUS_ACTIVE = "focus_active";

    private static FocusBlockerAccessibilityService sInstance = null;

    public static boolean isServiceRunning() {
        return sInstance != null;
    }

    @Override
    public void onServiceConnected() {
        super.onServiceConnected();
        sInstance = this;
        Log.i(TAG, "DAV ReGain Focus Blocker Accessibility Service connected!");
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        if (event == null) return;
        if (event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            CharSequence pkgName = event.getPackageName();
            if (pkgName == null) return;
            String pkg = pkgName.toString();

            if (pkg.equals(getPackageName()) || 
                pkg.contains("launcher") || 
                pkg.contains("systemui") || 
                pkg.contains("settings") || 
                pkg.contains("inputmethod")) {
                return;
            }

            try {
                SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
                boolean isFocusActive = prefs.getBoolean(KEY_FOCUS_ACTIVE, false);
                Set<String> blockedSet = prefs.getStringSet(KEY_BLOCKED_PKGS, null);

                if (blockedSet != null && blockedSet.contains(pkg)) {
                    Log.w(TAG, "INTERCEPTED BLOCKED APP: " + pkg);
                    performGlobalAction(GLOBAL_ACTION_HOME);

                    Intent intent = new Intent(this, MainActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
                    intent.putExtra("blocked_package", pkg);
                    intent.putExtra("timestamp", System.currentTimeMillis());
                    startActivity(intent);
                }
            } catch (Exception ignored) {}
        }
    }

    @Override
    public void onInterrupt() {
        Log.w(TAG, "DAV ReGain Focus Blocker interrupted");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        sInstance = null;
    }
}
`;
  fs.writeFileSync(path.join(srcDir, 'FocusBlockerAccessibilityService.java'), serviceContent);
  console.log('✅ FocusBlockerAccessibilityService.java authored.');

  // 7. Step A: Compile Android Resources via AAPT2
  log(7, 'Compiling Android Resources with AAPT2');
  const compiledResZip = path.join(outBuildDir, 'compiled_res.zip');
  execSync(`"${AAPT2}" compile --dir "${resDir}" -o "${compiledResZip}"`, { stdio: 'inherit' });
  console.log('✅ Resources compiled into archive.');

  // 8. Step B: Link Resources with AAPT2
  log(8, 'Linking APK Package with AAPT2');
  const unalignedApk = path.join(outBuildDir, 'unaligned.apk');
  const manifestPath = path.join(BUILD_DIR, 'AndroidManifest.xml');
  const javaOutDir = path.join(BUILD_DIR, 'gen');
  ensureDir(javaOutDir);

  const aaptLinkCmd = `"${AAPT2}" link -I "${ANDROID_JAR}" --manifest "${manifestPath}" -o "${unalignedApk}" "${compiledResZip}" --auto-add-overlay --java "${javaOutDir}"`;
  execSync(aaptLinkCmd, { stdio: 'inherit' });
  console.log('✅ unaligned.apk linked with resources.');

  // 9. Step C: Compile Java Sources with javac
  log(9, 'Compiling Java Source Code');
  const classesDir = path.join(outBuildDir, 'classes');
  if (fs.existsSync(classesDir)) fs.rmSync(classesDir, { recursive: true, force: true });
  ensureDir(classesDir);

  const javaFiles = [
    path.join(srcDir, 'MainActivity.java'),
    path.join(srcDir, 'FocusBlockerAccessibilityService.java'),
    path.join(javaOutDir, 'com', 'davsmartportal', 'app', 'R.java')
  ].map(f => `"${f}"`).join(' ');

  const javacCmd = `javac -source 8 -target 8 -cp "${ANDROID_JAR}" -d "${classesDir}" ${javaFiles}`;
  execSync(javacCmd, { stdio: 'inherit' });
  console.log('✅ Java source files compiled to bytecode.');

  // 10. Step D: Convert Bytecode to Dalvik Executable (classes.dex) via D8
  log(10, 'Generating classes.dex via D8');
  const dexDir = path.join(outBuildDir, 'dex');
  if (fs.existsSync(dexDir)) fs.rmSync(dexDir, { recursive: true, force: true });
  ensureDir(dexDir);

  const d8Jar = path.join(BUILD_TOOLS, 'lib', 'd8.jar');
  const classFiles = fs.readdirSync(path.join(classesDir, 'com', 'davsmartportal', 'app'))
    .filter(f => f.endsWith('.class'))
    .map(f => `"${path.join(classesDir, 'com', 'davsmartportal', 'app', f)}"`)
    .join(' ');

  const d8Cmd = `java -cp "${d8Jar}" com.android.tools.r8.D8 --lib "${ANDROID_JAR}" --min-api 24 --output "${dexDir}" ${classFiles}`;
  execSync(d8Cmd, { stdio: 'inherit' });
  console.log('✅ classes.dex generated successfully.');

  // 11. Step E: Insert classes.dex AND sleek assets/ into unaligned.apk via jar
  log(11, 'Injecting classes.dex and Featherweight Web Assets into APK Archive');
  const dexFile = path.join(dexDir, 'classes.dex');

  // Retry helper to handle transient Windows antivirus / file indexer locks on unaligned.apk
  function execSyncRetry(cmd, maxRetries = 5, delayMs = 1200) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        execSync(cmd, { stdio: 'inherit' });
        return;
      } catch (err) {
        if (attempt === maxRetries) throw err;
        console.log(`[Notice] Attempt ${attempt} encountered lock, waiting ${delayMs}ms before retry...`);
        const start = Date.now();
        while (Date.now() - start < delayMs) {}
      }
    }
  }

  // Brief pause before jar tool runs
  const preStart = Date.now();
  while (Date.now() - preStart < 1500) {}

  execSyncRetry(`jar uf "${unalignedApk}" -C "${dexDir}" classes.dex`);
  execSyncRetry(`jar uf "${unalignedApk}" -C "${BUILD_DIR}" assets`);
  console.log('✅ classes.dex and sleek web assets injected with POSIX forward slashes.');

  // 12. Step F: Zipalign APK (4-byte alignment)
  log(12, 'Aligning APK on 4-byte Boundaries with zipalign');
  const alignedApk = path.join(outBuildDir, 'aligned.apk');
  if (fs.existsSync(alignedApk)) fs.unlinkSync(alignedApk);
  execSync(`"${ZIPALIGN}" -f -p 4 "${unalignedApk}" "${alignedApk}"`, { stdio: 'inherit' });
  console.log('✅ APK successfully zipaligned.');

  // 13. Step G: Generate Keystore if Needed
  log(13, 'Managing Signing Keystore');
  const keystorePath = path.join(BUILD_DIR, 'davportal.keystore');
  const KEY_PASS = 'davportal2026';
  const KEY_ALIAS = 'davkey';

  if (!fs.existsSync(keystorePath)) {
    console.log('Generating production release keystore...');
    const keytoolCmd = `keytool -genkeypair -v -keystore "${keystorePath}" -storepass ${KEY_PASS} -alias ${KEY_ALIAS} -keypass ${KEY_PASS} -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=DAV Smart Portal, OU=Education, O=DAV School, L=New Delhi, ST=Delhi, C=IN"`;
    execSync(keytoolCmd, { stdio: 'inherit' });
    console.log('✅ Release keystore generated.');
  } else {
    console.log('✅ Using existing release keystore.');
  }

  // 14. Step H: Sign APK with apksigner (v1, v2, v3 schemes)
  log(14, 'Signing APK with apksigner (v1, v2, v3 schemes)');
  if (fs.existsSync(FINAL_APK_PATH)) fs.unlinkSync(FINAL_APK_PATH);
  
  const apksignerJar = path.join(BUILD_TOOLS, 'lib', 'apksigner.jar');
  const signCmd = `java -jar "${apksignerJar}" sign --ks "${keystorePath}" --ks-pass pass:${KEY_PASS} --key-pass pass:${KEY_PASS} --ks-key-alias ${KEY_ALIAS} --out "${FINAL_APK_PATH}" "${alignedApk}"`;
  execSync(signCmd, { stdio: 'inherit' });
  console.log(`✅ APK signed and written to: ${FINAL_APK_PATH}`);

  // 15. Step I: Verify APK Signature
  log(15, 'Verifying APK Signature and Integrity');
  const verifyCmd = `java -jar "${apksignerJar}" verify --verbose "${FINAL_APK_PATH}"`;
  execSync(verifyCmd, { stdio: 'inherit' });
  console.log('✅ APK verification passed with flying colors!');

  // Copy to public/ for web downloading
  fs.copyFileSync(FINAL_APK_PATH, PUBLIC_APK_PATH);
  console.log(`✅ Also copied to public folder: ${PUBLIC_APK_PATH}`);

  // Also copy to artifacts directory for direct user download
  const artifactDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\66051132-6dcc-49cb-b887-35e6eae2037b';
  if (fs.existsSync(artifactDir)) {
    fs.copyFileSync(FINAL_APK_PATH, path.join(artifactDir, FINAL_APK_NAME));
    console.log(`✅ Also copied to conversation artifact directory.`);
  }

  const apkStats = fs.statSync(FINAL_APK_PATH);
  const sizeMb = (apkStats.size / (1024 * 1024)).toFixed(2);
  const sizeKb = (apkStats.size / 1024).toFixed(0);

  console.log(`\n🎉🎉🎉 FEATHERWEIGHT BUILD COMPLETE! 🎉🎉🎉`);
  console.log(`📦 APK File: ${FINAL_APK_NAME}`);
  console.log(`📏 File Size: ${sizeMb} MB (${sizeKb} KB)`);
  console.log(`📍 Local Path: ${FINAL_APK_PATH}`);
  console.log(`🌐 Public Web Path: ${PUBLIC_APK_PATH}`);
}

main().catch(err => {
  console.error('\n❌ BUILD FAILED:', err);
  process.exit(1);
});
