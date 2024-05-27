local loop = 1 -- 1 dan seterusnya, untuk unlimited gunakan "unli"
local plantid = 5640
local treeid = 14767
local type = "custom"
local posX = 199
local posY = 182
local SpeedPT = 20
local SpeedHT = 150
local mode = "PTHT" -- PTHT/HTPT/HT/PT

if type == "island" then
    ex = 199
    ey = 191
elseif type == "normal" then
    ex = 99
    ey = 53
elseif type == "custom" then
    ex = posX
    ey = posY
end

EditToggle("AntiLag", true)
local countUws = 0

function Tolay(x)
    local var = {}
    var.v0 = "OnTextOverlay"
    var.v1 = x
    var.netid = GetLocal().NetID
    SendVariant(var)
end

function path(x, y, state)
    SendPacketRaw(false, { state = state, px = x, py = y, x = x * 32, y = y * 32 })
end

function h2(x, y, id)
    SendPacketRaw(false, { type = 3, value = id, px = x, py = y, x = x * 32, y = y * 32 })
end

function getTree()
    local count = 0
    for y = ey, 0, -1 do
        for x = 0, ex, 1 do
            if GetTile(x, y).fg == 0 and (GetTile(x, y + 1).fg ~= 0 and GetTile(x, y + 1).fg % 2 == 0) then
                count = count + 1
            end
        end
    end
    return count
end

function getReady()
    local ready = 0
    for y = ey, 0, -1 do
        for x = 0, ex, 1 do
            if GetTile(x, y).fg == treeid and GetTile(x, y).readyharvest then
                ready = ready + 1
            end
        end
    end
    return ready
end

SendPacket(2, "action|dialog_return\ndialog_name|cheats\ncheck_gems|1\n")

function harvest()
    if getReady() > 0 then
        LogToConsole("`w[`bLantaas#6854`w] `9Harvesting...")
        for y = ey, 0, -1 do
            LogToConsole("`b[`4Lantaas#6854`b]`cCurrently `9Harvesting `0on Y = `9" .. y)
            for x = 0, ex, 1 do
                if (GetTile(x, y).fg == treeid and GetTile(x, y).readyharvest) then
                    path(x, y, plantid)
                    Sleep(SpeedPT)
                    h2(x, y, 18)
                    Sleep(50)
                end
            end
        end
    end
end

function uws()
    if getTree() == 0 then
        Sleep(500)
        SendPacket(2, "action|dialog_return\ndialog_name|ultraworldspray")
        countUws = countUws + 1
        Sleep(3000)
        SendPacket(2, "action|input\ntext|`4Total `2Used `3UWS `8= `b[ `9" .. countUws .. " `b]")
        Sleep(6000)
        harvest()
    else
        plant()
        Sleep(1000)
    end
end

function plant()
    if getReady() < 20000 then
        Tolay("`w[`bLantas`w] `!Start Planting...")
        for y = ey, 0, -1 do
            LogToConsole("`b[`4Lantaas#6854`b]`cCurrently `9Planting `0on Y = `9" .. y)
            for x = 0, ex, 10 do
                if GetTile(x, y).fg == 0 and (GetTile(x, y + 1).fg ~= 0 and GetTile(x, y + 1).fg % 2 == 0) then
                    path(x, y, 32)
                    Sleep(SpeedPT)
                    h2(x, y, plantid)
                    Sleep(100)
                end
            end
            for x = ex, 0, -1 do
                if GetTile(x, y).fg == 0 and (GetTile(x, y + 1).fg ~= 0 and GetTile(x, y + 1).fg % 2 == 0) then
                    path(x, y, 48)
                    Sleep(SpeedPT)
                    h2(x, y, plantid)
                    Sleep(100)
                end
            end
        end
    end
end

if loop == "unli" then
    while true do
        if mode == "PTHT" then
            plant()
            Sleep(200)
            uws()
            Sleep(200)
            harvest()
        elseif mode == "HTPT" then
            harvest()
            Sleep(200)
            plant()
            Sleep(200)
            uws()
        elseif mode == "HT" then
            harvest()
            Sleep(200)
        elseif mode == "PT" then
            plant()
            Sleep(200)
        end
        SendPacket(2,
            "action|input\ntext|`2Success " .. mode .. ": `b( `9" .. countUws .. " `b)  Script `bBy: `bNier Community")
    end
else
    for i = 1, tonumber(loop) do
        if mode == "PTHT" then
            plant()
            Sleep(200)
            uws()
            Sleep(200)
            harvest()
        elseif mode == "HTPT" then
            harvest()
            Sleep(200)
            plant()
            Sleep(200)
            uws()
        elseif mode == "HT" then
            harvest()
            Sleep(200)
        elseif mode == "PT" then
            plant()
            Sleep(200)
        end
        SendPacket(2,
            "action|input\ntext|`2Success " .. mode .. ": `b( `9" .. countUws .. " `b)  Script `bBy: `bNier Community")
    end
    Sleep(1500)
    SendPacket(2, "action|input\ntext|`2Success " .. mode .. " ")
end
