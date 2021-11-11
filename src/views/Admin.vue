<template>
    <div id="app">
        <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
            <nav id="sidebar" :class="['sidebar-wrapper', {'nav_open': this.open, 'nav_close': this.close},]">
                <div class="sidebar-content">
                    <!-- sidebar-header  -->
                    <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                        <div class="user-pic" >
                            <!-- <img class="img-responsive img-rounded" style="width: 80%;"
                                src="../assets/logo.png"> -->
                            <img class="img-responsive img-rounded" style="background: #ffffff;" src="../assets/logo.jpg" alt="User picture">
                        </div>
                        <div class="user-info">
                            <span class="user-name">{{name}}</span>
                            <span class="user-role">{{role}}</span>
                        </div>
                    </div>
                    <div class=" sidebar-item sidebar-menu">
                        <ul>
                            <li style="margin-top: 12px;">
                                <router-link :class="[{active: url === 'dashboard'}]" to="/dashboard" >
                                    <i class="fas fa-tachometer-alt"></i>
                                    <span class="menu-text">Dashboard</span>
                                </router-link>
                            </li>
                            <li v-if="this.$role == 'admin'">
                                <router-link :class="[{active: url === 'account-list' || url === 'account-create' ||  url === 'account-edit'}]" :to="{ path: 'account-list', query: { page: 1, reverse: 'desc', sort: 'created_at', name: ''}}">
                                    <i class="fas fa-user"></i>
                                    <span class="menu-text">Account</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link  :class="[{active: url === 'banner-list' ||  url === 'banner-create' ||  url === 'banner-edit'}]" v-if="this.$role == 'admin'" :to="{ path: 'banner-list', query: { page: 1, reverse: 'desc', sort: 'created_at', title: ''}}">
                                    <i class="fas fa-sliders-h"></i>
                                    <span class="menu-text">Banner</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link  :class="[{active: url === 'category-list' ||  url === 'category-create' ||  url === 'category-edit'}]" v-if="this.$role == 'admin'" :to="{ path: 'category-list', query: { page: 1, reverse: 'desc', sort: 'created_at', name: ''}}">
                                    <i class="fas fa-file-alt"></i>
                                    <span class="menu-text">Category</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link  :class="[{active: url === 'author-list' ||  url === 'author-create' ||  url === 'author-edit'}]" v-if="this.$role == 'admin'" :to="{ path: 'author-list', query: { page: 1, reverse: 'desc', sort: 'created_at', name: ''}}">
                                    <i class="fas fa-user-alt"></i>
                                    <span class="menu-text">Author</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link  :class="[{active: url === 'tag-list' ||  url === 'tag-create' ||  url === 'tag-edit'}]" v-if="this.$role == 'admin'" :to="{ path: 'tag-list', query: { page: 1, reverse: 'desc', sort: 'created_at', name: ''}}">
                                    <i class="fas fa-tags"></i>
                                    <span class="menu-text">Tag</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link  :class="[{active: url === 'book-list' ||  url === 'book-create' ||  url === 'book-edit'}]" v-if="this.$role == 'admin'" :to="{ path: 'book-list', query: { page: 1, reverse: 'desc', sort: 'created_at', name: ''}}">
                                    <i class="fas fa-book-open"></i>
                                    <span class="menu-text">Book</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <!-- sidebar-menu  -->
                </div>
                <!-- sidebar-footer  -->
                <div class="sidebar-footer">
                    <div class="dropdown">

                        <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-bell"></i>
                            <span class="badge badge-pill badge-warning notification">3</span>
                        </a>
                    </div>
                    <div class="dropdown">
                        <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-user"></i>
                        </a>
                    </div>
                    <div>
                        <a href="#" @click="logout()">
                            <i class="fa fa-power-off"></i>
                        </a>
                    </div>
                    <div class="pinned-footer">
                        <a href="#">
                            <i class="fas fa-ellipsis-h"></i>
                        </a>
                    </div>
                </div>
            </nav>
            <div class="layer" @click="closeNav()" :class="{'layer_open': this.open}"></div>
            <!-- page-content  -->
            <main class="page-content pt-2">
                <label class="icon admin-menu" @click="openNav()" for="check-menu" style="margin-left: 2%;">
                    &#9776;
                </label>
                <router-view />
            </main>
        </div>

    </div>
