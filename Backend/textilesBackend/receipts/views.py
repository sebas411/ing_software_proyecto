from django.shortcuts import render


from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

from .serializers import ReceiptSerializer 
from .models import Receipt



# from django.http import HttpResponse, HttpResponseRedirect
# from django.conf import settings
# from django.contrib.auth.models import User



@api_view(['GET'])
def receiptsList(request):
	receipts= Receipt.objects.all()
	serializer = ReceiptSerializer(receipts, many=True)
	return Response(serializer.data)


@api_view(['POST'])
def receiptCreate(request):
	serializer = ReceiptSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	return Response(serializer.data)