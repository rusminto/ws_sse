class filterSensor{
	constructor(){}

	filter(msg, index){
		let sensorIdentity = msg.match(/(kitchen|outside)/g)
		
		if(sensorIdentity){
			if(index == "1" && sensorIdentity[0] == "kitchen"){
				return msg.match(/(\d+)/g)[0]
			}
			if(index == "2" && sensorIdentity[0] == "outside"){
				return msg.match(/(\d+)/g)[0]
			}
		}
		
		if(index == "0" && sensorIdentity == null){
			
			//test one-way
			// let json = JSON.parse(msg)
			// json.currentTime = new Date()
			// return JSON.stringify(json)

			//test round-trip time
			return msg
		}
		
		return ""
	}
}

module.exports = filterSensor;