# streamspeed

A simple way to keep track of the speed of your readable streams.

![Depfu](https://img.shields.io/depfu/fent/node-streamspeed)
[![codecov](https://codecov.io/gh/fent/node-streamspeed/branch/master/graph/badge.svg)](https://codecov.io/gh/fent/node-streamspeed)

# Usage

```js
const StreamSpeed = require('streamspeed');

let rs = fs.createReadStream('somefile.avi');
let ss = new StreamSpeed();
ss.add(rs);

// Listen for events emitted by streamspeed on the given stream.
ss.on('speed', (speed) => {
  console.log('Reading at', speed, 'bytes per second');
});
```

Keep track of a group of streams

```js
let group = new Streamspeed();
group.add(stream1);
group.add(stream2);
group.add(stream3);

group.on('speed', (speed) => {
  console.log('now reading at', speed, 'bps');
});
```

![example img](http://i.imgur.com/y47Sc.png)

# API
### new StreamSpeed([options])
A group that can be used to watch several streams. Will emit `speed` events. `options` can have the following properties,
- `timeUnit` - Defaults to `1000` for speed per second. If you want another unit such as per hour, use `1000 * 60 * 60`.
- `range` - The time in ms to calculate speed over. Defaults to `1000`. The longer this is, the more stable speed will be for a big stream. The shorter it is, the more responsive it is to sudden speed changes.

### StreamSpeed#add(stream)
Adds stream to group.

### StreamSpeed#remove(stream)
Removes stream from group.

### StreamSpeed#getSpeed()
Get current speed.

### StreamSpeed#getStreamSpeed(stream)
Get an individual's stream's current speed.

### StreamSpeed#getStreams()
Returns a list of all streams in the group.

### StreamSpeed.toHuman(bytes, options)
Helper method to convert `bytes` to a human readable string.

```js
StreamSpeed.toHuman(1500);                                  // 1.46KB
StreamSpeed.toHuman(1024 * 1024);                           // 1MB
StreamSpeed.toHuman(1024 * 1024 * 20.5, { timeUnit: 's' }); // 20.5MB/s
StreamSpeed.toHuman(1024 * 1024 * 20.5, { precision: 3 });  // 20.50MB
```

### Event: 'speed'
* `number` - Speed at which streams in the group are being read.

Will be emitted every time a stream is read and only if there is a change in speed.


# Install

    npm install streamspeed


# Tests
Tests are written with [mocha](https://mochajs.org)

```bash
npm test
```
