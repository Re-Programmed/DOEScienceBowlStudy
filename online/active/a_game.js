/*
    This file is for managing games while they are ongoing.
    The file references methods from "o_game.js" in order to make using the variables contained in o_game easier.
*/

var queuedEvents = []
//Queues an event to execute after the current room has been updated. EX. don't perform the actions of buzzing in until the room has refreshed. (essentially PING but we are not using TCP) 
function QueueEvent(event)
{
    queuedEvents.push(event);
}

window.addEventListener('load', function () {
    var hasV = localStorage.getItem("SCIBOWL_VOTED_CHECK");
    if(hasV != null)
    {
        hasVotedCurrentQuestion = hasV == 'true';
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(!urlParams.has("online") || !urlParams.has("a_game")){
        this.window.open(this.location.href.replace("index.html", "").replace("active/", "").replace(queryString, "") + "index.html" + queryString, "_self")
        return;
    }

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

        GameOptions = room.settings;

        if(!CurrentRoom.gameStarted)
        {
            this.window.open(this.location.href.replace("index.html", "").replace("active/", "").replace(queryString, "") + "index.html" + queryString.replace("&a_game=1", ""), "_self");
            return;
        }

        ip_local().then(ip_local => {
            const accountName = GetAccountName();
            var foundPlayerInMatch = false;
            for(var i = 0; i < CurrentRoom.players.length; i++)
            {
                if(CurrentRoom.players[i].ip == ip_local && CurrentRoom.players[i].name == accountName)
                {
                    isHost = i == 0;

                    foundPlayerInMatch = true;
                    CurrentPlayer = new Account(CurrentRoom.players[i].name, CurrentRoom.players[i].team, CurrentRoom.players[i].ip);
                    break;
                }
            }
    
            if(!foundPlayerInMatch)
            {
                alert("You were not found in this match!");
                this.window.open(this.location.href.replace("index.html", "").replace("online/active/", "").replace(queryString, "") + "index.html", "_self");
                return;
            }

            GenerateTeamsDisplay();

            SelectedQSetButtons = CurrentRoom.questionSets;
            
            FullQuestionSet = []
            for(var v = 0; v < SelectedQSetButtons.length; v++)
            {
                FullQuestionSet.push(QSets[SelectedQSetButtons[v] - 4]);
            }

            SetCurrentQuestion(CurrentRoom.currentQuestion.set, CurrentRoom.currentQuestion.qid, CurrentRoom.currentQuestion.type);
            if(!CurrentRoom.betweenQ)
            {
                TypeCurrentQuestion();
            }

            setInterval(() => {
                APIData.GetRoom(CurrentRoom.id).then(room => {
                    if(room == null)
                    {
                        this.document.body.innerHTML = "<h1>This room has been disbanded!</h1>";
                        return;
                    }
        
                    CurrentRoom = room;
                    CurrentRoom.id = urlParams.get("online");

                    if(isHost)
                    {
                        HOST_UpdateRoom();
                    }else{
                        CLIENT_UpdateRoom();
                    }
                })
            }, API_INGAME_UPDATE);
        })
    })
})

//Gives the specified team the specified number of points.
function HOST_AddPoints(team, points)
{
    APIData.RoomAddPoints(CurrentRoom, team, points);
}

//Updates the points display
function UpdatePointsDisplay(team, points, change)
{
    document.getElementById(`team_${team.toLowerCase()}_scoreboard`).children[0].textContent = "Team " + team.toUpperCase() + ": " + points;

    var pEl = document.createElement("p");
    pEl.textContent = "+" + change + " points (" + points + ")";
    pEl.className = "points_display_history";
    document.getElementById(`team_${team.toLowerCase()}_scoreboard`).appendChild(pEl);
}


const TeamDisplayElementInner = `
    <p style="%style%">%name%</p>
    <p>•</p>
`

