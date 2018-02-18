import re
import os
import sys
import json
from pprint import pprint

#Load JSON from file
players = json.load(open('rawplayerjsons.json'))

#Create dictionary, {Fullname : Id}
playerDict = {}
for player in players:
	playerDict[player['firstName'] + ' ' + player['lastName']] = player['playerId']

playerJSON = json.dumps(playerDict)

print(playerJSON)




			



