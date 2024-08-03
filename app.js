let subtitleMenu = document.getElementsByClassName("subtitles-menu");
let subtitleList = [];

function msToTime(msParam) {
    let ms = Number(msParam);
    let s = ((ms / 1000) % 60).toString();
    let m = ((ms / (1000 * 60)) % 60).toString();
    let h = ((ms / (1000 * 60 * 60)) % 24).toString();
    ms = ms.toString();
    if (Number(s) < 10) {
        s = "0" + s;
    }
    if (Number(m) < 10) {
        m = "0" + m;
    }
    if (Number(h) < 10) {
        h = "0" + h;
    }
    return h.substring(0, 2) + ":" + m.substring(0, 2) + ":" + s.substring(0, 2) + "," + ms.slice(ms.length - 3);
}

subtitleMenu[1].childNodes.forEach(e => {
    if (e.className == "spacing") {
    } else {
        subtitleList.push(
            {
                "index": Number(e.childNodes[0].dataset["index"]) + 1,
                "start": e.childNodes[0].dataset["start"],
                "text": e.childNodes[0].innerText
            }
        );
    }
});

let subtitleContent = "";
for (let i = 0; i < subtitleList.length; i++) {
    if (subtitleList[i + 1] == undefined) {
        subtitleContent += subtitleList[i].index + "\n" + msToTime(subtitleList[i].start) + " --> " + msToTime(Number(subtitleList[i].start) + 1000) + "\n" + subtitleList[i].text + "\n\n";
    } else {
        subtitleContent += subtitleList[i].index + "\n" + msToTime(subtitleList[i].start) + " --> " + msToTime(subtitleList[i + 1].start) + "\n" + subtitleList[i].text + "\n\n";
    }
}

let textFile = null,
    makeTextFile = function (text) {
        let data = new Blob([text], { type: 'text/plain;charset=UTF-8' });
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
    };

let downloadSRT = function () {
    let link = document.createElement('a');
    link.setAttribute('download', 'subtitles.srt');
    link.href = makeTextFile(subtitleContent);
    document.body.appendChild(link);

    // Wait for the link to be added to the document
    window.requestAnimationFrame(function () {
        let event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
    });
};

// .srt dosyasını oluştur ve indir
downloadSRT();