//Generate each team listing.
function GenerateTeamsDisplay()
{
    //Clear the team display. update the color of the team names if answering is locked.
    document.getElementById(`team_a_display`).innerHTML = `<h2 style='color: ${CurrentRoom.lockedTeam.toLowerCase() == 'a' ? "#545454" : "white"};'>Team A</h2>`;
    document.getElementById(`team_b_display`).innerHTML = `<h2 style='color: ${CurrentRoom.lockedTeam.toLowerCase() == 'b' ? "#545454" : "white"};'>Team B</h2>`;

    document.getElementById('team_a_display').setAttribute("style", `background-color: ${CurrentRoom.lockedTeam.toLowerCase() == 'a' ? "#1a1a21" : "#2c2c41"};`);
    document.getElementById('team_b_display').setAttribute("style", `background-color: ${CurrentRoom.lockedTeam.toLowerCase() == 'b' ? "#1a1a21" : "#2c2c41"};`);

    var count = {a: -1, b: -1};

    for(var i = 0; i < CurrentRoom.players.length; i++)
    {
        const teamStr = CurrentRoom.players[i].team.toLowerCase();
        const parentElement = document.getElementById(`team_${teamStr}_display`);

        const tDisp = document.createElement("div");
        tDisp.className = "team_player"

        tDisp.id = CurrentRoom.players[i].name + "_user";

        var tNum = ++count[teamStr];
        tDisp.innerHTML = TeamDisplayElementInner.replace(/%style%/g, CurrentRoom.players[i].name == CurrentPlayer.Username ? "color: #FFFF00;" : (CurrentRoom.lockedTeam.toLowerCase() == teamStr.toLowerCase() ? "color: #545454;" : "color: white;")).replace(/%name%/g, teamStr.toUpperCase() + "" + (tNum == 0 ? "C" : tNum) + " - " + CurrentRoom.players[i].name);
        parentElement.appendChild(tDisp);
    }
}

//Called on the host to set the current question to a new one.
function HOST_LoadNewQuestion()
{
    setID = Math.floor(Math.random() * FullQuestionSet.length);
    currentQuestionIndex = 1 + Math.floor(Math.random() * QuestionSetCounts[setID]);

    //INCLUDE IF IT SHOULD BE A BONUS ----------------------------------------------------------------TIDI

    var bToss = nextShouldBeBonus ? "bonus" : "toss-up";
    nextShouldBeBonus = false;

    SetCurrentQuestion(setID, currentQuestionIndex, bToss);

    APIData.RoomSetCurrentQuestion(CurrentRoom, {qid: currentQuestionIndex, set: setID, type: bToss}).then(d => {
       setTimeout(function () {
        if(bToss == 'bonus')
        {
            APIData.RoomLockTeam(CurrentRoom, bonusTeam == 'A' ? 'B' : 'A');
        }
        TypeCurrentQuestion(true);
       }, API_INGAME_UPDATE)
    })
}

var currentQuestionType = "";

function SetCurrentQuestion(set, qid, bonus)
{
    questionActive = true;
    currentQuestionIndex = qid;
    currentQuestionType = bonus;
    setID = set;

    currentQuestion = GetQuestion(currentQuestionIndex, bonus, set);
    console.log(currentQuestion);
}

function TypeCurrentQuestion(uTimer = false)
{
    //Stores the total amount of time that it will take to read out the current question before starting the timer.
    var timerWaitDelay = GameOptions.ReadSpeed * (currentQuestion.ask.length + 6);

    document.getElementById("question").innerHTML = `<p style='color:#818181;'>${currentQuestion.type.toUpperCase()}</p>`

    TypeOutText(document.getElementById("question"), currentQuestion.ask, GameOptions.ReadSpeed);

    if(currentQuestion.options.length > 0)
    {
        currentQuestion.options.forEach(option => {
            DelayFunction(TypeOutText, timerWaitDelay, document.getElementById("question_option_" + option.charAt(0).toLowerCase()), option, GameOptions.ReadSpeed);
            timerWaitDelay += GameOptions.ReadSpeed * (option.length + 5);
        });
    }

    document.getElementById("long_answer_input").select();

    if(uTimer)
    {
        setTimeout(function () {
            APIData.RoomSetTimer(CurrentRoom, currentQuestion.type == "toss-up" ? GameOptions.Time.TossUp : GameOptions.Time.Bonus).then(d => {
    
            });
        }, (GameOptions.ReadSpeed * 2) + timerWaitDelay);
    }
}

