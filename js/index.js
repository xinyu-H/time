const app = new Vue({
    el: '#app',
    data: {
        startDate: '',
        endDate: '',
        timeStr: '',
        run: null,
    },
    computed: {
        disabled () {
            if(this.startDate.trim() || this.endDate.trim()) return false;
            return true;
        },
        showReckonTime () {
            if(this.startDate.trim() && this.endDate.trim()) {
                return false;
            } else {
                let time = this.startDate.trim() || this.endDate.trim()
                return new Date(time).getTime() > Date.now()
            }
        }
    },
    methods: {
        clickBtn(val) {
            // 两个时间都输入了
            if(this.startDate.trim() && this.endDate.trim()) {
                if(!this.checkDate(this.startDate.trim()) || !this.checkDate(this.endDate.trim())) {
                    return vant.Toast('你输入的时间格式不对')
                }
                this.getDateTime(this.startDate, this.endDate)
            } else {
                if(!this.checkDate(this.startDate.trim() || this.endDate.trim())) {
                    return vant.Toast('你输入的时间格式不对')
                }
                this.getDateTime(this.startDate || this.endDate)
                if(val) {
                    this.run = setInterval(() => {
                        this.getDateTime(this.startDate || this.endDate)
                    }, 1000)
                    return
                }
            }
        },
        getDateTime(start, end = new Date()) {
            let sD = new Date(start).getTime()
            let eD = new Date(end).getTime()
            if(this.showReckonTime) [sD, eD] = [eD, sD];
            let diff = (eD - sD) / 1000
            if (diff <= 0) clearInterval(this.run);
            let d = this.patch(diff / (24 * 3600));
            let h = this.patch(diff / 3600 % 24);
            let m = this.patch(diff % 3600 / 60);
            let s = this.patch(diff % 60);
            this.timeStr = `${d}天${h}时${m}分${s}秒`
        },
        empty() {
            this.startDate = ''
            this.endDate = ''
            this.timeStr = ''
            clearInterval(this.run)
        },
        patch(str){
            str = parseInt(str)
            return +str <= 0 ? '00' : +str < 10 ? '0' + str : str;
        },
        checkDate(str) {
            return /^\d{4}\/\d{2}\/\d{2}$/i.test(str) || /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/i.test(str)
        }
    },
    mounted () {
        
    }
})