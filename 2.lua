-- timer.setTimeout(1000, function()print("atest")end)
require("./coroutine")
-- local timer = require("timer")
x = {a = 1, b = 2, {}}
w = {y = 2}
setmetatable(x, {__index = w, __newindex = w})
z = {y = 0}
setmetatable(z, {__index = x, __newindex = x})
z.y = 3
print("z.y = :" .. z.y)
print("x.y = :" .. x.y)
print("w.y = :" .. w.y)
print(coroutine)

-- require("socket")
function sleep(tm)
    -- return coroutine.yield()
    return function(cb)
        local starttime = os.time()
        while (os.time() - starttime < tm) do
        end
        cb("test")
    end
end

require("socket")
require("socket.http")
-- require("Async")
local WAITING_COROUTINES = {}
function waitForSeconds(seconds)
    local milli = seconds * 1000
    local co = coroutine.running()
    assert(co ~= nil, "Cannot wait on main thread")
    local wakeuptime = socket.gettime() * 1000 + milli
    WAITING_COROUTINES[co] = wakeuptime
    return coroutine.yield(co)
end

function wakeupWaitingCoroutines()
    local toWake = {}
    for co, wakeuptime in pairs(WAITING_COROUTINES) do
        if wakeuptime < socket.gettime() * 1000 then
            table.insert(toWake, co)
        end
    end
    for _, co in ipairs(toWake) do
        WAITING_COROUTINES[co] = nil
        coroutine.resume(co)
    end
end

-- for i,j in pairs(coroutine) do
--     if(type(j) == "function")then
--         print("i is :"..i)
--         print("function is :",j)
--     end
-- end

cotable = {}

startcos = function()
    for i = 1, #cotable do
        starttask(cotable[i])
    end
end

pushtask = function(fn)
    table.insert(cotable,fn)
end

starttask = function(fn)
    f = coroutine.wrap(fn)
    while (pcall(f)) do
    end
end

waitfor = function(cb)
    local res
    cb(
        function(result)
            res = result
            coroutine.yield(result)
        end
    )
    return res
end

mkcb = function(cb, fn)
    f =
        coroutine.wrap(
        function()
            cb(
                function(result)
                    coroutine.yield(result)
                    fn()
                end
            )
        end
    )
end

-- function()
--     print("yes")
--     local f =
--         coroutine.wrap(
--         function()
--             print("make sense")
--             coroutine.yield(waitForSeconds(2))
--             -- local result1 = waitfor(sleep(1))
--             print("test", result1)
--             coroutine.yield(waitForSeconds(2))
--             -- local result2 = waitfor(sleep(1))
--             print("test", result2)
--         end
--     )
--     f()
--     f()
--     f()
--     f()
--     f()
--     print("no")
-- end

-- function sleep(tm)
--     return function(cb)
--         local starttime = os.time()
--         while (os.time() - starttime < tm) do
--         end
--         cb("test")
--     end
-- end

waitfor = function(cb)
    local res
    cb(
        function(result)
            res = result
            coroutine.yield(result)
        end
    )
    return res
end

pushtask(
    function()
        local result1 = waitfor(sleep(1))
        print("test1", result1)
        local result2 = waitfor(sleep(1))
        print("test1", result2)
    end
)
pushtask(
    function()
        local result1 = waitfor(sleep(1))
        print("test2", result1)
        local result2 = waitfor(sleep(1))
        print("test2", result2)
    end
)

sleep(1)(startcos)

-- print(os.time())
-- print("hlloy")

-- f1()
-- f1()
-- f1()
-- mkcb(sleep,function(res)print("end")end)
