console.log("HERE MAN")

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("HEY YA")
      if( request.message === "getText" ) {
        console.log("YOOO")
        sendResponse({data: document.all[0].innerText, method: "getText"}); //same as innerText
      }
    }
);
