console.log(Math.abs(Date.now() - new Date().getTime()));
/**
上周工作：登录编辑控件二轮的bug修复；
这周工作：和惠剑联调阿语搜索的功能；板书打点工具的ui界面，少林下单给我

问题1: 是不是一个完整的音频，还是 guid + 文字注释 这种json配置
问题2：文字稿跟注释是什么关系？如果文字稿有注释，则表明该文字稿需要进行打点，反之则不需要进行打点操作 不理解
问题3: 文字稿和标记的关系，案子上并没有新增编辑文字稿的功能
问题4: 不保存 和 取消 其实效果是一样的，是否简化成一个
问题5: 文字稿和 时间 是如何绑定的，是 文字稿的顺序 和 标记的顺序绑定的吗？ 如果是这样，只要标记的数量和文字稿的数量不一致，案子里没写
问题5: 是否完成打点操作的意思就是 标记数量 和 文件稿数量不一致

*/

/**
 * 博客园react博客
 * 1小时python
 * 1小时mysql，mybackend
 * 1小时reacthook
 * 1小时jq processon
 * 1小时c#，unity
 * pr，健身，旅游视频
 * sucai.com入库
 */

/**
 * 5月沉淀等
 * 写一个promise，写一个async await 完成
 * hook和setState的比较
 */

/**
 * 知识沉淀：
 *  vue3.0
 *  sprite base64，压缩，模糊
 * 
 * 下周知识分享：
 * Flutter
 * 
 * 历史记录
 * 
 * react 和 fp
 * 修复AI课件bug finished
 */

/**
 * d3.js 
 * flutter 
 * webassembly finished
 */

/**
 * next-step ：网站人物
 */

/**
 * 编辑器
 * 1.如果没有拖拽行为才视为点击()
 * 2.判断单击还是双击，双击打开三角模块的编辑菜单(定时器)
 * 3.拖动结束不能触发划线的事件(stopImmediatePropagation)
 * 4.双击不能触发划线事件
 * 5.移动过程中选中的三角鼠标可能滑到另一个更上层的三角导致移动的目标转移，需要记住一开始点击拖动时绑定的dom
 * 6.json串存储，而不是纯粹的数组等数据格式，防止内存过大
 * 7.点击判断三角形最近的点
 * 8.移动过程中和移动结束要同步三角形的位置信息
 */

/**
 * 1.跨域解决
 * 2.测试代码
 */
/**
 * 9月还是电子课本，uc过期自动刷新等逻辑；
 * 
 * 10月 和99u客户端还有服务端的参数联调，编写相应的wiki给客户端做单点登录；调研采用 serviceWorker 采用缓存的方案，修复藏经阁一期的bug；调整修复详情页物理回退白屏;藏经阁增加底部导航,导航配置调整；调通藏经阁客户端和h5的通信机制；
 * 11月 windows系统Edbox中转服务导出的 apke 和 exe 杀毒软件报警的问题，合并和调整原有功能代码联调；Edbox中转服务程序的bug；edbox sdk 项目调试 导出 apk 和 exe 功能；还有导出 exe 功能的加密
 * 12月 ，还有 Edbox 中转服务程序的 bug 修复和 dll 加秘；Edbox平台 Unity部分小游戏的 NDR2.0 的升级；体验糖果的h5部分 ui 弹窗；
 * 
 * 
 * 1月主要有 主要有 Edbox 游戏平台Unity部分小游戏的 NDR2.0 的升级，扫雷，三消，水果跑跳
 * 2月主要有 体验糖果的h5部分 ui 弹窗，还有后续有个h5的 阴影动画编辑器，包括颜色叠加功能和 描边，背景调色
 */

// 创新应用 ：
//    sdk 转 ts
//    登录逻辑简化优化
//    jquery 转 axios
//    webgl + opencv 的 getPerspectiveTransform
//    git-lab

