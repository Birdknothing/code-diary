-- function getAllData(t, prevData)
--   local data = prevData or {}
--   for k,v in pairs(t) do
--     data[k] = data[k] or v
--   end
--   local mt = getmetatable(t)
--   if type(mt)~='table' then return data end
--   local index = mt.__index
--   if type(index)~='table' then return data end
--   return getAllData(index, data)
-- end
-- local i = {x = 1, {__index = {y = 1, fn = function()
--                 print("waht")
--             end}}}
-- getProps = function(obj)
--     for prop, val in pairs(obj) do
--         if (type(val) == "table") then
--             getProps(val)
--         else
--             print("prop is:", prop, "; val is", val)
--         end
--     end
-- end
-- getProps(i)
-- local tablestr = "{['A']=1,['B']={1,{['y']=0.1,['x']='strB2x'},['b']='strBb'}}"
-- local t1 = {A=1, B={1, b="strBb", {x='strB2x', y=0.1} } }
-- print(t1.B[2].x)
-- -- strB2x

-- local str1 = TableToStr(t1)
-- print(str1)
-- -- {['A']=1,['B']={1,{['y']=0.1,['x']='strB2x'},['b']='strBb'}}

-- local t2 = StrToTable(str1)
-- print(t2['B'][2].x)
-- strB2x

-- for i=1,1 do
--     print(i)
-- end
-- target = {["100"]={x = 1}}

-- for i, j in pairs(target) do
--     print(i..tostring(j))
-- end

-- require("./1-4")
-- require("./1-5")
-- local w= require("./1-6")
-- -- print(tostring(a) .. " a")
-- -- print(tostring(b) .. " b")
-- -- print(tostring(c) .. " c")
-- print("m is " .. m)
-- print(tostring(g) .. " g")
-- print(tostring(h) .. " h")

-- print(w[1].X)
-- z = function()
--     print("z")
-- end
-- ori = z
-- z = function()
--     ori()
--     print("new z")
-- end
-- z()

t = {1, 2}
n = {
    x = 1,
    y = function()
    end
}

this = {}

getInArr = function(val, arr)
    for i, j in ipairs(arr) do
        if (j == val) then
            table.remove(arr, i)
            print("find " .. j .. " match")
        end
    end
end

function this.FindToRemove(arr, target)
    for k, v in ipairs(arr) do
        if (v == target) then
            table.remove(arr, k)
            return true
        end
    end
    return false
end

meta1 = {}
function meta1:GetChild(i)
    return self.childs[i + 1]
end

meta1.__index = meta1

test4 = {
    name = "test4",
    childCount = 0,
    childs = {}
}

test2 = {
    name = "test2",
    childCount = 1,
    childs = {test4}
}
test3 = {
    name = "test3",
    childCount = 0,
    childs = {}
}
test1 = {
    name = "test1",
    childCount = 2,
    childs = {test2, test3}
}

setmetatable(test1, meta1)
setmetatable(test2, meta1)
setmetatable(test3, meta1)
setmetatable(test4, meta1)

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
                empty = #pms[2 * j - 1] == 0
                break
            end
            empty = #pms[2 * j - 1] == 0
        end
        if (empty) then
            return
        end
        this.FindFirstOffSpringsMatch(tmp, ...)
    end
end
function testF(tag)
    return function()
        print(tag)
    end
end

this.FindFirstOffSpringsMatch(
    test1,
    {"test1"},
    testF("first"),
    {"test1"},
    testF("first"),
    {"test1"},
    testF("first"),
    {"test1"},
    testF("first"),
    {"test4"},
    testF("first4")
)
xx = "2"
print(tonumber(nil))

-- for key, val in pairs(t) do
--     print(key .. " is " .. tostring(val))
-- end
