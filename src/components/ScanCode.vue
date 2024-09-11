<template>
    <div id="camera-box">
    </div>
    <div id="buttons-box">
        <v-btn variant="tonal" icon="mdi-close"               @click="$emit('close')"></v-btn>
        <v-btn variant="tonal" icon="mdi-folder-file-outline" @click="clickFile">     </v-btn>
    </div>
    <v-file-input @change="onFileChange" accept="image/*" label="Upload QR code" class="air"/>
</template>

<script setup>
import { computed } from 'vue';
import { useSettingsStore } from '../stores/settings';
const store = useSettingsStore();
</script>

<script>
import { Html5Qrcode } from 'html5-qrcode';
export default {
    name: 'ScanCode',
    methods: {
        clickFile() {
            let fileInput = document.querySelector('input[type="file"]');
            fileInput.click();
        },
        onFileChange() {
            let file = document.querySelector('input[type="file"]').files[0];
            console.log(file);
            const html5QrCode = new Html5Qrcode('camera-box');
            html5QrCode.scanFile(file, true)
                .then(qrCodeMessage => {
                    console.log(`QR code detected: ${qrCodeMessage}`);
                    // html5QrCode.stop();
                    this.$emit('found', qrCodeMessage);
                    this.$emit('close');
                    html5QrCode.stop();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted() {
        const html5QrCode = new Html5Qrcode('camera-box');
        const onScanSuccess = (qrCodeMessage) => {
            console.log(`QR code detected: ${qrCodeMessage}`);
            // html5QrCode.stop();
            this.$emit('found', qrCodeMessage);
            this.$emit('close');
        }
        const screenWidth = window.screen.width;
        console.log(screenWidth);
        const qrboxWidth = screenWidth * 0.6;
        const config = { fps: 10, qrbox: {width:qrboxWidth, height:qrboxWidth} };
        html5QrCode.start({ facingMode: 'environment' }, config, onScanSuccess);
    },
    emits: ['found', 'close'],
}
</script>

<style scoped>
#camera-box {
    position: absolute;
    width: 100%;
    height: 100%;
    /* background-color: rgba(252, 145, 45, 0.342); */
}
#buttons-box {
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: 5vw;
    padding-right: 5vw;
    width: 100%;
    height: 20%;
    bottom: 0;
    /* background-color: rgba(255, 170, 90, 0.685); */
}

.air {
    opacity: 0;
    pointer-events: none;
}
</style>