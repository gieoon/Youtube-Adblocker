/*
chrome.webRequest.onBeforeRequest.addListener(
  function(details) { 
    console.log("BLOCKING: ", details);
    return {cancel: true}; 
  },
  {urls: 
    ["*://*.doubleclick.net/*",
    "*://*.googleadservices.com/*",
    "*://*.googlesyndication.com/*",
    "*://*.moat.com/*"]
  },
  ["blocking"]
);
*/

// https://r2---sn-no52-fabl.googlevideo.com/generate_204 

const BLOCKING = [
    "doubleclick.net",
    "pagead2",
    "log_event",
    "app_shell",
    "googlesyndication.com",
    "ad_status"
    // "googlevideo.com" // Blocks everything.
]

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if(details.url.includes('googlevideo.com/videoplayback?')){
            console.log(details.url, details.type, details.parentFrameId);
        }

        // if (details.type === 'image') {
        //     // console.log('BLOCKED');
        //     return {cancel: true};
        // }
        for(var url of BLOCKING) {
            if (details.url.includes(url)) {
                // if(details.url.includes('googlevideo.com/videoplayback?') && Math.random() * 2 > 1){
                    // console.log('BLOCKED');

                    return { cancel: true};
                // }
            }
        }
        // console.log('ALLOWED PAST');
        return {cancel: false};
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);