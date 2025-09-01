var GameOptions = {
    ReadSpeed: 30,
    QuestionDelay: 3,
    Time: { Bonus: 20, TossUp: 5 },
    DisplayAnswerOnFail: true,
    TypingAnimation: "random"
}

const ANSWER_OPTION_REF = ["W", "X", "Y", "Z"]

var currentQuestionIndex = 0;
var askedQuestions = [];
var currentQuestion = { ask: "", answer: "", options: ["", "", "", ""], type: "toss-up" };

var currentPoints = 0;

var questionTimer = 0;

var questionActive = false;

var lastAnswerGiven = ""

const randomAnimationTypingOptions = ["chfade", "chpop", "chnone"]
var randomAnimationTyping = "chfade";

window.addEventListener('load', function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has("online")){return;}

    randomAnimationTyping = randomAnimationTypingOptions[Math.floor(Math.random() * randomAnimationTypingOptions.length)];
    console.log(randomAnimationTyping);
   LoadSettings();
   LoadAvailableRooms();
})

window.addEventListener('keydown', function(event) {
    if(event.key === "Enter")
    {
        if(questionActive)
        {
            SubmitButton();
        }else{
            if(GameOptions.DisplayAnswerOnFail)
            {
                document.getElementById('question').innerHTML = '';
                IncrementCurrentQuestion(true);
            }
        }
    }
})

//#region ONLINE STUFF

//%roomID%
const AVAILABLE_ROOM_HTML = `
    <center style="border-top: %bt%;"><p style="width: 25%;display: inline-block;">%roomName%</p><p style="width: 25%;display: inline-block;">%roomID%</p><p style="width: 25%;display: inline-block;">%numPlayers%</p></center>
`

function LoadAvailableRooms()
{
    const room_listing = document.getElementById("room_listing");
    if(room_listing.children.length > 2)
    {
       for(var i = 0; i < room_listing.children.length; i++)
       {
        if(i > 2)
        {
            console.log("REMOVing")
            room_listing.children[i].remove();
            i--;
        }
       }
    }

    loadRoomHTML({ id: "Room ID", data: "{\"numPlayers\": \"Players\", \"info\":{\"name\": \"Name\"}}" }, "1px solid white")
    APIData.GetAvailableRooms().then(avRooms => {
        avRooms.forEach(room => {
            loadRoomHTML(room);
        })
    })
}

const loadRoomHTML = (room, bt = "none") => {
    var div = document.createElement("div");
    div.className = "available_room";
    div.innerHTML = AVAILABLE_ROOM_HTML.replace(/%roomID%/g, room.id).replace(/%numPlayers%/g, JSON.parse(room.data).numPlayers + (JSON.parse(room.data).info.maxp != undefined ? "/" + JSON.parse(room.data).info.maxp : "")).replace(/%roomName%/g, JSON.parse(room.data).info.name).replace("%bt%", bt);
    div.setAttribute("room_data", btoa(JSON.stringify(room)));

    if(room.id != "Room ID")
    {
        div.addEventListener('click', function () {
            DisplayJoinGamePopup(JSON.parse(atob(this.getAttribute("room_data"))));
        });
    }

    document.getElementById("room_listing").appendChild(div);
}

//#endregion ONLINE STUFF

//Loads settings from local storage.
function LoadSettings()
{
    var gVal = localStorage.getItem("science_bowl_quiz_af2252024");
    console.log(gVal)
    if(gVal != "undefined" && gVal != null)
    {
        const retrievedSettings = JSON.parse(atob(gVal));
        console.log(retrievedSettings);

        GameOptions = retrievedSettings;

        document.getElementById("toss_up_setting").value = GameOptions.Time.TossUp;
        document.getElementById("bonus_setting").value = GameOptions.Time.Bonus;
        document.getElementById("read_speed_setting").value = GameOptions.ReadSpeed;
        document.getElementById('question_delay_setting').value = GameOptions.QuestionDelay;
        document.getElementById('answer_view_setting').checked = GameOptions.DisplayAnswerOnFail;
        document.getElementById('type_animation_setting').value = GameOptions.TypingAnimation;

    }else{
        SaveSettings();
        LoadSettings();
    }

    LoadSelectedQSetButtons();
    LoadPoints();
}

