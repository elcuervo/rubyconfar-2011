!SLIDE

# Hadoop

!SLIDE

# Cloudera
## http://www.cloudera.com

!SLIDE

# Atencion
## Este es el ejemplo mas visto

!SLIDE incremental commandline

  Crea un directorio "input" en el HDFS
    $ hadoop fs -mkdir input
  Inserta un input en el directorio
    $ hadoop fs -put /usr/share/dict/words input/
  Lista el contenido
    $ hadoop fs -ls input
    Found 1 items
    -rw-r--r--   1 cloudera supergroup    4950996 2011-10-26 02:13
    /user/cloudera/input/words

!SLIDE

# Wrappers en ruby

* https://github.com/mrflip/wukong
* https://github.com/attinteractive/mrtoolkit
