import time
from topics.models import *

def doAndtime(funcy):
	start = time.time()
	eval(funcy)
	end = time.time()
	return end-start

x = 0
while x < 300:
	print(str(doAndtime('Action.objects.all()')) + "\t" + str(doAndtime('Action.objects.all().prefetch_related(\'created_by\')')))
	x = x + 1;