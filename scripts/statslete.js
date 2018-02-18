$(document).ready(function() {
    $.ajax({
        url: "http://stats.nba.com/stats/commonplayerinfo/?playerid=1628425",
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
        }
    });
});