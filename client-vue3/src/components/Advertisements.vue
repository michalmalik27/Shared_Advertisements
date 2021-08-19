<template>
	<v-container>
		<h1>Advertisements</h1>
		<div
			v-masonry="containerId"
			transition-duration="0.3s"
			item-selector=".item"
			class="masonry-container"
		>
			<div
				:key="advertisement.id"
				v-masonry-tile
				class="item"
				gutter="10"
				:style="{ width: '250px', padding: '10px' }"
				v-for="advertisement in advertisements"
			>
				<advertisement :details="advertisement" :key="advertisement.id" />
			</div>
		</div>
	</v-container>
</template>

<script>
import Advertisement from "./Advertisement.vue";
import axios from "axios";
//import { uuid } from "vue-uuid";

export default {
	components: { Advertisement },
	name: "Advertisements",
	data() {
		return {
			advertisements: [],
			baseUrl: "http://localhost:8080/api",
		};
	},
	mounted() {
		this.getAdvertisements();
	},
	methods: {
		getHeaders() {
			let userId = window.localStorage.getItem("userId");

			if (!userId) {
				userId = 6; //uuid.v4();
				window.localStorage.setItem("userId", userId);
			}

			const headers = {
				headers: {
					userId,
				},
			};

			return headers;
		},
		async getAdvertisements() {
			try {
				const response = await axios.get(
					`${this.baseUrl}/advertisements`,
					this.getHeaders()
				);
				this.advertisements = response.data;
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>

<style scoped>
.masorny-item {
	width: "300px";
}
</style>
