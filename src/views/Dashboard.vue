<template lang="html">
    <div class="container-fluid p-5">
       <div class="row">
            <div class="col-md-3">
                <div class="card" style="width: 100%;">
                     <div class="card-header">Category</div>
                    <div class="card-body">
                        <p class="card-text">{{dashboard.category}}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card" style="width: 100%;">
                     <div class="card-header">Autor</div>
                    <div class="card-body">
                        <p class="card-text">{{dashboard.author}}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card" style="width: 100%;">
                     <div class="card-header">Tag</div>
                    <div class="card-body">
                        <p class="card-text">{{dashboard.tag}}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card" style="width: 100%;">
                     <div class="card-header">Book</div>
                    <div class="card-body">
                        <p class="card-text">{{dashboard.book}}</p>
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
    import Loading from 'vue-loading-overlay'
    import 'vue-loading-overlay/dist/vue-loading.css';
    import Printd from 'printd'
    import PureVueChart from 'pure-vue-chart'
    export default {
        name: 'dashboard',
        components: {
            Loading,
            PureVueChart,
        },
        data() {
            return {
                isLoading: false,
                fullPage: true,
                dashboard: [],
            }
        },
        computed: {
            ...mapState({})
        },
        methods: {
            ...mapActions({
                dashboardAction: 'dashboardAction',
            }),
            async dashboardDetail() {
                this.isLoading = true;
                await this.dashboardAction().then(res => {
                    if (res.status == "success") {
                        this.dashboard = res.data
                        this.isLoading = false
                    }
                }).catch(err => this.isLoading = true)
            },
            print() {
                const d = new Printd()
                d.print( document.getElementById('myelement') )
            }
        },
        async mounted() {
            this.isLoading = true
            this.dashboardDetail()
        }
    }
</script>


<style scoped lang="scss">
</style>