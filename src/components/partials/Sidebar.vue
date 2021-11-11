<template lang="html">
    <nav id="sidebar" :class="['sidebar-wrapper', {'nav_open': this.open, 'nav_close': this.close},]">
        <div class="sidebar-content">
            <!-- sidebar-brand  -->
            <div class="sidebar-item sidebar-brand">
                <a href="#"><img class="img-responsive img-rounded" style="width: 80%;"
                        src="../../assets/sweetyhome-logo.png"></a>
            </div>
            <!-- sidebar-header  -->
            <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                <div class="user-pic">
                    <img class="img-responsive img-rounded" src="../../assets/img/user.jpg" alt="User picture">
                </div>
                <div class="user-info">
                    <span class="user-name">Jhon
                        <strong>Smith</strong>
                    </span>
                    <span class="user-role">Administrator</span>
                    <span class="user-status">
                        <i class="fa fa-circle"></i>
                        <span>Online</span>
                    </span>
                </div>
            </div>
            <div class=" sidebar-item sidebar-menu">
                <ul>
                    <li>
                        <router-link to="/dashboard">
                            <i class="fas fa-tachometer-alt"></i>
                            <span class="menu-text">Dashboard</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/distributor-list">
                            <i class="fas fa-user"></i>
                            <span class="menu-text">Distributor</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/item-category-list">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="menu-text">Item Category</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/item-list">
                            <i class="fas fa-tag"></i>
                            <span class="menu-text">Item</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/pricerule-list">
                            <i class="fas fa-hand-holding-usd"></i>
                            <span class="menu-text">Price Rules</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/promo-list">
                            <i class="fas fa-percentage"></i>
                            <span class="menu-text">Promo</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/location">
                            <i class="fas fa-location-arrow"></i>
                            <span class="menu-text">Location</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/sale-list">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="menu-text">Sales</span>
                        </router-link>
                    </li>
                    <!-- <li>
                        <a href="#">
                            <i class="fas fa-warehouse"></i>
                            <span class="menu-text">Warehouse</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-id-card"></i>
                            <span class="menu-text">Employees</span>
                        </a>
                    </li> -->
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
                <div class="dropdown-menu notifications" aria-labelledby="dropdownMenuMessage">
                    <div class="notifications-header">
                        <i class="fa fa-bell"></i>
                        Notifications
                    </div>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                        <div class="notification-content">
                            <div class="icon">
                                <i class="fas fa-check text-success border border-success"></i>
                            </div>
                            <div class="content">
                                <div class="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit. In totam explicabo</div>
                                <div class="notification-time">
                                    6 minutes ago
                                </div>
                            </div>
                        </div>
                    </a>
                    <a class="dropdown-item" href="#">
                        <div class="notification-content">
                            <div class="icon">
                                <i class="fas fa-exclamation text-info border border-info"></i>
                            </div>
                            <div class="content">
                                <div class="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit. In totam explicabo</div>
                                <div class="notification-time">
                                    Today
                                </div>
                            </div>
                        </div>
                    </a>
                    <a class="dropdown-item" href="#">
                        <div class="notification-content">
                            <div class="icon">
                                <i class="fas fa-exclamation-triangle text-warning border border-warning"></i>
                            </div>
                            <div class="content">
                                <div class="notification-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit. In totam explicabo</div>
                                <div class="notification-time">
                                    Yesterday
                                </div>
                            </div>
                        </div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item text-center" href="#">View all notifications</a>
                </div>
            </div>
            <div class="dropdown">
                <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-envelope"></i>
                    <span class="badge badge-pill badge-success notification">7</span>
                </a>
                <div class="dropdown-menu messages" aria-labelledby="dropdownMenuMessage">
                    <div class="messages-header">
                        <i class="fa fa-envelope"></i>
                        Messages
                    </div>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                        <div class="message-content">
                            <div class="pic">
                                <img src="img/user.jpg" alt="">
                            </div>
                            <div class="content">
                                <div class="message-title">
                                    <strong> Jhon doe</strong>
                                </div>
                                <div class="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit. In totam explicabo</div>
                            </div>
                        </div>

                    </a>
                    <a class="dropdown-item" href="#">
                        <div class="message-content">
                            <div class="pic">
                                <img src="img/user.jpg" alt="">
                            </div>
                            <div class="content">
                                <div class="message-title">
                                    <strong> Jhon doe</strong>
                                </div>
                                <div class="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit. In totam explicabo</div>
                            </div>
                        </div>

                    </a>
                    <a class="dropdown-item" href="#">
                        <div class="message-content">
                            <div class="pic">
                                <img src="img/user.jpg" alt="">
                            </div>
                            <div class="content">
                                <div class="message-title">
                                    <strong> Jhon doe</strong>
                                </div>
                                <div class="message-detail">Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit. In totam explicabo</div>
                            </div>
                        </div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item text-center" href="#">View all messages</a>

                </div>
            </div>
            <div class="dropdown">
                <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-cog"></i>
                    <span class="badge-sonar"></span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuMessage">
                    <a class="dropdown-item" href="#">My profile</a>
                    <a class="dropdown-item" href="#">Help</a>
                    <a class="dropdown-item" href="#">Setting</a>
                </div>
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
</template>

<script lang="js">
    export default {
        name: 'sidebar',
        data() {
            return {
                check: '',
                close: true,
                open: false
            }
        },
        methods: {
            toggleNav: function () {
                console.log()
            },
            logout() {
                window.localStorage.setItem('token', null)
                this.$router.replace('/login')
            }
        }
    }
</script>

<style scoped lang="scss">
    // .sidebar-wrapper .sidebar-footer {
    //     position: absolute;
    //     width: 100%;
    //     top: 0 !important;
    //     display: flex;
    // }
    // .sidebar-wrapper .sidebar-content {
    //     top: 35px !important;
    // }
</style>