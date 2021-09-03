<template>
    <div class="report">
        
        <div class="report_item">
            {{report.title}}
        </div>
        <div class="report_item">
            {{report.subtitle}}
        </div>

        <div class="report_item" :style="report.title=='Venta'? 'color:green' :'color:red'">
            {{report.title=="Venta"? "":"-"}}
            {{report.amount}}
        </div>
    </div>
</template>


<script>
export default {
    name:'Report',
    props:{
        report: []
    }
}
</script>