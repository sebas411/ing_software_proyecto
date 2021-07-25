from django.db import models
import datetime

# Create your models here.



	
class Transaction(models.Model):
	id= models.AutoField ( primary_key =True)
	creation_date = models.DateField(default=datetime.date.today)
	confirmed = models.BooleanField(default=False)
	amount = models.FloatField(default=0.0)
	title = models.CharField(max_length=50)
	subtitle= models.CharField(max_length=50 , default= "generic")
	details = models.CharField(max_length=300)
	class Meta:
            db_table = 'transactions'
