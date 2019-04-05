<template>
    <div class="about">
        <input type="button" @click="publish" value="start">
		<input type="button" @click="clear" value="clear"  style="margin-left: 20px">
		<input type="button" @click="send" value="send"  style="margin-left: 20px">
		<div v-for="data in msg" :key="data">
        {{data?data:"null"}}
		</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: [],
            publishText: null
        };
    },
    created() {
        console.log(this.$store.state.socket.isConnected);
    },
    methods: {
        publish() {
			// $socket is [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) instance
            this.$options.sockets.onmessage = data => {
				console.log(data.data);
				
                this.msg.push(data.data);
            };
		},
		clear(){
			// this.$store.dispatch("sendMessage", "close");
			// this.$store.dispatch("close");
			// this.$socket.close()
			this.msg = []
		},
		send(){
			this.$store.dispatch("sendMessage", "websocket");
		}
    }
};
</script>
