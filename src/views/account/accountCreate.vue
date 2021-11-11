<template lang="html">
	<div class="container-fluid p-5">
		<loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header">
						<h6>New Account <small>(Fields in red are required)</small></h6>
					</div>
					<div class="card-body">
						<form v-on:submit.prevent="onSubmit">
							<div class="form-group row">
								<label for="inputRoleId" class="col-sm-2 col-form-label text-danger">Role</label>
								<div class="col-sm-10">
									<select id="inputRoleId" class="form-control" v-model="accountRequest.roleId" @change="validationRule()">
										<option value="">Select Role</option>
										<option v-for="role in roleList" :value="role.id">{{role.name}}</option>
									</select>
									<small class="text-danger">{{validationData.roleId}}</small>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputName" class="col-sm-2 col-form-label text-danger">Name</label>
								<div class="col-sm-10">
									<input type="text" v-model="accountRequest.name" @blur="validationRule()"
										class="form-control" id="inputName">
									<small class="text-danger">{{validationData.name}}</small>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputEmail" class="col-sm-2 col-form-label text-danger">Email</label>
								<div class="col-sm-10">
									<input type="email" v-model="accountRequest.email" @blur="validationRule()"
										class="form-control" id="inputEmail">
									<small class="text-danger">{{validationData.email}}</small>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputPassword" class="col-sm-2 col-form-label text-danger">Password</label>
								<div class="col-sm-10">
									<input type="password" v-model="accountRequest.password" @blur="validationRule()"
										class="form-control" id="inputPassword">
									<small class="text-danger">{{validationData.password}}</small>
								</div>
							</div>
							<div class="form-group row">
								<label for="inputConfirmPassword" class="col-sm-2 col-form-label text-danger">Re-Password</label>
								<div class="col-sm-10">
									<input type="password" v-model="accountRequest.confirm" @blur="validationRule()"
										class="form-control" id="inputConfirmPassword">
									<small class="text-danger">{{validationData.confirm}}</small>
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
		name: 'accountCreate',
		components: {
			Loading
		},
		data() {
			return {
				env,
				isLoading: false,
				fullPage: true,
				departmentList : [],
				roleList : [],
				accountRequest: {
					roleId: "",
					name: "",
					email: "",
					password: ""
				},
				validationData: {
					roleId: "",
					name: "",
					email: "",
					password: ""
				}
			}
		},
		watch: {
			async $route(to, from) {
				if (to.params.id) {
					this.accountRequest.id = to.params.id
					await this.accountDetail()
				}
			},
		},
		computed: {},
		methods: {
			...mapActions({
				accountFieldsAction: 'accountFieldsAction',
				accountStoreAction: 'accountStoreAction',
			}),
			async getFields(){
				let option = {
					fields: {id: this.accountRequest.id, type: "store"}
				}
				await this.accountFieldsAction({
					...option
				}).then(res => {
					this.roleList = res.data.data.role
				}).catch(err => this.isLoading = true)
			},
			async onSubmit() {
				this.isLoading = true
				let validation = this.validationRule()
				if (validation == true) {
					this.isLoading = false
					return
				}
				let option = this.accountRequest
				await this.accountStoreAction({
					...option
				}).then(res => {
					this.$router.replace({ path: 'account-list', query: { page: 1, reverse: 'desc', sort: 'created_at', name: ''} }).catch(()=>{})
					this.isLoading = false;
				}).catch(err => this.isLoading = true)
			},
			validationRule() {
				let isValidation = []
				if (this.accountRequest.roleId == "") {
					this.validationData.roleId = "The role field is required."
					isValidation.push(true)
				} else {
					this.validationData.roleId = ""
					isValidation.push(false)
				}
				if (this.accountRequest.name == "") {
					this.validationData.name = "The name field is required."
					isValidation.push(true)
				} else {
					this.validationData.email = ""
					isValidation.push(false)
				}
				if (this.accountRequest.email == "") {
					this.validationData.email = "The email field is required."
					isValidation.push(true)
				} else {
					this.validationData.email = ""
					isValidation.push(false)
				}
				if(this.accountRequest.password == ""){
					this.validationData.password = "The password field is required."
					isValidation.push(true)
				}else{
					this.validationData.password = ""
					isValidation.push(false)
				}
				if(this.accountRequest.confirm == ""){
					this.validationData.confirm = "The re-passwored field is required."
					isValidation.push(true)
				}else{
					this.validationData.confirm = ""
					isValidation.push(false)
				}
				if(this.accountRequest.password != this.accountRequest.confirm){
					this.validationData.confirm = "The password field does not match."
					isValidation.push(true)
				}else{
					this.validationData.confirm = ""
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