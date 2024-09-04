<template>
    <div class="scan-page">
        <video ref="video" id="video" class="scan-video" autoplay></video>
        <div v-show="tipShow" class="scan-tip">{{ tipMsg }}</div>
    </div>
</template>

<script>
import { BrowserMultiFormatReader } from '@zxing/library';

export default {
    name: 'ScanCode',
    data() {
        return {
            codeReader: null,
            tipShow: true,
            tipMsg: '',
            scanText: '',
        }
    },
    created() {
        this.openScan();
    },
    watch: {
        '$route'(to, from) {
            if (to.path == '/ScanCodePage') {  // When on this page
                this.openScan();
            }
        }
    },
    destroyed() {
        this.codeReader.reset();
        this.codeReader = null;
    },
    methods: {
        async openScan() {
            this.codeReader = await new BrowserMultiFormatReader();
            this.codeReader.getVideoInputDevices().then(videoDevices => {
                this.tipMsg = 'Accessing camera...';
                this.tipShow = true;
                console.log('get-videoDevices', videoDevices);

                // By default, get the device ID of the last device in the camera list. In most cases, the front camera is located at the beginning of the list, so the last one is usually the rear camera.
                let firstDeviceId = videoDevices[videoDevices.length - 1].deviceId;
                // If there are more than one camera devices, handle it by checking the label field of each camera list item. Most devices have a label string containing 'back' and '0'. If some devices don't have it, then still get the last one by default.
                if (videoDevices.length > 1) {
                    firstDeviceId = videoDevices.find(el => { return el.label.indexOf('back') > -1 && el.label.indexOf('0') > -1 }) ?
                        videoDevices.find(el => { return el.label.indexOf('back') > -1 && el.label.indexOf('0') > -1 }).deviceId :
                        videoDevices[videoDevices.length - 1].deviceId;
                }
                console.log('get-firstDeviceId', firstDeviceId);

                this.decodeFromInputVideoFunc(firstDeviceId);
            }).catch(err => {
                this.tipShow = false;
                console.error(err);
            });
        },
        decodeFromInputVideoFunc(firstDeviceId) {  // Scanning using the camera
            this.codeReader.reset(); // Reset
            this.codeReader.decodeFromInputVideoDeviceContinuously(firstDeviceId, 'video', (result, err) => {
                this.tipMsg = 'Trying to recognize...';
                if (result) {
                    console.log('Scan result', result);
                    this.scanText = result.text;
                    if (this.scanText) {
                        this.tipShow = false;
                        Dialog.confirm({  // Show a dialog with the scan result. You can write the rest of the code according to your needs.
                            title: 'Scan Result',
                            message: this.scanText,
                        }).then(() => {  // Clicked on confirm

                        }).catch(() => {  // Clicked on cancel

                        });
                    }
                }
            });
        },
        clickIndexLeft() {  // Go back to the previous page
            this.$destroy();
            // this.$router.go(-1);
            // window.location.href = document.referrer;
        }
    }
}
</script>

<style>
.scan-index-bar {
    background-image: linear-gradient(-45deg, #42a5ff, #59cfff);
}

.scan-index-bar .van-nav-bar__title,
.scan-index-bar .van-nav-bar__arrow,
.scan-index-bar .van-nav-bar__text {
    color: #fff !important;
}

.scan-page {
    min-height: 100vh;
    background-color: #363636;
    overflow-y: hidden;
}

.scan-page .scan-video {
    height: 85vh;
}

.scan-page .scan-tip {
    width: 100vw;
    text-align: center;
    color: white;
    font-size: 5vw;
}
</style>
