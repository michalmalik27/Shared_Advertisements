<template>
	<v-container>
		<h1>Advertisements</h1>
		<div>
			<advertisement />
		</div>
	</v-container>
</template>

<script>
import Advertisement from "./Advertisement.vue";
export default {
	components: { Advertisement },
	name: "Advertisements",
};
</script>

<style scoped></style>
