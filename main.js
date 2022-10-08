console.log('FuckRedditPlayer Proof-of-Concept\nMade by /u/Akiyue\n')
console.log('\nSearching for video elements')
var video = document.getElementsByTagName('video')
if(!video) {
    console.log('No videos in current page...')
}
else {
    console.log('Found a video object...')
    var target = video[0]
    console.log(target)
    console.log('Attempting to parse "v.redd.it" url...')
    var videoUrl = target.firstChild.outerHTML
    if(!videoUrl) {
        console.log('Empty')
    }
    else {
        var base = videoUrl.match(/https:\/\/v\.redd\.it\/.{1,30}\//)[0]
        console.log('Successfully parsed!')
        var videoUrl = base + 'DASH_360.mp4'
        var audioUrl = base + 'DASH_audio.mp4'
        var bullshitParent = target.parentNode.parentNode.parentNode
        bullshitParent.insertAdjacentHTML('beforebegin', '<video controls id="FRP-fallbackVideo" src="' + videoUrl + '" type="video/mp4" style="max-height:488.8125px"/>')
        bullshitParent.insertAdjacentHTML('beforebegin', '<video hidden id="FRP-fallbackAudio" src="' + audioUrl + '" type="video/mp4"/>')
        bullshitParent.remove()
        console.log('Successfully injected!')
        var audioElement = document.getElementById('FRP-fallbackAudio')
        var videoElement = document.getElementById('FRP-fallbackVideo')
        console.log(audioElement)
        console.log(videoElement)
    videoElement.autoplay = true
    audioElement.autoplay = true
    videoElement.load()
    audioElement.load()
    }
}
