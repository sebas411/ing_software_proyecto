from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from transactions.serializers import TransactionSerializer , EmployeeSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    
    queryset = Transactions.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.AllowAny]

class EmployeeViewSet(viewsets.ModelViewSet):
    
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.AllowAny]


