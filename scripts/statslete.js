chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.action === "getText" ) {
        //sendResponse({data: request.source, method: "getText"}); //same as innerText
        console.log(request.source)

        getPlayerBioInfo(1628425);
      }
    }
);

$(document).ready(function() {
    chrome.tabs.executeScript({code: "chrome.runtime.sendMessage({ action: 'getText', source: document.body.innerText});"});

    // playercareerstats
    $.ajax({
        url: "http://stats.nba.com/stats/playercareerstats/?playerid=202689&permode=Totals",
        dataType: "jsonp",
        crossDomain: true,
        success: function (data) {
            // log api call results and then print them to chrome extension
            console.log(data);
            // $('.career-stats').text(JSON.stringify(data));
        }
    });


    $.ajax({
        url: 'http://stats.nba.com/stats/playerdashboardbygeneralsplits/?PlayerID=2200&MeasureType=Base&PerMode=PerGame&PlusMinus=N&PaceAdjust=N&Rank=N&Season=2017-18&SeasonType=Regular%20Season&Outcome=&Location=&SeasonSegment=&DateFrom=&DateTo=&VsConference=&VsDivision=&Month=0&OpponentTeamID=0&GameSegment=&Period=0&LastNGames=0',
        dataType: "jsonp",
        crossDomain: true,
        success: function(data) {
            var infoNeeded = ["PTS", "REB", "AST", "STL", "BLK", "TOV"]
            var scoringMultiplier = [1,1.2,1.5,3,3,-1]
            var fantasyScore = 0.0

            for(i = 0; i < infoNeeded.length; i++){
                var stat = data["resultSets"][0]["rowSet"][0][data["resultSets"][0]["headers"].indexOf(infoNeeded[i])]
                console.log(infoNeeded[i] + " " + stat)
                fantasyScore += parseFloat(stat) * scoringMultiplier[i]
            }
            console.log("Avg fantasy pts: " + fantasyScore)
        }
    })
});

// makes an AJAX request to get the biography info for player with playerID.
// populates the HTML to fill in info about the player
function getPlayerBioInfo(playerID) {
    $.ajax({
        url: "https://stats.nba.com/stats/commonplayerinfo/?playerid=" + playerID,
        dataType: "jsonp",
        crossDomain: true,
        success: function (data) {
            console.log(data);

            // parse common player info into bio information
            var headers = ["FIRST_NAME", "LAST_NAME", "TEAM_NAME", "TEAM_CITY", "JERSEY", "POSITION", "SCHOOL", "HEIGHT", "WEIGHT"];
            var parsed_data = {}
            for (i = 0; i < headers.length; i++) {
                parsed_data[headers[i]] = data["resultSets"][0]["rowSet"][0][data["resultSets"][0]["headers"].indexOf(headers[i])];
            }

            // get player image url
            var image_url = "https://nba-players.herokuapp.com/players/" + parsed_data['LAST_NAME'] + "/" + parsed_data['FIRST_NAME'];

            var player = {
                'name': parsed_data['FIRST_NAME'] + ' ' + parsed_data['LAST_NAME'],
                'team': parsed_data['TEAM_CITY'] + ' ' + parsed_data['TEAM_NAME'],
                'number': '#' + parsed_data['JERSEY'],
                'position': parsed_data['POSITION'],
                'school': parsed_data['SCHOOL'],
                'height': parsed_data['HEIGHT'],
                'weight': parsed_data['WEIGHT'],
                'image': image_url
            }

            populatePlayerBioInfo(player);
        }
    });
}

// called from getPlayerBioInfo()
function populatePlayerBioInfo(playerDict) {
    $('.athlete-photo').css('background-image', 'url("' + playerDict.image + '")')
    $('.athlete-name').text(playerDict.name);
    $('.team-name').text(playerDict.team);
    $('.position .number').text(playerDict.number + ', ');
    $('.position .position-title').text(playerDict.position);
    $('.school').text('College: ' + playerDict.school);
    $('.height').text('Height: ' + playerDict.height);
    $('.weight').text('Weight: ' + playerDict.weight);
}