</template>
<script>
    import moment from 'moment';
    export default {
        name: 'admin',
        data() {
            return {
                check: true,
                close: true,
                open: false,
                name: '',
                role: '',
                url: '',
                role: '',
                month: ''
            }
        },
        methods: {
            openNav: function () {
                this.open = !this.open
                console.log(this.open)
                if (this.check == true) {
                    this.close = false
                    this.open = true
                }
            },
            closeNav: function () {
                this.open = !this.open
                if (this.open == false) {
                    this.close = true
                    this.open = false
                }
            },
            logout() {
                window.localStorage.setItem('token', null)
                this.$router.replace('/login').catch(()=>{})
            }
        },
        watch: {
            '$route'(to, from) {
                this.url = to.name
            },
        },
        mounted() {
            let user = JSON.parse(window.localStorage.getItem('user'))
            this.name = user.name
            this.role = user.role
            this.month = moment(new Date()).format('YYYY-MM')
            this.url = this.$route.name
        }
    }
</script>
<style lang="scss">
    @import "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css";
    @import "https://use.fontawesome.com/releases/v5.8.2/css/all.css";
    @import "../assets/css/main.css";
    @import "../assets/css/sidebar-themes.css";

    ::-webkit-scrollbar {
        width: 6px;
        background-color: #525965;
    }

    .float {
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 50px;
        right: 2%;
        background-color: #0C9;
        color: #FFF;
        border-radius: 50px;
        text-align: center;
        box-shadow: 2px 2px 3px #999;
    }

    .float-loss {
        position: fixed;
        bottom: 50px;
        right: 8%;
        background-color: #007bffC9;
        color: #FFF;
        text-align: center;
        box-shadow: 2px 2px 3px #999;
    }

    .float-excel {
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 117px;
        right: 2%;
        background-color: #007bff;
        color: #FFF;
        border-radius: 50px;
        text-align: center;
        box-shadow: 2px 2px 3px #999;
    }

    .float-save {
        position: fixed;
        bottom: 50px;
        right: 2%;
        background-color: #007bffC9;
        color: #FFF;
        text-align: center;
        box-shadow: 2px 2px 3px #999;
    }

    .float-filter {
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 120px;
        right: 2%;
        background-color: #318be3;
        color: #FFF;
        border-radius: 50px;
        text-align: center;
        box-shadow: 2px 2px 3px #999;
    }

    .btn-option {
        border: none;
        background: none;
        font-size: 24px;
    }

    .btn:focus,
    .btn:active:focus,
    .btn.active:focus {
        box-shadow: none !important;
    }

    .modal-backdrop {
        opacity: 0.5 !important;
    }

    /* Add a black background color to the top navigation */
    .topnav {
        background-color: #333;
        overflow: hidden;
    }

    /* Style the links inside the navigation bar */
    .topnav a {
        float: left;
        display: block;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
    }

    /* Change the color of links on hover */
    .topnav a:hover {
        background-color: #ddd;
        color: black;
    }

    /* Add an active class to highlight the current page */
    .topnav a.active {
        background-color: #4CAF50;
        color: white;
    }

    /* Hide the link that should open and close the topnav on small screens */
    .topnav .icon {
        display: none;
    }

    // Table
    .desc {
        background-repeat: no-repeat;
        background-position: right;
        /* width: 1em; height: 1em; */
        /* border-top: 0px; border-bottom: 0px; border-left: 0px; border-right: 0px; */
        opacity: 1;
        /* padding: 3%; */
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBdqEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVoAADeemwtPcZI2wAAAABJRU5ErkJggg==');
    }

    .asc {
        background-repeat: no-repeat;
        background-position: right;
        /* width: 1em; height: 1em; */
        /* border-top: 0px; border-bottom: 0px; border-left: 0px; border-right: 0px; */
        opacity: 1;
        /* padding: 3%; */
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWjYBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJzcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII= ');
    }

    .table_info {
        float: left;
    }

    .paging_simple_numbers {
        float: right;
    }

    th {
        text-align: center;
    }

    td {
        text-align: center;
        white-space: nowrap;
    }

    .th-width-50 {
        width: 50px;
    }

    .th-width-100 {
        width: 100px;
    }

    .th-width-200 {
        width: 200px;
    }

    .th-width-300 {
        width: 300px;
    }
    // Date Format Css
    input[type="date"]::-webkit-datetime-edit, input[type="date"]::-webkit-inner-spin-button, input[type="date"]::-webkit-clear-button {
        color: #fff;
        position: relative;
    }

    input[type="date"]::-webkit-datetime-edit-year-field{
    position: absolute !important;
    border-left:1px solid #8c8c8c;
    padding: 2px;
    color:#000;
    left: 56px;
    }

    input[type="date"]::-webkit-datetime-edit-month-field{
    position: absolute !important;
    border-left:1px solid #8c8c8c;
    padding: 2px;
    color:#000;
    left: 26px;
    }


    input[type="date"]::-webkit-datetime-edit-day-field{
    position: absolute !important;
    color:#000;
    padding: 2px;
    left: 4px;
    }
    // 
    .active {
        color: #20c997 !important;
    }
</style>