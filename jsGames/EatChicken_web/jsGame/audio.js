$(window).load(function () {
    sounds.init(getAudioSrcList());
});
//
function soundName (src) {
    var type=src.substring(src.length-3,src.length);
    var i  = src.lastIndexOf('/');
    var ii = src.indexOf('.'+type);
    return src.slice(i+1,ii);
};

var sounds= {
    init: function  (sourceList) {
        sounds.done=0;
        sounds.all_done=0;
        sounds.sources=sourceList;
        sounds.dic={};
        sounds.len=sounds.sources.length;
        //
        for (var i = 0; i < sounds.sources.length; i++) {
            var src = sounds.sources[i];
            var sound = new Audio(src);
            var name = soundName(src);
            sound.onloadeddata = sounds.loaded;
            sounds.dic[name] = sound;
        };
        sounds.finished();
    },
    loaded:function  () {
        if(sounds.done<sounds.len){sounds.done++;}
        if(sounds.done==sounds.len){sounds.finished()}
        
    },
    finished: function  () {
        sounds.all_done=1;
    },

    /*playSound:function  (name) {
        sounds.dic[name].play();
    },*/
    playSound:function  (name,loop) {
        
        sounds.dic[name].play();
        if (loop==1) {
            sounds.dic[name].addEventListener('timeupdate', function(){
                var buffer = .23
                if(this.currentTime > this.duration - buffer){
                    try{
                    this.currentTime = 0
                    }catch(e){};
                    this.play()
                }}, false);
        };
        
        sounds.dic[name].play();
    },
    stopAll:function  () {
        // body...
        for (var key in sounds.dic) {
            try{
            sounds.dic[key].currentTime=0;
            }
            catch(e){};
            sounds.dic[key].pause();
        };
    },
    muteAll:function  () {
        // body...
        for (var key in sounds.dic) {
            sounds.dic[key].volume=0;
        };
    },

};