import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userLoginStore = defineStore('userLogin', () => {
    const token = ref<string>('')
    function setToken(newtoken: string) {
        token.value = newtoken;
    }
    function logout() {
        token.value = ''
    }
    return { token, setToken,logout }
}, { persist: true })
