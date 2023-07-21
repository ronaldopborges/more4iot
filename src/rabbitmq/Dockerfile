#FROM rabbitmq:management-alpine
FROM rabbitmq:3.9.12-management-alpine

ADD init.sh /init.sh
RUN chmod +x /init.sh

CMD ["/init.sh"]