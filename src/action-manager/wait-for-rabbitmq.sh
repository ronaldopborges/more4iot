#!/bin/bash
# Wait for RabbitMQ
until nc -z rabbitmq 1883; do
    echo "RabbitMQ is unavailable - sleeping"
    sleep 1
done

echo "RabbitMQ is up - executing command"
exec $@