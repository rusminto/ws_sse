#!/usr/bin/env python

import paho.mqtt.client as mqtt
import random
import time
import math
import json

def on_connect(client, userdata, flags, rc):
	client.subscribe("server-arduino")

def on_message(client, userdata, msg):
	dataTemp = msg.payload.decode()
	data = {"0":[
		{
			"name": "Kamar tidur depan",
			"property": [
				{"name": "Lampu",
				"status": "MATI"}
			]
		},
		{
			"name": "Kamar tidur utama",
			"property": [
				{"name": "Lampu",
				"status": "MATI"}
			]
		},
		{
			"name": "Dapur",
			"property": [
				{"name": "Lampu",
				"status": "MATI"},
				{"name": "Kipas Angin",
				"status": "MATI"}
			]
		},
		{
			"name": "Ruang makan",
			"property": [
				{"name": "Lampu",
				"status": "MATI"}
			]
		},
		{
			"name": "Teras",
			"property": [
				{"name": "Pintu",
				"status": "TUTUP"},
				{"name": "Lampu",
				"status": "MATI"}
			]
		},
		{
			"name": "Ruang tamu",
			"property": [
				{"name": "Lampu",
				"status": "MATI"}
			]
		},
		{
			"name": "Ruang keluarga",
			"property": [
				{"name": "Lampu",
				"status": "MATI"},
				{"name": "Kipas Angin",
				"status": "MATI"}
			]
		},
		{
			"name": "Mushola",
			"property": [
				{"name": "Lampu",
				"status": "MATI"}
			]
		},
		{
			"name": "Kamar mandi #1",
			"property": [
				{"name": "Lampu",
				"status": "MATI"}
			]
		},
		{
			"name": "Kamar mandi #2",
			"property": [
				{"name": "Lampu",
				"status": "MATI"}
			]
		},
		{
			"name": "Tempat pencucian",
			"property": [
				{"name": "Lampu",
				"status": "MATI"}
			]
		},
		{
			"name": "Halaman Belakang",
			"property": [
				{"name": "Lampu",
				"status": "MATI"}
			]
		}
	],
	"currentTime": dataTemp.split(';')[3]
	}
	client.publish("arduino-server", json.dumps(data))

client = mqtt.Client("client 3")
client.connect("localhost")

client.on_connect = on_connect
client.on_message = on_message

client.loop_forever()

