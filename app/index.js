const Kafka = require('node-rdkafka')
console.log(Kafka.librdkafkaVersion)

const consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'kafka:9092'
}, {})

consumer.connect()

console.log('waiting for message')

consumer
  .on('ready', function () {
    consumer.subscribe(['Topic1'])

    setInterval(function () {
      consumer.consume(1)
    }, 1000)
  })
  .on('data', function (data) {
    console.log('Message found!  Contents below.')
    console.log(data.value.toString())
  })

const producer = new Kafka.Producer({
  'metadata.broker.list': 'kafka:9092',
  dr_cb: true
})

producer.connect()

producer.on('ready', function () {
  try {
    producer.produce(
      'Topic1',
      null,
      Buffer.from('Hello'),
      Date.now()
    )
    console.log('message sent')
  } catch (err) {
    console.error(err)
  }
})

producer.on('event.error', function (err) {
  console.error('Error from producer')
  console.error(err)
})

producer.setPollInterval(100)