//Sends the current answer to the server. (SHOULD ALWAYS BE A QUEUED EVENT)
function SendAnswer()
{
    if(CurrentRoom.currentlyAnswering.uname != "" || GetTeamLocked() || CurrentRoom.betweenQ || CurrentRoom.timer - (API_INGAME_UPDATE / 1000) < 0)
    {
        return;
    }

    APIData.RoomAnswerQuestion(CurrentRoom, CurrentPlayer.Username, document.getElementById("long_answer_input").value);
}

var nextShouldBeBonus = false, bonusTeam = '';

//Returns true if the current players team is locked from answering.
function GetTeamLocked()
{
    return CurrentRoom.lockedTeam.toLowerCase() == CurrentPlayer.Team.toLowerCase();
}

var lastPrompt = "", lastUserAnswer = "";

function RecieveAnswer()
{
    setTimeout(function () {
        document.getElementById("player_answer_talk_ptp").innerHTML = "";
        document.getElementById("player_answer_talk").setAttribute("style", "");
        document.getElementById("player_answer_talk_name").innerHTML = `<p style='color: orange; animation-name: fade-up; animation-duration: 0.3s;'>${lastUserAnswer}</p>`;

    }, 1500)

    const typeP = lastPrompt;

        //PLAY BUZZER NOISE
    const buzzer = new Audio("../../sounds/SCIENCE_BUZZ.mp3");
    buzzer.play();

    console.log(lastUserAnswer + "_user")
    document.getElementById(lastUserAnswer + "_user").setAttribute("style", "color: red;")
    document.getElementById(lastUserAnswer + "_user").children[0].setAttribute("style", "color: red;")
    document.getElementById(lastUserAnswer + "_user").children[1].innerHTML += " BUZZED"
    document.getElementById(lastUserAnswer + "_user").children[0].className = "shake_anim"

    const sub = SubmitAnswer(typeP);

    if(sub)
    {
        if(isHost)
        {



            setTimeout(function () {
                for(var p = 0; p < CurrentRoom.players.length; p++)
                {
                    if(CurrentRoom.players[p].name == lastUserAnswer)
                    {
                        HOST_AddPoints(CurrentRoom.players[p].team, CurrentRoom.currentQuestion.type == "toss-up" ? 4 : 10);
                        if(CurrentRoom.currentQuestion.type == "toss-up")
                        {
                            nextShouldBeBonus = true;
                            bonusTeam = CurrentRoom.players[p].team.toUpperCase();
                        }
                        break;
                    }
                }
            }, 3500)
        }
    }

    //Dramatic pause for effect.
    setTimeout(function () {
        console.log(typeP)
        TypeOutText(document.getElementById("player_answer_talk_ptp"), typeP, 35);

        setTimeout(function () {
            if(!sub)
            {
                DisplayAnim("<p style='color: red;'>X</p>", 1000);
                quake(7);

                var audio = new Audio('../../sounds/COMBO/combo' + (Math.floor(Math.random() * 4) + 1) + ".wav");
                audio.play();

                if(isHost)
                {
                    APIData.RoomSetTimer(CurrentRoom, GameOptions.Time.TossUp).then(d => {

                    });
                }
            }else{

                QueueEvent(function () {
                    APIData.RoomSetTimer(CurrentRoom, -2).then(d => {
                   
                    });
                })
                DisplayAnim("<p style='color:lime;'>✓</p>", 1000);

                

                const aud = new Audio('../../sounds/POWERUP/power' + (Math.floor(Math.random() * 4) + 1) + ".wav");
                aud.play();

            }

            /*
            -----
                TODO:

                IF THIS IS THE HOST, GIVE THE CURRENT PLAYERS TEAM POINTS AND LET THEM ANSWER A BONUS.

                ALSO SET THE NEW QUESTION AND LOCK THE TEAM THAT ANSWERED.
            -----
            */

            GenerateTeamsDisplay();

            setTimeout(function() {
                document.getElementById("player_answer_talk").setAttribute("style", "animation-name: fade-out; animation-duration: 0.4s; animation-fill-mode: forward;");
                document.getElementById("player_answer_talk_name").setAttribute("style", "animation-name: fade-out; animation-duration: 0.4s; animation-fill-mode: forward;");
                document.getElementById("player_answer_talk_ptp").setAttribute("style", "animation-name: fade-out; animation-duration: 0.4s; animation-fill-mode: forward;");

                if(isHost)
                {
                    //Answer was wrong.
                    if(!sub)
                    {
                        //Clear the current answerer and lock the team that got it wrong.
                        var lTeam = "";

                        for(var i = 0; i < CurrentRoom.players.length; i++)
                        {
                            if(CurrentRoom.players[i].name == lastUserAnswer)
                            {
                                lTeam = CurrentRoom.players[i].team;
                                break;
                            }
                        }

                        if(CurrentRoom.lockedTeam != "" || CurrentRoom.currentQuestion.type == 'bonus')
                        {
                            APIData.RoomSetTimer(CurrentRoom, -2).then(d => {
               
                            });                
                        }else{
                            APIData.RoomLockTeam(CurrentRoom, lTeam);
                        }

                    }
                }

                setTimeout(function() {
                    document.getElementById("player_answer_talk").setAttribute("style", "display: none;");
                    document.getElementById("player_answer_talk_name").setAttribute("style", "");
                    document.getElementById("player_answer_talk_ptp").setAttribute("style", "");

                    document.getElementById("long_answer_input").removeAttribute("readonly");
                }, 425)
            }, 2600)
        }, 3000)
    }, 3750)
}

