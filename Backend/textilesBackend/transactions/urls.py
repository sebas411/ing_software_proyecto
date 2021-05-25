from django.urls import path 
from . import views


urlpatterns =[
	path('transactionList/',views.transactionList,name="transaction-list")
	

]