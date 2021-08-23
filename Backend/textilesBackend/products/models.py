from django.db import models
	
class Product(models.Model):
	id= models.AutoField ( primary_key =True)
	name = models.CharField(max_length=50)
	type_of_product = models.CharField(max_length=50)
	details =models.CharField(max_length=50)
	billing_type = models.CharField(max_length=50)
	price = models.FloatField()
	class Meta:
            db_table = 'products'
