module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['clean', 'mochaTest', 'copy', 'browserify']);
    grunt.registerTask('go', ['clean', 'copy', 'browserify', 'connect']);

    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'dot',
                    quiet: false,
                    clearRequireCache: false
                },
                src: ['test/**/*.js']
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['index.html', 'styles/**/*.css'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        browserify: {
            main: {
                src: 'src/js/*.js',
                dest: 'dist/js/bundle.js'
            }
        },

        connect : {
            server : {
                options : {
                    port : 9000,
                    keepalive : true,
                    base : 'dist'
                }
            }
        },

        clean: ['dist']
    });
};