var DisplayingCDown = false;

function NewQuestionQDOWN()
{
    if(DisplayingCDown){return;}
    DisplayingCDown = true;
    for(var i = 0; i < GameOptions.QuestionDelay; i++)
    {
        DelayFunction(DisplayAnim, i * 1000, GameOptions.QuestionDelay - i, 1000);
    }

    if(isHost)
    {
        DelayFunction(function () {
        
            HOST_LoadNewQuestion();
    
        }, (1 + GameOptions.QuestionDelay) * 1000);
    }
}

var hasDisplayedAnswer = false;

var hasDisplayedTimeAlert = false;

var lastGottenPoints = {a: 0, b: 0}

//Called every time the current room is fetched. Put anything to check or execute about the room here.
function CLIENT_UpdateRoom()
{
    RenderTimer(CurrentRoom.timer - (API_INGAME_UPDATE / 1000))

    if(CurrentRoom.timer - (API_INGAME_UPDATE / 1000) < 0 && CurrentRoom.currentlyAnswering.uname == '' && CurrentRoom.currentlyAnswering.prompt == '' && CurrentRoom.betweenQ)
    {
        if(!hasDisplayedTimeAlert)
        {
            DisplayAnim("<p style='color: red;'>TIME</p>", 1000);
            hasDisplayedTimeAlert = true;
        }
    }else{
        hasDisplayedTimeAlert = false;
    }

    if(lastGottenPoints.a != CurrentRoom.points.a)
    {
        UpdatePointsDisplay('a', CurrentRoom.points.a, CurrentRoom.points.a - lastGottenPoints.a);
        lastGottenPoints.a = CurrentRoom.points.a;
    }

    if(lastGottenPoints.b != CurrentRoom.points.b)
    {
        UpdatePointsDisplay('b', CurrentRoom.points.b, CurrentRoom.points.b - lastGottenPoints.b);
        lastGottenPoints.b = CurrentRoom.points.b;
    }

    if(CurrentRoom.lockedTeam != lastRoomTeamLock)
    {
        lastRoomTeamLock = CurrentRoom.lockedTeam;
        GenerateTeamsDisplay();
    }

    //Check if you should be allowed to enter an answer.
    if(GetTeamLocked() || CurrentRoom.currentlyAnswering.uname != "" || CurrentRoom.betweenQ)
    {
        document.getElementById("long_answer_input").setAttribute("readonly", "true");
    }else if(document.getElementById("long_answer_input").hasAttribute("readonly")){
        document.getElementById("long_answer_input").removeAttribute("readonly");
    }

    if(CurrentRoom.betweenQ && CurrentRoom.currentlyAnswering.uname == "")
    {
        if(!hasDisplayedAnswer)
        {
            hasDisplayedAnswer = true;
            DisplayAnswer(false, false, "if(!hasVotedCurrentQuestion){APIData.RoomAddVote(CurrentRoom);hasVotedCurrentQuestion = true;}")
        }
        
        if(hasVotedCurrentQuestion)
        {
            document.getElementById("continue_vote_button")?.setAttribute("style", "background-color: #00AA00;")
        }

        if(CurrentRoom.votes >= CurrentRoom.players.length/2)
        {
            NewQuestionQDOWN();
        }

        if(document.getElementById("continue_vote_button") != undefined)
        {
            document.getElementById("continue_vote_button").textContent = "Continue - " + CurrentRoom.votes + "/" + (CurrentRoom.players.length/2);
        }

        if(hasVotedCurrentQuestion)
        {
            document.getElementById("continue_vote_button")?.setAttribute("style", "background-color: #00AA00;")
        }
    }else{
        DisplayingCDown = false;
        hasDisplayedAnswer = false;
        if(hasVotedCurrentQuestion)
        {
            hasVotedCurrentQuestion = false;
            localStorage.setItem("SCIBOWL_VOTED_CHECK", hasVotedCurrentQuestion);
        }

        if(CurrentRoom.currentQuestion.qid != currentQuestionIndex || CurrentRoom.currentQuestion.set != setID || CurrentRoom.currentQuestion.type != currentQuestionType)
        {
            SetCurrentQuestion(CurrentRoom.currentQuestion.set, CurrentRoom.currentQuestion.qid, CurrentRoom.currentQuestion.type);
            TypeCurrentQuestion();
        }
    
        if(CurrentRoom.currentlyAnswering.uname != "" && CurrentRoom.currentlyAnswering.prompt != "")
        {
            if(CurrentRoom.currentlyAnswering.uname != lastUserAnswer || CurrentRoom.currentlyAnswering.prompt != lastPrompt)
            {
                lastUserAnswer = CurrentRoom.currentlyAnswering.uname;
                lastPrompt = CurrentRoom.currentlyAnswering.prompt;
                RecieveAnswer();
            }
        }else{
            lastUserAnswer = "";
            lastPrompt = "";
        }
    }

    //Send all queued events, since the room updated.
    for(var i = 0; i < queuedEvents.length; i++)
    {
        queuedEvents[i]();
    }

    queuedEvents = [];

}

