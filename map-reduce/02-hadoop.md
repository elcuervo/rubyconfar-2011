!SLIDE

# Hadoop

!SLIDE

# Cloudera
## Hadoop-based distribution
### http://www.cloudera.com

<!--
  Vamos a suponer que tenemos instalado hadoop sin problemas.
  No se va a explicar como instalarloo, se va del scope de la charla... y del
  tiempo
-->

!SLIDE

# Atencion
## Este es el ejemplo mas visto

!SLIDE

# Crea un directorio "input" en el HDFS

!SLIDE commandline

    $ hadoop fs -mkdir input

!SLIDE

# Inserta un input en el directorio

!SLIDE commandline

    $ hadoop fs -put ~/A_Game_of_Thrones input/

!SLIDE

# Lista el contenido

!SLIDE commandline
    $ hadoop fs -ls input
    Found 1 items
    -rw-r--r--   /user/cloudera/input/A_Game_of_Thrones

!SLIDE

# Ruby + Hadoop via Streaming

!SLIDE

# map.rb
    @@@ruby
    ARGF.each do |line|
      line.split.each do |word|
        puts "#{word}\t1"
      end
    end

!SLIDE small

# reduce.rb

    @@@ruby
    prev_key = nil
    key_total = 0

    ARGF.each do |line|
      line = line.chomp
      (key, value) = line.split(/\t/)

      if (prev_key && key != prev_key && key_total > 0)
        puts prev_key + "\t" + key_total.to_s

        prev_key = key
        key_total = 0

      elsif (!prev_key)
        prev_key = key
      end

      key_total += value.to_i
    end

!SLIDE small

    #!/bin/bash

    HADOOP_HOME=/usr/lib/hadoop/
    JAR=contrib/streaming/hadoop-*streaming*.jar

    HBIN ="$HADOOP_HOME/bin/hadoop"
    HSTREAMING="$HBIN jar $HADOOP_HOME/$JAR"

    $HSTREAMING \
      -mapper  'ruby /home/cloudera/test/map.rb' \
      -mapper  'ruby /home/cloudera/test/reduce.rb' \
      -file /home/cloudera/test/map.rb \
      -file /home/cloudera/test/reduce.rb \
      -input 'input/*' \
      -output output

!SLIDE

# Wrappers en ruby

* https://github.com/mrflip/wukong
* https://github.com/attinteractive/mrtoolkit

!SLIDE bullet incremental

# Alternativas?

* MongoDB
      Map Reduce
* Riak
      Map Reduce
      Secondary Indexes
      Link Walking
