<template>
    <div class="navbar">
        <div v-for="(item, index) in items" :key=index class="item" @click="selectTab(index)">
            {{item}}
        </div>
    </div>
</template>



<script>
export default {
    name:'Navbar',
    props : {
        items :[]
    },
    methods: {
        selectTab (index){
            this.$store.dispatch('selectTabAction',index)
            switch(index){
                case 2:
                    this.$store.dispatch('getListAction')
                    break;
                case 3:
                    this.$store.dispatch('getReportsAction')
                    break;

            }            
        }
    }
    
}
</script>