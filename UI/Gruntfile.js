module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'copy']);

    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**'],
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
