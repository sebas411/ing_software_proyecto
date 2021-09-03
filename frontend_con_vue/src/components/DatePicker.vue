<template>
    <div class="date_picker">
        <button @click="fetchDates"> ⟳ </button>
        
        <input type="date" v-model="endDate"/>
        
        <input type="date" v-model="startDate"/>
        
        
        PICK A DATE
    </div>
</template>


<script>
export default {
    name: 'DatePicker',
    data () {
        return {
            startDate : null,
            endDate : null
        }
    },
    methods: {
        fetchDates : function(){
            if(this.startDate === null || this.endDate === null){
                return
            }
            //alert("fetching by dates FROM: " + this.startDate + " TO "+ this.endDate)
            if(this.$store.state.selectedTab==2){
            var dates = [this.startDate,this.endDate]
            this.$store.dispatch('getTransactionsByRangeAction',dates)
            }
            if(this.$store.state.selectedTab==3){
                var dates2= [this.startDate,this.endDate]
                this.$store.dispatch('getReportsByRangeAction',dates2)

            }
        }
    }
}
</script>