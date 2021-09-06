import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store(
    {
        state: {
            transactions : [],
            reports : [],
            selectedTab : 0,
            navbarItems : ["Login","Add register","History","Reports","Settings"],
            total : null,
            subtotal : null,
            isUserAuthenticated : false,
            isUserAdmin : false
            

        },
        mutations : {
            getList (state) {
                axios.get("http://127.0.0.1:8000/transactions/").then(
                    function(response){
                        state.transactions = response.data
                    }

                ).catch(function(error){
                    alert(error)
                })

            },
            selectTab(state,index){
                state.selectedTab= index
            },
            logout(state){
                state.isUserAuthenticated = false
                state.selectedTab= 0

            },
            calculateTotal(state){
                var total =0
                //alert(state.transactions.length)
                for(let i=0 ; i < state.transactions.length; i ++){
                    if(state.transactions[i].title=="Venta"){
                        //console.log("+"+state.transactions[i].amount)
                        total = total+state.transactions[i].amount
                    }
                    else {
                        total = total-state.transactions[i].amount
                        //console.log("-"+state.transactions[i].amount)

                    }

                }
                console.log(total)
                state.total=total
            },
            calculateSubtotal(state){
                var subtotal =0
                //alert(state.transactions.length)
                for(let i=0 ; i < state.transactions.length; i ++){
                    if(state.transactions[i].title=="Venta" && state.transactions[i].confirmed){
                        //console.log("+"+state.transactions[i].amount)
                        subtotal = subtotal+state.transactions[i].amount
                    }
                    else if (state.transactions[i].title=="Gasto" && state.transactions[i].confirmed)
                    {
                        subtotal = subtotal-state.transactions[i].amount
                        //console.log("-"+state.transactions[i].amount)

                    }

                }
                //console.log(subtotal)
                state.subtotal=subtotal
            },

            toggleTransaction(state,transaction){
                var url = "http://127.0.0.1:8000/transactions/update/"+transaction.id
                axios.post(url,transaction).catch(function(error){
                    alert(error)
                    //console.log(response)
                })

            },
            getTransactionsByRange(state,dates){
                var url ="http://127.0.0.1:8000/transactions/ByRange/"+ dates[0] + "/"+dates[1]
                axios.get(url).then(function(response){
                    state.transactions= response.data
                })

            },
            createTransaction(state,newTransaction){
                var url ="http://127.0.0.1:8000/transactions/create/"
                axios.post(url,newTransaction).catch(function(error){
                    alert(error)
                })

                

                
            },
            getReports(state){
                
                var url = "http://127.0.0.1:8000/transactions/reports/"
                axios.get(url).then(function(response){
                    console.log(response.data)
                    state.reports = response.data
                })

            },
            getReportsByRange(state,dates){
                var url ="http://127.0.0.1:8000/transactions/ReportsByRange/"+dates[0]+"/"+dates[1]
                axios.get(url).then(function(response){
                    state.reports = response.data

                })
            }

        },



        actions : {
            getListAction(context) {
                context.commit('getList')
                context.commit('calculateTotal')

            },
            selectTabAction(context,index){
                context.commit('selectTab',index)
            },
            calculateTotalAction(context){
                context.commit('calculateTotal')
                context.commit('calculateSubtotal')
            },
            toggleTransactionAction(context,data){
                //console.log("transaction.confirmed "+ data[0].confirmed)
                //console.log("newValue "+ data[1])
                data[0].confirmed= data[1]
                //console.log(data[0].confirmed)
                
                context.commit('toggleTransaction',data[0])
                context.commit('calculateSubtotal')
                context.commit('calculateTotal')
            },
            getTransactionsByRangeAction(context,dates){
                context.commit('getTransactionsByRange',dates)
                context.commit('calculateTotal')
                context.commit('calculateSubtotal')
                

            },
            createTransactionAction(context,newTransaction){
                context.commit('createTransaction',newTransaction)
            },
            getReportsAction(context){
                context.commit('getReports')
                
            },
            getReportsByRangeAction(context,dates){
                context.commit('getReportsByRange',dates)
            },
            logoutAction(context){
                context.commit('logout')
            }

        }
       


    })