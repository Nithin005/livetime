const spawn = require('child_process').spawn,
    config = require('../config/config'),
    cmd = config.rtmp_server.trans.ffmpeg;
 
const generateStreamThumbnail = (stream_name) => {
    const args = [
        '-y',
        '-i', 'http://localhost/live/'+stream_name+'/index.m3u8',
        '-ss', '00:00:01',
        '-vframes', '1',
        '-vf', 'scale=-2:300',
        'D:/code/new/api/public/thumbnails/'+stream_name+'.png',
    ];
 
    spawn(cmd, args, {
        detached: true,
        stdio: 'ignore'
    }).unref();
};
 
module.exports = {
    generateStreamThumbnail : generateStreamThumbnail
};