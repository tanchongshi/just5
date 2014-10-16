/*!
 * Gruntfile.js
 * Copyright (c) 2014
 */


module.exports = function (grunt) {

// Config
grunt.initConfig({
  'pkg': grunt.file.readJSON('package.json'),

  'jshint': {
    src: [
      'just5.js',
      'src/**/*.js'
    ],
    options: {
      jshintrc: '.jshintrc',
      force: true
    }
  },  

  'clean': {
    dist: [
      'dist'
    ]
  },

  'requirejs': {
    compile: {
      options: {
        name: 'just5',
        baseUrl: 'src',
        out: 'dist/just5.js',
        optimize: 'none',
        skipModuleInsertion: true,
        onBuildWrite: function(name, path, contents) {
          return require('amdclean').clean({
            code: contents,
            prefixMode: 'camelCase',
            escodegen: {
              format: {
                indent: { style: '  ' }
              }
            }
          });
        }
      }
    }
  },

  'umd': {
    umd: {
      src: 'dist/just5.js',
      objectToExport: 'just5',
      globalAlias: 'just5',
      template: 'src/tmpls/umd.hbs',
      dest: 'dist/just5.js'
    }
  }

});

// Load tasks
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

// Tasks
grunt.registerTask('default', ['build']);
grunt.registerTask('build', ['jshint:src', 'clean:dist', 'requirejs', 'umd:umd']);

};