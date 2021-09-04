from django.urls import path 
from . import views

app_name = 'transactions'

urlpatterns =[
	path('',views.transactionList,name="transaction-list"),
	path('create/',views.transactionCreate,name="transaction-list-create"),
	path('delete/<str:pk>',views.transactionDelete,name="transaction-list-delete"),
	path('update/<str:pk>',views.transactionUpdate,name="transaction-list-update"),
	path('login/',views.userLogin,name='login'),
	path('logout/',views.userLogout,name='logout'),
	path('register/',views.userRegister,name='register'),
	path('reports/',views.getReports,name='reports'),
	path('ReportsByRange/<str:start>/<str:end>',views.getReportsByRange,name="reports-by-range"),
	path('ByRange/<str:start>/<str:end>', views.getTransactionsByRange, name='transactions-by-range')

	

	

	

]