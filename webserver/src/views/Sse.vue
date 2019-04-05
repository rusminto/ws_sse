<template>
    <div class="home">
        <button @click="setupStream">run</button>
        <button @click="stopStream" style="margin-left: 20px">stop</button>
        <button @click="postTest" style="margin-left: 20px">send</button>
        <p>{{state?state:'null'}}</p>
        <p>{{sse?sse:'null'}}</p>
    </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */

var source;

export default {
    data() {
        return {
            sse: null,
            state: null,
            tes: null,
            count: 0,
            api1: "http://localhost:3000",
            api2: "https://localhost:3001"
        };
    },

    computed: {
        api() {
            return this.$route.params.type == 2 ? this.api2 : this.api1;
        }
    },

    watch: {
        api(val) {
            source.close();
            this.state = "Disconnected";
        }
    },

    methods: {
        setupStream() {
            if (!!window.EventSource) {
                source = new EventSource(this.api);

                source.addEventListener(
                    "message",
                    e => {
                        this.sse = e.data;
                    },
                    false
                );

                source.addEventListener(
                    "open",
                    e => {
                        this.state = "connected";
                    },
                    false
                );

                source.addEventListener(
                    "error",
                    e => {
                        if (e.eventPhase == EventSource.CLOSED) source.close();
                        if (e.target.readyState == EventSource.CLOSED) {
                            this.state = "Disconnected";
                        } else if (this.state == EventSource.CONNECTING) {
                            this.state = "Connecting...";
                        }
                    },
                    false
                );
            } else {
                console.log("Your browser doesn't support SSE");
            }
        },
        stopStream() {
            source.close();
            this.state = "Disconnected";
        },
        postTest() {
			console.log(this.api == this.api1 ? "sse_http1" : "sse_http2");
			
            fetch(`${this.api}/`, {
				method: "POST",
				headers:{
					'Content-Type': 'application/json'
				},
                body: JSON.stringify({
                    data: this.api == this.api1 ? "sse_http1" : "sse_http2"
                })
            })
                .then(response => {
					console.log(response.statusText);
					
				})
                // .then(body => {
					
                //     // this.tes = `${body.data} ke-${this.count}`
                //     // this.count++
                // });
        }
    }
};
</script>
