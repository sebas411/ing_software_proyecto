<template>
    <div>
    <DatePicker/>
    <TransactionHeader/>
    <div v-for="(transaction,index) in $store.state.transactions" :key="index">
    <Transaction :transaction="transaction"/>
    </div>
    <div class="totals">
        <div class="transaction_item"> 
            SubTotal : {{$store.state.subtotal}}
        </div>
        <div class="transaction_item">
        TOTAL :  {{$store.state.total}}
        </div>
        <button @click="calculateTotals"> ⟳ </button>
    </div>

    </div>
</template>

<script>
import Transaction from './Transaction.vue'
import DatePicker from './DatePicker.vue'
import TransactionHeader from './TransactionHeader.vue'

export default {
    name :'TransactionsList',
    components :{
        Transaction,
        DatePicker,
        TransactionHeader
    },
    methods:{
        calculateTotals(){
            this.$store.dispatch ('calculateTotalAction')
        }
        
    }
    
}
</script>