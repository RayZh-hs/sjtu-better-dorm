<template>
    <div class="outbounding">
        <v-form id="form-container">
            <v-textarea rows="2" variant="outlined" label="QR Code" id="qr-text-area" :disabled="locked"
                v-model="store.temp_qrText"></v-textarea>
            <div class="cam-hyperlink">
                <v-icon icon="mdi-camera" id="use-camera-btn" />
                <p id="camera-hint">press to scan the qr code</p>
            </div>
            <v-text-field density="compact" label="J-Username" variant="outlined" prepend-icon="mdi-account"
                :disabled="locked" v-model="store.temp_username"></v-text-field>
            <v-text-field density="compact" label="J-Password" variant="outlined" prepend-icon="mdi-key" type="password"
                :disabled="locked" v-model="store.temp_password"></v-text-field>
            <div class="d-flex mt-5">
                <v-btn variant="elevated" color="#e6e6e6" size="40" class="nm-btn sq-icon-btn" icon="mdi-note-edit"
                    @click="edit(store)"></v-btn>
                <v-btn variant="elevated" color="#e6e6e6" size="40" class="nm-btn save-btn" @click="save(store)">Save</v-btn>
            </div>
        </v-form>
    </div>
</template>

<script setup>
import { useSettingsStore } from '../stores/settings';
const store = useSettingsStore();
store.loadFromDisk();

</script>

<script>

export default {
    name: 'Settings',
    data() {
        return {
            locked: true,
        }
    },
    methods: {
        async scanQRCode() {
            const qrTextArea = document.getElementById('qr-text-area');
            const qrText = await this.$qrcode.scan();
            qrTextArea.value = qrText;
        },
        saveSettings(store) {
            store.set();
            store.saveToDisk();
        },
        save(store) {
            this.saveSettings(store);
            this.locked = true;
        },
        edit(store) {
            store.removePassword();
            this.locked = false;
        }
    },
}
</script>

<style scoped>
.outbounding {
    position: absolute;
    width: 86%;
    margin: 4vh 7%;
    height: 100vh;

    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #e6e6e6;
    box-shadow: 10px 10px 17px #c1c1c1,
        -10px -10px 17px #ffffff;

    animation: slide-up 0.8s ease-out;
}

#form-container {
    margin: 4vh 4vw;
    /* background-color: #c1c1c1; */
    height: 100vh;
}

.cam-hyperlink {
    display: block;
    margin-left: clamp(0vw, 2vw, 4vw);
    margin-top: 2vh;
    transform: translateY(-4vh);
}

#use-camera-btn {
    font-size: 16px;
    display: inline;
    color: #404040;
}

#camera-hint {
    margin-left: 5vw;
    font-size: small;
    font-weight: bold;
    text-transform: lowercase;
    text-decoration: underline;
    display: inline;
    color: #404040;
}

.sq-icon-btn {
    border-radius: 4px;
    margin: 0 2.6vw 0 2px;
}

.save-btn {
    width: calc(100% - 50px) !important;
}

.nm-btn,
.nm-btn:focus,
.nm-btn:disabled {
    background: #e6e6e6;
    box-shadow: 6px 6px 5px #bfbfbf,
        -4px -4px 5px #ffffff;

    color: #404040 !important;
}

@keyframes slide-up {
    from {
        translate: 0px 80px;
    }

    to {
        translate: 0px 0px;
    }
}
</style>