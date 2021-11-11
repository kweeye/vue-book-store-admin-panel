<template lang="html">
	<div class="container-fluid p-5">
		<loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header">
						<h6><a href="javascript:void(0)" class="text-info" @click="back()"> <i class="fas fa-arrow-left"></i></a> Edit Banner <small>(Fields in red are required)</small></h6>
					</div>
					<div class="card-body">
						<form v-on:submit.prevent="onSubmit">
							<div class="form-group row">
								<label for="inputTitle" class="col-sm-2 col-form-label">Title</label>
								<div class="col-sm-10">
									<input type="text" v-model="bannerRequest.title" @blur="validationRule()"
										class="form-control" id="inputTitle">
								</div>
							</div>
							<div class="form-group row">
								<label for="inputLink" class="col-sm-2 col-form-label">Link</label>
								<div class="col-sm-10">
									<input type="text" v-model="bannerRequest.link" @blur="validationRule()"
										class="form-control" id="inputLink">
								</div>
							</div>
							<div class="form-group row">
								<label for="inputShortDescription" class="col-sm-2 col-form-label">Short Description</label>
								<div class="col-sm-10">
									<textarea v-model="bannerRequest.shortDescription" @blur="validationRule()"
										class="form-control" id="inputShortDescription"></textarea>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputImage" class="col-sm-2 col-form-label">Image</label>
								<div class="col-sm-10">
									<input type="file" class="form-control" id="inputImage" @change="readImage">
									<img v-if="bannerRequest.image" v-bind:src="bannerRequest.image" class="banner-image mt-2"/>
									<small class="text-danger">{{validationData.image}}</small>
								</div>
							</div>
							<div class="form-group row">
								<label class="col-sm-2 col-form-label"> Current Image </label>
								<div class="col-sm-10">
									<img v-if="currentImage" :src="env.mediaUrl+currentImage" class="banner-image mt-2"/>
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
		name: 'bannerCreate',
		components: {
			Loading
		},
		data() {
			return {
				env,
				isLoading: false,
				fullPage: true,
				currentImage: "",
				filter: {
					page: "",
                    reverse: "",
                    sort: "",
                    title: "",
				},
				bannerRequest: {
					id: "",
					title: "",
					link: "",
					shortDescription: "",
					image: ""
				},
				validationData: {
					image: "",
				}
			}
		},
		watch: {
			async $route(to, from) {
				if (to.params.id) {
					this.bannerRequest.id = to.params.id
					await this.bannerDetail()
				}
			},
		},
		computed: {},
		methods: {
			...mapActions({
				bannerUpdateAction: 'bannerUpdateAction',
				bannerFieldsAction: 'bannerFieldsAction',
			}),
			readImage({ target }) {
				const files = target.files
				const fileReader = new FileReader()
				fileReader.readAsDataURL(files[0])
				fileReader.onload = e => {
					this.bannerRequest.image = e.target.result
				};
			},
			back() {
				this.$router.replace({ path: 'banner-list', query: { page: this.filter.page, reverse: this.filter.reverse, sort: this.filter.sort, title: this.filter.title} }).catch(()=>{})
			},
			async getFields(){
				let option = {
					fields: {id: this.bannerRequest.id}
				}
				await this.bannerFieldsAction({
					...option
				}).then(res => {
					this.bannerRequest.title = res.data.data.title
					this.bannerRequest.link = res.data.data.link
					this.bannerRequest.shortDescription = res.data.data.short_description
					this.currentImage = res.data.data.image
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
					id: this.bannerRequest.id,
					title: this.bannerRequest.title,
					link: this.bannerRequest.link,
					shortDescription: this.bannerRequest.shortDescription,
					image: this.bannerRequest.image,
				}
				await this.bannerUpdateAction({
					...option
				}).then(res => {
					this.back()
				}).catch(err => this.isLoading = true)
			},
			validationRule() {
				let isValidation = []
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
            this.filter.title = this.$route.query.title
			this.bannerRequest.id = this.$route.query.id
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