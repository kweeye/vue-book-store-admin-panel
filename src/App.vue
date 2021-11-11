<template>
    <div id="app">
        <transition>
            <div class="welcome" v-if="welcoming"></div>
        </transition>
        <router-view />
    </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    name: 'app',
    data() {
        return {
            welcoming: true,
        }
    },
    watch: {
        '$route' (to, from) {
            this.checkToken()
        }
    },
    methods: {
        ...mapMutations([
            'mutateToken',
            'mutateUser',
        ]),
        checkToken() {
            const token = window.localStorage.getItem('token')
            const user = window.localStorage.getItem('user')
            const data = JSON.parse(token)
            const userData = JSON.parse(user)
            const path = this.$route.path
            if (data) {
                this.mutateToken(data)
                this.mutateUser(userData)
            } else {
                if (this.$route.path !== '/') this.$router.replace('/login').catch(()=>{})
            }
        }
    },
    async mounted() {
        const timeout = setTimeout(() => {
            this.welcoming = false
            clearTimeout(timeout)
        }, 800)
        this.checkToken()
    }
}
</script>

<style lang="scss">
	@import "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css";
	@import "https://use.fontawesome.com/releases/v5.8.2/css/all.css";
</style>
