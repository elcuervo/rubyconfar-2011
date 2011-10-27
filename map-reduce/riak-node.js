var riak = require('riak-js')
var client = riak.getClient({host: "localhost", port: "8097" });
var input = [
  ["goog", "2010-01-04"],
  ["goog", "2010-01-05"],
  ["goog", "2010-01-06"],
  ["goog", "2010-01-07"],
  ["goog", "2010-01-08"]
]

var map_reduce = client.add(input);

map_reduce.map(function(value) {
  return [Riak.mapValuesJson(value)[0].High];
});

map_reduce.reduce(function(values){
  return Riak.reduceMax(values);
});

map_reduce.run();
