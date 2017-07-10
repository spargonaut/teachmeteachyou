FROM java:8
EXPOSE 30213
WORKDIR /app
COPY infrastructure/docker_entrypoint.sh /app
COPY build/libs/TMTYApplication.jar /app
COPY TMTYConfiguration/local.yml /app
CMD ["./docker_entrypoint.sh"]
