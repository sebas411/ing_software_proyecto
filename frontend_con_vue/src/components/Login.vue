<template>
    <div class="login">

        <br>
        ENTER USERNAME <br><br>
        <input v-model="username"> <br>
        <br>
        ENTER PASSWORD <br><br>
        <input type="password" v-model="password"><br>
        <br>
        <button @click="submit"> Ingresar</button>

    </div>
</template>

<script>
export default {
    name :'Login',
    data (){
        return{
            username: null,
            password : null
        }
    },
    methods:
    {
        submit (){
            if (this.password=="password"&& this.username=="admin"){
                this.$store.state.isUserAuthenticated = true
                this.$store.state.isUserAdmin= true
            }
            if (this.password=="password"&& this.username=="notadmin"){
                this.$store.state.isUserAuthenticated = true
                this.$store.state.isUserAdmin= false
            }
        }
    }
}
</script>