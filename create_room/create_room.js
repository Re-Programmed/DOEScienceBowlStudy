const BASIC_ROOM_JSON = `{"numPlayers":0,"players":[],"gameStarted":false,
                          "currentlyAnswering":{"uname":"","prompt":""},"betweenQ":false,
                          "currentQuestion":{"qid":0,"set":0,"type":"toss-up"},"questionSets":[],"lockedTeam":"",
                          "settings":{"ReadSpeed":30,"QuestionDelay":3,"Time":{"Bonus":25,"TossUp":7},"DisplayAnswerOnFail":true,"TypingAnimation":"random"},
                          "timer":-1,"votes":0,"points":{"a":0,"b":0},
                          "info":{ "name": "New Room", "maxp": 16 }}`

function CreateRoom()
{
    const date = new Date();
    const roomID = "room_" + date.getMonth().toString() + date.getDay().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + (Math.round(Math.random() * 1000)).toString();
    var newRoom = JSON.parse(BASIC_ROOM_JSON);
    newRoom.info.name = RemoveProfanity(GetInputNotNull("createroom_room_name_setting", "New Room"));

    APIData.CreateRoom(roomID, newRoom).then(data => {
    
        console.log("Created room " + roomID + ":")
        console.log(newRoom)

        console.log("DATA: \n" + data);

        window.open('../index.html', '_self');
    })

}

function GetInputNotNull(inputName, fallback = "null")
{
    const value = document.getElementById(inputName).value;
    
    if(value == "" || value == undefined || value == null)
    {
        return fallback;
    }

    return value;
}