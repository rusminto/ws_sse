#!/usr/bin/env python

import paho.mqtt.client as mqtt
import random
import time
import math
import json

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

data1 = "1|07-2=0;12-1=0|"

def on_connect(client, userdata, flags, rc):
	client.subscribe("home/all")
	client.subscribe("home/32")

def on_message(client, userdata, msg):
	# client.publish("arduino-server", json.dumps(data))
	print(data1)
	client.publish("arduino-server", data1)

client = mqtt.Client("client 4")
client.connect("localhost")

client.on_connect = on_connect
client.on_message = on_message

client.loop_forever()

