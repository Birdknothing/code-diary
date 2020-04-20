//�ҵ���Ϸ��Ʒ��������������������������Ϸ���棬������������
(function (namespace, className) {
    var api = Edbox.Api.MMO;

    var module = {
        /**
         * ��ȡ��������������
         * @param {Object} data{
         *                  {String}app_id:��Ϸ��Ʒid 
         * }
         * @param {Function} success �ɹ��ص� ��������Ϸ��������������
         * @param {Function} error ����ص�
         */
        GetLimitOfPeople: function (data, success, error) {
            var vip_level = Edbox.UserVipInfo.vip_level;
            for (let i = 0, n = Edbox.VipLimits.length; i < n; i++) {
                if (vip_level === Edbox.VipLimits[i].vip_level) {
                    if (success) success({
                        user_limit: Edbox.VipLimits[i].user_limit > 0 ? Edbox.VipLimits[i].user_limit : 30
                    });
                }
            }
        },

        /**
         * ��ȡ�û���Ϸ�����뷢����������
         * @param {Object} data �ղ���
         * @param {Function} success �ɹ��ص���������ǰ���Դ����ͷ�����Ϸ����������
         * @param {Function} error ����ص�
         */
        LimitOfGame(data, success, error) {
            var vip_level = Edbox.UserVipInfo.vip_level;
            for (let i = 0, n = Edbox.VipLimits.length; i < n; i++) {
                if (vip_level === Edbox.VipLimits[i].vip_level) {
                    if (success) success({
                        create_limit: Edbox.VipLimits[i].create_limit,
                        release_limit: Edbox.VipLimits[i].release_limit
                    });
                }
            }
        },

        /**
         * ��ȡ��Ϸ�������
         * @param {Object} data{
         *                  {String}app_id:��Ʒid
         *                  {int}access_type:��Ʒ���ͣ�1-ģ��� 2-���˿� (Ŀǰ���ֶβ���Ч�����ô���)
         * }
         * @param {Function} success �ɹ��ص� ������Ϸ�������
         * @param {Function} error ����ص�
         */
        GetAppIncome(data, success, error) {
            api.GetAppIncome(data.app_id, data.access_type, success, error);
        },

        /**
         * ���д���ʱ�ж�
         * @param {Object} data �ղ���
         * @param {Function} success �ɹ��ص�����
         * @param {Function} error ʧ�ܻص�����
         */
        CreateJudge(data, success, error) {
            api.GetPersonalApps("", "", "", "", function (data) {
                var nowCreateNum = data.total_count;
                module.LimitOfGame("", function (data) {
                    if (data.create_limit === -1) {
                        if (success) success({
                            message: "NoNeedVipUp"
                        });
                    }
                    else if (data.create_limit <= nowCreateNum) {
                        if (success) success({
                            message: "NeedVipUp"
                        });
                    }
                    else {
                        if (success) success({
                            message: "NoNeedVipUp"
                        });
                    }
                }, error);
            }, error);
        },

        /**
         * ��ô���ˡ�����С����ͨ��δ��������ʱ�����ѷ������ߵ���Ʒ����
         * @param {Object} data{
         *            {int}num���ܵ���Ʒ����
         *            {Object}list����һ�ε���Ʒ�б�
         * }
         * @param {Function} success �ɹ��ص�
         * @param {Function} error ����ص�
         */
        GetReleaseNum: function (data, success, error) {
            var num = data.num;
            var list = data.list.items;
            var releaseNum=0;
            if (num <= 100) {
                for (let i = 0; i < num; i++) {
                    if (list[i].flag === 0 || list[i].flag === 3 || list[i].flag === 7 || list[i].flag === 9) {
                        releaseNum++;
                    }
                }
                if (success) success({
                    num: releaseNum
                });
            }
            else {
                for (let i = 1, n = Math.ceil(num / 100); i <= n; i++) {
                    api.GetPersonalApps(i, 100, "", 1, function (data) {
                        for (let j = 0, k = data.item_count; j < k; j++) {
                            if (data.items[j].Info === 0 || list[i].Info === 3 || list[i].Info === 7 || list[i].Info === 9) {
                                releaseNum++;
                            }
                        }
                        if (i === n) {
                            if (success) success({
                                num: releaseNum
                            });
                        }
                    });
                }
            }
        },

        /**
         * ���з���ʱ�����ж�
         * @param {Object} data{
         *               {String}app_id:��Ҫ��������Ʒ��appid
         * }
         * @param {Function} success �ɹ��ص�����
         * @param {Function} error ʧ�ܻص�����
         */
        PublishJudge(data, success, error) {
            var app_id = data.app_id;
            api.GetPersonalAppInfo(app_id, function (Info) {
                var state = false;
                if (Info.flag === 0 || Info.flag === 3 || Info.flag === 7 || Info.flag === 9) {
                    state = true;
                }
                module.LimitOfGame("", function (data) {
                    if (data.release_limit === -1) {
                        if (success) success({
                            message: "NoNeedVipUp"
                        });
                    }
                    else {
                        api.GetPersonalApps("", 100, "", 1, function (list) {
                            var total = list.total_count;
                            module.GetReleaseNum({ num: total, list: list }, function (datas) {
                                var nowReleaseNum = datas.num;
                                if (nowReleaseNum >= data.release_limit) {
                                    if (state !== true) {
                                        if (success) success({
                                            message: "NeedVipUp"
                                        });
                                    }
                                    else {
                                        if (success) success({
                                            message: "NoNeedVipUp"
                                        });
                                    }
                                }
                                else {
                                    if (success) success({
                                        message: "NoNeedVipUp"
                                    });
                                }
                            }, error);
                        }, error);
                    }
                },error);  
            }, error);
        }

    };

    if (namespace && className && !namespace[className]) {
        namespace[className] = module;
    }    
}(Edbox,"OpusInfo"));