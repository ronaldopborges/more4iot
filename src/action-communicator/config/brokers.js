module.exports = {
  BROKER_AMQP:"amqp://"+process.env.AMQP_HOST+":"+process.env.AMQP_PORT,
  BROKER_MQTT:"mqtt://"+process.env.MQTT_HOST+":"+process.env.MQTT_PORT
}