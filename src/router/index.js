import Vue from 'vue'
import Router from 'vue-router'
import d3 from "../components/d3.vue";

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'd3',
            component: d3
        }
    ]
})
