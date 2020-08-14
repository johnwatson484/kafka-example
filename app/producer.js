const kafka = require('kafka-node')
const config = require('./config')

function sendEvent (topicName, value) {
  const options = {
    kafkaHost: config.host
  }

  const HighLevelProducer = kafka.HighLevelProducer
  const client = new kafka.KafkaClient(options)
  const producer = new HighLevelProducer(client)
  const payloads = [
    { topic: topicName, messages: value }
  ]
  producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
      if (err) console.log(err)
      console.log(data)
    })
  })
}

module.exports = sendEvent
