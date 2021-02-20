FROM nginx:1.17.8-alpine
WORKDIR /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
RUN ls
RUN echo yo
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
