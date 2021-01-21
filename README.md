
```
lucky_project
├─ .buckconfig
├─ .eslintrc.js
├─ .flowconfig
├─ .gitattributes
├─ .gitignore
├─ .prettierrc.js
├─ .watchmanconfig
├─ android
│  ├─ app
│  │  ├─ build_defs.bzl
│  │  ├─ proguard-rules.pro
│  │  ├─ src
│  │  │  ├─ debug
│  │  │  │  ├─ AndroidManifest.xml
│  │  │  │  └─ java
│  │  │  │     └─ com
│  │  │  │        └─ lucky_project
│  │  │  │           └─ ReactNativeFlipper.java
│  │  │  └─ main
│  │  │     ├─ AndroidManifest.xml
│  │  │     ├─ assets
│  │  │     │  ├─ fonts
│  │  │     │  │  └─ iconfont.ttf
│  │  │     │  └─ index.android.bundle
│  │  │     ├─ java
│  │  │     │  └─ com
│  │  │     │     └─ lucky_project
│  │  │     │        ├─ MainActivity.java
│  │  │     │        └─ MainApplication.java
│  │  │     └─ res
│  │  │        ├─ drawable-hdpi
│  │  │        │  └─ node_modules_reactnavigation_stack_src_views_assets_backicon.png
│  │  │        ├─ drawable-mdpi
│  │  │        │  ├─ node_modules_reactnativedatepicker_date_icon.png
│  │  │        │  ├─ node_modules_reactnativeratings_src_images_airbnbstar.png
│  │  │        │  ├─ node_modules_reactnativeratings_src_images_airbnbstarselected.png
│  │  │        │  ├─ node_modules_reactnativeratings_src_images_bell.png
│  │  │        │  ├─ node_modules_reactnativeratings_src_images_heart.png
│  │  │        │  ├─ node_modules_reactnativeratings_src_images_rocket.png
│  │  │        │  ├─ node_modules_reactnativeratings_src_images_star.png
│  │  │        │  ├─ node_modules_reactnavigation_stack_src_views_assets_backicon.png
│  │  │        │  ├─ node_modules_reactnavigation_stack_src_views_assets_backiconmask.png
│  │  │        │  ├─ node_modules_teaset_icons_back.png
│  │  │        │  ├─ node_modules_teaset_icons_check.png
│  │  │        │  ├─ node_modules_teaset_icons_checked.png
│  │  │        │  ├─ node_modules_teaset_icons_empty.png
│  │  │        │  ├─ node_modules_teaset_icons_fail.png
│  │  │        │  ├─ node_modules_teaset_icons_indicator.png
│  │  │        │  ├─ node_modules_teaset_icons_info.png
│  │  │        │  ├─ node_modules_teaset_icons_sad.png
│  │  │        │  ├─ node_modules_teaset_icons_search.png
│  │  │        │  ├─ node_modules_teaset_icons_select.png
│  │  │        │  ├─ node_modules_teaset_icons_smile.png
│  │  │        │  ├─ node_modules_teaset_icons_stop.png
│  │  │        │  ├─ node_modules_teaset_icons_success.png
│  │  │        │  ├─ node_modules_teaset_icons_unchecked.png
│  │  │        │  └─ src_res_img_tiger.jpg
│  │  │        ├─ drawable-xhdpi
│  │  │        │  ├─ node_modules_reactnavigation_stack_src_views_assets_backicon.png
│  │  │        │  ├─ node_modules_teaset_icons_check.png
│  │  │        │  ├─ node_modules_teaset_icons_checked.png
│  │  │        │  ├─ node_modules_teaset_icons_fail.png
│  │  │        │  ├─ node_modules_teaset_icons_indicator.png
│  │  │        │  ├─ node_modules_teaset_icons_info.png
│  │  │        │  ├─ node_modules_teaset_icons_sad.png
│  │  │        │  ├─ node_modules_teaset_icons_search.png
│  │  │        │  ├─ node_modules_teaset_icons_select.png
│  │  │        │  ├─ node_modules_teaset_icons_smile.png
│  │  │        │  ├─ node_modules_teaset_icons_stop.png
│  │  │        │  ├─ node_modules_teaset_icons_success.png
│  │  │        │  └─ node_modules_teaset_icons_unchecked.png
│  │  │        ├─ drawable-xxhdpi
│  │  │        │  ├─ node_modules_reactnavigation_stack_src_views_assets_backicon.png
│  │  │        │  ├─ node_modules_teaset_icons_check.png
│  │  │        │  ├─ node_modules_teaset_icons_checked.png
│  │  │        │  ├─ node_modules_teaset_icons_fail.png
│  │  │        │  ├─ node_modules_teaset_icons_indicator.png
│  │  │        │  ├─ node_modules_teaset_icons_info.png
│  │  │        │  ├─ node_modules_teaset_icons_sad.png
│  │  │        │  ├─ node_modules_teaset_icons_search.png
│  │  │        │  ├─ node_modules_teaset_icons_select.png
│  │  │        │  ├─ node_modules_teaset_icons_smile.png
│  │  │        │  ├─ node_modules_teaset_icons_stop.png
│  │  │        │  ├─ node_modules_teaset_icons_success.png
│  │  │        │  └─ node_modules_teaset_icons_unchecked.png
│  │  │        ├─ drawable-xxxhdpi
│  │  │        │  └─ node_modules_reactnavigation_stack_src_views_assets_backicon.png
│  │  │        ├─ mipmap-hdpi
│  │  │        │  ├─ ic_launcher.png
│  │  │        │  └─ ic_launcher_round.png
│  │  │        ├─ mipmap-mdpi
│  │  │        │  ├─ ic_launcher.png
│  │  │        │  └─ ic_launcher_round.png
│  │  │        ├─ mipmap-xhdpi
│  │  │        │  ├─ ic_launcher.png
│  │  │        │  └─ ic_launcher_round.png
│  │  │        ├─ mipmap-xxhdpi
│  │  │        │  ├─ ic_launcher.png
│  │  │        │  └─ ic_launcher_round.png
│  │  │        ├─ mipmap-xxxhdpi
│  │  │        │  ├─ ic_launcher.png
│  │  │        │  └─ ic_launcher_round.png
│  │  │        ├─ raw
│  │  │        │  ├─ app.json
│  │  │        │  ├─ node_modules_cssselect_lib_procedure.json
│  │  │        │  ├─ node_modules_csstree_data_patch.json
│  │  │        │  ├─ node_modules_csstree_package.json
│  │  │        │  ├─ node_modules_domserializer_foreignnames.json
│  │  │        │  ├─ node_modules_entities_lib_maps_decode.json
│  │  │        │  ├─ node_modules_entities_lib_maps_entities.json
│  │  │        │  ├─ node_modules_entities_lib_maps_legacy.json
│  │  │        │  ├─ node_modules_entities_lib_maps_xml.json
│  │  │        │  ├─ node_modules_mdndata_css_atrules.json
│  │  │        │  ├─ node_modules_mdndata_css_properties.json
│  │  │        │  ├─ node_modules_mdndata_css_syntaxes.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_antdesign.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_entypo.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_evilicons.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_feather.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_fontawesome.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_fontawesome5free.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_fontawesome5free_meta.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_fontisto.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_foundation.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_ionicons.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_materialcommunityicons.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_materialicons.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_octicons.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_simplelineicons.json
│  │  │        │  ├─ node_modules_reactnativevectoricons_glyphmaps_zocial.json
│  │  │        │  └─ src_res_city.json
│  │  │        └─ values
│  │  │           ├─ strings.xml
│  │  │           └─ styles.xml
│  │  └─ _BUCK
│  ├─ gradle
│  │  └─ wrapper
│  │     ├─ gradle-wrapper.jar
│  │     └─ gradle-wrapper.properties
│  ├─ gradle.properties
│  ├─ gradlew
│  └─ gradlew.bat
├─ App.js
├─ app.json
├─ babel.config.js
├─ index.js
├─ ios
│  ├─ lucky_project
│  │  ├─ AppDelegate.h
│  │  ├─ AppDelegate.m
│  │  ├─ Images.xcassets
│  │  │  ├─ AppIcon.appiconset
│  │  │  │  └─ Contents.json
│  │  │  └─ Contents.json
│  │  ├─ Info.plist
│  │  ├─ LaunchScreen.storyboard
│  │  └─ main.m
│  ├─ lucky_project-tvOS
│  │  └─ Info.plist
│  ├─ lucky_project-tvOSTests
│  │  └─ Info.plist
│  ├─ lucky_project.xcodeproj
│  │  ├─ project.pbxproj
│  │  └─ xcshareddata
│  │     └─ xcschemes
│  │        ├─ lucky_project-tvOS.xcscheme
│  │        └─ lucky_project.xcscheme
│  ├─ lucky_projectTests
│  │  ├─ Info.plist
│  │  └─ lucky_projectTests.m
│  └─ Podfile
├─ metro.config.js
├─ package.json
├─ react-native.config.js
├─ src
│  ├─ components
│  │  ├─ Emotion
│  │  │  ├─ datasource.js
│  │  │  ├─ emotions
│  │  │  │  ├─ aixin.png
│  │  │  │  ├─ aohuo.png
│  │  │  │  ├─ aoman.png
│  │  │  │  ├─ baiyan.png
│  │  │  │  ├─ baoquan.png
│  │  │  │  ├─ beishang.png
│  │  │  │  ├─ bianbian.png
│  │  │  │  ├─ bishi.png
│  │  │  │  ├─ bizui.png
│  │  │  │  ├─ buxie.png
│  │  │  │  ├─ cahan.png
│  │  │  │  ├─ caidao.png
│  │  │  │  ├─ daku.png
│  │  │  │  ├─ dangao.png
│  │  │  │  ├─ deyi.png
│  │  │  │  ├─ diaoxie.png
│  │  │  │  ├─ fa.png
│  │  │  │  ├─ fadai.png
│  │  │  │  ├─ fadou.png
│  │  │  │  ├─ fanu.png
│  │  │  │  ├─ faxiao.png
│  │  │  │  ├─ fendou.png
│  │  │  │  ├─ ganga.png
│  │  │  │  ├─ gaoxing.png
│  │  │  │  ├─ gouying.png
│  │  │  │  ├─ guilian.png
│  │  │  │  ├─ guzhang.png
│  │  │  │  ├─ haixiu.png
│  │  │  │  ├─ hanxiao.png
│  │  │  │  ├─ haqian.png
│  │  │  │  ├─ heiha.png
│  │  │  │  ├─ heshi.png
│  │  │  │  ├─ hongbao.png
│  │  │  │  ├─ huaixiao.png
│  │  │  │  ├─ ic_emoji.png
│  │  │  │  ├─ ic_emoji_del.png
│  │  │  │  ├─ ji.png
│  │  │  │  ├─ jianxiao.png
│  │  │  │  ├─ jiayou.png
│  │  │  │  ├─ jinkong.png
│  │  │  │  ├─ jinya.png
│  │  │  │  ├─ jiong.png
│  │  │  │  ├─ jizhi.png
│  │  │  │  ├─ kafei.png
│  │  │  │  ├─ kelian.png
│  │  │  │  ├─ kongju.png
│  │  │  │  ├─ koubi.png
│  │  │  │  ├─ kouzhao.png
│  │  │  │  ├─ kuaikule.png
│  │  │  │  ├─ kulu.png
│  │  │  │  ├─ kun.png
│  │  │  │  ├─ liuhan.png
│  │  │  │  ├─ liulei.png
│  │  │  │  ├─ liwu.png
│  │  │  │  ├─ meigui.png
│  │  │  │  ├─ nanguo.png
│  │  │  │  ├─ ok.png
│  │  │  │  ├─ piezui.png
│  │  │  │  ├─ pijiu.png
│  │  │  │  ├─ qiang.png
│  │  │  │  ├─ qiaoda.png
│  │  │  │  ├─ qingzhu.png
│  │  │  │  ├─ qinqin.png
│  │  │  │  ├─ quantou.png
│  │  │  │  ├─ ruo.png
│  │  │  │  ├─ se.png
│  │  │  │  ├─ shadai.png
│  │  │  │  ├─ shengli.png
│  │  │  │  ├─ shuai.png
│  │  │  │  ├─ shui.png
│  │  │  │  ├─ taiyang.png
│  │  │  │  ├─ tiaopi.png
│  │  │  │  ├─ tiaotiao.png
│  │  │  │  ├─ tu.png
│  │  │  │  ├─ tushetou.png
│  │  │  │  ├─ weiqu.png
│  │  │  │  ├─ weixiao.png
│  │  │  │  ├─ woshou.png
│  │  │  │  ├─ wulian.png
│  │  │  │  ├─ xiaoku.png
│  │  │  │  ├─ xigua.png
│  │  │  │  ├─ xinsui.png
│  │  │  │  ├─ xu.png
│  │  │  │  ├─ ye.png
│  │  │  │  ├─ yinxian.png
│  │  │  │  ├─ yiwen.png
│  │  │  │  ├─ yongbao.png
│  │  │  │  ├─ youhengheng.png
│  │  │  │  ├─ youxian.png
│  │  │  │  ├─ yueliang.png
│  │  │  │  ├─ yukuai.png
│  │  │  │  ├─ yun.png
│  │  │  │  ├─ zaijian.png
│  │  │  │  ├─ zhadan.png
│  │  │  │  ├─ zhouma.png
│  │  │  │  ├─ zhoumei.png
│  │  │  │  ├─ zhuakuang.png
│  │  │  │  ├─ zhuanquan.png
│  │  │  │  ├─ zhutou.png
│  │  │  │  ├─ ziya.png
│  │  │  │  ├─ zuichun.png
│  │  │  │  └─ zuohengheng.png
│  │  │  └─ index.js
│  │  ├─ IconFont
│  │  │  └─ index.js
│  │  ├─ LNButton
│  │  │  └─ index.js
│  │  └─ LNNav
│  │     └─ index.js
│  ├─ mobx
│  │  ├─ index.js
│  │  └─ userStore.js
│  ├─ nav.js
│  ├─ pages
│  │  ├─ account
│  │  │  ├─ login
│  │  │  │  └─ index.js
│  │  │  └─ userinfo
│  │  │     └─ index.js
│  │  ├─ circle
│  │  │  └─ home
│  │  │     ├─ components
│  │  │     │  └─ Custombar.js
│  │  │     ├─ index.js
│  │  │     ├─ latest
│  │  │     │  └─ index.js
│  │  │     └─ recommend
│  │  │        ├─ comment
│  │  │        │  └─ index.js
│  │  │        ├─ index.js
│  │  │        └─ publish
│  │  │           └─ index.js
│  │  ├─ friend
│  │  │  ├─ components
│  │  │  │  ├─ FilterPanel.js
│  │  │  │  ├─ FriendHead.js
│  │  │  │  ├─ PerfectBoy.js
│  │  │  │  └─ visitors.js
│  │  │  ├─ detail
│  │  │  │  └─ index.js
│  │  │  ├─ home
│  │  │  │  └─ index.js
│  │  │  ├─ near
│  │  │  │  └─ index.js
│  │  │  ├─ tancao
│  │  │  │  └─ index.js
│  │  │  └─ testsoul
│  │  │     ├─ index.js
│  │  │     ├─ testQA
│  │  │     │  └─ index.js
│  │  │     └─ testResult
│  │  │        └─ index.js
│  │  ├─ message
│  │  │  ├─ chat
│  │  │  │  └─ index.js
│  │  │  ├─ home
│  │  │  │  └─ index.js
│  │  │  └─ wechat
│  │  │     └─ index.js
│  │  ├─ self
│  │  │  └─ home
│  │  │     └─ index.js
│  │  └─ TestPage.js
│  ├─ res
│  │  ├─ city.json
│  │  ├─ font
│  │  │  ├─ icon.js
│  │  │  └─ svg.js
│  │  └─ img
│  │     ├─ headbg.png
│  │     ├─ headfriend.png
│  │     ├─ leve1.png
│  │     ├─ leve2.png
│  │     ├─ leve3.png
│  │     ├─ qabg.png
│  │     ├─ qatext.png
│  │     ├─ rectanglecopy.png
│  │     ├─ result.png
│  │     ├─ scan.gif
│  │     ├─ search.gif
│  │     ├─ showfirend.png
│  │     ├─ testsoul_bg.png
│  │     └─ tiger.jpg
│  ├─ tabbar.js
│  └─ utils
│     ├─ date.js
│     ├─ JMessage.js
│     ├─ pathMap.js
│     ├─ position.js
│     ├─ request.js
│     ├─ stylesKits.js
│     ├─ Toast.js
│     └─ validator.js
├─ yarn.lock
└─ __tests__
   └─ App-test.js

```