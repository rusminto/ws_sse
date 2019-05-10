<template>
    <div class="sensor">
        <div class="sensor-name black--text">{{sensor.name}}</div>
		<v-layout align-center justify-center column class="full-height">
		<div v-for="(property, index) in sensor.property" :key="index" class="">
			<p>{{property.value}}&#8451;</p>
		</div>
		</v-layout>
        <!-- <div class="sensor-property grey--text text--darken-1">{{sensor.property}}</div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
		};
    },
	props: ["sensor"],
	methods:{

	},
	watch:{

	}
};
</script>
<style scoped>
.sensor {
    width: 242px;
    height: 275px;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    margin-bottom: 20px;
    margin-right: 10px;
    box-shadow: 0 0.5px 1.5px 0 rgba(0, 0, 0, 0.04);
    border: solid 0.5px #eaedf3;
    background-color: white;
    border-radius: 4px;
}

.sensor-name {
    width: 100%;
    padding: 20px 0px 10px 25px;
    font-size: 18px;
    font-weight: 500;
	border-bottom: 1px solid #eaedf3
}
.sensor-property {
    padding: 5px 25px 0px;
    margin-top: inherit;
    text-align: justify;
}

.full-height{
	height: calc(100% - 55px);
	font-size: 48pt;
}
</style>
