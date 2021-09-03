<template>
    <div class="transaction_header">

        <div class="transaction_item">
            ID
        </div>
        <div class="transaction_item">
            CATEGORIA
        </div>
        <div class="transaction_item">
            DETALLES
        </div>
        <div class="transaction_item">
            FECHA
        </div>
        <div class="transaction_item">
            CANTIDAD
        </div>
        <div class="transaction_item">
            CONFIRMADO
        </div>
        
        
    </div>
</template>



<script>
export default {
    name: 'TransactionHeader',
    props : {
        transaction : []
    }
    


}
</script>


