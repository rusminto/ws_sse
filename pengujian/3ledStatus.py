#!/usr/bin/env python

import paho.mqtt.client as mqtt
import random
import time
import math
import json

klien = mqtt.Client("client 4")
klien.connect("localhost")

while True:
	data = {"1": [
		{
			"name": "Garasi",
			"property": [
				{"name": "Pintu",
				"status": "TUTUP"},
				{"name": "Lampu",
				"status": "MATI"}
			]
		}
	]}
	klien.publish("arduino-server", json.dumps(data))
	time.sleep(3)

klien.disconnect()
