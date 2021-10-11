import time
from locust import HttpUser, task, between


class TestUser(HttpUser):
	wait_time = between (0,10)

	@task
	def on_start(self):
		url= "http://127.0.0.1:8000/transactions/login/"
		headers = {"username": "admin","password":"password"}
		self.client.post(url, headers)

	@task
	def getAllTransactions(self):
		url = "http://127.0.0.1:8000/transactions/"
		self.client.get(url)


	@task
	def getSomeTransactions(self):
		start = "2021-01-05"
		end = "2021-10-01"
		url = "http://127.0.0.1:8000/transactions/by_range/"+start+"/"+end+"/"
		self.client.get(url)


	@task
	def getAllReports(self):
		url = "http://127.0.0.1:8000/transactions/reports/"
		self.client.get(url)

	@task
	def getSomeReports(self):
		start = "2021-01-05"
		end = "2021-10-01"
		url = "http://127.0.0.1:8000/transactions/reports_by_range/"+start+"/"+end+"/"
		self.client.get(url)