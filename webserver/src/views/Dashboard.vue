<template>
<html>
	<div class="applist-container">
            <the-header></the-header>
            <div class="applist-wrapper-body">
                <div class="content-wrapper">
                    <div class="title-wrapper">
                        <div class="title">
                            <p>Ruangan</p>
                        </div>
                    </div>
                    <div class="white-warp">
                        <div v-for="(room, index) in rooms" :key="index">
                            <the-room
							:room="room"
                            ></the-room>
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
import {firstData} from "@/components/HomeAttribute";

export default {
	components:{
		TheHeader,
		TheRoom
	},
	data(){
		return {
			rooms: [] 
		}
	},
	methods:{

	},
	created(){
		this.rooms = firstData
	}
}
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
    align-items: flex-start;
    align-content: flex-start;
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
    width: 1010px;
    height: auto;
    text-align: left;
    line-height: 1.6;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start; 
}

.content-wrapper {
    margin: 120px 0px 0px 13%;
    width: 80%;
	overflow-x: scroll;
}
</style>
