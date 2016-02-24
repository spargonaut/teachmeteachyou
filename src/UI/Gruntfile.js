module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', ['clean', 'mochaTest', 'copy', 'browserify']);

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
                        src: ['index.html'],
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

        clean: ['dist']
    });
};
