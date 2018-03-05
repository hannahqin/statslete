
x = "JSON object retrieved from database"

parsed = JSON.parse(x)

var infoNeeded = ["FIRST_NAME", "LAST_NAME", "TEAM_NAME", "POSITION", "SCHOOL", "HEIGHT", "WEIGHT"]

for(i = 0; i < infoNeeded.length; i++){
	console.log(parsed["resultSets"][0]["rowSet"][0][parsed["resultSets"][0]["headers"].indexOf(infoNeeded[i])])

}


