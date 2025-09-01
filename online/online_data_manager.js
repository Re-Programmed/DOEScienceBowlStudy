const API_UPDATE_INTERVAL = 1000 //TODO: MAKE FASTER AND DEPENDENT ON STAGE OF THE GAME, EX. SLOWER FOR BONUS AND BEFORE GAME STARTS, FASTER FOR TOSSUP
const API_INGAME_UPDATE = 500

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

    CreateRoom: async function (id, data)
    {
        var data = await basicRequest(URLS.POST(id, JSON.stringify(data)), []);

        return data;
    },

    //Adds a player to the current room.
    //CurrentRoom: room
    //Player: Account
    RoomAddPlayer: async function (currentRoom, player)
    {
        //Generate API data
        var pData = GenBasicPData(currentRoom);

        //Modify API data
        pData.data.players.push({name: player.Username, team: player.Team, ip: player.IP});
        pData.data.numPlayers = pData.data.players.length;

        console.log(pData);

        //Send data.
        basicRequest(URLS.POST("room_" + pData.id, JSON.stringify(pData.data)), []);
    },

    
    RoomSetSettings: async function (currentRoom, settings)
    {
        PostBasicPData(currentRoom, "settings", settings);
    },

    RoomSetQuestionSets: async function (currentRoom, setArr)
    {
        PostBasicPData(currentRoom, "questionSets", setArr);
    },

    RoomBeginGame: async function (currentRoom)
    {
        var pbpd = await PostBasicPData(currentRoom, "gameStarted", true);
        return pbpd;
    },

    //Question: {set: int, qid: int, type: string["bonus", "toss-up"]}
    RoomSetCurrentQuestion: async function (currentRoom, question)
    {
        var pData = GenBasicPData(currentRoom);

        pData.data.currentQuestion = question;
        pData.data.votes = 0;
        pData.data.lockedTeam = '';
        pData.data.betweenQ = false;

        var brc = await basicRequest(URLS.POST("room_" + pData.id, JSON.stringify(pData.data)), []);
        return brc;
    },

    RoomAnswerQuestion: async function (currentRoom, username, prompt)
    {
        var pData = GenBasicPData(currentRoom);

        pData.data.currentlyAnswering = {uname: username, prompt: prompt};
        //pData.data.betweenQ = true;

        console.log( {uname: username, prompt: prompt} )
        var brc = await basicRequest(URLS.POST("room_" + pData.id, JSON.stringify(pData.data)), []);
        return brc;
    },

    RoomLockTeam: async function (currentRoom, team)
    {
        var pData = GenBasicPData(currentRoom);

        console.log(pData);

        //Set the team to be locked and clear the current answerer in one call.
        pData.data.lockedTeam = team;
        pData.data.currentlyAnswering.uname = "";
        pData.data.currentlyAnswering.prompt = "";
        console.log(pData);

        var brc = await basicRequest(URLS.POST("room_" + pData.id, JSON.stringify(pData.data)), []);
        return brc;
    },

    RoomSetTimer: async function (currentRoom, timer)
    {
        var pData = GenBasicPData(currentRoom);

        //Set the team timer.
        pData.data.timer = timer;

        if(timer < 0)
        {
            console.log("BETWEEN Q");
            pData.data.timer = -1;
            pData.data.betweenQ = true;
            pData.data.lockedTeam = "";
            pData.data.currentlyAnswering.uname = "";
            pData.data.currentlyAnswering.prompt = "";
        }

        var brc = await basicRequest(URLS.POST("room_" + pData.id, JSON.stringify(pData.data)), []);
        return brc;
    },

    RoomAddVote: async function (currentRoom)
    {
        var pbpd = PostBasicPData(currentRoom, "votes", currentRoom.votes + 1);
        return pbpd;
    },

    RoomAddPoints: async function (currentRoom, team, points)
    {
        var pData = GenBasicPData(currentRoom);

        pData.data.points[team.toLowerCase()] += points;

        var brc = await basicRequest(URLS.POST("room_" + pData.id, JSON.stringify(pData.data)), []);
        return brc;
    }
}

//Copies the current room into data that can be sent to the API.
function GenBasicPData(currentRoom)
{
    var pData = {id: currentRoom.id};
    pData.data = JSON.parse(JSON.stringify(currentRoom));
    delete pData.data.id;

    return pData;
}

//Copies the room data into data that can be passed to the API, then updates the given key in the room data and sends a request.
async function PostBasicPData(currentRoom, key, value)
{
    var pData = GenBasicPData(currentRoom);

    pData.data[key] = value;

    console.log(pData);

    var brc = await basicRequest(URLS.POST("room_" + pData.id, JSON.stringify(pData.data)), []);
    return brc;
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