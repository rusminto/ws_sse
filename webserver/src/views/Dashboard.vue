<template>
<html>
    <div class="applist-container">
        <the-header></the-header>


		<v-dialog v-model="showPopup" width="330px">
            <v-card>
                <div class="popup-box" @click.stop>
                    <h1>Testing</h1>
                    <hr>
                        <div class="narrow">
                            <p class="subheading">Jeda pengiriman (ms) :</p>
                            <input
                                    type="text"
                                    name
									v-model="timerValue"
                                    @keyup.enter="startTimer(timerValue)"
                                >
                        </div>

						<div class="narrow">
                            <p class="subheading">Jumlah pengiriman :</p>
                            <input
                                    type="text"
                                    name
									v-model="totalValue"
                                    @keyup.enter="startTimer(timerValue)"
                                >
                        </div>

                    <div class="popup-button">
                        <div class="popup-buton-cancel" @click="stopTimer()">Stop</div>
                        <div class="popup-buton-save" @click="startTimer(timerValue)">Run</div>
                    </div>
                </div>
            </v-card>
        </v-dialog>


        <div class="applist-wrapper-body">
            <div class="content-wrapper">
                <div class="title-wrapper">
                    <div class="title" @click="showPopup = !showPopup">
                        <p>Sensor</p>
                    </div>
                </div>
                <div class="white-warp">
                    <div v-for="(sensor, index) in sensors" :key="index">
                        <the-sensor :sensor="sensor"></the-sensor>
                    </div>
                </div>
                <div class="title-wrapper">
                    <div class="title">
                        <p>Arduino 1</p>
                    </div>
                </div>
                <div class="white-warp">
                    <div v-for="(room, roomIndex) in roomsArduinoA" :key="roomIndex">
                        <the-room :room="room" @change-option="send($event)"></the-room>
                    </div>
                </div>

				<div class="title-wrapper">
                    <div class="title">
                        <p>Arduino 2</p>
                    </div>
                </div>
                <div class="white-warp">
                    <div v-for="(room, roomIndex) in roomsArduinoB" :key="roomIndex">
                        <the-room :room="room" @change-option="send($event)"></the-room>
                    </div>
                </div>
            </div>
        </div>
    </div>
</html>
</template>
<script>
import TheHeader from "@/components/Header";
import TheRoom from "@/components/Room";
import TheSensor from "@/components/Sensor";
import { sensorList } from "@/components/HomeAttribute";
// import { fetch2 } from "fetch-h2";
// var spdy = require('spdy');
// var https = require('https');
// import spdy from "spdy";
// import https from "https"

var client = [];
var connection = null;
var timer;

