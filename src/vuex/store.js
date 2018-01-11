import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: '',
        role: ''
    },
    getters: {
        isLogin: state => {
            return state.name !== '' && state.role !== '';
        }
    },
    mutations: {
        setLogin(state, user) {
                state.name = user.name;
                state.role = user.role;
            },
            removeLogin(state) {
                state.name = '';
                state.role = '';
            }
    },
    actions: {
        checkLogin(context) {
            axios.post('../manage/checkLogin').then((res) => {
                if (res.data.state === 'success') {
                    context.state.name = res.data.data.name;
                    context.state.role = res.data.data.role;
                }
            });
        }
    }
});
