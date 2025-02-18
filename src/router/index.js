import { createRouter,createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Singup from "../pages/Singup.vue";
import Dashboard from "../pages/Dashboard.vue";
import Profile from "../pages/Profile.vue";
// import { routes } from "vue-router/auto-routes";

const routes=[
    {
        path:"/",
        name:"SignUp",
        component:Singup,
        meta:{requiresAuth:false}
    },
    {
        path:"/login",
        name:"Login",
        component:Login,
        meta:{requiresAuth:false}
    },
    {
        path:"/dashboard",
        name:"Dashboard",
        component:Dashboard,
        meta:{requiresAuth:true}
    },
    {
        path:"/profile",
        name:"Profile",
        component:Profile,
        meta:{requiresAuth:false}
    }
]

const router= createRouter({
    history:createWebHistory(),
    routes,
});

router.beforeEach((to,from,next)=>{
    const isAuthenticated = localStorage.getItem("user");
    if(to.meta.requiresAuth && !isAuthenticated){
        next("/")
    }else{
        next();
    }
})

export default router;