/*This file is for managing online games.*/

var CurrentRoom = { id: "", numPlayers: 0, players: [{name: "", team: "A", ip: ip_local()}], settings: {
    ReadSpeed: 30,
    QuestionDelay: 3,
    Time: { Bonus: 20, TossUp: 5 },
    DisplayAnswerOnFail: false,
    TypingAnimation: "random"
} }

var CurrentPlayer = {name: "", team: "A", ip: ip_local()}

var isHost = false;

window.addEventListener('load', function() {
    //If the online parameter is in the string, we are in an online match.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(!urlParams.has("online")){return;}

    //Get the requested game code.
    CurrentRoom.id = urlParams.get("online");

    APIData.GetRoom(CurrentRoom.id).then(room => {
        if(room == null)
        {
            this.document.body.innerHTML = "<h1>That room does not exist!</h1>";
            return;
        }

        CurrentRoom = room;
        CurrentRoom.id = urlParams.get("online");

        //The game joined should not have started yet, we need to wait for the host to start...
        //Assign the players team based on the number of players in the game.
        //DisplayAwaitingHost();
        AssignTeam();
    })

})

const AWAITING_HOST_SCREEN = `
    <h4>Waiting for host to start...</h4>
    <h3>Players:</h3>
    <div style="display: inline-block;width: 48%;padding-left: 15px;min-height: 200px;">
    <h4>Team A</h4>
    %playersA%
    </div>

    <div style="display: inline-block;width: 48%; border-left: 1px solid white;padding-left: 15px;min-height: 200px;">
    <h4>Team B</h4>
    %playersB%
    </div>
`

//Displays the text showing the players that have joined.
function DisplayAwaitingHost()
{
    var pStringA = "";
    var pStringB = "";
    for(var v = 0; v < CurrentRoom.players.length; v++)
    {
        if(CurrentRoom.players[v].team == "A")
        {
            pStringA += "<p style='color: " + (CurrentRoom.players[v].name == CurrentPlayer.Username ? "gold" : "white") + ";'>" + CurrentRoom.players[v].name + "</p>";
        }else{
            pStringB += "<p style='color: " + (CurrentRoom.players[v].name == CurrentPlayer.Username ? "gold" : "white") + ";'>" + CurrentRoom.players[v].name + "</p>";
        }
    }

    document.getElementById("host_wait_screen").innerHTML = AWAITING_HOST_SCREEN.replace("%playersA%", pStringA).replace("%playersB%", pStringB);
}

//Returns an array of all the players on a given team.
function GetTeam(team)
{
    var ret = []
    for(var v = 0; v < CurrentRoom.players.length; v++)
    {
        if(CurrentRoom.players[v].team == team)
        {
            ret.push(CurrentRoom.players[v]);
        }
    }

    return ret;
}

//Chooses a team for the players loading into the game to be placed on based on the number of players on each team.
function AssignTeam()
{
    var acName = GetAccountName();
    if(acName == "null"){return;}

    ip_local().then(ip => {
        var cancelAddition = false;

        //Check if a player with the given alias has already joined who does not have the same IP address.
        for(var i = 0; i < CurrentRoom.players.length; i++)
        {
            console.log(CurrentRoom.players[i]);
            if(CurrentRoom.players[i].name == acName)
            {
                if(i == 0)
                {
                    //You are the host!
                    isHost = true;
                }

                cancelAddition = true;
                CurrentPlayer = new Account(CurrentRoom.players[i].name, CurrentRoom.players[i].team, ip);

                if(CurrentRoom.players[i].ip != ip)
                {
                    this.document.body.innerHTML = "<h1>That alias has already joined this room!</h1>";
                    return;
                }
            }
        }

        if(!cancelAddition)
        {
            if(CurrentRoom.players.length == 0){isHost = true;}

            if(GetTeam("A").length > GetTeam("B").length)
            {
                CurrentPlayer = new Account(acName, "B", ip);
                APIData.RoomAddPlayer(CurrentRoom, new Account(acName, "B", ip)).then(d => {
                    
                    if(isHost)
                    {
                        HOST_UpdateCurrentRoom();
                    }else{
                        CLIENT_UpdateCurrentRoom();
                    }
                
                });
            }else{
                CurrentPlayer = new Account(acName, "A", ip);
                APIData.RoomAddPlayer(CurrentRoom, new Account(acName, "A", ip)).then(d => {
                    
                    if(isHost)
                    {
                        HOST_UpdateCurrentRoom();
                    }else{
                        CLIENT_UpdateCurrentRoom();
                    }
                
                });
            }
        }

        if(!isHost)
        {
            document.getElementById("select_question_set").remove();
            CLIENT_LaunchUI();
        }else{
            HOST_LaunchUI();
        }

        if(isHost)
        {
            HOST_UpdateCurrentRoom();
        }else{
            CLIENT_UpdateCurrentRoom();
        }

        //Team has been assigned, start main update loop.
        if(isHost)
        {
            setInterval(function () {
                HOST_UpdateCurrentRoom();
            }, API_UPDATE_INTERVAL);
        }else{
            setInterval(function () {
                CLIENT_UpdateCurrentRoom();
            }, API_UPDATE_INTERVAL);
        }
    })

   

}

