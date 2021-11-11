<template lang="html">
	<div class="container-fluid p-5">
		<loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header">
						<h6><a href="javascript:void(0)" class="text-info" @click="back()"> <i class="fas fa-arrow-left"></i></a> Edit Tag <small>(Fields in red are required)</small></h6>
					</div>
					<div class="card-body">
						<form v-on:submit.prevent="onSubmit">
							<div class="form-group row">
								<label for="inputName" class="col-sm-2 col-form-label text-danger">Name</label>
								<div class="col-sm-10">
									<input type="text" v-model="tagRequest.name" @blur="validationRule()"
										class="form-control" id="inputName">
									<small class="text-danger">{{validationData.name}}</small>
								</div>
							</div>
							<button type="submit" class="btn btn-primary float-save">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="js">
	import {
		mapState,
		mapActions
	} from 'vuex'
	import env from '../../enviorments'
	import Loading from 'vue-loading-overlay'
	import 'vue-loading-overlay/dist/vue-loading.css';
	export default {
		name: 'tagCreate',
		components: {
			Loading
		},
		data() {
			return {
				env,
				isLoading: false,
				fullPage: true,
				filter: {
					page: "",
                    reverse: "",
                    sort: "",
                    name: "",
				},
				tagRequest: {
					id: "",
					name: "",
				},
				validationData: {
					name: "",
				}
			}
		},
		watch: {
			async $route(to, from) {
				if (to.params.id) {
					this.tagRequest.id = to.params.id
					await this.tagDetail()
				}
			},
		},
		computed: {},
		methods: {
			...mapActions({
				tagUpdateAction: 'tagUpdateAction',
				tagFieldsAction: 'tagFieldsAction',
			}),
			back() {
				this.$router.replace({ path: 'tag-list', query: { page: this.filter.page, reverse: this.filter.reverse, sort: this.filter.sort, name: this.filter.name} }).catch(()=>{})
			},
			async getFields(){
				let option = {
					fields: {id: this.tagRequest.id}
				}
				await this.tagFieldsAction({
					...option
				}).then(res => {
					this.tagRequest.name = res.data.data.name
				}).catch(err => this.isLoading = true)
			},
			async onSubmit() {
				this.isLoading = true
				let validation = this.validationRule()
				if (validation == true) {
					this.isLoading = false
					return
				}
				let option = {
					id: this.tagRequest.id,
					name: this.tagRequest.name,
				}
				await this.tagUpdateAction({
					...option
				}).then(res => {
					this.back()
				}).catch(err => this.isLoading = true)
			},
			validationRule() {
				let isValidation = []
				if (this.tagRequest.name == "") {
					this.validationData.name = "The name field is required."
					isValidation.push(true)
				} else {
					this.validationData.name = ""
					isValidation.push(false)
				}
				if (isValidation.includes(true)) {
					return true
				} else {
					return false
				}
			}
		},
		async mounted() {
			this.filter.page = this.$route.query.page
            this.filter.reverse = this.$route.query.reverse
            this.filter.sort = this.$route.query.sort
            this.filter.name = this.$route.query.name
			this.tagRequest.id = this.$route.query.id
			this.getFields()
		}
	}
</script>

<style scoped lang="scss">
	.v-text-field--box .v-input__slot,
	.v-text-field--outline .v-input__slot {
		min-height: 56px;
	}
	.banner-image {
		width: 100px;
		height: 100px;
		object-fit: contain;
	}
</style>