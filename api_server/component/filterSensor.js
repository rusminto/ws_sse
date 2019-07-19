class filterSensor {
	constructor() { }
	
	filter(msg, index) {
		// console.log(msg)
		let sensorIdentity = msg.match(/(kitchen|outside)/g)
		if (sensorIdentity) {
			if (index == "1" && sensorIdentity[0] == "kitchen") {
				return msg.match(/(\d+)/g)[0]
			}
			if (index == "2" && sensorIdentity[0] == "outside") {
				return msg.match(/(\d+)/g)[0]
			}
		}
		if (index == "0" && sensorIdentity == null) {
			let jsonTemp = []
			let isTimer = false
			let parseMsg = msg.split('|');
			let arduinoId = parseMsg[0]
			let message = parseMsg[1].split(';')
			let timer = parseMsg[2]
			let rooms = []

			if(timer != "" || timer != null){
				isTimer = true
			}

			for (let i = 0; i < message.length; i++) {
				let parseRoom = message[i].split('-')
				let parseProp = parseRoom[1].split(',')
				let properties = []
				let room = ""

				switch (parseRoom[0]) { //room
					case "01": room = "Kamar Tidur #1"; break;
					case "02": room = "Kamar Tidur #2"; break;
					case "03": room = "Dapur"; break;
					case "04": room = "Ruang Makan"; break;
					case "05": room = "Teras"; break;
					case "06": room = "Ruang Tamu"; break;
					case "07": room = "Ruang Keluarga"; break;
					case "08": room = "Mushola"; break;
					case "09": room = "Kamar Mandi #1"; break;
					case "10": room = "Kamar Mandi #2"; break;
					case "11": room = "Tempat Cuci"; break;
					case "12": room = "Halaman Belakang"; break;
					case "13": room = "Garasi"; break;
				}

				for (let j = 0; j < parseProp.length; j++) {
					let property = {}
					let parseStatus = parseProp[j].split('=')

					switch (parseStatus[0]) { //device
						case "1": property.name = "Lampu"; break;
						case "2": property.name = "Kipas Angin"; break;
						case "3": property.name = "Pintu"; break;
					}
	
					switch (parseStatus[1]) { //status
						case "0": property.status = "MATI"; break;
						case "1": property.status = (parseStatus[0] == "1")?"HIDUP - REDUP":"HIDUP - PELAN"; break;
						case "2": property.status = "HIDUP - SEDANG"; break;
						case "3": property.status = (parseStatus[0] == "1")?"HIDUP - TERANG" : "HIDUP - CEPAT"; break;
						case "4": property.status = "HIDUP"; break;
						case "5": property.status = "BUKA"; break;
						case "6": property.status = "TUTUP"; break;
					}
					properties.push(property)
				}
				rooms.push({
					name: room,
					property: properties
				})	
			}

			//test round-trip time
			if(isTimer){
				let objTemp = {}
				objTemp[arduinoId] = rooms
				objTemp["currentTime"] = timer
				// console.log(objTemp);
				return JSON.stringify(objTemp)
			}
			// console.log(jsonTemp);
			return JSON.stringify(rooms)
			
			//test one-way
			// let json = JSON.parse(msg)
			// json.currentTime = new Date()
			// return JSON.stringify(json)

		}

		return ""
	}
}

module.exports = filterSensor;
