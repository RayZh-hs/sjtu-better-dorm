<template>
    <v-theme-provider theme="dark">
        <div class="window">
            <!-- <v-icon icon="mdi-curtains" id="curtains"></v-icon> -->
            <div id="line"></div>
            <v-icon icon="mdi-ceiling-light" class="light-ico" @click="pullLights"
                :class="{ 'light-ico-pulled-down': pulledDown }"></v-icon>
            <v-icon icon="mdi-ceiling-light" class="light-ico light-cone" v-show="anyLightOn()"></v-icon>

            <div class="bottom-sect">
                <div v-for="(state, ind) in lights" :key="ind">
                    <div class="bottom-btn" :class="{ 'bottom-card-mv-down': !state }" @click="toggleLight(ind)">
                        <v-icon :icon="state ? 'mdi-lightbulb-on' : 'mdi-lightbulb-off'"
                            class="bottom-ctrl-icon"></v-icon>
                    </div>
                </div>
            </div>
        </div>
        <p id="pending-txt">click to toggle</p>
    </v-theme-provider>
</template>

<script>
export default {
    name: 'Light',
    data() {
        return {
            lights: [true, false, false],
            pulledDown: false,
        }
    },
    methods: {
        toggleLight(index) {
            this.lights[index] = !this.lights[index];
        },
        anyLightOn() {
            return this.lights.some(light => light);
        },
        setAllLights(state) {
            this.lights = this.lights.map(() => state);
        },
        pullLights() {
            this.pulledDown = true;
            setTimeout(() => {
                this.pulledDown = false;
            }, 200);
            if (this.anyLightOn()) {
                this.setAllLights(false);
            } else {
                this.setAllLights(true);
            }
        },
    }
}
</script>

<style scoped>
.window {
    position: absolute;
    top: 48px;
    width: 80%;
    left: 10%;
    height: calc(100% - 48px);

    border-radius: 17px;
    background: #dbdbdb;
    box-shadow: inset 14px 14px 23px #afafaf,
        inset -14px -14px 23px #ffffff;

    overflow: hidden;
}

#line {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);

    height: 50%;
    width: 6px;
    /* background: #e7e7e7; */
    background: #696969;
    box-shadow: 2px 2px 3px #9c9c9c
}

.light-ico {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 100px;
    /* color: #e7e7e7; */
    color: #737373;
    text-shadow: 2px 2px 3px #9c9c9c;
    z-index: 1;

    transition: all 0.3s;
}

.light-ico-pulled-down {
    translate: 0 20px;
}

.light-cone {
    color: rgb(255, 255, 255);
    translate: 0 -44px;
    filter: blur(10px);
    opacity: 0.8;
    pointer-events: none;
    z-index: 1;

    transition: all 0.3s;
}

#curtains {
    position: absolute;
    top: -3vh;
    width: 100%;
    font-size: 80vw;

    color: #d4d4d4;
    text-shadow: 2px 2px 3px #9c9c9c;
}

.bottom-sect {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 80px;

    display: flex;
    align-items: normal;
    justify-content: space-around;

    padding-left: 10px;
    padding-right: 10px;
}

.bottom-btn {
    position: relative;
    border-radius: 10px;

    display: flex;
    justify-content: center;

    width: 50px;
    height: 100vh;

    background: #cecdcd;
    box-shadow: 5px 5px 8px #c0c0c0a9,
        -5px -5px 8px #e1e1e1cb;

    transition: all 0.3s;
}

.bottom-ctrl-icon {
    position: relative;
    top: 20px;
    font-size: 30px;
    /* text-shadow: 2px 2px 3px #9c9c9c; */
    color: #636363;
}

.bottom-card-mv-down {
    translate: 0 20px;
    background-color: #bcbbbb;
}

#pending-txt {
    position: absolute;
    bottom: -7vh;
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: small;
    font-weight: bold;
    color: #585858;

    text-transform: uppercase;
    letter-spacing: 2px;
}
</style>