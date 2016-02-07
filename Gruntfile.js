// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here

    clean: {
      src: ['assets/css', 'assets/js']
    },

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      //build: ['Gruntfile.js', 'js/*.js']
      build: ['Gruntfile.js', 'src/js/landing.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'assets/js/scripts.js': ['src/js/*.js', 'src/third-party/bootstrap/js/bootstrap.js']
        }
      }
    },

    // compile SASS stylesheets to css -----------------------------------------
    sass: {
      dist: {
        files: {
          'src/css/styles.css' : 'src/css/*.scss'
        }
      }
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
        compatibility: 'ie8',
        keepSpecialComments: '*',
        advanced: false
      },
      minifyCore: {
        src: ['src/third-party/bootstrap/css/bootstrap.min.css', 'src/css/styles.css'],
        dest: 'assets/css/styles.min.css'
      }
    }, 

    watch: {
      css: {
        files: 'src/css/style.scss',
        tasks: ['clean', 'jshint', 'uglify', 'sass', 'cssmin']
      }
    }

  });

  // ============= // CREATE TASKS ========== //
  //grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'sass']); 
  grunt.registerTask('default', ['clean', 'jshint', 'uglify', 'sass', 'cssmin']);

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-clean');


};

