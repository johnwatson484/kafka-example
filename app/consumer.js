const kafka = require('kafka-node')
const config = require('./config')

function createConsumer (groupName, topicName) {
  const options = {
    kafkaHost: config.host,
    groupId: groupName,
    autoCommit: true,
    autoCommitIntervalMs: 5000,
    sessionTimeout: 15000,
    fetchMaxBytes: 10 * 1024 * 1024,
    protocol: ['roundrobin'],
    fromOffset: 'latest',
    outOfRangeOffset: 'earliest'
  }

  const consumerGroup = new kafka.ConsumerGroup(options, topicName)

  consumerGroup.on('message', async function (message) {
    console.log(`received event ${message.value}`)
  })

  consumerGroup.on('error', function onError (error) {
    console.error(error)
  })

  console.log(`Started consumer for topic ${topicName} in group ${groupName}`)
}

module.exports = createConsumer
