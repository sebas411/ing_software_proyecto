<template>
<div>
    <h1> SETTINGS </h1> 
    <br>
    Is user authenticated : 
    {{$store.state.isUserAuthenticated}}
    <br>
    IS user admin : 
    {{$store.state.isUserAdmin}}
    <br>
    <button @click="logout"> Logout </button>
</div>

</template>

<script>
export default {
    name:'Settings',
    methods: {
        logout(){
            this.$store.dispatch('logoutAction')

        }
    }

}
</script>