//Saves what sets have been chosen to local storage.
function SelectQSetButton(id, selected)
{
    if(selected)
    {
        SelectedQSetButtons.push(id);
    }else{
        SelectedQSetButtons.splice(SelectedQSetButtons.indexOf(id), 1);
    }

    localStorage.setItem("science_bowl_quiz_af2252024_sets", btoa(JSON.stringify(SelectedQSetButtons)));

    console.log(SelectedQSetButtons);
}

//Loads what sets have been chosen from local storage.
function LoadSelectedQSetButtons()
{
    var cVal = localStorage.getItem("science_bowl_quiz_af2252024_sets");

    if(cVal != null)
    {
        const prevSel = JSON.parse(atob(cVal));

        SelectedQSetButtons = prevSel;

        console.log(prevSel);

        for(var i = 0; i < prevSel.length; i++)
        {
            const set = prevSel[i]; 
            OptSelButton(document.getElementById("select_question_set").children[set]);
        }
    }

}

function SaveSettings()
{
    localStorage.setItem("science_bowl_quiz_af2252024", btoa(JSON.stringify(GameOptions)));
    console.log(GameOptions);
}

function LoseRound()
{
    if((currentQuestion.type == "toss-up" && questionTimer == GameOptions.Time.TossUp + 1))
    {
        //The question was answered before it was finished being read, and it's wrong.
        document.getElementById("question").innerHTML = "BLURT";
        UpdatePoints(-4);
        DisplayAnim("<p style='color:red;'>BLURT</p>");
        quake(7);
        return true;
    }

    return false;
}

function SubmitButton(ignoreInput = false, justadv = false)
{
    if(!justadv)
    {
        if(!questionActive){ document.getElementById("long_answer_input").value = ""; return; }

        if(!ignoreInput && document.getElementById("long_answer_input").value == ""){return;}
    
        lastAnswerGiven = document.getElementById("long_answer_input").value;

        randomAnimationTyping = randomAnimationTypingOptions[Math.floor(Math.random() * randomAnimationTypingOptions.length)];
        console.log(randomAnimationTyping);
    
        questionActive = false;
        var submittedValue = ignoreInput ? "" : document.getElementById("long_answer_input").value;
    
        var wasCorrect = SubmitAnswer(submittedValue);
        var wasBlurt = false;
    
        if(wasCorrect)
        {
            if(currentQuestion.type == "bonus")
            {
                UpdatePoints(10, true, questionTimer > GameOptions.Time.Bonus);
            }else{
                UpdatePoints(4, true, questionTimer > GameOptions.Time.TossUp);
            }
    
            const aud = new Audio('./sounds/POWERUP/power' + (Math.floor(Math.random() * 4) + 1) + ".wav");
            aud.play();
        }else{
            wasBlurt = LoseRound();
        }
    
        document.getElementById("long_answer_input").value = "";
    
        //DELAY FOR SOME TIME
        if(!wasBlurt) { document.getElementById("question").innerHTML = wasCorrect ? "CORRECT" : "INCORRECT"; DisplayAnim(wasCorrect ? "<p style='color:lime;'>✓</p>" : "<p style='color:red;'>X</p>"); if(
            !wasCorrect
        ){
            var audio = new Audio('./sounds/COMBO/combo' + (Math.floor(Math.random() * 4) + 1) + ".wav");
            audio.play();
        }}
    }
   
   DisplayAnswer(justadv, wasCorrect);
}