//Sets up the settings menus for the host to modify before the game has started.
function HOST_LaunchUI()
{
    GameOptions = CurrentRoom.settings;
    UpdateSettingsUI();
}

//Updates the settings UI to display whatever is in the GameOptions. 
function UpdateSettingsUI()
{
    document.getElementById("toss_up_setting").value = GameOptions.Time.TossUp;

    document.getElementById("bonus_setting").value = GameOptions.Time.Bonus;
    document.getElementById("read_speed_setting").value = GameOptions.ReadSpeed;
    document.getElementById('question_delay_setting').value = GameOptions.QuestionDelay;
    document.getElementById('answer_view_setting').checked = GameOptions.DisplayAnswerOnFail;
    document.getElementById('type_animation_setting').value = GameOptions.TypingAnimation;

    
    /*
        Make the custom settings appear green and red on clients based on if they are easier or harder than actual competition rules.
    */
    
    if(isHost){return;}

    if(GameOptions.Time.TossUp > 5)
    {
        document.getElementById("toss_up_setting").setAttribute("style", "width: 35%;margin: 5px;background-color: #004400;")
    }else if(GameOptions.Time.TossUp < 5)
    {
        document.getElementById("toss_up_setting").setAttribute("style", "width: 35%;margin: 5px;background-color: #440000;")
    }else{
        document.getElementById("toss_up_setting").setAttribute("style", "width: 35%;margin: 5px;")
    }

    if(GameOptions.Time.Bonus > 20)
    {
        document.getElementById("bonus_setting").setAttribute("style", "width: 35%;margin: 5px;background-color: #004400;")
    }else if(GameOptions.Time.Bonus < 20)
    {
        document.getElementById("bonus_setting").setAttribute("style", "width: 35%;margin: 5px;background-color: #440000;")
    }else{
        document.getElementById("bonus_setting").setAttribute("style", "width: 35%;margin: 5px;")
    }

    if(GameOptions.ReadSpeed > 40)
    {
        document.getElementById("read_speed_setting").setAttribute("style", "width: 35%;margin: 5px;background-color: #000044;")
    }else if(GameOptions.ReadSpeed < 20)
    {
        document.getElementById("read_speed_setting").setAttribute("style", "width: 35%;margin: 5px;background-color: #000044;")
    }else{
        document.getElementById("read_speed_setting").setAttribute("style", "width: 35%;margin: 5px;")
    }

    if(GameOptions.QuestionDelay > 3)
    {
        document.getElementById("question_delay_setting").setAttribute("style", "width: 35%;margin: 5px;background-color: #004400;")
    }else if(GameOptions.QuestionDelay < 3)
    {
        document.getElementById("question_delay_setting").setAttribute("style", "width: 35%;margin: 5px;background-color: #440000;")
    }else{
        document.getElementById("question_delay_setting").setAttribute("style", "width: 35%;margin: 5px;")
    }

    if(GameOptions.DisplayAnswerOnFail == true)
    {
        document.getElementById("answer_view_setting").value = "Yes";
        document.getElementById("answer_view_setting").setAttribute("style", "width: 35%;margin: 5px;background-color: #000044;")
    }else{
        document.getElementById("answer_view_setting").value = "No";
        document.getElementById("answer_view_setting").setAttribute("style", "width: 35%;margin: 5px;")
    }
}

