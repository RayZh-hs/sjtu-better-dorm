<template>
    <div class="multi-btn-area" @click="openDoor(settings)" id="multi-btn-area">
        <div class="loading center">
            <div class="content-wrapper" :class="{ 'move-up': open }">
                <v-icon icon="mdi-lock-open-outline" class="mid-icon center"></v-icon>
                <v-icon icon="mdi-lock-open-outline" class="mid-icon-inner"></v-icon>
            </div>
            <div class="content-wrapper" :class="{ 'move-down': !open }">
                <v-icon icon="mdi-arrow-up-thick" class="mid-icon center"></v-icon>
                <v-icon icon="mdi-arrow-up-thick" class="mid-icon-inner"></v-icon>
            </div>
        </div>
    </div>
    <v-card id="bottom-card" color="#dbdbdb">click to open</v-card>
</template>

<script setup>
import { useSettingsStore } from '../stores/settings';
const settings = useSettingsStore();
</script>

<script>
export default {
    name: 'Door',
    data() {
        return {
            open: false
        }
    },
    methods: {
        openDoor(settings) {
            console.log("Opening the door...");
            if(settings.qrText == "") {
                window.open("https://door.sjtu.edu.cn/ui?roomid=4a7108c4643145869b358c886b9fae0320220829", "_blank");
            }
            else {
                console.log("loaded from settings: QR code url: " + settings.qrText);
                try {
                    window.open(settings.qrText, "_blank");
                } catch (error) {
                    console.error("Wrong url in settings.");
                }
            }
            // fetch("https://door.sjtu.edu.cn/api/key?roomid=4a7108c4643145869b358c886b9fae03", {
            //     method: "GET",
            //     mode: "no-cors",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     redirect: "follow",
            // }).then(response => {
            //     console.log(response.body);
            // }).catch(error => {
            //     console.error("Failed to open the door.");
            // });
            this.open = true;
            setTimeout(() => {
                console.log("Door opened.");
                this.open = false;
            }, 5000);
            setTimeout(() => {
                console.log("Redirecting to the homepage...");
                window.history.back();
            }, 1000);
        }
    },
    // beforeMount() {
    //     // Override the 'click' event
    //     setTimeout(() => {
    //         let element = document.getElementById('multi-btn-area');
    //         if (element) {
    //             let event = new MouseEvent("click", {
    //                 bubbles: true,
    //                 cancelable: true,
    //                 view: window,
    //                 detail: 0,
    //                 screenX: 0,
    //                 screenY: 0,
    //                 clientX: 0,
    //                 clientY: 0,
    //                 ctrlKey: true,
    //                 altKey: false,
    //                 shiftKey: false,
    //                 metaKey: false,
    //                 button: 0,
    //                 relatedTarget: null
    //             });
    //             element.dispatchEvent(event);
    //         } else {
    //             console.error("Element with ID 'multi-btn-area' not found.");
    //         }
    //     }, 500);
    // }
}
</script>

<style scoped>
.multi-btn-area {
    width: 82vw;
    height: 82vw;
    position: relative;
    display: block;
    left: 9vw;
    top: 15vh;

    border-radius: 50%;
    background: #dbdbdb;
    box-shadow: 20px 20px 60px #bababa,
        -20px -20px 60px #fcfcfc;

    transition: all 0.3s ease;
}

.content-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    transition: all 0.3s ease;
}

.move-up {
    translate: 0px -40vh;
}

.move-down {
    transform: translateY(40vh);
}

.loading {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    box-shadow: 5px 5px 10px #b5b5b5b9,
        -5px -5px 10px #f0f0f08f;

    overflow: hidden;
}

.loading::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    outline: 3.6vw solid rgb(196, 184, 184);
    outline-offset: 3vw;
    /* opacity: 0.3; */
    opacity: 0;
}

.mid-icon {
    position: absolute;
    font-size: 25vw;
    color: #5e5e5e;
    z-index: 10;
}

.mid-icon-inner {
    position: absolute;
    font-size: 25vw;
    color: #e8e8e8;
    left: 50%;
    top: 50%;
    transform: translate(-49%, -46%);
    filter: blur(3px);
    z-index: 12;
    opacity: 1;
}

.pending-txt {
    color: #555555;

    position: relative;
    width: 100vw;
    bottom: -22vh;
    left: 50vw;
    text-align: center;
    transform: translateX(-50%);

    filter: drop-shadow(2px 2px 1px rgba(144, 144, 144, 0.667)) drop-shadow(-1px -1px 1px rgba(247, 247, 247, 0.315));
}

#bottom-card {
    font-size: 5vw;
    letter-spacing: 2px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    color: rgb(53, 53, 53) !important;

    position: relative;
    bottom: -25vh;
    width: 82vw;
    height: 30vh;
    padding-top: 24px;
    left: 50%;
    transform: translateX(-50%);

    border-radius: 24px;
    background: linear-gradient(145deg, #eaeaea, #c5c5c5);
    box-shadow: 9px 9px 18px #afafaf,
        -9px -9px 18px #ffffff;

    animation: slide-up 1s ease-out;
}

@keyframes slide-up {
    from {
        translate: 0px 50px;
    }

    to {
        translate: 0px 0px;
    }
}
</style>