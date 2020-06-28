ConstructionController = {}
IslandManager = IslandManager
Notifier = Notifier
ConstructionWindow = ConstructionWindow
require("Logic/MyUtil/util")

---------------------------------------------------------------------------------------------------------------------------
local json = require("cjson")
local this = ConstructionController
local DatasConfig = require("Logic/Construction/ConstructionConfig")

local roleId
local roleInfo
local regRoleListener = false
local inited = false
-- local encode = require("cjson").encode

mylog("hi", "tt")
mylog (tt)
mylog("hi", "here")

mylogarr()

------------------------- util -------------------------------------------------

function this.FindToRemove(arr, target)
    if (arr) then
        
        for k, v in pairs(arr) do
            if (v == target) then
                table.remove(arr, k)
                return true
            end
        end
    end
    return false
end

function this.FindFirstOffSpringsMatch(ts, ...)
    local tmp = null
    for i = 0, ts.childCount - 1 do
        tmp = ts:GetChild(i)
        local name = tmp.name
        local pms = {...}
        local empty = true
        for j = 1, #pms / 2 do
            if (this.FindToRemove(pms[2 * j - 1], name)) then
                pms[2 * j](tmp)
            -- break
            end
            empty = #pms[2 * j - 1] == 0
        end
        if (empty) then
            return
        end
        this.FindFirstOffSpringsMatch(tmp, ...)
    end
end

function this.EnableView(ts)
    ts.gameObject:SetActive(true)
end
function this.DisableView(ts)
    ts.gameObject:SetActive(false)
end

------------------------- 周期部分 -------------------------------------------------

-- 初始场景
function this.Init()
    if (inited == false) then
        inited = true
        this.ActAfterGetHomeInfo(
            function()
                -- 还原用户配置
                this.RestoreConstructionByConfig(roleInfo)
                -- 注册消息监听角色信息变化
                Notifier.regist(MsgDefine.MSG_ROLEINFO_UPDATE, this.MonitorRoleInfo)
            end
        )
    end
end

-- 初始弹窗面板
function this.InitPanel()
    this.InitByConfig()
end

function this.Unmount()
    if (regRoleListener) then
        Notifier.remove(MsgDefine.MSG_ROLEINFO_UPDATE, this.MonitorRoleInfo)
    end
end

------------------------- 功能部分 -------------------------------------------------

-- 模拟用户配置 todo
local UserConfig = {unlocked = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, star = 0}

-- 家园信息获取
function this.ActAfterGetHomeInfo(cb)
    coroutine.start(
        function()
            if (roleInfo == nil) then
                if (roleId == nil) then
                    roleId = RoleMgr:GetRoleId()
                end
                roleInfo = coroutine.waitforasync(NetworkMgr.Service:GetHomeInfo(roleId))
                -- homedata.id = JsonHelper.ReadBaseType<int>(json, "id");
                -- homedata.name = JsonHelper.ReadBaseType<string>(json, "name");
                -- homedata.home_level = JsonHelper.ReadBaseType<int>(json, "home_level");
                -- homedata.map_id = JsonHelper.ReadBaseType<int>(json, "map_id");
                -- homedata.build_items = JsonHelper.ReadArrayCl

                -- 挂载到当前显示
                UserConfig.star = RoleMgr:GetRoleInfo().star
            end
            if (cb) then
                cb()
            end
        end
    )
end

-- 根据配置初始化ui界面
function this.InitByConfig()
    -- todo 动态添加
    -- local itemObj = CreatePrefab("/NeopetsMatchPreview/Assets/ABRes/Prefabs/UI/Construction/DBBuildingItem.prefab")

    -- todo 动态获取每个建筑的解锁需要宝石(服务端暂无配置)
    print("!! init ui")

    local listContainer = ConstructionWindow.list_container.transform
    local itemsLen = listContainer.childCount

    -- 解锁
    for j = 1, #(UserConfig.unlocked) + 1 do
        local unlockedId = UserConfig.unlocked[j]
        local unlocked = unlockedId and (unlockedId >= 0) and (unlockedId < itemsLen)
        -- 有解锁
        if (unlocked) then
            local cts = listContainer:GetChild(unlockedId)
            this.FindFirstOffSpringsMatch(
                cts,
                {"DBBuildingItemShow", "DBBuildingItemNumsShow"},
                this.EnableView,
                {"DBBuildingItemHide", "DBBuildingItemNumsHide"},
                this.DisableView,
                -- 配置建造消耗
                {"DBBuildingItemNumsCount"},
                function(ts)
                    local cost = DatasConfig[tonumber(unlockedId) + 1].cost
                    ts.gameObject:GetComponent(typeof(UnityEngine.UI.Text)).text =
                        string.format('<color="#C5B3A8">%d</color>', cost)
                end
            )
        end
    end
