##### Import
print "Import Sys"
import sys 
print "Import OS"
import os 
print "import string"
import string
import random 
import cgi
import cgitb
cgitb.enable()

##### Declare Main #########
def main():
	print "Running Main" 
	print ("system Arguments >>", sys.argv)

	arg_number = 1
	args = 0
		
	# for args in sys.argv:
		# print ("Argument" , args)
	
	while arg_number < len(sys.argv):
		print (sys.argv[arg_number]  )
		eval (sys.argv[arg_number]  )
		arg_number = arg_number + 1
		
	
def generateRandom(type, length):
	answer = ""
	if(type =='string'):
		for counter in xrange(length):
			answer += chr(random.randrange(65,90))
	#print(answer)	
	return answer

def generateJSON(file_name, nodes, links):
	print(file_name)
	file_output = open(file_name, "w+")
	file_output.write( '{ "nodes":[' + "\n")
	for counter in xrange(nodes-1):
		file_output.write( '{"name":"' + str(generateRandom('string',5)) +'"' +',"group":' + str(random.randrange(10))+ ',"rating":' + str(random.randrange(5))+'},' "\n")
	file_output.write( '{"name":"' + str(generateRandom('string',5)) +'"' +',"group":' + str(random.randrange(10))+ ',"rating":' + str(random.randrange(5))+'}' "\n")
	
	file_output.write( '],' + "\n" + '"links":[' + "\n")
	
	for count in xrange(nodes/links):
		#print(">>>>>>>>>>>>>>>"+ str(count))
		for counter in xrange(links*2):
			file_output.write('{"source":'
				+str(random.randrange(count*links, count*links+links))+',"target":'
				+str(random.randrange(count*links, count*links+links))+',"value":'
				+str(random.randrange(15))
				+',"distance_weight":'
				+str(random.randrange(10))
				+'},\n')
	
	file_output.write('{"source":'
		+str(random.randrange(nodes))+',"target":'
		+str(random.randrange(nodes))+',"value":'
		+str(random.randrange(15))
		+',"distance_weight":'
		+str(random.randrange(10))
		+'}\n')	
	
	file_output.write( '] }' + "\n")
	
	file_output.close()

def testJquery(parameters):
#the cgi library gets vars from html
	form = cgi.FieldStorage()
	jquery_input = form.getvalue("stuff_for_python", "nothing sent")

	#the next 2 'print' statements are important for web
	print "Content-type: text/html"
	print

	#this is the actual output
	#print jquery_input
	print "????????????????"
		
##### Main invocation #####		
if __name__ == '__main__':
  generateJSON('test.json', 30,5)

  