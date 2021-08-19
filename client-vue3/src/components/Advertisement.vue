<template>
	<v-card class="mx-auto" max-width="344">
		<v-card-subtitle>
			<small>{{ details.category }} </small>
		</v-card-subtitle>

		<v-card-title>
			{{ details.title }}
		</v-card-title>

		<v-card-subtitle>
			<small>
				<i
					>By {{ details.createdByUserName }} | At {{ details.updatedOn }}</i
				></small
			>
		</v-card-subtitle>

		<v-img v-if="details.image" :src="details.image" height="200px"></v-img>

		<v-card-text>
			{{ details.description }}
		</v-card-text>

		<v-card-actions v-if="details.isEditEnable">
			<v-btn variant="outlined" color="primary">
				EDIT
			</v-btn>
			<v-btn variant="outlined" color="error" @click="remove">
				REMOVE
			</v-btn>
		</v-card-actions>
	</v-card></template
>

<script>
export default { name: "Advertisement", props: ["details"] };
</script>

<style scoped></style>
