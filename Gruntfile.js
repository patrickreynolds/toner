module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        properties: grunt.file.exists('properties.json') ? grunt.file.readJSON('properties.json') : {},

        uglify: {
            min: {
                options: {
                    report: 'gzip',
                    sourceMap: 'toner.min.map',
                },
                files: {
                    'toner.min.js': ['toner.js']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            all: [
                'toner.js'
            ]
        },
        watch: {
            scripts: {
                files: [
                    '*.js'
                ],
                tasks: ['jshint'],
                options: {
                    interrupt: true
                }
            }
        },
        mocha: {
            test: {
                reporter: 'spec'
            },
            src: ['tests/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['jshint', 'uglify:min']);
    grunt.registerTask('test', ['jshint', 'mocha'])
    grunt.registerTask('all', ['build'])
}