$(document).ready(function() {
    $('.result').text('hello world');

    $.ajax({
        url: "https://stats.nba.com/stats/commonplayerinfo/?playerid=1628425",
        dataType: "jsonp",
        crossDomain: true,
        success: function (data) {
            // log api call results and then print them to chrome extension
            console.log(data);
            $('.results').text(JSON.stringify(data));
        }
    }); 
});