function DisplayAnswer(justadv, wasCorrect, cButton = "" /*What to make the onclick event of the continue button.*/)
{
    ClearMultipleChoice();
    DelayFunction(function () {

        if(GameOptions.DisplayAnswerOnFail && !justadv)
        {
            document.getElementById("question").innerHTML = "<em>Question</em>: <br><p>" + currentQuestion.ask + "</p>"; 
            document.getElementById("question").innerHTML += "<br><br><em>Correct Answer</em>: <br><p style='color:" + (wasCorrect ? "lime" : "red") + ";'>" + currentQuestion.answer[0] + "</p>"; 

            if(currentQuestion.answer.length > 1)
            {
                for(var i = 1; i < currentQuestion.answer.length; i++)   
                {
                    document.getElementById("question").innerHTML += "<br><br><em>Also Accept</em>: <br><p style='color:#616161;'>" + currentQuestion.answer[i] + "</p>"; 
                }
            }

            if(lastAnswerGiven != "")
            {
                document.getElementById("question").innerHTML += "<br><br><em>You Said</em>: <br><p style='color:" + (wasCorrect ? "lime" : "red") + ";'>" + lastAnswerGiven + "</p>"; 
                lastAnswerGiven = ""
            }

            if(cButton != "")
            {
                document.getElementById("question").innerHTML += `<br><br><button id="continue_vote_button" onclick="${cButton}">Continue</button>`
            }else{
                document.getElementById("question").innerHTML += `<br><br><button onclick="document.getElementById('question').innerHTML = '';IncrementCurrentQuestion(` + wasCorrect + `);">Continue</button>`
            }
            
            return;
        }

        var dCount = GameOptions.QuestionDelay;
        document.getElementById("question").innerHTML = dCount;

        const CDownFunc = function () {
            document.getElementById("question").innerHTML = --dCount;
            if(dCount == 0)
            {
                document.getElementById("question").innerHTML = "";
                IncrementCurrentQuestion(wasCorrect);
            }else{
                DisplayAnim(dCount, justadv ? 1 : 1000);
                DelayFunction(CDownFunc, justadv ? 1 : 1000);
            }
        };


        DelayFunction(CDownFunc, justadv ? 1 : 1000)

    }, justadv ? 1 : 1750);
}

function DelayFunction(func, delay)
{
    setTimeout(() => {
        var args = []

        for(var i = 2; i < arguments.length; i++)
        {
            args.push(arguments[i]);
        }

        switch(args.length)
        {
            case 0:
                func();
                break;
            case 1:
                func(args[0]);
                break;
            case 2:
                func(args[0], args[1]);
                break;
            case 3:
                func(args[0], args[1], args[2]);
                break;
            case 4:
                func(args[0], args[1], args[2], args[3]);
                break;
            case 5:
                func(args[0], args[1], args[2], args[3], args[4]);
                break;
            case 6:
                func(args[0], args[1], args[2], args[3], args[4], args[5]);
                break;
            default:
                func();
        }
    }, delay);
}

function ClearMultipleChoice()
{
    Array.from(document.getElementsByClassName("question_option")).forEach(el => {
        el.textContent = "";
    });
}

//The current setID.
var setID = 0;

function IncrementCurrentQuestion(allowBonus = false)
{
    if(allowBonus && currentQuestion.type == "bonus") {allowBonus = false;}
    questionActive = true;

    if(!allowBonus)
    {
        setID = Math.floor(Math.random() * FullQuestionSet.length);
         //Which selected question set is being used. Choose random question.
        currentQuestionIndex = 1 + Math.floor(Math.random() * QuestionSetCounts[setID]);

        //Check if the question has been asked before in this session.
        for(var i = 0; i < askedQuestions.length; i++)
        {
            if(askedQuestions[i].q == setID && askedQuestions[i].v == currentQuestionIndex)
            {
                IncrementCurrentQuestion(false);
                return;
            }
        }

        askedQuestions.push({ q: setID, v: currentQuestionIndex });
    }

    currentQuestion = GetQuestion(currentQuestionIndex, allowBonus ? "bonus" : "toss-up", setID);
    console.log(currentQuestion);

    //Stores the total amount of time that it will take to read out the current question before starting the timer.
    var timerWaitDelay = GameOptions.ReadSpeed * (currentQuestion.ask.length + 6);

    document.getElementById("question").innerHTML += `<p style='color:#818181;'>${currentQuestion.type.toUpperCase()}</p>`

    TypeOutText(document.getElementById("question"), currentQuestion.ask, GameOptions.ReadSpeed);

    if(currentQuestion.options.length > 0)
    {
        currentQuestion.options.forEach(option => {
            DelayFunction(TypeOutText, timerWaitDelay, document.getElementById("question_option_" + option.charAt(0).toLowerCase()), option, GameOptions.ReadSpeed);
            timerWaitDelay += GameOptions.ReadSpeed * (option.length + 5);
        });
    }

    //Set the question timer.
    if(currentQuestion.type.toLowerCase() == "toss-up")
    {
        questionTimer = GameOptions.Time.TossUp + 1;
    }else{
        questionTimer = GameOptions.Time.Bonus + 1;
    }

    //Begin decrementing the timer.
    DelayFunction(ExecuteTimer, timerWaitDelay);

    //document.getElementById("question").innerHTML = currentQuestion.ask;


    document.getElementById("long_answer_input").select();
}

