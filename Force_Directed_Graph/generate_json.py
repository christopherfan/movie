##### Import
print "Import Sys"
import sys 
print "Import OS"
import os 
print "import string"
import string
import random 

#### Exercise 9.1

def ex9_1():
	print "Running Exercise 9"
	fin = open('words.txt')
	file_output = open('output_test.txt', "w")
	size = 0
	for line in fin:
		read_word = line.strip()
		size = size+1
		if len(read_word) >20:	
			print read_word
		else:
			file_output.write(read_word + "\n")
	print "Size of words: " + str(size)
	fin.close()
	file_output.close()
#### Exercise 9.2 #####

def write_random(file_name):
	file_output = open(file_name, "w+")
	for counter in xrange(10):
		file_output.write(str(random.randrange(1000)) + "\n")
	
	file_output.close()

	
###################################
def check_e(file_input, file_output):
	file_read = open(file_input, "r")
	file_write = open(file_output, "w+")
	counter = 0
	answer_string = []
	for line in file_read:
		read_word = line.strip()
		if "e" in  read_word.lower():
			counter += 1
			answer_string.append(read_word)
	
	print "Answer: ", counter, answer_string
	file_write.write("There are " + str(counter) + " names \n")
	file_write.write("They are: \n")
	file_write.write(str(answer_string))
	file_read.close()
	file_write.close()

##############################	
def ex9_3():

	print "Running Exercise 9.3" 
	#word = raw_input("Enter Word: " )
	string_words = raw_input( "Enter Forbidden letters: ")
	fin = open('words.txt')
	size = 0
	answer_list = []
	#print ("Answer: ", avoids(word, string_words)) 
	for line in fin:
		read_word = line.strip()
		if  avoids(read_word,string_words):
			size = size + 1
			answer_list.append(read_word)
	
	fin.close()
	#print answer_list
	print "Total= " + str(size)

	
def avoids(word, string_letters):
	answer = True
	for char in string_letters.lower():
		if char in word.lower():
			answer = False 
	
	
	return answer 
############# Exercise 9_5 ######

def ex9_5():
	print "Running Exercise 9.5"
	string_words = raw_input( "Enter Required letters: ")
	fin = open('words.txt')
	size = 0
	answer_list = []
	#print ("Answer: ", avoids(word, string_words)) 
	for line in fin:
		read_word = line.strip()
		if  uses_all(read_word,string_words):
			size = size + 1
			answer_list.append(read_word)
	
	fin.close()
	#print answer_list
	print "Total= " + str(size)	
def uses_all(word, letter_string):
	answer = False
	for char in letter_string.lower():
		if char in word.lower():
			answer = True
		else:
			answer = False 
	#print answer
	return answer 
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
	print(answer)
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
		print(">>>>>>>>>>>>>>>"+ count)
		for counter in xrange(links):
			file_output.write('{"source":'
				+str(random.randrange(count*links, count+links))+',"target":'
				+str(random.randrange(count*links, count+links))+',"value":'
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

##### Main invocation #####		
if __name__ == '__main__':
  main()

  