<template>
    <ul class="sidenav app-sidenav" :class="{'open' : isOpen}">
        <router-link
            v-for="link of links"
            :key="link.url"
            active-class="active"
            :to="link.url"
            tag="li"
            :exact="link.exact"
        >
            <a href="#" class="waves-effect waves-orange pointer">{{link.title | localize}}</a>
        </router-link>
    </ul> 
</template>

<script>
export default {
    props: ['isOpen'],
    data: () => ({
        links: [
            {
                title:"Bill_",
                url: "/",
                exact: true
            },
            {
                title:"History_",
                url: "/history"
            },
            {
                title: "Planning_",
                url: "/planning"
            },
            {
                title: "NewRecord_",
                url: "/record"
            },
            {
                title: "Categories_",
                url: "/categories"
            }
        ]
    })
    
}
</script>