let webampInstance = null;

function openWinamp() {
    if (webampInstance) {
        webampInstance.reopen();
        return;
    }
    
    // Check if Webamp library is loaded
    if (!window.Webamp) {
        console.error("Webamp 尚未載入！");
        return;
    }

    const Webamp = window.Webamp;
    webampInstance = new Webamp({
        initialTracks: [{
            metaData: {
                artist: "DJ Mike Llama",
                title: "Llama Whippin' Intro"
            },
            url: "https://raw.githubusercontent.com/captbaritone/webamp/master/mp3/llama-2.91.mp3",
            duration: 5
        }],
    });
    
    let appDiv = document.getElementById('webamp-app');
    if (!appDiv) {
        appDiv = document.createElement('div');
        appDiv.id = 'webamp-app';
        // Add styling so it acts as a floating window
        appDiv.style.position = 'absolute';
        appDiv.style.top = '50%';
        appDiv.style.left = '50%';
        appDiv.style.transform = 'translate(-50%, -50%)';
        appDiv.style.zIndex = '1000';
        document.body.appendChild(appDiv);
    }
    
    webampInstance.renderWhenReady(appDiv);
}
