from django.urls import path 
from . import views


urlpatterns =[
	path('',views.receiptsList,name="receipts-list"),
	path('create/',views.receiptCreate,name="receipt-create"),
	

	

	

]