function ExecuteTimer()
{
    if(currentQuestion.ask == "")
    {
        SubmitButton(true, true);
        return;
    }

    if(!questionActive){return;}
    if(questionTimer == 1)
    { 
        SubmitButton(true);
        DisplayAnim("<p style='color:red;'>TIME</p>");
        quake(7);
        return;
    }

    questionTimer--;
    document.getElementById("timer_track").textContent = questionTimer + " second" + (questionTimer == 1 ? "" : "s");
    DelayFunction(ExecuteTimer, 1000);
}

function SubmitAnswer(answer)
{
    if(currentQuestion.listAnswer.length > 0)
    {
        for(var i = 0; i < currentQuestion.listAnswer.length; i++)
        {
            if(!answer.toLowerCase().replace(/ /g, "").includes(currentQuestion.listAnswer[i].toLowerCase().replace(/ /g, "")))
            {
                return false;
            }
        }

        return true;
    }

    if(currentQuestion.options.length > 0)
    {
        var letter = currentQuestion.answer[0].charAt(0);
        var checkString = currentQuestion.answer[0].substring(3, currentQuestion.answer[0].length);

        DEBUG_LogVars("letter", letter, "checkstring", checkString);
        return StringsSimilar(answer, letter) || StringsSimilar(answer, checkString);
    }

    for(var i = 0; i < currentQuestion.answer.length; i++)
    {
        if(StringsSimilar(answer, currentQuestion.answer[i]))
        {
            return true;
        }
    }

    return false;
}

var pointHistory = []

function UpdatePoints(points, uHistory = true, wasEarly = false)
{
    currentPoints += points;
    if(currentPoints < 0){ currentPoints = 0; }
    document.getElementById("point_display").textContent = "Total Points: " + currentPoints;

    localStorage.setItem("science_bowl_quiz_af2252024_points", btoa(currentPoints));

    if(uHistory)
    {
        if(points < 0)
        {
            pointHistory.push("<p style='color:#AA0000;'>" + points + " (BLURT - " + currentQuestion.type + ")</p>");
        }else{
            if(wasEarly)
            {
                pointHistory.push(`<p style='color:#00AA00;'>+${points} (${currentQuestion.type} - Early Answer)</p>`);
            }else{
                pointHistory.push(`<p style='color:#00AA00;'>+${points} (${currentQuestion.type})</p>`);
            }
        }

        localStorage.setItem("science_bowl_quiz_af2252024_pointshistory", btoa(JSON.stringify(pointHistory)));
    }

    DisplayPointHistory();
}

function DisplayPointHistory()
{
    document.getElementById("point_history").innerHTML = "";

    pointHistory.forEach(history => {
        document.getElementById("point_history").innerHTML = history + document.getElementById("point_history").innerHTML;
    })
}

function LoadPoints()
{
    var preCheck = localStorage.getItem("science_bowl_quiz_af2252024_points");

    if(preCheck != null)
    {
        var cCheck = Math.floor(atob(preCheck));
        
        if(localStorage.getItem("science_bowl_quiz_af2252024_pointshistory") != null){
            var pHist = JSON.parse(atob(localStorage.getItem("science_bowl_quiz_af2252024_pointshistory")));
            pointHistory = pHist;
            
        }


        UpdatePoints(cCheck, false);
    }else{
        UpdatePoints(0, false);
    }
}

