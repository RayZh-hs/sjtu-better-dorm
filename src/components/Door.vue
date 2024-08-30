<template>
    <div class="center multi-btn-area">
        <div class="loading center">
            <div class="content-wrapper">
                <v-icon icon="mdi-lock-open-outline" class="mid-icon center"></v-icon>
                <!-- <p class="pending-txt">Click to open</p> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Door',
}
</script>

<style scoped>
.multi-btn-area {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: #dbdbdb;
    box-shadow: 20px 20px 60px #bababa,
        -20px -20px 60px #fcfcfc;
}

.loading {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    outline: 2px solid #696969;
    box-shadow: 20px 20px 60px #bcbcbc87;
}

.content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transform: transform(50%, 50%);
}

.mid-icon {
    font-size: 80px;
    color: #353535;
}

.pending-txt {
    font-size: 15px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #616161;

    position: absolute;
    width: 100%;
    bottom: 25px;
    left: 85px;
    text-align: center;
    transform: translateX(-50%);
}

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>