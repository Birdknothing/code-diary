-- local json = require("json")
-- x0 = require("./1-1").x
-- test = function(...)
--     local nt = {...}
--     for val, i in ipairs(nt) do
--         print(i)
--     end
--     print(type(select(2, ...)))
--     print(select(2, ...))
-- end

-- test2 = function(...)
--     for i = 1, select("#", ...) do -->获取参数总数
--         local arg = select(i, ...) -->读取参数，arg 对应的是右边变量列表的第一个参数
--         local t1 = select(i, ...)
--         print("test1", t1)
--         print("arg", arg)
--     end
--     -- print("test2",select(2,...))
-- end

-- test3 = function(...)
--     local a, b = "hello", "world"
--     print(a .. b)
--     local c = {1, 2, 3}
--     local blen = #c

--     print("blen:", blen)
--     for i = 1, 3 do
--         print(c[i])
--     end

--     local array = {"Lua", "Tutorial"}

--     for i = 0, 2 do
--         print(array[i])
--     end
-- end

-- getKeyVal = function(arr)
--     local len = #arr
--     local s = 1
--     return function()
--         local res, k
--         if (s <= len) then
--             k = s
--             res = arr[s]
--         end
--         s = s + 1
--         return k, res
--     end
-- end
-- getKeyVal2 = function(arr, s)
--     if (s < #arr) then
--         s = s + 1
--         return s, arr[s]
--     end
--     return nil
-- end
-- wt = {"he", "she"}
-- wk = {}
-- ww = {1, 2}
-- m1 = function(arr)
--     local brr = {}
--     for i = 1, #arr do
--         brr[i] = arr[i] * 2
--     end
--     return brr
-- end
-- m2 = function(arr)
--     local brr = {}
--     for i = 1, #arr do
--         brr[i] = arr[i] + 1
--     end
--     return brr
-- end
-- reduce = function(...)
--     local res
--     local ags = {...}
--     return function(arg1)
--         local f
--         for i = 1, #ags do
--             f = ags[i]
--             if (res == nil) then
--                 res = arg1
--             end
--             res = f(res)
--         end

--         return res
--     end
-- end
-- -- print(json.encode(m2(ww)))
-- -- ff = reduce(m1,m2)
-- ff = reduce(m2, m1)
-- print(json.encode(ff(ww)))
-- a1 = {"1", 2, 3, 4, 5}
-- b1 = a1
-- print(json.encode(a1))
-- print(json.encode(b1))
-- print(a1 == b1)

-- p3 = {x = 1, y = 2}
-- p1 = {}
-- setmetatable(p1, {__index = p3})
-- p2 = {}
-- setmetatable(p2, {__index = p1})
-- print("p1.x", p2.x)

-- addobj = {
--     __add = function(me, him)
--         return 100
--     end
-- }
-- setmetatable(p2, addobj)
-- print(p2 + {})
-- co =
--     coroutine.wrap(
--     function()
--         print("1")
--         local pm = coroutine.yield("return val")
--         print("pm:", pm)
--     end
-- )

-- -- coroutine.resume(co)
-- -- coroutine.resume(co,"haha")

-- local pmout = co()
-- print("tt=", pmout)

-- z = {x = 100}
-- function z:tf()
--     print("test z.tf.x:", self.x)
-- end

-- function printF(self)
--     print(self.x)
-- end

-- function z.bf(z)
--     local obj = {}
--     print("z.x is:",self.x)
--     setmetatable(obj, self)
--     self.__index = self
--     return obj
-- end
-- function z:mt()
--     print("my mt.x:",self.x)
-- end
-- z:tf()
-- gw = {x=89}
-- z.tf(gw)
-- (lambda ()(display"Hello World"))

-- -- ttt.mt(ttt)

-- -- co("haha")

-- return {a = a, b = b, c = c}
local m = {z = 3}
return m
