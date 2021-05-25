from django.db import models
import datetime

# Create your models here.


class Employee(models.Model):
	id= models.AutoField ( primary_key =True)
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	hire_date = models.DateField()
	class Meta:
            db_table = 'employees'

	
class Transaction(models.Model):
	id= models.AutoField ( primary_key =True)
	creation_date = models.DateField(default=datetime.date.today)
	confirmed = models.BooleanField(default=False)
	amount = models.FloatField(default=0.0)
	title = models.CharField(max_length=50)
	details = models.CharField(max_length=300)
	employee_ID = models.ForeignKey(Employee,on_delete=models.CASCADE)
	class Meta:
            db_table = 'transactions'
