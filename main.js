console.log('⚡ FuckRedditPlayer extension\nMade by /u/Akiyue\n')
console.log('\nSearching for video elements')
setInterval(function() {
var video = document.getElementsByTagName('video')
if(video) {
    console.log('Found a video object...')
    var target = video[0]
    console.log(target)
    console.log('Attempting to parse "v.redd.it" url...')
    var videoUrl = target.firstChild.outerHTML
    if(!videoUrl) {
        console.log('Empty')
    }
    else {
        // Parse the v.redd.it url out and appending the suffix to point to media streams
        var base = videoUrl.match(/https:\/\/v\.redd\.it\/.{1,30}\//)[0]
        console.log('Successfully parsed!')

        var videoUrl = base + 'DASH_360.mp4'
        var audioUrl = base + 'DASH_audio.mp4'

        // Replacing and injecting new elements
        var bullshitParent = target.parentNode.parentNode.parentNode
        bullshitParent.insertAdjacentHTML('beforebegin', '<video controls id="FRP-fallbackVideo" src="' + videoUrl + '" type="video/mp4" style="max-height:488.8125px"/>')
        bullshitParent.insertAdjacentHTML('beforebegin', '<video hidden id="FRP-fallbackAudio" src="' + audioUrl + '" type="video/mp4"/>')
        bullshitParent.remove()
        var audioElement = document.getElementById('FRP-fallbackAudio')
        var videoElement = document.getElementById('FRP-fallbackVideo')
        audioElement.insertAdjacentHTML('afterend', '<input type="range" min="0" max="100" value="100" class="slider" id="FRP-volumeSlider" style="display: inline-block">')
        var volumeSlider = document.getElementById('FRP-volumeSlider')
        volumeSlider.insertAdjacentHTML('afterend', '   <select name="FRP-videoQualitySelector" id="FRP-videoQualitySelector"><option value="sd">360p</option><option value="hd">720p</option></select>')
        var videoQualitySelector = document.getElementById('FRP-videoQualitySelector')
        volumeSlider.insertAdjacentHTML('afterend', '   <button type="button" id="FRP-loopControl">🔁</button>')
        volumeSlider.style.width = '20%'

        // Injecting control scripts
        document.getElementById('FRP-fallbackVideo').onseeked = (event) => {
            document.getElementById('FRP-fallbackAudio').currentTime = document.getElementById('FRP-fallbackVideo').currentTime
        }
        document.getElementById('FRP-fallbackVideo').onseeking = (event) => {
            document.getElementById('FRP-fallbackAudio').currentTime = document.getElementById('FRP-fallbackVideo').currentTime
        }
        document.getElementById('FRP-fallbackVideo').onplay = (event) => {
            document.getElementById('FRP-fallbackAudio').currentTime = document.getElementById('FRP-fallbackVideo').currentTime
            document.getElementById('FRP-fallbackAudio').play()
        }
        document.getElementById('FRP-fallbackVideo').onpause = (event) => {
            document.getElementById('FRP-fallbackAudio').currentTime = document.getElementById('FRP-fallbackVideo').currentTime
            document.getElementById('FRP-fallbackAudio').pause()
        }
        document.getElementById('FRP-volumeSlider').oninput = function() {
            document.getElementById('FRP-fallbackAudio').volume = this.value / 100
        } 
        document.getElementById('FRP-videoQualitySelector').addEventListener('change', (event) => {
            switch(event.target.value) {
                case 'hd':
                    console.log('Switched to 720p video mode...')
                    videoElement.src = base + 'DASH_720.mp4'
                    videoElement.autoplay = true
                    videoElement.load()
                    videoElement.play()
                    videoElement.style.width = '640px'
                    videoElement.style.height = '360px'
                    document.getElementById('FRP-fallbackVideo').currentTime = document.getElementById('FRP-fallbackAudio').currentTime
                break
                case 'sd':
                    console.log('Switched to 360p video mode...')
                    videoElement.src = base + 'DASH_360.mp4'
                    videoElement.autoplay = true
                    videoElement.load()
                    videoElement.play()
                    document.getElementById('FRP-fallbackVideo').currentTime = document.getElementById('FRP-fallbackAudio').currentTime
                break
            }
        })

        document.getElementById('FRP-loopControl').onclick = function() {
            switch(videoElement.loop) {
                case false:
                    videoElement.loop = true
                    audioElement.loop = true
                    alert('🔁 Enabled repeat mode.')
                break
                case true:
                    videoElement.loop = false
                    audioElement.loop = false
                    alert('🔁 Disabled repeat mode.')
                break
            }
        }

        // Complete!
        console.log(audioElement)
        console.log(videoElement)
        console.log('Successfully replaced with the fallback player, enjoy ☆⌒(ゝ。∂)')
    }
}
},1000);
