import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userLoginStore = defineStore('userLogin', () => {
    const token = ref<string>('')
    function setToken(newtoken: string) {
        token.value = newtoken;
    }
    return { token, setToken }
}, { persist: true })
