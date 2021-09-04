import datetime
from time import sleep

from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework import response

from .models import Transaction
from .serializers import TransactionSerializer

# Create your tests here.

class TransactionByRangeTests(TestCase):
  def test_one_transaction_in_range(self):
    """
    Transaction in range returned correctly
    """
    now = timezone.now().date()
    Transaction.objects.create(title='trans1', creation_date=now, amount=32.5)
    response = self.client.get(reverse('transactions:transactions-by-range', args=(now - datetime.timedelta(days=1),now + datetime.timedelta(days=1),)))
    esperado = [
      {"id": 1, "creation_date":str(now), "confirmed": False ,"amount": 32.5,"title": 'trans1',"details": '',"subtitle": 'generic' }
    ]
    self.assertQuerysetEqual(
      response.json(),
      esperado,
    )
  def test_two_transactions_in_range(self):
    """
    Two transactions in range returned correctly
    """
    now = timezone.now().date()
    transactions = []
    for i in range(2):
      transactions.append(Transaction.objects.create(title='trans%i'%i, creation_date=now + datetime.timedelta(days=i), amount=300 + i))
    response = self.client.get(reverse('transactions:transactions-by-range', args=(now - datetime.timedelta(days=1),now + datetime.timedelta(days=2),)))
    esperado = []
    for item in transactions:
      esperado.append({'id':item.id, 'creation_date': str(item.creation_date), 'confirmed': item.confirmed, 'amount': item.amount, 'title': item.title, 'details': item.details, 'subtitle': item.subtitle})
    self.assertQuerysetEqual(
      response.json(),
      esperado[::-1],
    )

  def test_transactions_out_of_range_before(self):
    """
    Transaction in range returned correctly and one transaction before not returned
    """
    now = timezone.now().date()
    transactions = []
    for i in range(3):
      transactions.append(Transaction.objects.create(title='trans%i'%i, creation_date=now + datetime.timedelta(days=i-1), amount=300 + i))
    response = self.client.get(reverse('transactions:transactions-by-range', args=(now, now + datetime.timedelta(days=2),)))
    esperado = []
    for item in transactions[1:]:
      esperado.append({'id':item.id, 'creation_date': str(item.creation_date), 'confirmed': item.confirmed, 'amount': item.amount, 'title': item.title, 'details': item.details, 'subtitle': item.subtitle})
    self.assertQuerysetEqual(
      response.json(),
      esperado[::-1],
    )
  
  def test_transactions_out_of_range_after(self):
    """
    Transaction in range returned correctly and one transaction after not returned
    """
    now = timezone.now().date()
    transactions = []
    for i in range(3):
      transactions.append(Transaction.objects.create(title='trans%i'%i, creation_date=now + datetime.timedelta(days=i), amount=300 + i))
    response = self.client.get(reverse('transactions:transactions-by-range', args=(now - datetime.timedelta(days=1), now + datetime.timedelta(days=1),)))
    esperado = []
    for item in transactions[:-1]:
      esperado.append({'id':item.id, 'creation_date': str(item.creation_date), 'confirmed': item.confirmed, 'amount': item.amount, 'title': item.title, 'details': item.details, 'subtitle': item.subtitle})
    self.assertQuerysetEqual(
      response.json(),
      esperado[::-1],
    )

class TransactionCRUDTests(TestCase):
  def test_index(self):

    now = timezone.now().date()
    transactions = []
    for i in range(20):
      transactions.append(Transaction.objects.create(title='trans%i'%i, creation_date=now + datetime.timedelta(days=i), amount=300 + i))
    response = self.client.get(reverse('transactions:transaction-list'))
    esperado = []
    for item in transactions:
      esperado.append({'id':item.id, 'creation_date': str(item.creation_date), 'confirmed': item.confirmed, 'amount': item.amount, 'title': item.title, 'details': item.details, 'subtitle': item.subtitle})

    self.assertListEqual(
      response.json(),
      esperado[::-1]
    )

  def test_create(self):

    now = timezone.now().date()
    transaction = {'creation_date': str(now), 'confirmed': True, 'amount': 300, 'title': 'gasto', 'details': '50 litros gasolina', 'subtitle': 'combustible'}
    request = self.client.post(reverse('transactions:transaction-list-create'), transaction)
    response = self.client.get(reverse('transactions:transaction-list'))
    
    self.assertDictContainsSubset(
      transaction,
      response.json()[0]
    )

  def test_delete(self):
    now = timezone.now().date()
    trans = Transaction.objects.create(title='transac', creation_date=now, amount=300)
    self.client.delete(reverse('transactions:transaction-list-delete', args=(trans.id,)))
    response = self.client.get(reverse('transactions:transaction-list'))
    
    self.assertListEqual(
      response.json(),
      []
    )
  
  def test_update(self):
    now = timezone.now().date()
    trans = Transaction.objects.create(title='transac', creation_date=now, amount=300)
    datos = TransactionSerializer(trans).data
    datos['title'] = 'transaccion'
    response = self.client.post(reverse('transactions:transaction-list-update', args=(datos['id'],)), data=datos)

    serial = TransactionSerializer(data=response.json())
    datos2 = {}
    if serial.is_valid():
      datos2 = serial.data
    
    self.assertDictContainsSubset(
      datos2,
      datos
    )
