module.exports = {
  host: process.env.EVENT_HUB_HOST || 'kafka:9092',
  consumerGroup: process.env.CONSUMER_GROUP || 'consumerGroup',
  consumerTopic: process.env.CONSUMER_TOPIC || 'topic',
  producerTopic: process.env.PRODUCER_TOPIC || 'topic'
}
