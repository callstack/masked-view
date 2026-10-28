// swift-tools-version: 6.0

import PackageDescription

let package = Package(
    name: "RNCMaskedView",
    platforms: [.iOS("15.1")],
    products: [
        .library(name: "RNCMaskedView", targets: ["RNCMaskedViewTarget"]),
    ],
    dependencies: [
        .package(name: "ReactNative", path: "../../../../xcframeworks"),
        .package(name: "React-GeneratedCode", path: "../../../ios"),
    ],
    targets: [
        .target(
            name: "RNCMaskedViewTarget",
            dependencies: [
                .product(name: "ReactHeaders", package: "ReactNative"),
                .product(name: "ReactNativeHeaders", package: "ReactNative"),
                .product(name: "ReactNativeDependenciesHeaders", package: "ReactNative"),
                .product(name: "ReactAppHeaders", package: "React-GeneratedCode"),
            ],
            path: "ios",
            exclude: ["RNCMaskedView.xcodeproj"],
            publicHeadersPath: ".",
            cSettings: [
                .define("RCT_NEW_ARCH_ENABLED", to: "1"),
                .headerSearchPath("."),
            ],
            cxxSettings: [
                .define("RCT_NEW_ARCH_ENABLED", to: "1"),
                .headerSearchPath("."),
                .define("DEBUG", .when(configuration: .debug)),
                .define("NDEBUG", .when(configuration: .release)),
            ],
            linkerSettings: [
                .linkedFramework("UIKit"),
                .linkedFramework("Foundation"),
                .linkedFramework("CoreGraphics"),
            ]
        ),
    ],
    cxxLanguageStandard: .cxx20
)
