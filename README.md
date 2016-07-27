# gulp-md5-version

> md5 plugin for [gulp](https://github.com/Tigerwen/gulp-md5-version) ,md5 the static files and then create a versonMapping file.

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



## API

### md5(config)

#### config.hashLength
>Type: `String`  
>Default: 32

>Optionnal: you can pass the size to limit the size of the hash that is appended.

#### config.pattern
>Type: `String`  
>Default: @

>Optionnal: Hash connector

#### config.versionName
>Type: `String`  
>Default: versions.mapping

>Optionnal: version file name

#### config.versionPath
>Type: `String`  
>Default: prd/

>Optionnal: version root path

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


