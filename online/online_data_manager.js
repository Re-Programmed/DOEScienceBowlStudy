const API_UPDATE_INTERVAL = 1000 //TODO: MAKE FASTER AND DEPENDENT ON STAGE OF THE GAME, EX. SLOWER FOR BONUS AND BEFORE GAME STARTS, FASTER FOR TOSSUP

const URLS = { FULL_TABLE: "https://tjdzerjw9f.execute-api.us-west-2.amazonaws.com/default?table=ScienceBowlChallenge", ROOM: function(x) { return "https://mnd5defj88.execute-api.us-west-2.amazonaws.com/default/get?table=ScienceBowlChallenge&id=" + x; }, POST: function (id, data) { return "https://qdzmt1ev82.execute-api.us-west-2.amazonaws.com/default/create?table=ScienceBowlChallenge&id=" + id + "&data=" + btoa(data) } }

const APIData = {
    GetAvailableRooms: async function () {
       var data = await basicRequest(URLS.FULL_TABLE, []);

        if(data == null)
        {
            var pr = await this.GetAvailableRooms();
            return pr;
        }

        var rooms = []
        for(var i = 0; i < data.Items.length; i++)
        {
            if(data.Items[i].id.startsWith("room_"))
            {
                data.Items[i].id = data.Items[i].id.replace("room_", "");
                data.Items[i].data = atob(data.Items[i].data);
                rooms.push(data.Items[i]);
            }
        }

        return rooms;
    },

    GetRoom: async function (id) {
        var data = await basicRequest(URLS.ROOM("room_" + id), []);

        data.data = atob(data.data);

        const prevID = data.id;
        const dDecode = JSON.parse(data.data);

        data = dDecode;
        data.id = prevID;

        return data;
    },

    //Adds a player to the current room.
    //CurrentRoom: room
    //Player: Account
    RoomAddPlayer: async function (currentRoom, player)
    {
        var pData = {id: currentRoom.id};
        pData.data = JSON.parse(JSON.stringify(currentRoom));
        delete pData.data.id;

        pData.data.numPlayers++;
        pData.data.players.push({name: player.Username, team: player.Team, ip: player.IP});

        console.log(pData);

        basicRequest(URLS.POST("room_" + pData.id, JSON.stringify(pData.data)), []);
    },

    
    RoomSetSettings: async function (currentRoom, settings)
    {
        var pData = {id: currentRoom.id};
        pData.data = JSON.parse(JSON.stringify(currentRoom));
        delete pData.data.id;

        pData.data.settings = settings;

        console.log(pData);

        basicRequest(URLS.POST("room_" + pData.id, JSON.stringify(pData.data)), []);
    }
}

async function basicRequest(url, data_points)
{
    var fetch_string = "?";
    data_points.forEach(data => {
        fetch_string += data.key + "=" + data.value + "&";
    })
    fetch_string = fetch_string.slice(0, -1);
    var result = await fetch(encodeURI(url) + encodeURIComponent(fetch_string))
    //var result = await fetch(encodeURI(url.split("?")[0]) + "?" + encodeURIComponent(url.split("?")[1]).replace(/%3D/g, "=").replace(/%26/g, "&") + encodeURIComponent(fetch_string))
    var data = await result.json()
    return data;
}

const AccountOpts = {
    GetCurrentAccount: function () {
        return new Account(atob(localStorage.getItem("science_bowl_quiz_af2252024_account")));
    },
    SetCurrentAccount: function (account) {
        localStorage.setItem("science_bowl_quiz_af2252024_account", btoa(account.Username));
    }
}


class Account
{
    Username;
    Team;
    IP;

    constructor(username, team, ip)
    {
        this.Username = username;
        this.Team = team;
        this.IP = ip;
    }
}