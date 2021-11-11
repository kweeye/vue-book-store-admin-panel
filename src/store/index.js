import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import env from '../enviorments'
import header from '../header'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        token: null,
        user: null,
    },
    getters: {

    },
    mutations: {
        mutateUser(state, user) {
            state.user = user
        },
        mutateToken(state, token) {
            state.token = token
        },
    },
    actions: {
        //Auth
        async userLogin({commit}, user) {
            const result = (await axios.post(env.apiUrl + 'admin-login', {...user})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            window.localStorage.setItem('token', JSON.stringify(result.data.token))
            result.data.password = null,
            window.localStorage.setItem('user', JSON.stringify(result.data))
            commit('mutateToken', result.token)
            commit('mutateUser', result.data)
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        //Dashboard
        async dashboardAction({commit}) {
            const result = (await axios.get(env.apiUrl + 'dashboard', {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        //Account
        async accountListAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'account-list', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result, "message": "Success", "error": []}
        },
        async accountFieldsAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'account-fields', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result, "message": "Success", "error": []}
        },
        async accountStoreAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'account-store', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        async accountUpdateAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'account-update', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        async accountDeleteAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'account-delete', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        //Banner
        async bannerListAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'banner-list', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result, "message": "Success", "error": []}
        },
        async bannerFieldsAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'banner-fields', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result, "message": "Success", "error": []}
        },
        async bannerStoreAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'banner-store', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        async bannerUpdateAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'banner-update', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        async bannerDeleteAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'banner-delete', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        //Category
        async categoryListAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'category-list', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result, "message": "Success", "error": []}
        },
        async categoryFieldsAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'category-fields', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result, "message": "Success", "error": []}
        },
        async categoryStoreAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'category-store', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        async categoryUpdateAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'category-update', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        async categoryDeleteAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'category-delete', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        //Author
        async authorListAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'author-list', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result, "message": "Success", "error": []}
        },
        async authorFieldsAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'author-fields', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result, "message": "Success", "error": []}
        },
        async authorStoreAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'author-store', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        async authorUpdateAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'author-update', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        async authorDeleteAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'author-delete', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        //Tag
        async tagListAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'tag-list', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result, "message": "Success", "error": []}
        },
        async tagFieldsAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'tag-fields', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result, "message": "Success", "error": []}
        },
        async tagStoreAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'tag-store', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        async tagUpdateAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'tag-update', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        async tagDeleteAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'tag-delete', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        //Book
         async bookListAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'book-list', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result, "message": "Success", "error": []}
        },
        async bookFieldsAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'book-fields', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result, "message": "Success", "error": []}
        },
        async bookStoreAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'book-store', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        async bookUpdateAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'book-update', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },
        async bookDeleteAction({commit}, option) {
            const result = (await axios.post(env.apiUrl + 'book-delete', {...option}, {headers: header.getToken()})).data
            if (result.status == 'fail') return {"status": "fail", "data": [], "message": result.message, "error": []}
            return {"status": "success", "data": result.data, "message": "Success", "error": []}
        },

    },
    modules: {
    }
})
