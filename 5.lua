local encode = require("json").encode
local filePath = "D:\\×ÀÃæ\\log"

local append = function(msg)
    local file = io.open(filePath, "a")
    file:write(msg)
    file:write("\n")
    file:close()
end

function mylog(...)
    local str = ""
    for i, v in pairs({...}) do
        str = str .. " " .. encode(v)
    end
    append(str)
end
-- mylog("test")
