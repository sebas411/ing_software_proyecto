<template>
  <div id="app">
    
    <Navbar :items="$store.state.navbarItems"/>
    <img v-if="$store.state.selectedTab==0" alt="Vue logo" src="./assets/logo.png">
    <TransactionForm v-if="$store.state.selectedTab==1" />
    <TransactionsList v-else-if="$store.state.selectedTab==2"/>
    <ReportsList v-else-if="$store.state.selectedTab==3" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import TransactionsList from './components/TransactionsList.vue'
import ReportsList from './components/ReportsList.vue'
import TransactionForm from './components/TransactionForm.vue'

export default {
  name: 'App',
  components: {
    Navbar,    
    TransactionsList,
    ReportsList,
    TransactionForm,
    
  }
}

</script>

<style>
@import "./assets/css/styles.css"
</style>