end

-- 融合本地位置信息等
function this.MeltLocalConfig(conin, tag)
    local con = {}

    con.x = tostring(DatasConfig[tag].X)
    con.y = tostring(DatasConfig[tag].Y)
    con.z = tostring(DatasConfig[tag].Z)
    con.r = tostring(DatasConfig[tag].Rotation)

    con.seqNum = DatasConfig[tag].seqNum
    con.buildType = DatasConfig[tag].buildType
    con.style = DatasConfig[tag].style

    return con
end

-- 新建
function this.BuildNewConstruction(pos, conin)
    if (conin == nil) then
        return
    end
    coroutine.start(
        function()
            local con = this.MeltLocalConfig(conin, pos)

            con.homeId = conin.id
            con.mapId = conin.map_id
            -- 上传建造记录
            local pm = BuildRequestData()
            pm.role_id = roleId
            pm.home_id = con.homeId
            pm.map_id = con.mapId
            pm.seq_num = con.seqNum
            pm.build_type = con.buildType
            pm.style = con.style
            local handle = NetworkMgr.Service:AddBuild(pm)
            coroutine.waitforasync(handle)

            if handle.Exception == nil then
                -- 本地建造
                IslandManager.CreateBuild("build" .. tostring(pos), con.x, con.y, con.z, con.r)
            else
                local errorInfo = json.decode(handle.Exception.Message)
                print(errorInfo.message)
                Toast.Show(errorInfo.message)
            end
        end
    )
end

-- 还原 HomeData
function this.RestoreConstructionByConfig(conin)
    if (conin == nil) then
        return
    end
    local arr = conin.build_items
    -- List<BuildData>
    for i = 0, arr.Count do
        local item = arr[i]
        local pos = tonumber(item.build_type)
        if (pos) then
            local con = this.MeltLocalConfig(item, pos)
            -- 本地建造
            IslandManager.CreateBuild("build" .. tostring(pos), con.x, con.y, con.z, con.r)
        end
    end
end

-- 点击建筑图片
function this.HandleBuild(ts)
    local pos = ts:GetSiblingIndex()
    if (this.StarEnough(pos + 1) == false) then
        return
    end
    this.ActAfterGetHomeInfo(
        function()
            -- {"id":5,"name":"\u4E09\u6D88\u4E3B\u57CE","home_level":0,"map_id":1000,"build_items":[]}
            print("roleInfo id : " .. roleInfo.id)
            print("roleInfo map_id : " .. roleInfo.map_id)
            -- public int role_id;
            -- public int home_id;
            -- public int map_id;
            -- public int seq_num;
            -- public int build_type;
            -- public int style;
            this.BuildNewConstruction(pos + 1, roleInfo)

            ConstructionWindow:Close()
            MainInterfaceWindow:Open()
        end
    )
    return
end

-- 星星不足
function this.StarEnough(pos)
    local isOk = DatasConfig[pos].cost <= UserConfig.star
    if (isOk == false) then
        ConstructionHint.OpenPanel()
    end
    return isOk
end

-- 检测星星更新
this.MonitorRoleInfo = function(role)
    print("!!! roleinfo update: " .. tostring(role))
    UserConfig.star = RoleMgr:GetRoleInfo().star
    --     this.lives_num.text = RoleMgr:GetRoleInfo().hp
    --     this.coins_num.text = RoleMgr:GetRoleInfo().money
    --     this.stars_num.text = RoleMgr:GetRoleInfo().star
end

return ConstructionController