var hasVotedCurrentQuestion = false;

var lastRoomTeamLock = '';

function HOST_UpdateRoom()
{
    console.log(CurrentRoom.betweenQ);

    if(lastGottenPoints.a != CurrentRoom.points.a)
    {
        UpdatePointsDisplay('a', CurrentRoom.points.a, CurrentRoom.points.a - lastGottenPoints.a);
        lastGottenPoints.a = CurrentRoom.points.a;
    }

    if(lastGottenPoints.b != CurrentRoom.points.b)
    {
        UpdatePointsDisplay('b', CurrentRoom.points.b, CurrentRoom.points.b - lastGottenPoints.b);
        lastGottenPoints.b = CurrentRoom.points.b;
    }

    if(CurrentRoom.lockedTeam != lastRoomTeamLock)
    {
        lastRoomTeamLock = CurrentRoom.lockedTeam;
        GenerateTeamsDisplay();
    }

    //TODO : LOCK SUBMIT BUTTON
    //Check if you should be allowed to enter an answer.
    if(GetTeamLocked() || CurrentRoom.currentlyAnswering.uname != "" || CurrentRoom.betweenQ)
    {
        document.getElementById("long_answer_input").setAttribute("readonly", "true");
    }else if(document.getElementById("long_answer_input").hasAttribute("readonly")){
        document.getElementById("long_answer_input").removeAttribute("readonly");
    }

    if(CurrentRoom.betweenQ)
    {
        if(!hasDisplayedAnswer)
        {
            hasDisplayedAnswer = true;
            DisplayAnswer(false, false, "if(!hasVotedCurrentQuestion){APIData.RoomAddVote(CurrentRoom);hasVotedCurrentQuestion = true;}")
        }

        if(hasVotedCurrentQuestion)
        {
            document.getElementById("continue_vote_button")?.setAttribute("style", "background-color: #00AA00;")
        }

        if(CurrentRoom.votes >= CurrentRoom.players.length/2)
        {
            NewQuestionQDOWN();
        }

        if(document.getElementById("continue_vote_button") != undefined)
        {
            document.getElementById("continue_vote_button").textContent = "Continue - " + CurrentRoom.votes + "/" + (CurrentRoom.players.length/2);
        }

    }else{
        DisplayingCDown = false;
        hasDisplayedAnswer = false;
        if(hasVotedCurrentQuestion)
        {
            hasVotedCurrentQuestion = false;
            localStorage.setItem("SCIBOWL_VOTED_CHECK", hasVotedCurrentQuestion);
        }
        
        if(CurrentRoom.currentlyAnswering.uname != "" && CurrentRoom.currentlyAnswering.prompt != "")
        {
            if(CurrentRoom.currentlyAnswering.uname != lastUserAnswer || CurrentRoom.currentlyAnswering.prompt != lastPrompt)
            {
                lastUserAnswer = CurrentRoom.currentlyAnswering.uname;
                lastPrompt = CurrentRoom.currentlyAnswering.prompt;
                RecieveAnswer();
            }
        }else{
            lastUserAnswer = "";
            lastPrompt = "";
        }
    }

    //Send all queued events, since the room updated.
    for(var i = 0; i < queuedEvents.length; i++)
    {
        queuedEvents[i]();
    }

    queuedEvents = [];
   
    var newTime = CurrentRoom.timer - (API_INGAME_UPDATE/1000);

    if(CurrentRoom.currentlyAnswering.uname == '' && CurrentRoom.currentlyAnswering.prompt == '')
    {
        if(newTime > 0)
        {
            APIData.RoomSetTimer(CurrentRoom, newTime);
        }else if(CurrentRoom.timer != -1){
            //TIME UP! DO SOMETHING! (DISPLAY ANSWER / OTHER)
            APIData.RoomSetTimer(CurrentRoom, -1);
            DisplayAnim("<p style='color: red;'>TIME</p>", 1000);
        }
    
    }

    
    RenderTimer(newTime)
}

