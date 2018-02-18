// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.

var logger = chrome.extension.getBackgroundPage();

function genericOnClick(info, tab) {
  // info.selectionText
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });

  // Keeping the notification for now because it's fun
  chrome.notifications.create('Statslete', {
        type: 'basic',
        iconUrl: '16icon.png',
        title: 'Statslete',
        message: 'Here is some fantasy information for '+info.selectionText
     });

  console.log("Selection text is " + info.selectionText)
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

// Create one test item for each context type.
var context = ["selection"];
var title = "'%s' Fantasy Information";
var id = chrome.contextMenus.create({"title": title, "contexts":context,
                                     "onclick": genericOnClick});

console.log("'" + context + "' item:" + id);






// Ignore all this for now, this is for notifications!!
function launch() {
  chrome.app.window.create('statslete.html', {
    id: 'main',
    bounds: { width: 620, height: 500 }
  });
}

chrome.notifications.onClicked.addListener(function() {
  launch();
});