// 创新应用: pdfjs 的pdf适应窗口
// 创新应用: pdfjs 和 epub 解析出相同的目录结构
// oop 喜欢将简单问题复杂化，鼓吹它的通用性；fp喜欢将复杂问题简单化，鼓吹它的灵活性；dop喜欢将任何问题数据化极简化
// 作业指导书: css3 2d 三角动画编辑器 1. 70% fp,30% oop, 0% dop;   2.大量使用 delegate 事件派发 而不是子元素批量绑事件（这种比如批量根据模板字符串则很容易顺手写成这样）; 3.右键取消编辑器，记住之前位置，拖动设计（这里绝对存在进化论一说了，早期只是单纯的隐藏显示，unity ）（三角形编辑器，图案编辑器，临摹图案编辑器；） ps中的图层设计；4.复用 div;5.图形变换过程中切换的速度也是可以实时调整的
// 作业指导书: css3 卡通人物 enum 钩子设计
// 作业指导书: 动画编辑器
// 作业指导书: pdfjs 的使用
// 案例库: pdfjs-dist/pdf.worker.entry.js

// 电子课本新增章节切换时节流功能;改写原有翻页自动更新进度逻辑; 优化原有翻页代码，减少代码复杂度;更改原有章节bug拖动修复方式，减少代码复杂度;修复 625945 bug等；
// 服务端接口变更，和美恩那边联调收藏书本功能接口变动； 4-20

// 电子课本浮窗改为非占满全屏；翻页设置节流修复一些epub库导致的偶发bug

// 电子课本调试632049bug，定位问题原因是页面跳转方式 webview 不支持导致的；
const a = { "status": 200, "success": true, "msg": "操作成功", "data": { "banner": [{ "createTime": "2020-08-22 11:05:50", "updateTime": "2021-01-28 13:03:30", "id": 229, "groupName": "yshop_home_banner", "value": "{\"imageArr\":[\"https://zhuanzhuanyanxuan.oss-cn-beijing.aliyuncs.com/671400C0AA454D6DAF30F96F7AA76861\"],\"name\":\"首页轮番图3\",\"id\":229,\"pic\":\"https://zhuanzhuanyanxuan.oss-cn-beijing.aliyuncs.com/671400C0AA454D6DAF30F96F7AA76861\",\"sort\":3,\"type\":0,\"url\":\"\",\"content\":\"<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;休闲食品</p>\",\"status\":1}", "type": 0, "sort": 3, "status": 1 }, { "createTime": "2020-08-22 11:06:54", "updateTime": "2021-01-23 16:59:37", "id": 232, "groupName": "yshop_home_banner", "value": "{\"imageArr\":[\"https://zhuanzhuanyanxuan.oss-cn-beijing.aliyuncs.com/951BD7DD50AF41AAB53B600F088D3E65\"],\"name\":\"首页轮番图2\",\"id\":232,\"pic\":\"https://zhuanzhuanyanxuan.oss-cn-beijing.aliyuncs.com/951BD7DD50AF41AAB53B600F088D3E65\",\"sort\":2,\"type\":0,\"url\":\"\",\"content\":\"<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 粮油调味</p>\",\"status\":1}", "type": 0, "sort": 2, "status": 1 }, { "createTime": "2020-08-22 11:06:13", "updateTime": "2021-01-23 16:59:01", "id": 230, "groupName": "yshop_home_banner", "value": "{\"imageArr\":[\"https://zhuanzhuanyanxuan.oss-cn-beijing.aliyuncs.com/D6CAA75AB0154FA8ABACDA3DF14945B6\"],\"name\":\"首页轮播图2\",\"id\":230,\"pic\":\"https://zhuanzhuanyanxuan.oss-cn-beijing.aliyuncs.com/D6CAA75AB0154FA8ABACDA3DF14945B6\",\"sort\":1,\"type\":0,\"url\":\"\",\"content\":\"<p style=\\\"text-align: center;\\\"><strong>首页轮播图2</strong></p>\",\"status\":1}", "type": 0, "sort": 1, "status": 1 }, { "createTime": "2020-08-22 11:06:34", "updateTime": "2021-01-23 17:02:12", "id": 231, "groupName": "yshop_home_banner", "value": "{\"imageArr\":[\"https://zhuanzhuanyanxuan.oss-cn-beijing.aliyuncs.com/B8E708A983B84675A3CEF25329F22EF6\"],\"name\":\"首页轮番图4\",\"id\":231,\"pic\":\"https://zhuanzhuanyanxuan.oss-cn-beijing.aliyuncs.com/B8E708A983B84675A3CEF25329F22EF6\",\"sort\":1,\"type\":0,\"url\":\"\",\"content\":\"<p style=\\\"text-align: center;\\\"><b>首页轮番图4</b></p>\",\"status\":1}", "type": 0, "sort": 1, "status": 1 }], "roll": [{ "uniapp_url": "/pages/shop/news/NewsList/index", "id": 182, "pic": "https://i.loli.net/2019/10/18/DqOUgNf7wjuFpPT.png", "sort": 3, "title": "分销、拼团、商户功能上线啦！", "url": "/news_list", "info": "牛年邀你一起 牛赚赚！", "wxapp_url": "/pages/shop/news/NewsList/main", "status": 1 }, { "uniapp_url": "", "id": 235, "sort": "2", "url": "", "info": "分享创收 0门槛0风险！", "wxapp_url": "", "status": 1 }, { "uniapp_url": "", "id": 244, "sort": "1", "url": "", "info": "严选品质  免费消费！", "wxapp_url": "", "status": 1 }], "mapKey": "I7EBZ-UF3AJ-GG6F5-K2OGL-Y25US-CEF7M" }, "time": "2021-04-27 11:17:45" }

