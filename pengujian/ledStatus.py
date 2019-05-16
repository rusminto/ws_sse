#!/usr/bin/env python

import paho.mqtt.client as mqtt
import random
import time
import math
import json

klien = mqtt.Client("client 3")
klien.connect("localhost")

while True:
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
	]}
	klien.publish("arduino-server", json.dumps(data))
	time.sleep(3)

klien.disconnect()
