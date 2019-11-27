// UtilBarn 粘合层接口， 提供给网编使用， 所有接口必须写ts
(function (namespace, className) {
    /**
     * UtilBarn 粘合层接口， 提供给网编使用， 所有接口必须写ts
     * 用于UtilBarn平台大厅的业务逻辑
     * @author 余晓(871129)
     * */
    var module = {

        BaseProductMap: new Dictionary(),

        /**
         * 粘合层初始化
         */
        Init: function (data, success, error) {
            UtilBarn.Action.User.GetUserInfo(function (data) {
                UtilBarn.LobbyService.Init(data, success, error);
            });
            if (UtilBarn.Guide.isOpen) {
                UtilBarn.Guide.InitGuide();
            }
        },
        /**
        * 举报作品
        * @param {object} data {
                        {string}gameId : 作品id, 
                        {string}playerId : 用户id
                        {string}gameVersion : 版本，例如：1.0.1
                        {string}reportContent : 举报内容
                        {string}reportDesc : 举报描述
                    }
        * @param {Function} success 成功回调
        * @param {Function} error 出错回调
        */
        ReportApp: function (data, success, error) {
            data.playerId = UtilBarn.EbUserId;
            UtilBarn.Api.MMO.ReportApp(data,
                function (data) {
                    if (data.errorcode === 0) {
                        data.message = "举报成功";
                        if (success) success(data);
                    } else {
                        if (error) error(data.msg);
                    }
                }, function (e) {
                    if (error) error(e);
                }
            );
        },
        /**
         * 修改用户个人信息
         * @param {Object} data {
                        {string}birthday : 生日, 如不传该参数则不修改该用户生日，格式如：2019-02-13，更改若小于限制弹出提示, 
                        {int}sex : 性别, 如不传该参数则不修改该用户性别，1男，2女 , 
                        {string}nick_name : 昵称, 如不传该参数或传空字符串则不修改该用户昵称, 
                        {string}head : 头像资源, 如不传该参数或传空字符串则不修改该用户头像, 
                    }
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        UpdateUserInfo: function (data, success, error) {
            if (data.head && data.head !== "") {
                UtilBarn.Action.User.UploadUserAvatar(data.head,
                    function () {
                        var demo = { "success": true };
                        var returnOb = { "data": demo };
                        if (success) success(returnOb);
                    },
                    function (e) {
                        if (error) error(e);
                    }
                );
            } else {
                UtilBarn.Action.User.UpdateUserInfo(data,
                    function () {
                        if (data.nick_name !== "") {
                            UtilBarn.Api.UC.SetUserNickName(UtilBarn.AccountId, data.nick_name, function () {
                                var demo = { "success": true };
                                var returnOb = { "data": demo };
                                if (success) success(returnOb);
                            },
                                function (e) {
                                    if (error) error(e);
                                });
                        } else {
                            var demo = { "success": true };
                            var returnOb = { "data": demo };
                            if (success) success(returnOb);
                        }
                    },
                    function (e) {
                        if (error) error(e);
                    }
                );
            }
        },
        /**
         * 获取用户数据
         * @param {Object} data {
                    {string}user_name : 用户昵称
                    {uint64}user_id : 用户ID
                    {string}user_avatar : 用户头像
                }
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        GetUserInfo: function (data, success, error) {
            UtilBarn.Action.User.GetUserInfo(
                function (data) {
                    UtilBarn.GetOrgInfo(function (org) {
                        var returnOb = UtilBarn.LobbyService.GetUserFomatData(data, org);
                        if (success) success(returnOb);
                    },
                        function (e) {
                            if (error) error(e);
                            console.log("get userinfo fail:" + e);
                        });
                },
                function (e) {
                    if (error) error(e);
                    console.log("get userinfo fail:" + e);
                });
        },
        /**
         * 获取固定的标签列表
         * @param {Object} data 对象
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        GetTagsList: function (data, success, error) {
            UtilBarn.LobbyService.GetTagsList(
                function (data) {
                    var tags = [];
                    for (var i = 0; i < data.taglist.length; i++) {
                        var tag = data.taglist[i];
                        var ob = new Object;
                        ob.id = tag.fatherid;
                        ob.value = tag.lvl2name;
                        tags.push(ob);
                    }
                    var returnOb = { "data": tags };
                    if (success) success(returnOb);
                },
                function (e) {
                    if (error) error(e);
                }
            );
        },

        /**
         * 获取作品推荐列表
         * @param {Object} data {
                    {int}recommand_type : recommand_type 1-填充在没有最近游戏记录情况下的推荐
                    {int}page : 分页参数，第N页，N从1开始，默认值1
                    {int}size : 分页参数, 每页大小，默认值10，size最大不能超过100
                }
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        GetRecommandApps: function (data, success, error) {
            var recommand_type = 1;
            var page = data.page;
            var size = data.size;
            if (data.size !== "" && typeof data.size !== "undefined") {
                if (data.size < 0) {
                    size = 0;
                }
                if (data.size > 100) {
                    size = 100;
                }
            }
            if (data.page !== "" && typeof data.page !== "undefined") {
                if (data.page < 1) {
                    page = 1;
                }
            }
            UtilBarn.Api.MMO.GetRecommandApps(recommand_type, page, size,
                function (apps) {
                    var returnOb = UtilBarn.LobbyService.GetAppsFomatData(apps);
                    if (success) success(returnOb);
                },
                function (e) {
                    if (error) error(e);
                }
            );
        },

        /**
         * 作品搜索接口-模板
         * @param {Object} data 对象
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        GetPlayRecord: function (data, success, error) {
            UtilBarn.Api.MMO.GetPlayRecord(
                function (apps) {
                    var returnOb = UtilBarn.LobbyService.GetPlayRecordAppsFomatData(apps);
                    if (success) success(returnOb);
                },
                function (e) {
                    if (error) error(e);
                }
            );
        },

        /**
         * 作品搜索接口-模板
         * @param {Object} data {
                {String} word 搜索文本内容，默认为空
                {int} page 分页参数，第N页，N从1开始，默认值1
                {int} size 分页参数, 每页大小，默认值20，size最大不能超过100
                {String} sorts 排序字段，!表示降序，多个之间用逗号（,）隔开 eg: sorts="!popular, releasetime"表示先按在线人数降序，再按游戏上线时间升序
                {String} searchPlatforms  "WINDOWS,WEB,ANDROID,IOS" 指定搜索平台参数默认为空字符串，查询所有平台，支持多平台查询，格式每种平台用逗号隔开
            }
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        SearchCreateApps: function (data, success, error) {
            var platforms = 'WEB,ANDROID';
            if (UtilBarn.Platform.IsPC) {
                platforms = 'WINDOWS,WEB_PC';
            }
            var word = "";
            var sorts = "!popular,releasetime";
            data.word.replace(" ", "");
            if (data.word !== "" && typeof data.word !== "undefined")
                word = data.word;

            var page = data.page;
            var size = data.size;
            if (data.size !== "" && typeof data.size !== "undefined") {
                if (data.size < 0) {
                    size = 0;
                }
                if (data.size > 100) {
                    size = 100;
                }
            }
            if (data.page !== "" && typeof data.page !== "undefined") {
                if (data.page < 1) {
                    page = 1;
                }
            }
            if (data.sorts !== "" && typeof data.sorts !== "undefined") {
                sorts = data.sorts === "!popular,releasetime" ? "!popular,releasetime" : "!releasetime,popular";
            }
            //         if(data.type!=""&&typeof(data.type)!="undefined"){
            //             type = data.type=="all" ? "all":data.type;
            //         }
            UtilBarn.Api.MMO.SearchBaseApps(word, page, size, sorts, platforms,
                function (apps) {
                    var returnOb = UtilBarn.LobbyService.GetBaseAppsFomatData(apps);
                    if (success) success(returnOb);
                },
                function (e) {
                    if (error) error(e);
                }
            );
        },

        /**
         * 作品搜索接口-体验区
         * @param {Object} data  {
                 {String} word 搜索文本内容，默认为空
                 {int} page 分页参数，第N页，N从1开始，默认值1
                 {int} size 分页参数, 每页大小，默认值20，size最大不能超过100
                 {String} sorts 排序字段，!表示降序，多个之间用逗号（,）隔开 eg: sorts="!popular, releasetime"表示先按在线人数降序，再按游戏上线时间升序
                 {String} type 预留参数，作品类型，默认为'all'
                 {String} searchPlatforms  "WINDOWS,WEB,ANDROID,IOS" 指定搜索平台参数默认为空字符串，查询所有平台，支持多平台查询，格式每种平台用逗号隔开
            }
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        SearchExperienceApps: function (data, success, error) {
            var platforms = 'WEB,ANDROID';
            if (UtilBarn.Platform.IsPC) {
                platforms = 'WINDOWS,WEB_PC';
            }
            var word = "";
            // var sorts = "!popular";
            data.word.replace(" ", "");
            if (data.word !== "" && typeof data.word !== "undefined")
                word = data.word;

            var page = data.page;
            var size = data.size;
            if (data.size !== "" && typeof data.size !== "undefined") {
                if (data.size < 0) {
                    size = 0;
                }
                if (data.size > 100) {
                    size = 100;
                }
            }
            if (data.page !== "" && typeof data.page !== "undefined") {
                if (data.page < 1) {
                    page = 1;
                }
            }
            //             if (data.sorts !== "" && typeof data.sorts !== "undefined") {
            //                 sorts = data.sorts === "!popular,releasetime" ? "!popular" : "!releasetime";
            //             }
            //         if(data.type!=""&&typeof(data.type)!="undefined"){
            //             type = data.type=="all" ? "all":data.type;
            //         }
            UtilBarn.Api.MMO.SearchExperienceApps(word, page, size, data.sorts, data.type, platforms,
                function (apps) {
                    var returnOb = UtilBarn.LobbyService.GetAppsFomatData(apps);
                    if (success) success(returnOb);
                },
                function (e) {
                    if (error) error(e);
                }
            );
        },

        /**
         * 获取体验区作品详情
         * @param {Object} data {appid 作品id}
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        GetExperienceAppInfo: function (data, success, error) {
            UtilBarn.Api.MMO.GetAppInfo(data.appid, function (appinfo) {
                if (appinfo) {
                    if (!module.BaseProductMap.ContainsKey(appinfo.app_id)) {
                        var baseProduct = new Object;
                        baseProduct.baseid = appinfo.baseid;
                        baseProduct.base_version = appinfo.base_version;
                        module.BaseProductMap.Set(appinfo.app_id, baseProduct);
                    }

                    UtilBarn.Api.MMO.GetTryPlayingInfo(data.appid, 3, 0, "", function (appResInfo) {
                        var returnData = UtilBarn.LobbyService.GetAppFomatData(appinfo, appResInfo);
                        if (success) success(returnData);
                    }, function (e) {
                        if (error) error(e);
                    });
                } else {
                    if (error) error("GetAppInfo null");
                }
            }, function (e) {
                if (error) error(e);
            });
        },

        /**
         * 作品评价打分
         * @param {Object} data {
                        *{string}appid : 作品id, 
                        *{int}score : 评价，例如： 4 代表四星, 
                        *{string}version : 版本，例如：1.0.1
                    }
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        SetAppScore: function (data, success, error) {
            var scoreData = new Object;
            scoreData.app_id = data.appid;
            scoreData.score = data.score;
            scoreData.version = data.version;
            UtilBarn.LobbyService.SetAppScore(scoreData,
                function (data) {
                    data.message = "评分成功";
                    if (success) success(data);
                },
                function (e) {
                    if (error) error(e);
                }
            );
        },

        /**
         * 获取用户评分
         * @param {Object} data {
                        *{string}appid : 作品id
                    }
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        GetUserScoreInfo: function (data, success, error) {
            UtilBarn.Api.MMO.GetUserScoreInfo(data.appId, UtilBarn.EbUserId, "",
                function (scoreInfo) {
                    var scoreOb = new Object();
                    scoreOb.score = scoreInfo.score;
                    var result = { "data": scoreOb };
                    if (success) success(result);
                },
                function (e) {
                    if (error) error(e);
                }
            );
        },

        /**
         * 获取用户收藏列表
         * @param {Object} data  {page: 分页参数，第N页，N从1开始，默认值1 ,size: 分页参数, 每页大小，默认值10，size最大不能超过100}
         * @param {Function} success 成功回调,带服务端返回对象
         * @param {Function} error 出错回调
         */
        GetUserCollectApps: function (data, success, error) {

            var page = data.page;
            var size = data.size;
            if (data.size !== "" && typeof data.size !== "undefined") {
                if (data.size < 0) {
                    size = 0;
                }
                if (data.size > 100) {
                    size = 100;
                }
            }
            if (data.page !== "" && typeof data.page !== "undefined") {
                if (data.page < 1) {
                    page = 1;
                }
            }
            UtilBarn.Api.MMO.GetUserCollectApps(page, size, function (apps) {
                if (apps) {
                    var data = UtilBarn.LobbyService.GetUserCollectAppsFormatData(apps);
                    if (success) success(data);
                } else {
                    if (error) error("GetTags null");
                }
            }, function (e) { if (error) error(e); });
        },

        /**
         * 收藏作品
         * @param {JSON} data {
                    {string} appid 作品id
                }
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        CollectApp: function (data, success, error) {
            var appid = data.appid;
            UtilBarn.Api.MMO.CollectApp(data.appid,
                function (data) {
                    data.message = "收藏成功";

                    // 云图埋点
                    UtilBarn.DataStatistic.CollectGame(appid);

                    if (success) success(data);
                },
                function (e) {
                    if (error) error(e);
                }
            );
        },
        /**
         * 取消收藏作品
         * @param {JSON} data {
                    {string} app_id 作品id
                }
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        CancelCollectApp: function (data, success, error) {
            UtilBarn.Api.MMO.CancelCollectApp(data.appid,
                function (data) {
                    data.message = "取消收藏成功";
                    if (success) success(data);
                },
                function (e) {
                    if (error) error(e);
                }
            );
        },

        /**
         * 获取标签数据
         * @param {any} data 数据
         * @param {any} success 成功回调
         * @param {any} error 失败回调
         */
        GetAppTags: function (data, success, error) {
            UtilBarn.Api.MMO.GetTags(data.appid, function (taginfo) {
                if (taginfo) {
                    var data = UtilBarn.LobbyService.GetTagsFormatData(taginfo);
                    if (success) success(data);
                } else {
                    if (error) error("GetTags null");
                }
            }, function (e) { if (error) error(e); });
        },
        /**
         * 获取作品最近更新
         * @param {any} data 数据
         * @param {any} success 成功回调
         * @param {any} error 失败回调
         */
        GetGameRecentUpdates: function (data, success, error) {
            UtilBarn.Api.MMO.GetAppHistory(data.appid, function (updateDatas) {
                if (updateDatas) {
                    var data = new Array();
                    for (var i = 0; i < updateDatas.length; i++) {
                        var item = new Object;
                        item.ver = updateDatas[i].version;
                        item.brief = updateDatas[i].introduction;
                        item.details = updateDatas[i].update_content;
                        data.push(item);
                    }
                    if (success) success(data);
                } else {
                    if (error) error("GetAppHistory null");
                }
            }, function (e) {
                if (error) error(e);
            });
        },

        /**
         * 获取作品模板
         * @param {any} data 数据
         * @param {any} success 成功回调
         * @param {any} error 失败回调
         */
        GetGameOriginalTpl: function (data, success, error) {
            var platforms = 'WEB,ANDROID';
            if (UtilBarn.Platform.IsPC) {
                platforms = 'WINDOWS,WEB_PC';
            }
            UtilBarn.Api.MMO.GetBaseFitAppInfo(data.baseid, platforms, data.base_version, function (appinfo) {
                if (appinfo) {
                    var data = UtilBarn.LobbyService.GetBaseAppFomatData(appinfo);
                    if (success) success(data);
                } else {
                    if (error) error("GetBaseAppInfo null");
                }
            }, function (e) {
                if (error) error(e);
            });
        },

        /**
         * 获取作品推荐
         * @param {any} data 数据
         * @param {any} success 成功回调
         * @param {any} error 失败回调
         */
        GetGameSameTpl: function (data, success, error) {
            UtilBarn.Api.MMO.GetRecommandAppsByAppId(data.appid, function (appinfos) {
                if (appinfos) {
                    var data = UtilBarn.LobbyService.GetRecommandAppsFomatData(appinfos);
                    if (success) success(data);
                } else {
                    if (error) error("GetRecommandAppsByAppId null");
                }
            }, function (e) {
                if (error) error(e);
            });
        },
        /**
         * 获取个人作品详情
         */
        GetPersonalAppInfo: function (data, success, error) {
            UtilBarn.Api.MMO.GetPersonalAppInfo(data.appid, function (appinfo) {
                if (appinfo) {
                    UtilBarn.Api.MMO.GetTryPlayingInfo(data.appid, 2, 0, "", function (appResInfo) {
                        var data = UtilBarn.LobbyService.GetPersonalAppFomatData(appinfo, appResInfo);
                        if (success) success(data);
                    }, function (e) {
                        if (error) error(e);
                    });
                } else {
                    if (error) error("GetPersonalAppInfo null");
                }
            }, function (e) {
                if (error) error(e);
            });
        },
        /**
         * 根据资源id获取图片地址
         */
        GetImage: function (data, success, error) {
            UtilBarn.LobbyService.GetImage(data.resourceId, function (url) {
                if (success) success(url);
            }, function (e) {
                if (error) error(e);
            });
        },

        /**
         * 获取大厅个人作品编辑列表
         * @param {Object} data {{int}page 页码
         *                 {int}size:每页个数 
         *                 {string}sorts:}
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        GetPersonalEditorApps: function (data, success, error) {
            var sorts = "!popular,!releasetime";
            UtilBarn.LobbyService.GetPersonalEditorApps(data.page, data.size, sorts, success, error);
        },

        /**
         * 获取大厅个人作品发布列表
         * @param {Object} data {{int}page 页码
         *                 {int}size:每页个数 
         *                 {string}sorts:}
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        GetPersonalPublishApps: function (data, success, error) {
            var sorts = "!popular,!releasetime";
            UtilBarn.LobbyService.GetPersonalPublishApps(data.page, data.size, sorts, success, error);
        },

        /**
         * 重名个人作品
         * @param {Object} data {{string} new_name 新名字
         *                 {string} app_id 作品id
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        RenamePersonalAppName: function (data, success, error) {
            UtilBarn.LobbyService.RenamePersonalAppName(data.app_id, data.new_name, success, error);
        },

        /**
         * 下架游戏
         * @param {Object} data {app_id 作品id
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        SoldoutPersonalApp: function (data, success, error) {
            UtilBarn.LobbyService.SoldoutPersonalApp(data.app_id, success, error);
        },

        /**
         * 删除作品
         * @param {Object} data {app_id 作品id
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        DeletePersonalApp: function (data, success, error) {
            UtilBarn.LobbyService.DeletePersonalApp(data.app_id, success, error);
        },

        /*
         * 获取大厅个人作品发布列表
         * @param {Object} data {{string} curName 新名字
         *                 {string} app_id 作品id
         *                 {string} version 作品版本
         * @param {Function} success 
         * @param {Function} error 
         */
        CopyPersonalApp: function (data, success, error) {
            UtilBarn.LobbyService.CopyPersonalApp(data.app_id, data.version, data.curName, success, error);
        },
        /*
         * 取消发布作品
         * @param {Object} data {{string} version 新名字
         *                 {string} app_id 作品id
         * @param {Function} success 
         * @param {Function} error 
         */
        CancelPublishPersonalApp: function (data, success, error) {
            UtilBarn.LobbyService.CancelPublishPersonalApp(data.app_id, data.version, success, error);
        },

        /**
         * 获取大厅反馈模板
         * @param {Object} data {modelName 模板标识名称}
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        GetModelData: function (data, success, error) {
            UtilBarn.Action.FeedBack.GetModelData(data.modelName, success, error);
        },

        /**
         * 提交大厅反馈内容
         * @param {Object} data {
         *                 {string}modelName 模板标识名称
         *                 {string}contact:联系方式 
         *                 {string}feed_type:反馈类型
         *                 {string} content 反馈内容(固定的)
         *                 {Array<string>} scene 反馈场景 
         *                 {string} subscript 反馈详情
         *                 {Array<string>} screenshot 截图}
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        PostFeedBack: function (data, success, error) {
            UtilBarn.Action.FeedBack.PostFeedBack(data.modelName, data.contact, data.feed_type, data.content, data.scene, data.subscript, data.screenshot, success, error);
        },

        /**
         * 获取反馈列表
         * @param {Object} data {
         *                 {int} page 页码（1~）}
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        GetFeedBacks: function (data, success, error) {
            UtilBarn.Action.FeedBack.GetFeedBacks(data.page, success, error);
        },

        /**
         * 获取是否有未回复的反馈
         * @param {int} data {}
         * @param {Function} success 成功回调,带服务端返回对象  
         * @param {Function} error 出错回调
         */
        GetUnReplyFeedBacks: function (data, success, error) {
            UtilBarn.Action.FeedBack.GetUnReplyFeedBacks(success, error);
        },

        /**
         * 获取反馈回复列表
         * @param {Object} data {
         *                 {string} feedback_id 反馈信息的id
         *                 {int} page 页码（1~）}
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        GetFeedBackReply: function (data, success, error) {
            UtilBarn.Action.FeedBack.GetFeedBackReply(data.feedback_id, data.page, success, error);
        },

        /**
         * 刷新反馈已读状态
         * @param {Object} data {
         *                 {string} feedback_id 反馈信息的id}}
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        RefreshFeedBackState: function (data, success, error) {
            UtilBarn.Action.FeedBack.RefreshFeedBackState(data.feedback_id, success, error);
        },

        /**
         * 提交反馈回复
         * @param {Object} data {
         *                 {string} feedback_id 反馈信息的id
         *                 {string} content 反馈的内容}
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        PostFeedBackReply: function (data, success, error) {
            UtilBarn.Action.FeedBack.PostFeedBackReply(data.feedback_id, data.content, success, error);
        },

        /**
         * 上传反馈截屏TOCs
         * @param {Object} data {
         *                 {Object} file 反馈信息的id
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        UploadImageToCS: function (data, success, error) {
            var process = function () { };
            UtilBarn.Action.FeedBack.UploadImageToCS(data.file, success, error, process);
        },

        /**
         * 上传反馈截屏TOCs
         * @param {Object} data {
         *                 {string} dentry_id 反馈信息的id
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */
        GetCSImageUrl: function (data, success, error) {
            var csData = UtilBarn.Action.FeedBack.GetCSImageUrl(data.dentry_id);
            if (success) {
                success(csData);
            }
        },

        /*
         * 获取分享链接
         * @param {Object} data {{String} app_id 作品id
         *                 {int} access_type 获取类型 1-模板库  2-个人库 3-作品库
         *                {int} get_type 获取类型0-显示需求 1-试玩需求 2-分享需求  3-编辑 4-体验区游戏
         * @param {Function} success 
         * @param {Function} error 
         */
        GetTryPlayingInfo: function (data, success, error) {
            var succ = function (dataObj) {
                var resid = dataObj.web_resid + "?channel=" + UtilBarn.Channel;
                UtilBarn.QRCode.Create(resid, success, error);
            };
            UtilBarn.LobbyService.GetTryPlayingInfo(data.app_id, data.access_type, data.access_type, "", succ, error);
        },
        /*
         * 获取游戏类型
         * @param {Object} data {{String} app_id 作品id
         *                 {int} access_type 获取类型 1-模板库  2-个人库 3-作品库
         *                {int} get_type 获取类型0-显示需求 1-试玩需求 2-分享需求  3-编辑 4-体验区游戏
         * @param {Function} success 
         * @param {Function} error 
         */
        GetAppType: function (data, success, error) {
            var succ = function (dataObj) {
                var type = "Html";
                if (dataObj.web_resid === "") {
                    type = "PC";
                }
                success(type);
            };
            UtilBarn.LobbyService.GetTryPlayingInfo(data.app_id, data.access_type, data.access_type, "", succ, error);
        },

        /**
         * 播放游戏
         */
        OpenGamePlay: function (data, success, error) {
            var get_type = 1;
            if (data.playType === 2 || data.playType === 3) {
                get_type = 0;
            }
            UtilBarn.Api.MMO.GetTryPlayingInfo(data.appId, data.playType, get_type, "", function (appResInfo) {
                UtilBarn.Api.MMO.AddPlayRecord(data.appId);
                if (appResInfo.web_resid && appResInfo.web_resid !== "") {
                    var result = {};
                    result.Code = "WEBGAME";
                    var ms = {};
                    UtilBarn.GameId = data.appId;
                    UtilBarn.Access = data.playType;
                    UtilBarn.Version = data.version;
                    ms.Url = UtilBarn.SetQueryString("UtilBarnArgs", UtilBarn.GetLoginInfo(), appResInfo.web_resid);
                    ms.width = appResInfo.width;
                    ms.height = appResInfo.height;
                    result.Message = ms;

                    // 云图埋点
                    UtilBarn.DataStatistic.StartGame(data.appId, data.playType);

                    if (success) success(result);
                } else {

                    UtilBarn.LobbyService.CheckEbService(function (localtion) {
                        if (localtion !== "") {
                            var result = {};
                            result.Code = "UNINSTALL";
                            result.Message = localtion;
                            if (error) error(result);
                        } else {
                            UtilBarn.LobbyService.OpenGamePlay(data.taskId, data.appId, data.playType, data.version, success, error);
                        }
                    }, error);
                }
            }, function (e) {
                if (error) error(e);
            });
        },

    
        /**
         * 打开编辑器
         */
        OpenGameEditor: function (data, success, error) {
            var get_type = 3;
            UtilBarn.Api.MMO.GetTryPlayingInfo(data.appId, data.accessType, get_type, "", function (appResInfo) {

                var webresid = appResInfo.web_editor_resid;
                if (UtilBarn.Platform.IsPC) {
                    webresid = appResInfo.web_pc_editor_resid;
                }
                if (webresid && webresid !== "") {
                    var result = {};
                    result.Code = "WEBGAME";
                    var ms = {};
                    UtilBarn.GameId = data.appId;
                    UtilBarn.Access = data.accessType;
                    UtilBarn.Version = data.version;
                    ms.Url = UtilBarn.SetQueryString("UtilBarnArgs", UtilBarn.GetLoginInfo(), webresid);
                    ms.width = 0;
                    ms.height = 0;
                    result.Message = ms;
                    if (success) success(result);
                } else {
                    if (appResInfo.editor_resid && appResInfo.editor_resid !== "") {
                        UtilBarn.LobbyService.CheckEbService(function (localtion) {
                            if (localtion !== "") {
                                var result = {};
                                result.Code = "UNINSTALL";
                                result.Message = localtion;
                                if (error) error(result);
                            } else {
                                UtilBarn.LobbyService.OpenGameEditor(data.taskId, data.appId, data.accessType, data.version, success, error);
                            }
                        }, error);
                    } else {
                        var result = {};
                        result.Code = "NOTSUPPORTED";
                        result.Message = UtilBarn.GetTip("ERROR_MobileNotSupported");
                        if (error) error(result);
                    }
                }
            }, function (e) {
                var result = {};
                result.Code = "NetWorkError";
                result.Message = e;
                if (error) error(e);
            });
        },
        /**
         * 导出apk
         */
        ExportApk: function (data, success, error) {
            
            if (!(navigator && navigator.onLine)) {
                var result = {};
                result.Code = "NETWORK_OFFLINE";
                result.Message = UtilBarn.GetTip("ERROR_" + result.Code);
                if (error) error(result);
                return;
            }
            
            UtilBarn.LobbyService.CheckEbService(function (localtion) {
                if (localtion !== "") {
                    var result = {};
                    result.Code = "UNINSTALL";
                    result.Message = localtion;
                    if (error) error(result);
                } else {
                    var get_type = 0;
                    UtilBarn.Api.MMO.GetTryPlayingInfo(data.appId, data.accessType, get_type, "", function (appResInfo) {
                        if (appResInfo.web_resid && appResInfo.web_resid !== "") {
                            UtilBarn.LobbyService.ExportApk(data.taskId, data.appId, data.icon, data.accessType, data.gameName, success, error);
                        } else {
                            if (error) error("非H5游戏不能导出");
                        }
                    }, function (e) {
                        var result = {};
                        if (navigator && navigator.onLine) {
                            result.Code = "NetWorkError";
                        } else {
                            result.Code = "NETWORK_OFFLINE";
                        }
                        result.Message = UtilBarn.GetTip("ERROR_" + result.Code);
                        if (error) error(result);
                    });
                }
            }, function (e) {
                var result = {};
                if (navigator && navigator.onLine) {
                    result.Code = "NetWorkError";
                } else {
                    result.Code = "NETWORK_OFFLINE";
                }
                result.Message = UtilBarn.GetTip("ERROR_" + result.Code);
                if (error) error(result);
            });
        },
        /**
         * 导出exe
         */
        ExportExeGame: function (data, success, error) {
            
            if (!(navigator && navigator.onLine)) {
                var result = {};
                result.Code = "NETWORK_OFFLINE";
                result.Message = UtilBarn.GetTip("ERROR_" + result.Code);
                if (error) error(result);
                return;
            }
            
            UtilBarn.LobbyService.CheckEbService(function (localtion) {
                if (localtion !== "") {
                    var result = {};
                    result.Code = "UNINSTALL";
                    result.Message = localtion;
                    if (error) error(result);
                } else {
                    UtilBarn.LobbyService.ExportExeGame(data.taskId, data.appId, data.icon, data.accessType, data.gameName, success, error);
                }
            }, function (e) {
                var result = {};
                if (navigator && navigator.onLine) {
                    result.Code = "NetWorkError";
                } else {
                    result.Code = "NETWORK_OFFLINE";
                }
                result.Message = UtilBarn.GetTip("ERROR_" + result.Code);
                if (error) error(result);
            });
        },
        /**
         * 导出编辑器
         */
        ExportEditor: function (data, success, error) {
            
            if (!(navigator && navigator.onLine)) {
                var result = {};
                result.Code = "NETWORK_OFFLINE";
                result.Message = UtilBarn.GetTip("ERROR_" + result.Code);
                if (error) error(result);
                return;
            }
            
            UtilBarn.LobbyService.CheckEbService(function (localtion) {
                if (localtion !== "") {
                    var result = {};
                    result.Code = "UNINSTALL";
                    result.Message = localtion;
                    if (error) error(result);
                } else {
                    UtilBarn.LobbyService.ExportEditor(data.taskId, data.appId, data.icon, 1, data.gameName, success, error);
                }
            }, function (e) {
                var result = {};
                if (navigator && navigator.onLine) {
                    result.Code = "NetWorkError";
                } else {
                    result.Code = "NETWORK_OFFLINE";
                }
                result.Message = UtilBarn.GetTip("ERROR_" + result.Code);
                if (error) error(result);
            });
        },

        /**
         * 获取播放/导出进度
         */
        GetProgress: function (data, success) {
            UtilBarn.LobbyService.GetProgress(data.taskId, success);
        },

        /**
         * 检测中转服务程序是否安装
         */
        CheckEbService: function (data, success, error) {
            UtilBarn.LobbyService.CheckEbService(success, error);
        },

        /**
         * 获取用户发布剩余时间
         */
        GetPublishCountDown: function (data, success, error) {
            UtilBarn.Api.MMO.PublishCountDown(success, error);
        },

        /**
         * 获取发布页详情
         */
        GetPublishOrigin: function (data, success, error) {
            UtilBarn.Api.MMO.GetPersonalAppInfo(data.appId, function (appInfo) {
                if (appInfo) {
                    UtilBarn.Api.MMO.GetTags(data.appId, function (tagInfo) {
                        if (tagInfo) {
                            var returnData = UtilBarn.LobbyService.GetPublishOriginFomatData(appInfo, tagInfo);
                            if (success) success(returnData);
                        } else {
                            if (error) error("GetTags null");
                        }
                    }, function (e) { if (error) error(e); });
                } else {
                    if (error) error("GetPublishOrigin null");
                }
            }, function (e) {
                if (error) error(e);
            });
        },
        /**
         * 添加标签
         */
        AddTag: function (data, success, error) {
            UtilBarn.LobbyService.AddTag(data, success, error);
        },
        /**
         * 删除标签
         */
        DeleteTag: function (data, success, error) {
            UtilBarn.LobbyService.DeleteTag(data, success, error);
        },
        /**
         * 检测版本号
         */
        CheckVersion: function (data, success, error) {
            UtilBarn.LobbyService.CheckVersion(data, success, error);
        },
        /**
         * 检测敏感词
         */
        IsSensitive: function (data, success, error) {
            UtilBarn.Api.MMO.IsSensitive(data.word, success, error);
        },

        /*
         * 游戏名重名检测
         * @param {Object} data {{String} appId 作品id
         *                 {int} releaseMode 获取类型 发布方式 1-创建新游 2-更新游戏
         *                {int} appName产品名称
         *                {int} accessType 获取类型 1-模板库  2-个人库 3-作品库}
         * @param {Function} success 
         * @param {Function} error 
         */
        IsNameDuplicate: function (data, success, error) {
            var apiData = {};
            apiData.app_id = data.appId;
            apiData.release_mode = data.releaseMode;
            apiData.app_name = data.appName;
            apiData.access_type = data.accessType;
            UtilBarn.Api.MMO.IsNameDuplicate(apiData, success, error);
        },

        /**
         * 验证名称长度
         */
        IsNameTooLong: function (data, success, error) {
            function getLength(str) {
                var len = 0;
                for (var i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                        len += 2;
                    } else {
                        len++;
                    }
                }
                return len;
            }

            if (getLength(data.appName) > 60) {
                if (error) error("Game name characters longer than 60");
                return;
            }
            if (success) success("");
        },

        /**
         * 发布作品
         */
        PublishApp: function (data, success, error) {
            UtilBarn.LobbyService.PublishApp(data, success, error);
        },

        /**
         * 获取WebIM地址
         */
        GetWebIMUrl: function (data, success, error) {
            UtilBarn.LobbyService.GetWebIMUrl(success, error);
        },

        /**
         * 获取Elearning地址
         */
        GetElearningUrl: function (data, success, error) {
            UtilBarn.LobbyService.GetElearningUrl(
                function (data) {
                    if (success) {
                        success(data);
                    }
                }, function (e) {
                    if (error) {
                        error(e);
                    }
                }
            );
        },

        /**
         * 获取源码图书馆地址
         */
        GetLibUrl: function (data, success, error) {
            UtilBarn.LobbyService.GetLibUrl(
                function (data) {
                    if (success) {
                        success(data);
                    }
                }, function (e) {
                    if (error) {
                        error(e);
                    }
                }
            );
        },

        /**
         * 获取用户好友列表
         * @param {Object} data { 
         *                  {number} offset 当前偏移值, 
         *                  {number} pagesize  每页数量 默认10个, 最大不超过50
         *                  {String} key 关键字
         * } 
         * @param {Function} success 成功回调  data 用户数据
         *                                  {array} 用户数据
         *                                  {int} offset 偏移量
         *                      
         * @param {Function} error 出错回调
         */
        GetIMFriendsInfo: function (data, success, error) {
            UtilBarn.Share.GetIMFriendsInfo(data, success, error);
        },

        /**
         * 分享游戏到IM
         * @param {Object} data {
         *                {String} appId 作品id
         *                {String} receiver 接收玩家ID
         *                {String} appName 产品名称
         *                {String} appDesc 产品简介
         *                {number} access 访问类型  1-模板 2-个人库 3-体验库
         *                {number} get_type 获取类型0-显示需求 1-试玩需求 2-分享需求  3-编辑 4-体验区游戏
         *                {String} version 版本
         *                {String} iconUrl 作品icon链接地址
         * }
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
         */
        ShareApp2IM: function (data, success, error) {
            UtilBarn.Share.ShareApp2IM(data, success, error);
        },

        /**
        * 获取第三方分享类型
        * @param {Null} data 传空
        * @param {Function} success 成功回调
        * @param {Function} error 出错回调
        */
        GetThirdPartyShare: function (data, success, error) {

            var shares = ["QQ", "Weibo"];

            if (UtilBarn.ServerKey === "US" || UtilBarn.ServerKey === "Beta") {
                shares = ["Fackbook", "Twitter"];
            }

            if (success) success(shares);
        },

        /**
        * 第三方分享
          * @param {Object} data {
         *                {String} appId 作品id
         *                {Number} access 访问类型  1-模板 2-个人库 3-体验库
         *                {String} type 分享类型 第三方分享 "Fackbook", "Twitter","QQ", "Weibo"
         * }
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
        */
        SharedAppByThird: function (data, success, error) {

            // 云图埋点
            //UtilBarn.DataStatistic.ShareGame(data.app_id, type);
            switch (data.type) {
                case "Fackbook":
                    UtilBarn.Share.ShareFacebook(data.appId);
                    break;
                case "Twitter":
                    UtilBarn.Share.ShareTwitter(data.appId);
                    break;
                case "Weibo":
                    UtilBarn.Share.ShareWeibo(data.appId);
                    break;
                case "QQ":
                    UtilBarn.Share.ShareQQ(data.appId);
                    break;
            }
            // 云图埋点
            UtilBarn.DataStatistic.ShareGame(data.appId, data.type);
            if (success) success();
        },

        /**
        * 分享
          * @param {Object} data {
         *                {String} appId 作品id
         *                {Number} access 访问类型  1-模板 2-个人库 3-体验库
         *                {String} type 分享类型 "Link", "QR"
         * }
         * @param {Function} success 成功回调
         * @param {Function} error 出错回调
        */
        SharedApp: function (data, success, error) {

            // 云图埋点       
            UtilBarn.DataStatistic.ShareGame(data.appId, data.type);
            if (success) success();
        },

        /**
        * 监听编辑器关闭
          * @param {Object} data 无意义
         * @param {Function} success 关闭回调
         * @param {Function} error 出错回调
        */
        ListenEditorExit: function (data, success, error) {
            // 消息回调
            function messageCallBack(e) {

                var data = e.data;

                if (data && data.Type === "EditorExit") {
                    if (success) success("");
                }
            }

            window.addEventListener("message", messageCallBack, false);
        },

        /**
         * 获取版本更新日志
         * @param {Object} param {
         *                {int} currentPage 当前页码
         *                {int} itemCount 一页中日志条数
         * }
         * @param {Function} success 成功回调,返回版本更新日志
         * @param {Function} error 出错回调
        */
        GetVersionLog: function (param, success, error) {
            var currentPage = 1;
            var itemCount = 8;
            if (param.currentPage !== "" && typeof param.currentPage !== "undefined") {
                currentPage = param.currentPage;
            }
            if (param.itemCount !== "" && typeof param.itemCount !== "undefined") {
                itemCount = param.itemCount;
            }
            UtilBarn.LobbyService.GetVersionLog(
                function (data) {
                    var returnOb = {};
                    returnOb.Currentver = data.Currentver;
                    returnOb.currentPage = currentPage;
                    returnOb.count = data.data.length;
                    var begin = (currentPage - 1) * itemCount;
                    var end = begin + itemCount > data.data.length ? data.data.length : begin + itemCount;
                    for (var i = 0; i < data.data.length; i++) {
                        data.data[i].id = i + 1;
                    }
                    returnOb.data = data.data.slice(begin, end);
                    returnOb.itemCount = returnOb.data.length;
                    if (success) {
                        var result = { "data": returnOb };
                        success(result);
                    }
                }, function (e) {
                    if (error) {
                        error(e);
                    }
                }
            );
        },
        /**
        * 获取热词信息
        * @param {Object} data {product_type}
        * @param {Function} success 关闭回调
        * @param {Function} error 出错回调
        */
        GetHotWords: function(data,success,error){
            UtilBarn.Api.MMO.GetHotWords(data.product_type,success,error);
        }
    };
    if (namespace && className && !namespace[className]) {
        namespace[className] = module;
    }

}(UtilBarn, "Lobby"));