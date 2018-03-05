$(document).ready(function() {
    $('.result').text('hello world');
    console.log("HI")

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {method: "getText"}, function(response) {
            if(response.method=="getText"){
                alltext = response.data;
            }
        });
    });
    console.log(alltext)

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
