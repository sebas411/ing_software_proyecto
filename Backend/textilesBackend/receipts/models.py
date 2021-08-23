from django.db import models
from receipts.models import Product

# Create your models here.
class Receipt(models.Model):
	id= models.AutoField ( primary_key =True)
	creation_date = models.DateField(default=datetime.date.today)
	class Meta:
            db_table = 'products'

class Item(models.Model):
	receipt_id = models.ForeignKey(Receipt, on_delete=models.CASCADE)
	product_id = models.ForeignKey(Product, on_delete=models.CASCADE)