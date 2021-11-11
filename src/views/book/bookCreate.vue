<template lang="html">
	<div class="container-fluid p-5">
		<loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header">
						<h6>New Book <small>(Fields in red are required)</small></h6>
					</div>
					<div class="card-body">
						<form v-on:submit.prevent="onSubmit">
							<div class="form-group row">
								<label for="inputCategoryId" class="col-sm-2 col-form-label text-danger">Category</label>
								<div class="col-sm-10">
									<select id="inputCategoryId" class="form-control" v-model="bookRequest.categoryId" @change="validationRule()">
										<option value="">Select Category</option>
										<option v-for="category in categoryList" :value="category.id">{{category.name}}</option>
									</select>
									<small class="text-danger">{{validationData.categoryId}}</small>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputAuthorId" class="col-sm-2 col-form-label text-danger">Author</label>
								<div class="col-sm-10">
									<select id="inputAuthorId" class="form-control" v-model="bookRequest.authorId" @change="validationRule()">
										<option value="">Select Author</option>
										<option v-for="author in authorList" :value="author.id">{{author.name}}</option>
									</select>
									<small class="text-danger">{{validationData.authorId}}</small>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputTagId" class="col-sm-2 col-form-label text-danger">Tag</label>
								<div class="col-sm-10">
									<select id="inputTagId" class="form-control" v-model="bookRequest.tagId" @change="validationRule()">
										<option value="">Select Tag</option>
										<option v-for="tag in tagList" :value="tag.id">{{tag.name}}</option>
									</select>
									<small class="text-danger">{{validationData.tagId}}</small>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputName" class="col-sm-2 col-form-label text-danger">Name</label>
								<div class="col-sm-10">
									<input type="text" v-model="bookRequest.name" @blur="validationRule()"
										class="form-control" id="inputName">
									<small class="text-danger">{{validationData.shortDescription}}</small>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputShortDescription" class="col-sm-2 col-form-label text-danger">Short Description</label>
								<div class="col-sm-10">
									<textarea v-model="bookRequest.shortDescription" @blur="validationRule()"
										class="form-control" id="inputShortDescription"></textarea>
									<small class="text-danger">{{validationData.shortDescription}}</small>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputImage" class="col-sm-2 col-form-label text-danger">Image</label>
								<div class="col-sm-10">
									<input type="file" class="form-control" id="inputImage" @change="readImage">
									<img v-if="bookRequest.image" v-bind:src="bookRequest.image" class="banner-image mt-2"/>
									<small class="text-danger">{{validationData.image}}</small>
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
		name: 'bookCreate',
		components: {
			Loading
		},
		data() {
			return {
				env,
				isLoading: false,
				fullPage: true,
				categoryList: [],
				authorList: [],
				tagList: [],
				currentImage: "",
				bookRequest: {
					categoryId: "",
					authorId: "",
					tagId: "",
					name: "",
					shortDescription: "",
					image: ""
				},
				validationData: {
					categoryId: "",
					authorId: "",
					tagId: "",
					name: "",
					shortDescription: "",
					image: ""
				}
			}
		},
		watch: {
			async $route(to, from) {
				if (to.params.id) {
					this.bookRequest.id = to.params.id
					await this.bookDetail()
				}
			},
		},
		computed: {},
		methods: {
			...mapActions({
				bookStoreAction: 'bookStoreAction',
				bookFieldsAction: 'bookFieldsAction',
			}),
			readImage({ target }) {
				const files = target.files
				const fileReader = new FileReader()
				fileReader.readAsDataURL(files[0])
				fileReader.onload = e => {
					this.bookRequest.image = e.target.result
				};
			},
			async getFields(){
				let option = {
					fields: {id: this.bookRequest.id, type: "store"}
				}
				await this.bookFieldsAction({
					...option
				}).then(res => {
					this.categoryList = res.data.data.category
					this.authorList = res.data.data.author
					this.tagList = res.data.data.tag
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
					categoryId: this.bookRequest.categoryId,
					authorId: this.bookRequest.authorId,
					tagId: this.bookRequest.tagId,
					name: this.bookRequest.name,
					shortDescription: this.bookRequest.shortDescription,
					image: this.bookRequest.image
				}
				await this.bookStoreAction({
					...option
				}).then(res => {
					this.$router.replace({ path: 'book-list', query: { page: 1, reverse: 'desc', sort: 'created_at', name: ''} }).catch(()=>{})
					this.isLoading = false;
				}).catch(err => this.isLoading = true)
			},
			validationRule() {
				let isValidation = []
				if (this.bookRequest.categoryId == "") {
					this.validationData.categoryId = "The category field is required."
					isValidation.push(true)
				} else {
					this.validationData.categoryId = ""
					isValidation.push(false)
				}
				if (this.bookRequest.authorId == "") {
					this.validationData.authorId = "The author field is required."
					isValidation.push(true)
				} else {
					this.validationData.authorId = ""
					isValidation.push(false)
				}
				if (this.bookRequest.tagId == "") {
					this.validationData.tagId = "The tag field is required."
					isValidation.push(true)
				} else {
					this.validationData.tagId = ""
					isValidation.push(false)
				}
				if (this.bookRequest.name == "") {
					this.validationData.name = "The name field is required."
					isValidation.push(true)
				} else {
					this.validationData.name = ""
					isValidation.push(false)
				}
				if (this.bookRequest.shortDescription == "") {
					this.validationData.shortDescription = "The short description field is required."
					isValidation.push(true)
				} else {
					this.validationData.shortDescription = ""
					isValidation.push(false)
				}
				if (this.bookRequest.image == "") {
					this.validationData.image = "The image field is required."
					isValidation.push(true)
				} else {
					this.validationData.image = ""
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