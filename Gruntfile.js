'use strict';
module.exports = function(grunt){
    grunt.initConfig({
        jshint: {
            options: { reporter: require('jshint-stylish') },
            files: ['lib/**/*.js','models/**/*.js']
        },
        htmlhint: {
            templates: {
                options: {
                    'attr-lower-case' : true,
                    'attr-value-not-empty' : true,
                    'tag-pair': true,
                    'id-unique' : true
                },
                src: ['public/*.html', 'public/**/*.html']
            }   
        },
        watch: {
            files: ['lib/**/*.js','models/**/*.js', 'public/*.html', 'public/**/*.html'],
            tasks: ['jshint' ] //, 'htmlhint'
        },
        nodemon: { dev: { script: 'lib/main.js' } },
        concurrent: {
            dev: [
                'jshint',
                'htmlhint',
                'nodemon',
                'watch'
            ],
            options: {
                logConcurrentOutput: true,
                limit: 5
            }
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks("grunt-contrib-jshint");    
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-htmlhint");
    //Uglifyjs 

    grunt.registerTask('default', [
        'concurrent'
    ]);
}
