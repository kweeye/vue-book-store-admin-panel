<template lang="html">
	<div class="container-fluid p-5">
		<loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header">
						<h6><a href="javascript:void(0)" class="text-info" @click="back()"> <i class="fas fa-arrow-left"></i></a> Edit Category <small>(Fields in red are required)</small></h6>
					</div>
					<div class="card-body">
						<form v-on:submit.prevent="onSubmit">
							<div class="form-group row">
								<label for="inputName" class="col-sm-2 col-form-label text-danger">Name</label>
								<div class="col-sm-10">
									<input type="text" v-model="categoryRequest.name" @blur="validationRule()"
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
		name: 'categoryCreate',
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
				categoryRequest: {
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
					this.categoryRequest.id = to.params.id
					await this.categoryDetail()
				}
			},
		},
		computed: {},
		methods: {
			...mapActions({
				categoryUpdateAction: 'categoryUpdateAction',
				categoryFieldsAction: 'categoryFieldsAction',
			}),
			back() {
				this.$router.replace({ path: 'category-list', query: { page: this.filter.page, reverse: this.filter.reverse, sort: this.filter.sort, name: this.filter.name} }).catch(()=>{})
			},
			async getFields(){
				let option = {
					fields: {id: this.categoryRequest.id}
				}
				await this.categoryFieldsAction({
					...option
				}).then(res => {
					this.categoryRequest.name = res.data.data.name
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
					id: this.categoryRequest.id,
					name: this.categoryRequest.name,
				}
				await this.categoryUpdateAction({
					...option
				}).then(res => {
					this.back()
				}).catch(err => this.isLoading = true)
			},
			validationRule() {
				let isValidation = []
				if (this.categoryRequest.name == "") {
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
			this.categoryRequest.id = this.$route.query.id
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