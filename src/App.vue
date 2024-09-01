<script setup>
import Door from './components/Door.vue';
import Settings from './components/Settings.vue';
</script>

<script>
export default {
    data() {
        return {
            tab: 'door'
        }
    }
}
</script>

<template>
    <v-app class="rel app">
        <v-tabs v-model="tab" color="primary" grow>
            <v-tab value="door" :class="{ 'sel-sink': tab != 'door', 'sel-select': tab == 'door' }">
                <v-icon icon="mdi-door"></v-icon>
                <p class="icon-tip" v-if="tab=='door'">door</p>
            </v-tab>
            <v-tab value="settings" :class="{ 'sel-sink': tab != 'settings', 'sel-select': tab == 'settings'}">
                <v-icon icon="mdi-cog"></v-icon>
                <p class="icon-tip" v-if="tab=='settings'">settings</p>
            </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab" class="tabs-win">
            <v-tabs-window-item key="door" value="door">
                <door />
            </v-tabs-window-item>
            <v-tabs-window-item key="settings" value="settings">
                <settings />
            </v-tabs-window-item>
        </v-tabs-window>
    </v-app>
</template>

<style scoped>
.app {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #dbdbdb !important;
}

.tabs-win {
    position: absolute;
    top: 48px;
    width: 100%;
    height: calc(100% - 48px);
}

.icon-tip {
    margin-left: 10px;
    font-size: small;
    font-weight: bold;
}

.sel-sink {
    border-radius: 0px;
    background: #dbdbdb;
    box-shadow: inset 5px 5px 10px #bababa,
        inset -5px -5px 10px #fcfcfc;

    color: rgb(64, 64, 64) !important;
}
.sel-select {
    color: rgb(64, 64, 64) !important;
}
</style>

<style>
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>