//Converts the settings menu into a readonly menu that updates with what the host has set for the room.
function CLIENT_LaunchUI()
{
    HOST_LaunchUI();
    document.getElementById("toss_up_setting").setAttribute('readonly', true);
    document.getElementById("bonus_setting").setAttribute('readonly', true);
    document.getElementById("read_speed_setting").setAttribute('readonly', true);
    document.getElementById('question_delay_setting').setAttribute('readonly', true);
    document.getElementById('answer_view_setting').remove();
    document.getElementById('type_animation_setting').remove();

    var cList = document.getElementById('question_delay_setting').parentElement.parentElement.children;

    var newAnswerView = document.createElement("input");
    newAnswerView.id = "answer_view_setting";
    newAnswerView.setAttribute("style", "width: 35%;margin: 5px;");
    newAnswerView.setAttribute('readonly', true);
    newAnswerView.value = "Yes";
    cList[cList.length - 2].appendChild(newAnswerView);

    var newTypeAnimation = document.createElement("input");
    newTypeAnimation.id = "type_animation_setting";
    newTypeAnimation.setAttribute("style", "width: 35%;margin: 5px;");
    newTypeAnimation.setAttribute('readonly', true);
    newTypeAnimation.value = "Random";
    cList[cList.length - 1].appendChild(newTypeAnimation);
}

//Fetches and updates the current room data.
function CLIENT_UpdateCurrentRoom()
{
    console.log("Client UPDATE");
    const id = CurrentRoom.id;
    APIData.GetRoom(id).then(room => {
        if(room == null)
        {
            this.document.body.innerHTML = "<h1>That room does not exist!</h1>";
            return;
        }

        CurrentRoom = room;

        CurrentRoom.id = id;

        //TODO: MAKE IT SO THAT THIS IS BASED ON IF THE GAME STARTED YET
        //Called on update before the game has started.
        DisplayAwaitingHost();
        GameOptions = CurrentRoom.settings;
        UpdateSettingsUI();
    })
}

function HOST_UpdateCurrentRoom()
{
    console.log("Host UPDATE");
    const id = CurrentRoom.id;
    APIData.GetRoom(id).then(room => {
        if(room == null)
        {
            this.document.body.innerHTML = "<h1>That room does not exist!</h1>";
            return;
        }

        CurrentRoom = room;

        CurrentRoom.id = id;

        //TODO: MAKE IT SO THAT THIS IS BASED ON IF THE GAME STARTED YET
        //Called on update before the game has started.
        DisplayAwaitingHost();
    })
}

//Call this after the host modifies a setting before the game has begun.
function HOST_UpdateSettings()
{
    APIData.RoomSetSettings(CurrentRoom, GameOptions);
}

//Returns the current alias being used.
function GetAccountName()
{
    //TODO: REMOVE AFTER TESTING
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has("t_acc"))
    {
        return urlParams.get("t_acc");
    }
    //END TODO

    var check = localStorage.getItem("science_bowl_quiz_af2252024_account");
    if(check == null || check == "null")
    {
        this.document.body.innerHTML = "<h1>You are not logged in!</h1>";
        return "null";
    }

    return check;
}

//Sets the current alias being used.
function SignIn(username)
{
    if(username.length < 20 && username.length >= 3)
    {
        localStorage.setItem("science_bowl_quiz_af2252024_account", username);
        return true;
    }else{
        return false;
    }
}

/*
    GET PUBLIC IP
*/

async function ip_local()
{    
    var res = await fetch("https://api.ipify.org/");
    var data = await res.text();
    return data;
}