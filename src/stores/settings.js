import { defineStore } from "pinia";

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        temp_qrText: "https://door.sjtu.edu.cn/ui?roomid=4a7108c4643145869b358c886b9fae0320220829",
        temp_username: "",
        temp_password: "",

        qrText: "https://door.sjtu.edu.cn/ui?roomid=4a7108c4643145869b358c886b9fae0320220829",
        username: "",
        password: "",
    }),
    actions: {
        saveToDisk() {},
        loadFromDisk() {},
        set() {
            this.qrText = this.temp_qrText;
            this.username = this.temp_username;
            this.password = this.temp_password;

            console.log({
                'qrText': this.qrText,
                'username': this.username,
                'password': this.password,
            });
        },
        removePassword() {
            this.temp_password = "";
        },
    }
})