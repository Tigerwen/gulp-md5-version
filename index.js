/**
 * from gulp-md5-plus
 * just change for version
 */


/**
 * config 对象
 *
 * @typedef {Object} config
 * @property {String} pattern 衔接符
 * @property {String} hashLength hash字符长度
 * @property {String} versionName version文件名
 * @property {String} versionPath version文件根目录
 */
var path = require('path'),
    gutil = require('gulp-util'),
    through = require('through2'),
    crypto = require('crypto'),
    fs = require('fs-extra');

const defaultConfig = {
    pattern: '@',
    hashLength: 32,
    versionName: 'versions.mapping',
    versionPath: 'prd/'
};

module.exports = function (config) {
    Object.assign(defaultConfig, config);

    var pattern = defaultConfig.pattern,
        size = defaultConfig.hashLength,
        versionName = defaultConfig.versionPath + '/' + defaultConfig.versionName,
        versionContent = [];

    return through.obj(function (file, enc, cb) {

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
            return cb();
        }

        if(!file.contents){
            return cb();
        }

        var hash = calcMd5(file, size),
            filename = path.basename(file.path),
            relativePathName = file.path.replace(file.base, ''),
            dir;
        if(file.path[0] == '.'){
            dir = path.join(file.base, file.path);
        } else {
            dir = file.path;
        }
        dir = path.dirname(dir);

        var md5_filename = filename.split('.').map(function(item, i, arr){
            return i == arr.length-2 ? item + pattern + hash : item;
        }).join('.');

        file.path = path.join(dir, md5_filename);
        versionContent.push(relativePathName + '#' + hash);
        this.push(file);
        cb();
    }, function (cb) {
        fs.outputFile(versionName, versionContent.join('\n'), 'utf-8')
        cb();
    });
};


function calcMd5(file, slice){
    var md5 = crypto.createHash('md5');
    md5.update(file.contents, 'utf8');

    return slice >0 ? md5.digest('hex').slice(0, slice) : md5.digest('hex');
}
