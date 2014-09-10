module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        less:
            development:
                files:
                    'public/stylesheets/style.css': 'public/stylesheets/style.less'
        coffee:
            compile:
                files:[
                    expand: true
                    cwd: 'public/coffeescripts'
                    src: '*.coffee'
                    dest: 'public/javascripts'
                    ext: '.js'
                ]
        watch:
            scripts:
                files: ['public/stylesheets/*.less']
                tasks: ['less']

    grunt.loadNpmTasks 'grunt-contrib-less'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-watch'

    grunt.registerTask 'default', ['less', 'coffee', 'watch']
    return
