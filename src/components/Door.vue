<template>
    <div class="multi-btn-area">
        <div class="loading center">
            <div class="content-wrapper">
                <v-icon icon="mdi-lock-open-outline" class="mid-icon center"></v-icon>
                <v-icon icon="mdi-lock-open-outline" class="mid-icon-inner"></v-icon>
            </div>
        </div>
    </div>
    <p class="pending-txt">Click to open</p>
</template>

<script>
export default {
    name: 'Door',
}
</script>

<style scoped>
.multi-btn-area {
    width: 82vw;
    height: 82vw;
    position: relative;
    left: 9vw;
    top: 15vh;

    border-radius: 50%;
    background: #dbdbdb;
    box-shadow: 20px 20px 60px #bababa,
        -20px -20px 60px #fcfcfc;
}

.loading {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    box-shadow: 5px 5px 10px #b5b5b5b9,
        -5px -5px 10px #f0f0f08f;
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
    font-size: 80px;
    color: #5e5e5e;
    z-index: 10;
}

.mid-icon-inner {
    position: absolute;
    font-size: 80px;
    color: #e8e8e8;
    left: 50%;
    top: 50%;
    transform: translate(-49%, -46%);
    filter: blur(3px);
    z-index: 12;
    opacity: 1;
}

.pending-txt {
    font-size: 15px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #555555;

    position: relative;
    width: 100vw;
    bottom: -22vh;
    left: 50vw;
    text-align: center;
    transform: translateX(-50%);

    filter: drop-shadow(2px 2px 1px rgba(144, 144, 144, 0.667))
            drop-shadow(-1px -1px 1px rgba(247, 247, 247, 0.315));
}
</style>