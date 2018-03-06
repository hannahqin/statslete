//URL format: http://stats.nba.com/stats/playerdashboardbygeneralsplits/?PlayerID=2200&MeasureType=Base&PerMode=PerGame&PlusMinus=N&PaceAdjust=N&Rank=N&Season=2017-18&SeasonType=Regular%20Season&Outcome=&Location=&SeasonSegment=&DateFrom=&DateTo=&VsConference=&VsDivision=&Month=0&OpponentTeamID=0&GameSegment=&Period=0&LastNGames=0
//Only need to replace player ID

x = "JSON object retrieved from database"

var infoNeeded = ["PTS", "REB", "AST", "STL", "BLK", "TOV"]
var scoringMultiplier = [1,1.2,1.5,3,3,-1]
var fantasyScore = 0.0

for(i = 0; i < infoNeeded.length; i++){

	var stat = x["resultSets"][0]["rowSet"][0][x["resultSets"][0]["headers"].indexOf(infoNeeded[i])]
	console.log(infoNeeded[i] + " " + stat)
	fantasyScore += parseFloat(stat) * scoringMultiplier[i]
}

console.log("Avg fantasy pts: " + fantasyScore)