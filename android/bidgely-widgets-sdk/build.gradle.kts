import groovy.json.JsonOutput
import groovy.json.JsonSlurper

plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.bidgely.widgets"
    compileSdk = 37

    defaultConfig {
        minSdk = 26
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        consumerProguardFiles("consumer-rules.pro")
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    @Suppress("DEPRECATION")
    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true
    }

    androidResources {
        noCompress += listOf("js", "css", "html", "json", "woff", "woff2", "ttf", "svg")
    }

    testOptions {
        unitTests.isReturnDefaultValues = true
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.webkit)
    implementation(libs.gson)
    implementation(libs.okhttp)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.tooling.preview)

    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
}

val merakiWcSdkDir = rootProject.file("../../meraki/build/wc-sdk")
val webSampleWcSdkDir = rootProject.file("../webapps/react-js/public/wc-sdk")
val bidgelyAssetsDir = layout.projectDirectory.dir("src/main/assets/bidgely").asFile

fun resolveWcSdkSource(): File {
    if (merakiWcSdkDir.resolve("asset-manifest.json").isFile) {
        return merakiWcSdkDir
    }
    val webJs = webSampleWcSdkDir.resolve("static/js")
    if (webJs.listFiles()?.any { it.name.startsWith("main.") && it.name.endsWith(".js") } == true) {
        return webSampleWcSdkDir
    }
    if (merakiWcSdkDir.resolve("static/js").listFiles()?.any {
            it.name.startsWith("main.") && it.name.endsWith(".js")
        } == true
    ) {
        return merakiWcSdkDir
    }
    throw GradleException(
        """
        Bidgely wc-sdk bundles are missing. Sync them before building the Android SDK:
          Option A (recommended): cd ../../meraki && npm run buildSdk
          Option B: ensure webapps/react-js/public/wc-sdk/static/js contains main.*.js
        Then run: ./gradlew :bidgely-widgets-sdk:syncWcSdkAssets
        """.trimIndent(),
    )
}

fun buildSdkManifestFromMeraki(sourceDir: File): Map<String, String> {
    val manifestFile = sourceDir.resolve("asset-manifest.json")
    val root = JsonSlurper().parse(manifestFile) as Map<*, *>
    @Suppress("UNCHECKED_CAST")
    val files = root["files"] as Map<String, String>
    fun pathFor(key: String): String {
        val raw = files[key] ?: error("asset-manifest.json missing key: $key")
        return raw.removePrefix("/")
    }
    return mapOf(
        "runtime" to pathFor("runtime.js"),
        "vendor" to pathFor("vendor.js"),
        "mainCss" to pathFor("main.css"),
        "main" to pathFor("main.js"),
    )
}

fun buildSdkManifestFromStaticTree(sourceDir: File): Map<String, String> {
    val jsDir = sourceDir.resolve("static/js")
    val cssDir = sourceDir.resolve("static/css")
    val runtime = jsDir.listFiles()?.firstOrNull { it.name.startsWith("runtime.") && it.name.endsWith(".js") }
        ?: error("Missing runtime.*.js in ${jsDir.absolutePath}")
    val vendor = jsDir.listFiles()?.firstOrNull { it.name.startsWith("vendor.") && it.name.endsWith(".js") }
        ?: error("Missing vendor.*.js in ${jsDir.absolutePath}")
    val main = jsDir.listFiles()?.firstOrNull { it.name.startsWith("main.") && it.name.endsWith(".js") }
        ?: error("Missing main.*.js in ${jsDir.absolutePath}")
    val mainCss = cssDir.listFiles()?.firstOrNull { it.name.startsWith("main.") && it.name.endsWith(".css") }
        ?: error("Missing main.*.css in ${cssDir.absolutePath}")
    return mapOf(
        "runtime" to "static/js/${runtime.name}",
        "vendor" to "static/js/${vendor.name}",
        "main" to "static/js/${main.name}",
        "mainCss" to "static/css/${mainCss.name}",
    )
}

tasks.register<Sync>("syncWcSdkAssets") {
    group = "bidgely"
    description = "Copy wc-sdk bundles into SDK assets and write sdk-asset-manifest.json"

    val sourceDir = try {
        resolveWcSdkSource()
    } catch (_: Exception) {
        null
    }

    if (sourceDir != null) {
        from(sourceDir) {
            exclude("index.html", "hostedSdk.html", "asset-manifest.json")
        }
    }
    into(bidgelyAssetsDir)

    // Keep host.html which is a source file and our generated manifest
    preserve {
        include("host.html")
        include("sdk-asset-manifest.json")
    }

    doFirst {
        if (sourceDir == null) {
            resolveWcSdkSource() // This will throw the GradleException with instructions
        }
    }

    doLast {
        val finalSourceDir = sourceDir!!
        logger.lifecycle("Syncing wc-sdk from ${finalSourceDir.absolutePath}")

        val sdkManifest = if (finalSourceDir.resolve("asset-manifest.json").isFile) {
            buildSdkManifestFromMeraki(finalSourceDir)
        } else {
            buildSdkManifestFromStaticTree(finalSourceDir)
        }

        bidgelyAssetsDir.resolve("sdk-asset-manifest.json")
            .writeText(JsonOutput.prettyPrint(JsonOutput.toJson(sdkManifest)))

        val mainJs = bidgelyAssetsDir.resolve(sdkManifest["main"]!!)
        check(mainJs.isFile) {
            "Sync incomplete: ${mainJs.absolutePath} was not copied. Re-run syncWcSdkAssets."
        }
        logger.lifecycle("wc-sdk ready at ${bidgelyAssetsDir.absolutePath} (${sdkManifest["main"]})")
    }
}

tasks.named("preBuild") {
    dependsOn("syncWcSdkAssets")
}
