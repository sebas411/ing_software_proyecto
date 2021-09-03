<template>
    <div>
        
        <date-picker/>
        <ReportHeader/>
        <Report v-for="report, index in $store.state.reports" :key="index" :report="report"/>
        
        TOTAL : {{total}}

    </div>
</template>

<script>

import Report from './Report.vue'
import ReportHeader from './ReportHeader.vue'

export default {
    name : 'ReportsList',
    components:{
        Report,
        ReportHeader
        
    },
    computed:{
        total (){
            var total =0
            for(let i=0; i<this.$store.state.reports.length; i++){
                if(this.$store.state.reports[i].title=="Venta"){
                    total = total + this.$store.state.reports[i].amount
                }
                else{
                    total = total - this.$store.state.reports[i].amount

                }
            }

            return total
        }
    }
}
</script>