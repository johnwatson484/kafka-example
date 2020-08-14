
const config = require('./config')
const createConsumer = require('./consumer')
const sendEvent = require('./producer')

createConsumer(config.consumerGroup, config.consumerTopic)
sendEvent(config.producerTopic, 'Hello world')
