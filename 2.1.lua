co =
    coroutine.create(
    function(i)
        print(i)
        local starttime = os.time()
        coroutine.yield()
        while (os.time() - starttime < 2) do
            -- coroutine.yield()
        end
        coroutine.yield()
    end
)
print("yes")
coroutine.resume(co, 1)
coroutine.resume(co, 1)
print("no")
