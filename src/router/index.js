import Vue from 'vue'
import Router from 'vue-router'
import d3 from "../components/d3.vue";
import rect from "../components/rect.vue";
import bootstrap from "../components/bootstrap.vue"

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'd3',
            component: d3
        },
        {
            path: '/d3',
            name: 'd3',
            component: d3
        },
        {
            path: '/rect',
            name: 'rect',
            component: rect
        },
        {
            path: '/bootstrap',
            name: 'bootstrap',
            component: bootstrap
        }
    ]
})