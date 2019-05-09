<template>
    <div class="about">
        <input type="button" @click="subscribe" value="start">
        <input type="button" @click="clear" value="clear" style="margin-left: 20px">
        <input type="button" @click="send" value="send" style="margin-left: 20px">
        <br>
        {{msg?msg:"null"}}
    </div>
</template>
<script>
var socket

export default {
    data() {
        return {
			msg: null
		};
    },
    methods: {
        subscribe() {
            if ("WebSocket" in window) {

                socket = new WebSocket("ws://localhost:1337");

                socket.addEventListener('message',  (event) => {
					this.msg = event.data
				});
            } else {
                alert("WebSocket NOT supported by your Brosocketer!");
            }
		},

		send(){
			socket.send("websocket");
		},

		clear(){
			socket.close()
		}
	},
	watch:{
		
	}
};
</script>
