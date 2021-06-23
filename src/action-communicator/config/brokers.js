module.exports = {
  BROKER_AMQP: "amqp://" + process.env.AMQP_HOST + ":" + process.env.AMQP_PORT,
  BROKER_MQTT: "mqtt://" + process.env.MQTT_HOST + ":" + process.env.MQTT_PORT,
  PUBLISHER_USER: process.env.RABBITMQ_PUBLISHER_USER,
  PUBLISHER_PASSWORD: process.env.RABBITMQ_PUBLISHER_PASSWORD,
  SUBSCRIBER_USER: process.env.RABBITMQ_SUBSCRIBER_USER,
  SUBSCRIBER_PASSWORD: process.env.RABBITMQ_SUBSCRIBER_PASSWORD,
  AMQP_HOST: process.env.AMQP_HOST,
  AMQP_PORT: process.env.MQTT_PORT,
  MQTT_HOST: process.env.MQTT_HOST,
  MQTT_PORT: process.env.MQTT_PORT,
};
