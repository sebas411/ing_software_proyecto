from django.urls import path 
from . import views


urlpatterns =[
	path('',views.transactionList,name="transaction-list"),
	path('create/',views.transactionCreate,name="transaction-list"),
	path('delete/<str:pk>',views.transactionUpdate,name="transaction-list"),
	path('update/<str:pk>',views.transactionDelete,name="transaction-list"),
	path('login/',views.userLogin,name='login'),
	path('logout/',views.userLogout,name='logout'),
	path('register/',views.userRegister,name='register'),
	

]