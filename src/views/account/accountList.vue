<template lang="html">
    <div class="container-fluid p-5">
        <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        Account
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th v-for="(value, key) in columns"
                                                    v-bind:class="{ 'asc': filter.sort == key && filter.reverse == 'desc', 'desc': filter.sort == key && filter.reverse == 'asc' }">
                                                    <a href="#" @click="sortBy(key)" class="text-capitalize">
                                                        {{value}}
                                                    </a>
                                                </th>
                                                <th class="th-width-200">Role</th>
                                                <th class="th-width-100"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(data,index) in dataList">
                                                <td>{{data.name}}</td>
                                                <td>{{data.email}}</td>
                                                <td>{{data.role}}</td>
                                                <td>
                                                    <button class="btn btn-option text-primary"
                                                        @click="editData(data)"><i class="fas fa-edit"></i></button>
                                                    <!-- <button v-b-modal.bv-modal-delete
                                                        class="btn btn-option text-danger"><i
                                                            class="fas fa-trash-alt" @click="deleteData(data)"></i></button> -->
                                                </td>
                                            </tr>
                                            <tr v-if="dataList.length <= 0 ">
                                                <td colspan="4" class="text-center">Empty List</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <nav v-if="dataList.length > 0 " class="table_info">
                                        Showing {{metaData.from}} to {{metaData.to}} of {{metaData.total}} entries
                                    </nav>
                                    <nav class="paging_simple_numbers">
                                        <ul class="pagination pagination-md">
                                            <li class="page-account"
                                                :class="{ 'disabled': metaData.prev_page_url === null }">
                                                <a href="#" class="page-link" @click="next(metaData.current_page-1)">
                                                    &laquo;
                                                </a>
                                            </li>
                                            <li class="page-account" v-for="page in metaData.last_page" :key="page"
                                                :class="{ 'active':metaData.current_page === page }"
                                                v-if="Math.abs(page - metaData.current_page) < 3 || page == metaData.total - 1 || page == 0">
                                                <a href="#" @click.prevent="next(page)" class="page-link">
                                                    {{ page }}
                                                </a>
                                            </li>
                                            <li class="page-account"
                                                :class="{ 'disabled': metaData.current_page === metaData.last_page }">
                                                <a href="#" class="page-link" @click="next(metaData.current_page+1)">
                                                    &raquo;
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="bv-modal-delete" ref="my-modal" title="Delete" hide-footer>
            <p class="my-4">Are you sure to delete ? </p>
            <b-button class="mt-3 btn-danger" block @click="deleteAccount()">Delete</b-button>
        </b-modal>
        <b-modal id="bv-modal-search" ref="my-modal" hide-footer>
            <template v-slot:modal-title>
                Filter
            </template>
            <div class="d-block text-center">
                <input class="form-control" placeholder="Account Name" v-model="filter.name">
            </div>
            <b-button class="mt-3 btn-success" block @click="search()">Search</b-button>
        </b-modal>
        <router-link class="float-filter" to="" v-b-modal.bv-modal-search>
            <i class="fa fa-filter my-float" style="padding: 37%;bottom: 50px;"></i>
        </router-link>
        <router-link class="float" to="account-create">
            <i class="fa fa-plus my-float" style="padding: 37%;"></i>
        </router-link>
    </div>
</template>

<script lang="js">
    import {
        mapState,
        mapActions
    } from 'vuex'
    import Loading from 'vue-loading-overlay'
    import 'vue-loading-overlay/dist/vue-loading.css';
    export default {
        name: 'accountList',
        components: {
            Loading
        },
        data() {
            return {
                isLoading: false,
                fullPage: true,
                alert: "",
                id: '',
                dataList: [],
                columns: {
                    name: "Name",
                    email: "Email"
                },
                filter: {
                    page: 1,
                    reverse: "asc",
                    sort: "created_at",
                    name: null,
                },
                metaData: {
                    last_page: null,
                    current_page: 1,
                    from: null,
                    to: null,
                    total: null,
                    prev_page_url: null
                }
            }
        },
        watch: {
        '$route' (to, from) {
            this.fetchData()
        }
    },
        computed: {},
        methods: {
            ...mapActions({
                accountListAction: 'accountListAction',
                accountDeleteAction: 'accountDeleteAction',
            }),
            sortBy(column) {
                this.filter.sort = column
                if (this.filter.sort == column) {
                    if (this.filter.reverse == "asc") {
                        this.filter.reverse = "desc"
                    } else if (this.filter.reverse == "desc") {
                        this.filter.reverse = "asc"
                    }
                } else {
                    this.filter.reverse = "asc"
                }
                this.fetchData()
            },
            async search() {
                this.filter.page = 1
                this.fetchData()
                this.$refs['my-modal'].hide()
            },
            async fetchData() {
                this.isLoading = true
                let option = {
                    name: this.filter.name,
                    sort: this.filter.sort,
                    reverse: this.filter.reverse,
                    page: this.filter.page,
                }
                await this.accountListAction({
                    ...option
                }).then(res => {
                    if (res.status == "success") {
                        this.dataList = res.data.data
                        this.metaData.last_page = res.data.meta.last_page
                        this.metaData.current_page = res.data.meta.current_page
                        this.metaData.prev_page_url = res.data.links.prev
                        this.metaData.from = res.data.meta.from
                        this.metaData.to = res.data.meta.to
                        this.metaData.total = res.data.meta.total
                        this.$router.replace({ path: 'account-list', query: { page: this.filter.page, reverse: this.filter.reverse, sort: this.filter.sort, name: this.filter.name} }).catch(()=>{})
                        this.isLoading = false;
                    }
                }).catch(err => this.isLoading = true)
            },
            next: function (page) {
                this.filter.page = page
                this.fetchData();
            },
            editData(data) {
                this.$router.replace({ path: 'account-edit', query: { page: this.filter.page, reverse: this.filter.reverse, sort: this.filter.sort, name: this.filter.name, id: data.id } }).catch(()=>{})
            },
            deleteData(data){
                this.id = data.id
            },
            async deleteAccount() {
				this.isLoading = true
				let option = {
					id: this.id,
				}
				await this.accountDeleteAction({
					...option
				}).then(res => {
					this.fetchData()
                    this.$refs['my-modal'].hide()
                    this.isLoading = false;
				}).catch(err => this.isLoading = true)
			},

        },
        mounted() {
            this.filter.page = this.$route.query.page
            this.filter.reverse = this.$route.query.reverse
            this.filter.sort = this.$route.query.sort
            this.filter.name = this.$route.query.name
            this.fetchData()
        }
    }
</script>

<style scoped lang="scss">
    .action {
        border: none;
        background: none;
        font-size: 24px;
    }
</style>