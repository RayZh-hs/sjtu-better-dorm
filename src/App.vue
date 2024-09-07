<script setup>
import Door from './components/Door.vue';
import Light from './components/Light.vue';
import Settings from './components/Settings.vue';
import ScanCode from './components/ScanCode.vue';

import { useSettingsStore } from './stores/settings';
const store = useSettingsStore();
</script>

<script>
export default {
    data() {
        return {
            tab: 'door',
            showQR: false,
        }
    },
    methods: {
        saveQrCode(qr, store) {
            console.log(qr);
            store.replaceQrText(qr);
        },
    }
}
</script>

<template>
    <v-app class="rel app">
        <v-overlay v-model="showQR" disabled persistent>
            <div class="qr-scanner-box">
                <scan-code @found="(arg) => saveQrCode(arg, store)" @close="showQR=false"/>
            </div>
        </v-overlay>

        <div class="main-app">
            <v-tabs v-model="tab" color="primary" grow>
                <v-tab value="door" :class="{ 'sel-sink': tab != 'door', 'sel-select': tab == 'door' }">
                    <v-icon icon="mdi-door"></v-icon>
                    <p class="icon-tip" v-if="tab == 'door'">door</p>
                </v-tab>
                <v-tab value="light" :class="{ 'sel-sink': tab != 'light', 'sel-select': tab == 'light' }">
                    <v-icon icon="mdi-ceiling-light"></v-icon>
                    <p class="icon-tip" v-if="tab == 'light'">light</p>
                </v-tab>
                <v-tab value="settings" :class="{ 'sel-sink': tab != 'settings', 'sel-select': tab == 'settings' }">
                    <v-icon icon="mdi-cog"></v-icon>
                    <p class="icon-tip" v-if="tab == 'settings'">settings</p>
                </v-tab>
            </v-tabs>
            <v-tabs-window v-model="tab" class="tabs-win">
                <v-tabs-window-item key="door" value="door">
                    <door />
                </v-tabs-window-item>
                <v-tabs-window-item key="light" value="light">
                    <light />
                </v-tabs-window-item>
                <v-tabs-window-item key="settings" value="settings">
                    <settings @scan="showQR=true" />
                </v-tabs-window-item>
            </v-tabs-window>
        </div>
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

.qr-scanner-box {
    position: fixed;
    top: 5vh;
    left: 5vw;
    width: 90vw;
    height: 90vh;
    /* outline: 2px solid red; */
}

.tabs-win {
    position: absolute;
    top: 48px;
    width: 100%;
    height: calc(100% - 48px);
}

.v-tab {
    min-width: 60px !important;
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