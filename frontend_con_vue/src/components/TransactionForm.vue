<template>
    <div class="form">
        Creation Date: <br>
        <input type="date" v-model="creation_date"/> <br>
        Type: <br>
        <input type="radio" name="Title" value="Venta" v-model="title">
        <label>Venta</label><br>
        <input type="radio" name="Title" value="Gasto" v-model="title">
        <label>Gasto</label>
        <br>
        SUBTITLE :<br>
        <input placeholder="Subtitulo" v-model="subtitle">
        <br>
        Details :<br>
        <input placeholder="Detalles" v-model="details">
        <br>
        Amount :<br>
        <input placeholder="Cantidad" v-model="amount">
        <br>
        <button @click="submitForm">Submit</button>
    </div>
</template>


<script>
export default {
    name:'TransactionForm',
    data (){
        return{
            creation_date: null,
            title:null,
            subtitle:null,
            details:null,
            confirmed:null,
            amount:null

        }
    },
    methods:{
        submitForm(){
            var newTransaction = {
                "creation_date":this.creation_date,
                "title":this.title,
                "subtitle":this.subtitle,
                "details":this.details,
                "amount":this.amount,
                "confirmed": true

            }
            console.log("newTransaction :")
            console.log(newTransaction)
            //Suponinedo que paso la validacion
            this.$store.dispatch('createTransactionAction',newTransaction)
        }
    }
}
</script>