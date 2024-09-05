import { defineStore } from "pinia";

function encode(string) {
    return btoa(string);
};
function decode(string) {
    return atob(string);
};

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        temp_qrText: "",
        temp_username: "",
        temp_password: "",

        qrText: "",
        username: "",
        password: "",
    }),
    actions: {
        saveToDisk() {
            localStorage.setItem('qrText', this.qrText);
            localStorage.setItem('username', this.username);
            localStorage.setItem('password', encode(this.password));
        },
        loadFromDisk() {
            console.log("loadFromDisk");
            try {
                this.qrText = localStorage.getItem('qrText');
                this.username = localStorage.getItem('username');
                this.password = decode(localStorage.getItem('password'));
            } catch (error) {
                console.log(error);
                this.qrText = "https://door.sjtu.edu.cn/ui?roomid=4a7108c4643145869b358c886b9fae0320220829";
                this.username = "username";
                this.password = "password";
            }
            // copy to temp
            this.temp_qrText = this.qrText;
            this.temp_username = this.username;
            this.temp_password = this.password;
            console.log('Finished!')
        },
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