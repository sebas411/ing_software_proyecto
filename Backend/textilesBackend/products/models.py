from django.db import models
	
class Product(models.Model):
	id= models.AutoField ( primary_key =True)
	name= models.Charfield(max_length=50)
	type = models.CharField(max_length=50)
	details = models.CharField(max_length=50)
	billing_type = models.CharField(max_length=50)
	price = models.FloatField
	class Meta:
            db_table = 'products'