//TODO: ADD TYPING CLICK NOISE
function TypeOutText(element, text, charDelay)
{
    if(!questionActive){return;}
    DelayFunction(function () {
        if(!questionActive){return;}
        if(text.charAt(0) == "\n")
        {
            element.innerHTML += "<br>";
        }else{
            var elName = randomAnimationTyping;

            if(GameOptions.TypingAnimation != "random")
            {
                elName = GameOptions.TypingAnimation;
            }

            var newEl = document.createElement(elName)
            newEl.innerHTML = text.charAt(0);
            element.appendChild(newEl)
            //element.innerHTML += "<chcust>" +  + "</chcust>";
        }
        if(text.length == 1){return;}
        TypeOutText(element, text.substring(1, text.length), charDelay);
        //Play Sound?
    }, charDelay);
}

//qId : int
//type : string ("toss-up", "bonus")
//setID : int
//returns : { ask: string, answer: string, options: [4 strings/empty] }
GetQuestion = (qId, type, setID = 0) => {

    const questionPrefix = qId + ") ";

    console.log(setID)
    console.log(FullQuestionSet[setID])
    const splitArr = FullQuestionSet[setID].split("\n");

    document.getElementById("set_num_display").innerHTML = `<em>(${QuestionSetNames[setID]})</em>`;

    var qz_ask = ""; //What is being asked, should be between "n) " and "W)" or "ANSWER" 
    var qz_answer = ""; //What the answer is.
    var qz_options = []; //The options given if this is multiple choice.

    //True if the loop has reached the beginning of the question being asked.
    var reachedFileHeading = false;
    //True if the loop is reading in a multi-line question.
    var readingAsk = false;

    //Read over every line of the file.
    for(var i = 0; i < splitArr.length; i++)
    {
        const line = splitArr[i];

        //If the loop is reading the answer and has already reached the start of the question.
        if(reachedFileHeading && line.startsWith("ANSWER"))
        {
            qz_answer = line;
            break;
        }

        //If the loop has reached the start of the question and this line begins with one of the options (W,X,Y,Z).
        if(reachedFileHeading)
        {
            for(var x = 0; x < ANSWER_OPTION_REF.length; x++)
            {
                if(line.toLowerCase().startsWith(ANSWER_OPTION_REF[x].toLowerCase() + ")"))
                {
                    qz_options[x] = line;
                    break;
                }
            }
        }

        //If the question is being read and it is a multi-line question.
        if(readingAsk)
        {
            if(line.toLowerCase().startsWith("w)") || line.toLowerCase().startsWith("answer")){readingAsk = false;continue;}
            qz_ask += " " + line;
            continue;
        }

        //If this is the start of the question being read.
        if(line.startsWith(questionPrefix) && splitArr[i - 1].toLowerCase() == type.toLowerCase())
        {
            qz_ask = line;
            readingAsk = true;
            reachedFileHeading = true;
        }
    }
  
    var multiAnswer = []
    var listAnswer = []
    qz_answer = qz_answer.toLowerCase().replace("answer: ", "");

    if(qz_answer.includes("(in any order)"))
    {
        listAnswer = qz_answer.replace("(in any order)", "").replace(/ /g, "").split(";");
    }

    if(qz_answer.includes(" (accept: "))
    {
        multiAnswer = [qz_answer.split(" (accept: ")[0]]
        var v2 = qz_answer.split(" (accept: ")[1];

        if(v2.toLowerCase().includes(" or "))
        {
            var v3 = v2.toLowerCase().split(" or ");

            for(var i = 0; i < v3.length - 1; i++)
            {
                multiAnswer.push(v3[i]);
            }

            multiAnswer.push(v3[v3.length - 1].substring(0, v3[v3.length - 1].length - 1))
        }else{
            multiAnswer.push(v2.substring(0, v2.length - 1))
        }

    }else{
        multiAnswer = [qz_answer]
    }

    return { ask: qz_ask.replace("Short Answer", "Short Answer\n"), answer: multiAnswer, options: qz_options, type: type, listAnswer: listAnswer };

}

//Returns true if two strings are the same, disregards spaces and case.
StringsSimilar = (s1, s2) => {
    return s1.toLowerCase().replace(/ /g, "") === s2.toLowerCase().replace(/ /g, "");
}

