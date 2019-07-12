#!/usr/bin/env python

import paho.mqtt.client as mqtt
import random
import time
import math
import sys

klien = mqtt.Client("client 1")
klien.connect("localhost")

while True:
    value = random.randint(28, 32)
    #value2 = random.randint(1, 101)
    #value = value * pow(10000, 10000)
    klien.publish("arduino-server", "kitchen: "+str(value))
    #print(value)
    time.sleep(1)

klien.disconnect()
