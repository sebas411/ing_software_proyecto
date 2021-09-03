<template>
    <div class="transaction">
        <!-- <div v-for="(element, index) in transaction" :key="index">
            {{element}}
        </div> -->

        <div class="transaction_item">
            {{transaction.id}}
        </div>
        <div class="transaction_item">
            {{transaction.subtitle}}
        </div>
        <div class="transaction_item">
            {{transaction.details}}
        </div>
        <div class="transaction_item">
            {{transaction.creation_date}}
        </div>
        <div class="transaction_item" :style="transaction.title=='Venta'? 'color:green' :'color:red'">
            {{transaction.title=="Venta"? "":"-"}}
            {{transaction.amount}}
        </div>
        <div class="transaction_item" @click="toggleTransaction" style="cursor: pointer">
            {{transaction.confirmed? "✓": "X"}}
        </div>
        
        
    </div>
</template>



<script>
export default {
    name: 'Transaction',
    props : {
        transaction : []
    },
    methods :{
        toggleTransaction(){
            //alert("Toggling transaction "+ this.transaction.id)
            var newValue = !this.transaction.confirmed
            var data = [this.transaction, newValue]
            this.$store.dispatch('toggleTransactionAction',data)

            
        }
    }


}
</script>