function OptSelButton(btn, resetAll = false)
{
    if(resetAll)
    {
        document.getElementById("all_btn_select_mode").textContent = "All";
    }

    btn.setAttribute('optsel', btn.getAttribute('optsel') == 'true' ? 'false' : 'true');
    if(btn.getAttribute('optsel') == 'true')
    {
        btn.setAttribute("style", "background-color: #00AA00;border: 3px solid #008800;");
        return;
    }

    btn.setAttribute("style", "");
}

function DEBUG_LogVars()
{
    var obj = {};
    for(var i = 0; i < arguments.length; i += 2)
    {
        obj[arguments[i]] = arguments[i + 1];
    }

    console.log(obj);
}

//Creates a large piece of text that moves toward the screen.
const DisplayAnim = async (num, time = 2000) =>
{
    document.getElementById("CountdownNumber").setAttribute("style", "visibility: unset;");
    
    document.getElementById("CountdownNumber").innerHTML = num;
    for (let i = 0; i < time; i++) { 
        await setTimeout(() => {
            document.getElementById("CountdownNumber").setAttribute("style", "font-size:" + i + "px;margin-top:-" + i/(time/100) + "px;opacity:" + ((time-i)/time) + ";");
            if(i == time - 1){   document.getElementById("CountdownNumber").setAttribute("style", "display:none;font-size:0px;margin-top:0px;opacity:0;");        }
        }, i);
    }
}

//Screenshake
function quake(times/*, text, red = false*/) 
{ 

   // var audio = new Audio('./sounds/COMBO/combo' + (Math.floor(Math.random() * 4) + 1) + ".wav");
   // audio.play();

    for(i = 0; i < times; i++)
    {
        setTimeout(() => {
            quakeOnce();
        }, i * 60);
    }
  //DisplayNumberCount(text, red);
} 

//Screenshake Utility
function quakeOnce()
{
    document.getElementsByTagName('body')[0].setAttribute("style", "margin-left: 5px;");

  setTimeout(() => {
    document.getElementsByTagName('body')[0].setAttribute("style", "margin-left: 0px;");
  }, 15);

  setTimeout(() => {
    document.getElementsByTagName('body')[0].setAttribute("style", "margin-left: -5px;");
  }, 30);

  setTimeout(() => {
    document.getElementsByTagName('body')[0].setAttribute("style", "margin-left: 0px;");
  }, 45);
}

function DisplayJoinGamePopup(game)
{
    document.getElementById("join_game_popup").setAttribute("style", "");

    var nGame = {id: game.id, data: JSON.parse(game.data)};

    //Make the header say "Join %roomName%?"
    document.getElementById("join_game_popup").children[0].children[0].textContent = "Join " + nGame.data.info.name + "?";

    var playerList = "";

    if(nGame.data.players.length > 0)
    {
        playerList += "<em style='color: " + (nGame.data.players[0].name == GetAccountName() ? "green" : "gold") + ";'>" + nGame.data.players[0].name + " - Team " + nGame.data.players[0].team + "</em><br>";
    }

    for(var i = 1; i < nGame.data.players.length; i++)
    {
        if(nGame.data.players[i].name == GetAccountName())
        {
            playerList += "<em style='color: green;'>" + nGame.data.players[i].name + " - Team " + nGame.data.players[i].team + "</em><br>";
        }else{
            playerList += nGame.data.players[i].name + " - Team " + nGame.data.players[i].team + "<br>";
        }

    }

    document.getElementById("room_details_display").innerHTML = `
        Players:<br><br>${playerList}
    `;

    document.getElementById("room_settings_display").innerHTML = `
        Toss-Up Time: ${nGame.data.settings.Time.TossUp}s<br>
        Bonus Time: ${nGame.data.settings.Time.Bonus}s<br>
        Read Speed: ${nGame.data.settings.ReadSpeed}ms/c<br>
        Question Delay: ${nGame.data.settings.QuestionDelay}s<br>
        Display Answers: ${nGame.data.settings.DisplayAnswerOnFail ? "Yes" : "No"}
    `;

    document.getElementById("join_game_button").setAttribute("code", game.id);
}