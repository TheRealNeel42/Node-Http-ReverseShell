# Overview

This is a very simple implementation of a HTTP reverse shell.  The server is written in Nodejs and since it communicates over a rudimentary REST API agents can be written in almost any language.  

This implementation is not intended to have any real world uses as it lacks most all functionality you would desire from a reverse shell such as encryption, persistance, etc. 

## Installation

The server has only been tested in Linux but with some tweaks should run on windows without an issue. 

Installing Nodejs and Express should be all you need to get this running.  

## Usage

Start the server on your machine, then start the agent of your choice on the target machine.  Thats all!
