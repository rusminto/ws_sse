<template>
    <div class="room">
        <div class="room-name black--text">{{room.name}}</div>
		<v-layout align-start justify-start column>
		<div v-for="(property, index) in room.property" :key="index" class="">
				<p class="room-property grey--text text--darken-1">{{property.name}}</p>
				<select v-model="property.status" @change="select(property)">
					<option
					v-for="option in (property.name == 'Lampu' ? optionLamp :
					(property.name == 'Kipas Angin' ? optionFan :optionDoor	))" :key="option"
					>{{option}}
					</option>
				</select>
		</div>
		</v-layout>
        <!-- <div class="room-property grey--text text--darken-1">{{room.property}}</div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
			optionLamp:[
				"MATI",
				"HIDUP - REDUP",
				"HIDUP - SEDANG",
				"HIDUP - TERANG"				
			],
			optionFan:[
				"MATI",
				"HIDUP - PELAN",
				"HIDUP - SEDANG",
				"HIDUP - CEPAT"
			],
			optionDoor:[
				"TUTUP",
				"BUKA"
			]
		};
    },
	props: ["room"],
	methods:{
		select(property){
			this.$emit("change-option", JSON.stringify({
				room: this.room.name,
				property: property.name,
				status: property.status,
				currentTime: new Date()
			}))
		}
	},
	watch:{
		room:{
			handler: function(val){
				//console.log(JSON.stringify(val));
			},
			deep: true
		}
	}
};
</script>
<style scoped>
.room {
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

.room-name {
    width: 100%;
    padding: 20px 0px 10px 25px;
    font-size: 18px;
    font-weight: 500;
	border-bottom: 1px solid #eaedf3
}
.room-property {
    padding: 5px 25px 0px;
    margin-top: inherit;
    text-align: justify;
}

select{
	border: solid 1px rgba(102, 113, 123, 0.21);
    border-radius: 4px;
    width: 123px;
    min-height: 20px;
    padding-left: 5px;
    font-size: 12px;
    line-height: 32px;
    color: #555555;
    padding-left: 10px;
    outline: none;
	margin-left: 20px;
	margin-top: -10px;
}
</style>
