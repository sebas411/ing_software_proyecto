<template>
  <div id="app">
    
    <Navbar  v-if="$store.state.isUserAuthenticated"  :items="$store.state.navbarItems"/>
    <Login v-if="$store.state.selectedTab==0" />
    <TransactionForm v-if="$store.state.selectedTab==1 && $store.state.isUserAuthenticated" />
    <TransactionsList v-else-if="$store.state.selectedTab==2 &&$store.state.isUserAdmin"/>
    <ReportsList v-else-if="$store.state.selectedTab==3 &&$store.state.isUserAdmin && $store.state.isUserAuthenticated" />
    <Settings v-else-if="$store.state.selectedTab==4 && $store.state.isUserAuthenticated"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import TransactionsList from './components/TransactionsList.vue'
import ReportsList from './components/ReportsList.vue'
import TransactionForm from './components/TransactionForm.vue'
import Login from './components/Login.vue'
import Settings from './components/Settings.vue'

export default {
  name: 'App',
  components: {
    Login,
    Navbar,    
    TransactionsList,
    ReportsList,
    TransactionForm,
    Settings
  }
}

</script>

<style>
@import "./assets/css/styles.css"
</style>
