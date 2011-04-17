#!/usr/bin/env python2.6

import json
import random

print "Content-Type: text/javascript;charset=utf-8"
print

a = []
for x in range( random.randrange(5, 25) ):
	a.append({ 
		"guid": x,    
		"firstName": random.choice(["John", "Mike", "Doug", "Ralph"]),
		"middleName": random.choice(["A", "B", "C", "D", "E", "F"]),
		"lastName": "Query",
		"street": "",
		"city": random.choice(["Nashville", "Boston", "Las Vegas", "San Diego", "New York", "Little Rock", "Detroit", "Denver"]),
		"state": random.choice(["TN", "CA", "MA", "NY", "AR", "AZ", "CO"]),
		"zip": "",
		"country": random.choice(["USA", "Belgium", "Germany"])
	})

print json.dumps({ "contacts": a })

