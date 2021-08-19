<template>
	<v-app>
		<v-app-bar
			absolute
			color="#fcb69f"
			dark
			shrink-on-scroll
			scroll-target="#scrolling-techniques-2"
		>
			<!-- <v-app-bar-nav-icon icon="mdi-message-text"></v-app-bar-nav-icon> -->
			<v-app-bar-title>
				<v-icon x-large> mdi-message-text </v-icon>What's App</v-app-bar-title
			>
		</v-app-bar>
		<v-main>
			<!-- <HelloWorld /> -->
			<Advertisements />
		</v-main>
		<v-footer app>
			<!-- -->
		</v-footer>
	</v-app>
</template>

<script>
import Advertisements from "./components/Advertisements.vue";
//import HelloWorld from "./components/HelloWorld.vue";

export default {
	name: "App",

	components: {
		Advertisements,
		//HelloWorld,
	},

	data: () => ({
		//
	}),
};
</script>
