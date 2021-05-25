from django.shortcuts import render


from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

from .serializers import TransactionSerializer 
from .models import Transaction



@api_view(['GET'])
def transactionList(request):
	transactions= Transaction.objects.all()
	serializer = TransactionSerializer(transactions, many=True)
	return Response(serializer.data)