const TIMER_MESSAGES = ["SCIBOL", "=)", "TIMEUP", "%randplayer%", "HAVFUN", "SCIBOL"]

function RenderTimer(newTime)
{
    console.log(newTime);
    if(newTime < 0)
    {
        if(document.getElementById("timer_text").textContent.includes(":"))
        {
            var tmMessage = TIMER_MESSAGES[Math.floor(Math.random() * TIMER_MESSAGES.length)];

            if(tmMessage == "%randplayer%")
            {
                tmMessage = CurrentRoom.players[Math.floor(Math.random() * CurrentRoom.players.length)].name.substring(0, 6);
            }

            document.getElementById("timer_text").textContent =  tmMessage;
        }
        return;
    }
    var min = Math.floor(newTime / 60).toString();
    var sec = Math.floor(newTime % 60).toString();
    var decimal = ((newTime * 10) % 10).toString();

    if(min.length == 1)
    {
        min = "0" + min;
    }else{
        min = min.substring(0, 2);
    }

    if(sec.length == 1)
    {
        sec = "0" + sec;
    }else{
        sec = sec.substring(0, 2);
    }

    if(decimal.length > 1)
    {
        decimal = decimal.substring(0, 1);
    }

    document.getElementById("timer_text").textContent =  min + ":" + sec + "." + decimal;
}