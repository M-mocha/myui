const path = require('path')
const fs = require('fs')
const osPlatform = require('os').platform()
const Event = require('events');


class Emitter extends Event {}
const emitter = new Emitter();

const isWinOrMac = osPlatform === 'darwin' || osPlatform === 'win32';

const scanner = function (scanPath, watch) {
    let filelist = [];
    const dirlist = {}
    const readdir = (dir) => {
        dirlist[dir] = 1;
        try {
            const files = fs.readdirSync(dir, {encoding: 'utf8', withFileTypes: true });
            files.forEach(file => {
                let isFile, filename = '';
                if (typeof file === 'string') { // 兼容低版本node
                    isFile = fs.statSync(path.join(dir, file)).isFile()
                    filename = file
                } else {
                    isFile = file.isFile()
                    filename = file.name
                }
                if (!isFile) {
                    readdir(path.join(dir, filename))
                } else {
                    filelist.push(path.join(dir, filename))
                }
            })
        } catch (err) {
            throw (err)
        }
    }
    readdir(scanPath);
    if (watch === true) {
        let lastFilename, lastEventType, cancle = '';
        const watchHandler = (dir, filename, eventType) => {
            if (lastFilename === filename && lastEventType === eventType) {
                clearTimeout(cancle)
            } else {
                lastEventType = eventType;
                lastFilename = filename;
            }
            cancle = setTimeout(() => {
                const absPath = path.join(dir, filename);
                const fIndex = filelist.indexOf(absPath);
                if (eventType === 'rename') {
                    if (!!dirlist[absPath] || fIndex > -1) { // delete
                        if (fIndex > -1) {
                            filelist.splice(fIndex, 1);
                            emitter.emit('change', {filelist, type: 'delFile', file: absPath});
                        } else {
                            dirlist[absPath].close && dirlist[absPath].close()
                            delete dirlist[absPath]
                            filelist = filelist.filter(file => (file.indexOf(absPath) !== 0))
                            emitter.emit('change', {filelist, type: 'delDir', file: absPath});
                        }
                        
                    } else { // add
                        try {
                            if (fs.statSync(absPath).isFile()) {
                                filelist.push(absPath)
                                emitter.emit('change', { filelist, type: 'addFile', file: absPath });
                            } else {
                                if (isWinOrMac) {
                                    dirlist[absPath] = 1;
                                } else {
                                    dirlist[absPath] = fs.watch(absPath, { recursive: false}, (eventType, filename) => {
                                        watchHandler(absPath, filename, eventType)
                                    })
                                }
                                emitter.emit('change', { filelist, type: 'addDir', file: absPath });
                            }
                        } catch(err) {
                            throw(err)
                        }
                    }
                } else {
                    emitter.emit('change', {filelist,type: 'change', file: absPath});
                }
            }, 50);
        }
        if (isWinOrMac) {
            dirlist[scanPath] = fs.watch(scanPath, {recursive: true}, (eventType, filename) => {
                watchHandler(scanPath, filename, eventType)
            })
        } else {
            for(dir in dirlist) {
                dirlist[dir] = fs.watch(dir, { recursive: false}, (eventType, filename) => {
                    watchHandler(dir, filename, eventType)
                })
            }
        }
    }
    return {
        onFinish: (cb) => cb(filelist),
        onChange: (cb) => emitter.on('change', cb),
        close: function () {
            emitter.removeAllListeners('change');
            emitter = null;
            for (dir in dirlist) {
                if (typeof dir.close === 'function') {
                    dir.close()
                }
            }
        },

    }
}
module.exports = {
    scanner
};