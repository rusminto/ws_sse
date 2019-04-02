<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <!-- <HelloWorld :msg="sse?sse:'kosong'"/> -->
        <button @click="setupStream">run</button>
        <button @click="stopStream" style="margin-left: 20px">stop</button>
        <p>{{state?state:'null'}}</p>
        <p>{{sse?sse:'null'}}</p>
    </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import HelloWorld from "@/components/HelloWorld.vue";

var source;

export default {
    name: "home",
    components: {
        HelloWorld
    },
    data() {
        return {
            sse: null,
            state: null,
            tes: null,
            count: 0,
            api: "http://localhost:3000"
        };
    },

    methods: {
        setupStream() {
            if (!!window.EventSource) {
                source  = new EventSource(this.api);

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
        stopStream(){
            source.close()
            this.state = "Disconnected";
        },
        getTest() {
            fetch(`${this.api}/tes`, {})
                .then(response => response.json())
                .then(body => {
                    this.tes = `${body.data} ke-${this.count}`
                    this.count++
                })
        }
    }
};
</script>
