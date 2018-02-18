$(document).ready(function() {
    $.get("http://stats.nba.com/stats/commonplayerinfo/?playerid=1628425", function(data) {
        $(".result").html(data);
        console.log(data);
    });
});