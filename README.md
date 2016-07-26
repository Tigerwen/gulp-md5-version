# gulp-md5-plus

> md5 plugin for [gulp](https://github.com/wpfpizicai/gulp-md5-plus) ,md5 the static files(eg javascript style image files) ;then replace the filenames in css or the html if needed by passing the file or dir in the second parameter

## Usage

First, install `gulp-md5-version` as a development dependency:

```shell
npm install --save-dev gulp-md5-version
```

Then, add it to your `gulpfile.js`:

```javascript
var md5 = require("gulp-md5-version");

gulp.src("./src/*.css")
	.pipe(md5())
	.pipe(gulp.dest("./prd"));
```
will create a versions.mapping


first, optimize all images in the img folder including all sub folders; then md5 all these images and change these images' names in the quoted css files ;
####note
the directory of the md5ed files in the imgDst folder is the same as that of original files in the imgSrc folder; and css files can refer the image file with the same name in different folder rightly;

## API

### md5(config)

#### config.hashLength
Type: `String`
Default: 32

Optionnal: you can pass the size to limit the size of the hash that is appended.

#### config.pattern
Type: `String`
Default: @

Optionnal: Hash connector

#### config.versionName
Type: `String`
Default: versions.mapping

Optionnal: version file name

#### config.versionPath
Type: `String`
Default: prd/

Optionnal: version root path

Example:
```javascript
	gulp.src('src/**/*.js')
        .pipe(md5({
            hashLength: 16,
            versionName: '.ver'
        })
        .pipe(gulp.dest('./prd'));
```

The sample above will append the md5 hash to each of the file in the src/ folder then create a .ver file in the /prd with all versionMapping;



## License

http://en.wikipedia.org/wiki/MIT_License[MIT License]


