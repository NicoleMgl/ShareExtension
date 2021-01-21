// Background scripts: For using chrome APIs and talking to our own APIs 

function MyGenericClick(info, tab){
    console.log("Click on page:", info, tab)
}

chrome.contextMenus.create({
    "title": "Share",
    "contexts": ["page"],
    "onclick": MyGenericClick
})

chrome.contextMenus.create({
    "title": "Share Image",
    "contexts": ["image"],
    "onclick": MyImageClick
})

chrome.contextMenus.create({
    "title": "Share Quote",
    "contexts": ["selection"],
    "onclick": MyQuotationClick
})

function MyQuotationClick(info, tab){
    console.log("Clicked an image", info, tab);
    chrome.windows.create({
        "url": "https://www.facebook.com/sharer.php?u=" + info.pageUrl + "&display=popup&quote=" + info.selectionText,
        "type": "popup"
    })
}


function MyImageClick(info, tab){
    console.log("Clicked an image", info, tab);
    chrome.windows.create({
        "url": "https://www.facebook.com/sharer.php?u=" + info.srcUrl + "&display=popup",
        "type": "popup"
    })
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
    console.log("message", msg);
    sendResponse({"text": "Recieved links!"});
})