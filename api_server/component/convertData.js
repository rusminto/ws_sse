class convertData{
	constructor(){}

	convert(msg){
		let data = ""
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
			if(msg.room == "Teras"){
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
			case "Kamar tidur depan" : data += "1";break;
			case "Kamar tidur utama" : data += "2";break;
			case "Dapur" : data += "3";break;
			case "Ruang makan" : data += "4";break;
			case "Teras" : data += "5";break;
			case "Ruang tamu" : data += "6";break;
			case "Ruang keluarga" : data += "7";break;
			case "Mushola" : data += "8";break;
			case "Kamar mandi #1" : data += "9";break;
			case "Kamar mandi #2" : data += "10";break;
			case "Tempat Pencucian" : data += "11";break;
			case "Halaman Belakang" : data += "12";break;
			case "Garasi" : data += "13";break;
			default : data += "14";
		}	
		data += ";";
		data += msg.currentTime
		return data
	}
}

module.exports = convertData;