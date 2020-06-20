<template>
<div>
    <Loader v-if="loading"/>
    <div v-else class="app-main-layout">

        <Navbar @toggleSidebar="isSidebarOpen = !isSidebarOpen"/>

        <Sidebar :isOpen="isSidebarOpen"/>

        <main class="app-content" :class="{full: !isSidebarOpen}">
            <div class="app-page">
                <router-view />
            </div>
        </main>

        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="localizeFilter('Create_new_record')">
                <i class="large material-icons">add</i>
            </router-link>
        </div>

    </div>
</div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import localizeFilter from "@/filters/localizeFilter";

import messages from "@/util/messagesMap";

export default {
    data: () => ({
        isSidebarOpen: true,
        loading: true
    }),
    components: {
        Navbar,
        Sidebar
    },
    computed: {
        error() {
        return this.$store.getters.error;
        }
    },
    watch: {
        error(fbError) {
        this.$error(messages[fbError.code] || "Что-то пошло не так");
        }
    },
    async mounted() {
        if(!Object.keys(this.$store.getters.info).length) { // if info == {}
            try {
                await this.$store.dispatch("fetchInfo");
            } catch (e) {
                console.log(e);
            }
        }
        this.loading = false;
    },
    methods: {
        localizeFilter
    }

}
</script>