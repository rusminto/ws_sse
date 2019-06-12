#!/usr/bin/env python

import paho.mqtt.client as mqtt
import random
import time
import math
import json

def on_connect(client, userdata, flags, rc):
	client.subscribe("home/all")
	client.subscribe("home/8266")

def on_message(client, userdata, msg):
	dataTemp = msg.payload.decode()
	# data = {"0":[
	# 	{
	# 		"name": "Kamar tidur depan",
	# 		"property": [
	# 			{"name": "Lampu",
	# 			"status": "MATI"}
	# 		]
	# 	},
	# 	{
	# 		"name": "Kamar tidur utama",
	# 		"property": [
	# 			{"name": "Lampu",
	# 			"status": "MATI"}
	# 		]
	# 	},
	# 	{
	# 		"name": "Dapur",
	# 		"property": [
	# 			{"name": "Lampu",
	# 			"status": "MATI"},
	# 			{"name": "Kipas Angin",
	# 			"status": "MATI"}
	# 		]
	# 	},
	# 	{
	# 		"name": "Ruang makan",
	# 		"property": [
	# 			{"name": "Lampu",
	# 			"status": "MATI"}
	# 		]
	# 	},
	# 	{
	# 		"name": "Teras",
	# 		"property": [
	# 			{"name": "Pintu",
	# 			"status": "TUTUP"},
	# 			{"name": "Lampu",
	# 			"status": "MATI"}
	# 		]
	# 	},
	# 	{
	# 		"name": "Ruang tamu",
	# 		"property": [
	# 			{"name": "Lampu",
	# 			"status": "MATI"}
	# 		]
	# 	},
	# 	{
	# 		"name": "Ruang keluarga",
	# 		"property": [
	# 			{"name": "Lampu",
	# 			"status": "MATI"},
	# 			{"name": "Kipas Angin",
	# 			"status": "MATI"}
	# 		]
	# 	},
	# 	{
	# 		"name": "Mushola",
	# 		"property": [
	# 			{"name": "Lampu",
	# 			"status": "MATI"}
	# 		]
	# 	},
	# 	{
	# 		"name": "Kamar mandi #1",
	# 		"property": [
	# 			{"name": "Lampu",
	# 			"status": "MATI"}
	# 		]
	# 	},
	# 	{
	# 		"name": "Kamar mandi #2",
	# 		"property": [
	# 			{"name": "Lampu",
	# 			"status": "MATI"}
	# 		]
	# 	},
	# 	{
	# 		"name": "Tempat pencucian",
	# 		"property": [
	# 			{"name": "Lampu",
	# 			"status": "MATI"}
	# 		]
	# 	},
	# 	{
	# 		"name": "Halaman Belakang",
	# 		"property": [
	# 			{"name": "Lampu",
	# 			"status": "MATI"}
	# 		]
	# 	}
	# ],
	# "currentTime": dataTemp.split(';')[3]
	# }

	data1 = "0|01-1=0;02-1=0;03-1=0,2=0;04-1=0;05-1=0;06-1=0,3=0;07-2=0;08-1=0;09-1=0;10-1=0;11-1=0;13-1=0,3=0|"+dataTemp.split(';')[3]
	print(data1)
	client.publish("arduino-server", data1)

client = mqtt.Client("client 3")
client.connect("localhost")

client.on_connect = on_connect
client.on_message = on_message

client.loop_forever()