// 首页ui重建，分类，轮播，吸顶；微信内分享页面的构建；

// 整个登录注册模块的构建；登录页；地区选择页；
// 分享链接没有图片显示；
// 分类页（广告位，推荐，销量，好评，自用省，分享赚）；购物车页面变化很小；
// 快速赚和购物券商城没有新的 ui

// 消息页（布局变化，商户的聊天对话框（之前是否有这个功能））；订单消息：物流，订单，用户，系统；（所有四大消息新增了子分类）
// 订单消息 新增可删除弹窗（应该是通用的）
// 新增促销活动模块（服务端）；
// 物流消息（新增 确认收货，查看订单，新增打电话拨打功能）

// 新增聊天模块（实时的im，在线客服）

// 新人攻略的样式修复（有用没用）；

// 快速赚和购物券商城没有新的 ui
// 消息页面分类消息下面的 消息是来自哪里？是显示哪个默认分类下的消息？


// 213

// del凭据
// del网盘

https://h5games.edbox-cn.101.com/1025672_2?channel=Default&uckey=QXV0aG9yaXphdGlvbjogTUFDIGlkPSI3RjkzOEIyMDVGODc2RkMzQUQ0NjhBOUQyRTEwOTNFOTRDMUIzRTUyRjNENUY1N0M5RTE3NkY4N0M1MEY3MDlEQzM4ODdDMDMwOThFQzEzNzdFQTFBRDAwNTNDOTQyMUQzMEE1M0Q5OUI1NDJDNjg4Iixub25jZT0iMTYyMjYxNjk1MjQzNzoyRVA5S0YyRCIsbWFjPSJXUTdYWTJwZHFKTVpkVGJZNjJaQnJuTTByR2p2b3RsSmhVeGlmT2FJZjA4PSIscmVxdWVzdF91cmk9Ii8iLGhvc3Q9ImZlaWdkamd5LjEwMS5jb20i

https://feigdjgy.101.com/uc-aq/index.html?sdp-app-id=b11ac627-ddde-408b-bd02-32523ee01351&send_uckey=true&redirect_uri=https%3A%2F%2Fh5games.edbox-cn.101.com%2F1025672_2%3Fchannel%3DDefault#/login


// 1月 龙骨动画web编辑器，人物描边，背景融合效果，修复 edbox ndr2.0的游戏；体验糖果
// 2月 主要是 ARKit 编辑器部分的 ui，和接入功能，联调
// 3月 AI课件缝合服务的 web 端部分，缝合课件颗粒，sdk改ts；电子课本bug修复和音频组件
// 4月 电子课本的视频组件；支持 pdf 阅读，进度，书签功能；缝合服务的局域网linux服务器的部署和上传

// mono 的使用
// tolua 的原理简介

// 坐标轴
// cubi
// tolua 的 coroutine 使用