export default {
    components: {
        TheHeader,
        TheRoom,
        TheSensor
    },
    data() {
        return {
			rooms: [],
			roomsArduinoA: [],
			roomsArduinoB: [],
            sensors: [],
            apiWs: "ws://localhost:1337",
			apiSse1: "http://localhost:3000",
			apiSses: "https://localhost:3002",
            apiSse2: "https://localhost:3001",
            totalArduino: 2,
			listRooms: [],
			showPopup: false,
			timerQueue: [],
			timerValue: 1000,
			totalValue: 1,
			totalQueue: 0
        };
    },
    methods: {
		startTimer(ms){
			timer = setInterval(() => {
				let currentTime = new Date()
				this.send(JSON.stringify({currentTime: currentTime}))
				this.timerQueue.push(currentTime)
				this.totalQueue++

				if(this.totalQueue == this.totalValue){
					clearInterval(timer)
					this.totalQueue = 0		
				}
			}, ms)
		},
		stopTimer(){
			clearInterval(timer)
		},
        send(msg) {
            switch (this.$route.params.type) {
                case "ws":
                    client[0].send(msg);
                    break;

                case "sse1":
                    fetch(`${this.apiSse1}/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: msg
                    }).then(response => {
                        // console.log(response.statusText);
                    });
					break;
					
				case "sses":
                    fetch(`${this.apiSses}/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: msg
                    }).then(response => {
                        // console.log(response.statusText);
                    });
                    break;

                case "sse2":
                    var buffer = new Buffer(msg);
                    fetch(`${this.apiSse2}/`, {
                        method: "POST",
                        body: msg
                    }).then(response => {
                        // console.log(response.statusText);
                    });
                    break;
            }
        },
        listen() {
            for (let i = 0; i <= this.sensors.length; i++) {
                client[i].addEventListener(
                    "message",
                    e => {
                        if (e.data !== "") {
                            if (i === 0) {
								let tempRooms = JSON.parse(e.data);

								let id = Object.keys(tempRooms)[0];
								if(id == 0){
									this.roomsArduinoA = tempRooms[0];
									let countQueue = 0
									let currentTime = new Date(tempRooms.currentTime)
									let timeDiff = new Date() - currentTime
									// if(!isNaN(timeDiff)) console.log(timeDiff)
									
									//test one-way
									// console.log(timeDiff);
									
									//test round-trip time
									let newQueue = this.timerQueue.filter(item =>{
										if((new Date(item) - currentTime) == 0){
											console.log(timeDiff)
										}else{
											countQueue++
											return item
										}
									})

									if(countQueue == this.timerQueue.length){
										console.log("loss : "+tempRooms.currentTime);
										this.timerQueue = this.timerQueue.filter(item => (new Date(item) - currentTime) != 0)
									}

									this.timerQueue = newQueue
								}
								
								if(id == 1)
								this.roomsArduinoB = tempRooms[1];
								// console.log(tempRooms[0]);
                                // if (
                                //     this.rooms[0].length > 0 &&
                                //     this.rooms[1].length > 0
                                // ) {
                                //     this.listRooms = [];
                                //     this.listRooms = this.listRooms.concat(
                                //         this.rooms[0],
                                //         this.rooms[1]
                                //     );
                                // }
                            } else {
                                this.sensors[i - 1].property[0].value = e.data;
                            }
                        }
                    },
                    false
				);
			}
			client[0].onopen = () => {
				let currentTime = new Date()
				this.send(JSON.stringify({currentTime: currentTime}))
				this.timerQueue.push(currentTime)
				}
        }
    },
    mounted() {
        this.sensors = sensorList;
        switch (this.$route.params.type) {
            case "ws":
                for (let i = 0; i <= this.sensors.length; i++) {
                    client[i] = new WebSocket(this.apiWs + "/" + i);
                }
                break;
            case "sse1":
                for (let i = 0; i <= this.sensors.length; i++) {
                    client[i] = new EventSource(this.apiSse1 + "/" + i);
                }
				break;
			case "sses":
                for (let i = 0; i <= this.sensors.length; i++) {
                    client[i] = new EventSource(this.apiSses + "/" + i);
                }
				break;
            case "sse2":
                // connection = require("http2").get(this.apiSse2)
                for (let i = 0; i <= this.sensors.length; i++) {
                    client[i] = new EventSource(this.apiSse2 + "/" + i);
                }
                break;
		}
		this.listen();
    },
    watch: {
        rooms(val) {
            console.log(val);
            // let temp = JSON.parse(val)
            // this.rooms = temp
            // // this.rooms[Number(temp[0].id)] = temp
            // // this.rooms[Number(temp[0].id)].shift()
            // console.log(this.rooms);
        }
    }
};
</script>
<style scoped>
.applist-container {
    font-family: Roboto;
    color: #3e3f42;
    font-size: 14px;
    min-height: 100vh;
    background-color: #fbfbfd;
}

.applist-wrapper-body {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
}

.title p {
    margin: 0px;
    text-align: right;
    font-size: 18px;
    font-weight: 500;
}

.title-wrapper {
    width: 100%;
    display: flex;
    height: auto;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-bottom: 30px;
}

.blue-btn {
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
    box-shadow: 0 0.5px 0.5px 0 rgba(19, 31, 21, 0.1),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 205px;
    border: 1px solid #1461d2;
    background-image: linear-gradient(to top, #1665d8, #1f6fe5);
    margin-bottom: 0px;
    color: white;
}

div.blue-btn:hover {
    background-image: linear-gradient(to top, #104ca5, #1150ad);
}

.white-warp {
    width: 100%;
    height: auto;
    text-align: left;
    line-height: 1.6;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}

.content-wrapper {
    margin-top: 20px;
    width: 80%;
}

.popup-box {
    width: 330px;
    height: auto;
    background-color: white;
    border-radius: 4px;
    text-align: left;
}
h1 {
    padding: 20px 25px 15px 25px;
    margin: 0px;
    font-weight: 500;
    font-size: 21px;
}

hr {
    border: 1px solid #eaedf3;
    margin-bottom: 20px;
}

input {
    height: 36px;
    width: 280px;
    background-color: white;
    border-radius: 4px;
    border: 1px solid;
    border-color: #e2e5ed;
    padding: 0px 10px;
    color: grey;
    font-size: 14px;
    box-shadow: inset 0 0.5px 1px 0 rgba(102, 113, 123, 0.21);
    color: #3e3f42;
}

.narrow {
    margin: 10px 25px;
}

.popup-button {
    width: auto;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.popup-buton-save,
.popup-buton-cancel {
    height: 45px;
    width: 80px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0.5px 0.5px 0 rgba(19, 31, 21, 0.1),
        inset 0 1px 0 0 rgba(255, 255, 255, 0.06);
    margin-right: 25px;
}

.popup-buton-save {
    background-image: linear-gradient(to top, #34aa44, #38b249);
    color: white;
    border: 1px solid #2d9c3c;
}

.popup-buton-cancel {
    background-color: white;
    color: black;
    border: 1px solid #ddd;
}

.popup-buton-save:hover {
    background-image: linear-gradient(to top, #2e943c, #329d41);
}

.popup-buton-cancel:hover {
    background-color: #eaedf3;
}
</style>
