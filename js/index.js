const app = new Vue({
    el: '#app',
    data: {
        startDate: '',
        endDate: '',
        timeStr: ''
    },
    computed: {
        disabled () {
            if(this.startDate.trim() || this.endDate.trim()) return false
            return true
        }
    },
    methods: {
        clickBtn() {
            
        },

    },
    mounted () {
        
    }
})