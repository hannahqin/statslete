$(document).ready(function() {



    $('.result').text('hello world');

    // commonplayerinfo (player biography)
    $.ajax({
        url: "https://stats.nba.com/stats/commonplayerinfo/?playerid=1628425",
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

            athlete = {
                'name': parsed_data['FIRST_NAME'] + ' ' + parsed_data['LAST_NAME'],
                'team': parsed_data['TEAM_CITY'] + ' ' + parsed_data['TEAM_NAME'],
                'number': '#' + parsed_data['JERSEY'],
                'position': parsed_data['POSITION'],
                'school': parsed_data['SCHOOL'],
                'height': parsed_data['HEIGHT'],
                'weight': parsed_data['WEIGHT']
            }

            $('.athlete-name').text(athlete.name);
            $('.team-name').text(athlete.team);
            $('.position .number').text(athlete.number);
            $('.position .position-title').text(athlete.position);
            $('.school').text(athlete.school);
            $('.height').text(athlete.height);
            $('.weight').text(athlete.weight);
        }
    }); 

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
});
