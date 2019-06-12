class convertData{
	constructor(){}

	convert(msg){
		let data = ""
		let topic = ""
		switch(msg.status){
				case "MATI" : data += "0"; break;
				case "HIDUP - REDUP" : data += "1"; break;
				case "HIDUP - PELAN" : data += "1"; break;
				case "HIDUP - SEDANG" : data += "2"; break;
				case "HIDUP - TERANG" : data += "3"; break;
				case "HIDUP - CEPAT" : data += "3"; break;
				case "HIDUP" : data += "4"; break;
				case "BUKA" : data += "5"; break;
				case "TUTUP" : data += "6"; break;
				default : data += "7";
		}
		data += ";";
		switch(msg.property){
			case "Lampu" : data += "1";break;
			case "Kipas Angin" : data += "2";break;
			case "Pintu" : 
			if(msg.room == "Ruang Tamu"){
				data += "3;5;"
				return data
			} else if(msg.room == "Garasi"){
				data += "4;13;"
				return data
			}
			;break;
			default : data+="5";
		}
		data += ";";
		switch(msg.room){
			case "Kamar Tidur #1" : data += "01"; topic="home/8266"; break;
			case "Kamar Tidur #2" : data += "02"; topic="home/8266"; break;
			case "Dapur" : data += "03"; topic="home/8266"; break;
			case "Ruang Makan" : data += "04"; topic="home/8266"; break;
			case "Teras" : data += "05"; topic="home/8266"; break;
			case "Ruang Tamu" : data += "06"; topic="home/8266"; break;
			case "Ruang Keluarga" : data += "07"; topic="home/32";break;
			case "Mushola" : data += "08"; topic="home/8266";break;
			case "Kamar Mandi #1" : data += "09"; topic="home/8266";break;
			case "Kamar Mandi #2" : data += "10"; topic="home/8266";break;
			case "Tempat Cuci" : data += "11"; topic="home/8266";break;
			case "Halaman Belakang" : data += "12"; topic="home/32";break;
			case "Garasi" : data += "13"; topic="home/8266";break;
			default : data += "14"; topic="home/all";
		}	
		data += ";";
		data += msg.currentTime
		return {
			msg: data,
			topic: topic
		}
	}
}

module.exports = convertData;