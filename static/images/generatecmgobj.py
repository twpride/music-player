import os
import json

path = os.path.abspath(os.path.dirname(__file__))

# txt = open(path+'/cmgnames.txt').read()
# a=("\n").join(txt.split())

# output = open(path+'/files.txt', 'w')

# output.write(a)
# output.close()





# card = {}

# for i in a:
#   card[i] = { 
#     "itemCategory": "Side",
#     "itemId": "CMG-1002",
#     "itemName": "Chips",
#     "unitPrice": 1.45,
#     "calories": 540,
#     "customization": []
#   }

# output = open(path+'/cards.txt', 'w', newline='\n')  

# r = json.dumps(card)
# output.write(str(r))


#     outputFile = open(svpath+'/'+header+'_vol_time_cost.csv', 'w', newline='')    
#     outputWriter = csv.writer(outputFile)
#     outputWriter.writerow(['','Bypass + Flowcell','','','','','Bypass','','','','','Flowcell'])



# txt = open(path+'/cmgnames.txt').read()
# a=("\n").join(txt.split())

# output = open(path+'/files.txt', 'w')

# output.write(a)
# output.close()
from pprint import pprint

import csv
tsv_pre = open(path+'/chipotle_menu_raw.tsv').readlines()

tsv = [line.rstrip('\n').split("\t") for line in tsv_pre]
header=tsv[0]
l=len(tsv[1])

res = {}
for i in tsv[1:]:
  entry = {}
  entry = i[0]
  row={}
  for j in range(1,l):
    try:
      if i[j]=="None" or i[j]=="":
        temp = None
      elif j==4:
        try:
          temp = float(i[j])
        except:
          breakpoint()
      elif j==2:
          temp = "cmg-"+i[j]+".png"
      elif j==6:
        temp = i[j].replace('"',"")
        temp = temp.split(",")
      elif j>6:
        temp = True
      else:
        temp = i[j]
      row[header[j]] = temp
    except:
      breakpoint()
  res[i[0]] = row



output = open(path+'/cards.json', 'w')  

r = json.dumps(res)
output.write(str(r))
output.close()
