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

!SLIDE
