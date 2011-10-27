!SLIDE

# Riak

!SLIDE

<! implmentacion de un map reduce simple >

!SLIDE small

    @@@ruby
    %w[rubygems csv time riak].each{|lib| require lib}
    client  = Riak::Client.new(port: 8097)
    bucket  = client['goog']

    quotes  = CSV.read 'goog.csv'
    header  = quotes.shift

    quotes.each do |row|
      obj = bucket.new row.first

      puts obj.key

      obj.data = Hash[ [header, row].transpose ]
      obj.store
    end

!SLIDE small

    @@@ruby
    require 'riak'

    client = Riak::Client.new
    client.http_port = 8097
    map_reduce = Riak::MapReduce.new(client)
    # Input
    map_reduce.add("goog")
    # Map function and return value
    map_reduce.map("Riak.mapValuesJson", keep: true)
    p map_reduce.run # Run!!!

!SLIDE smaller

    @@@ruby
    require 'riak'

    map_function = <<JS
      function(value, key, arg){
        var data = Riak.mapValuesJson(value)[0];
        return [data.High];
      }
    JS

    client = Riak::Client.new
    client.http_port = 8097
    map_reduce = Riak::MapReduce.new(client)

    map_reduce.add(
      ["goog", "2010-01-04"],
      ["goog", "2010-01-05"],
      ["goog", "2010-01-06"],
      ["goog", "2010-01-07"],
      ["goog", "2010-01-08"]
    )
    map_reduce.map(map_function)
    map_reduce.reduce("Riak.reduceMax", keep: true)
    p map_reduce.run

!SLIDE smaller

    @@@javascript
    var riak = require('riak-js')
    var client = riak.getClient(
      {host: "localhost", port: "8097" }
    );
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
