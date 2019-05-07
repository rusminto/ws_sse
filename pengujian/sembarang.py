#!/usr/bin/env python

import paho.mqtt.client as mqtt
import random
import time
import math

klien = mqtt.Client("client 1")
klien.connect("localhost")

while True:
    value = random.randint(1, 101)
    value = value * pow(10000, 10000)
    klien.publish("arduino-server", str(value))
    time.sleep(3)

klien.disconnect()
