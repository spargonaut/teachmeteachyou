module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
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
        }
    });
};
