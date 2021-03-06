from django.shortcuts import render


from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

from .serializers import TransactionSerializer 
from .models import Transaction

from django.db import connection

from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.contrib.auth.models import User






@api_view(['GET'])
def transactionList(request):
	transactions= Transaction.objects.all().order_by('-creation_date')
	serializer = TransactionSerializer(transactions, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def getReports(request):
	querry = "select title, subtitle , sum(amount) as amount from transactions group by title, subtitle order by title, amount"
	cursor = connection.cursor()
	cursor.execute(querry)
	data = cursor.fetchall()
	valores = []
	for elemento in data:
		diction = {"title": elemento[0], "subtitle":elemento[1], "amount": elemento[2]}
		valores.append(diction)
		
	return  Response(valores)



	querry = "select title, subtitle , sum(amount) as amount from transactions where creation_date between '2020-01-01' and '2021-09-05' group by title, subtitle order by title, amount"


@api_view(['GET'])
def getTransactionsByRange(request,start,end):
	querry = "select * from transactions where creation_date between '"+ start+"' and '"+end+"' order by creation_date desc"
	cursor = connection.cursor()
	cursor.execute(querry)
	data = cursor.fetchall()
	valores = []
	for elemento in data:
		diction = {"id": elemento[0], "creation_date":elemento[1], "confirmed": elemento[2] ,"amount": elemento[3],"title": elemento[4],"details": elemento[5],"subtitle": elemento[6] }
		valores.append(diction)
		
	return  Response(valores)

@api_view(['GET'])
def getReportsByRange(request,start,end):
	querry = "select title, subtitle , sum(amount) as amount from transactions where creation_date between '"+start+"' and '"+end+"' group by title, subtitle order by title, amount"
	cursor = connection.cursor()
	cursor.execute(querry)
	data = cursor.fetchall()
	valores = []
	for elemento in data:
		diction = {"title":elemento[0], "subtitle": elemento[1] ,"amount": elemento[2]}
		valores.append(diction)
		
	return  Response(valores)




@api_view(['POST'])
def transactionCreate(request):
	serializer = TransactionSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['POST'])
def transactionUpdate(request,pk):
	transaction= Transaction.objects.get(id=pk)
	serializer = TransactionSerializer(instance=transaction, data=request.data)
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['DELETE'])
def transactionDelete(request,pk):
	transaction= Transaction.objects.get(id=pk)
	transaction.delete()
	return Response("Transaction was deleted")


######login

@api_view(['POST'])
def userLogin(request):
	username =request.data['username']
	password = request.data['password']
	user = authenticate(username=username, password=password)
	if user is not None:
		login(request, user)
		HttpResponseRedirect('login/')

	return Response("Login succesfull")


def userLogout(request):
    logout(request)
    return HttpResponseRedirect("../login/")



@api_view(['POST'])
def userRegister(request):
	username =request.data['username']
	password = request.data['password']
	first_name =request.data['first_name']
	last_name = request.data['last_name']
	email = request.data['email']
	User.objects.create_user(username=username, password=password,first_name=first_name,last_name=last_name,email=email)


	return Response (" User was registerd")



## ejemplo POST de USUARIO { transactions/register}

# {
# "username": "andy",
# "password":"andy",
# "first_name":"Andy",
# "last_name":"Rivera",
# "email": "andy@example.com"

# }


# ejemplo POST transaction  { transactions/create/ }

 # {
 #        "id": 1,
 #        "creation_date": "2021-05-05",
 #        "confirmed": true,
 #        "amount": 500.0,
 #        "title": "Venta",
 #        "details": "50 metros cuadrados"
 #    }
