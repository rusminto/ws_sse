<template>
<html>
    <div class="applist-container">
        <the-header></the-header>
        <div class="applist-wrapper-body">
            <div class="content-wrapper">
                <div class="title-wrapper">
                    <div class="title">
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
                        <p>Ruangan</p>
                    </div>
                </div>
                <div class="white-warp">
                    <div v-for="(room, index) in rooms" :key="index">
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

export default {
    components: {
        TheHeader,
        TheRoom,
        TheSensor
    },
    data() {
        return {
            rooms: [],
            sensors: [],
            apiWs: "ws://localhost:1337",
            apiSse1: "http://localhost:3000",
            apiSse2: "https://localhost:3001"
        };
    },
    methods: {
        send(msg) {
            console.log(msg);
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
                        console.log(response.statusText);
                    });
                    break;

                case "sse2":
                    // const method = 'POST';
                    // var buffer = new Buffer(msg);
                    // var contentLength = buffer.length
                    // const response = fetch( this.apiSse2, { method, contentLength, msg } );
                    break;
            }
        }
    },
    created() {
        this.sensors = sensorList;
        switch (this.$route.params.type) {
            case "ws":
				for (let i = 0; i <= this.sensors.length; i++) {
                    client[i] = new WebSocket(this.apiWs + "/"+i);
                }
                for (let i = 0; i <= this.sensors.length; i++) {
                    client[i].addEventListener(
                        "message",
                        e => {
                            if (e.data !== ""){
								if(i === 0){
									this.rooms = JSON.parse(e.data)
								}else{
									this.sensors[i - 1].property[0].value = e.data;
								}
							}
                        },
                        false
                    );
                }

                break;
            case "sse1":
                for (let i = 0; i <= this.sensors.length; i++) {
					client[i] = new EventSource(this.apiSse1 + "/"+i);
                }
                for (let i = 0; i <= this.sensors.length; i++) {
                    client[i].addEventListener(
                        "message",
                        e => {
                            if (e.data !== ""){
								if(i === 0){
									this.rooms = JSON.parse(e.data)
								}else{
									this.sensors[i - 1].property[0].value = e.data;
								}
							}
                        },
                        false
                    );
                }
                break;
            case "sse2":
                // connection = require("http2").get(this.apiSse2)
                for (let i = 0; i <= this.sensors.length; i++) {
                    client[i] = new EventSource(this.apiSse2 + "/"+i);
                }
                for (let i = 0; i <= this.sensors.length; i++) {
                    client[i].addEventListener(
                        "message",
                        e => {
                            if (e.data !== ""){
								if(i === 0){
									this.rooms = JSON.parse(e.data)
								}else{
									this.sensors[i - 1].property[0].value = e.data;
								}
							}
                        },
                        false
                    );
                }
                break;
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
</style>
