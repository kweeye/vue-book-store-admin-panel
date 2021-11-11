<template lang="html">
	<div class="container-fluid p-5">
		<loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header">
						<h6><a href="javascript:void(0)" class="text-info" @click="back()"> <i class="fas fa-arrow-left"></i></a> Edit Author <small>(Fields in red are required)</small></h6>
					</div>
					<div class="card-body">
						<form v-on:submit.prevent="onSubmit">
							<div class="form-group row">
								<label for="inputName" class="col-sm-2 col-form-label text-danger">Name</label>
								<div class="col-sm-10">
									<input type="text" v-model="authorRequest.name" @blur="validationRule()"
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
		name: 'authorCreate',
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
				authorRequest: {
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
					this.authorRequest.id = to.params.id
					await this.authorDetail()
				}
			},
		},
		computed: {},
		methods: {
			...mapActions({
				authorUpdateAction: 'authorUpdateAction',
				authorFieldsAction: 'authorFieldsAction',
			}),
			back() {
				this.$router.replace({ path: 'author-list', query: { page: this.filter.page, reverse: this.filter.reverse, sort: this.filter.sort, name: this.filter.name} }).catch(()=>{})
			},
			async getFields(){
				let option = {
					fields: {id: this.authorRequest.id}
				}
				await this.authorFieldsAction({
					...option
				}).then(res => {
					this.authorRequest.name = res.data.data.name
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
					id: this.authorRequest.id,
					name: this.authorRequest.name,
				}
				await this.authorUpdateAction({
					...option
				}).then(res => {
					this.back()
				}).catch(err => this.isLoading = true)
			},
			validationRule() {
				let isValidation = []
				if (this.authorRequest.name == "") {
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
			this.authorRequest.id = this.$route.query.id
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