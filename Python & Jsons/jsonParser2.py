import json
import mysql.connector as sql
from random import *
import string
import time
import random 

def get_random_password(length):
    random_source = string.ascii_letters + string.digits + string.punctuation    # select 1 lowercase
    password = random.choice(string.ascii_lowercase)    # select 1 uppercase
    password += random.choice(string.ascii_uppercase)    # select 1 digit
    password += random.choice(string.digits)
    password += random.choice(string.punctuation)    # select 1 special symbol

    # generate other characters
    length -= 4
    for i in range(length):
        password += random.choice(random_source)

    password_list = list(password)      # shuffle all characters
    random.SystemRandom().shuffle(password_list)
    password = ''.join(password_list)
    return password

jsonData = open('./starting_pois2.json', 'rb').read()
jsonObj = json.loads(jsonData)

hours = []
for i in range(23):
    hours.append(i+1)

db = sql.connect(host = 'localhost', database = 'webdb', user = '1Mentor', password = 'Altair1453')
cursor = db.cursor()

def getLat_longitude(j):
    d = j.get('coordinates')
    lat = d['lat']
    lng = d['lng']
    return lat, lng
def getCurrPopularity(j):
    curr_pop = j.get('current_popularity')
    if curr_pop is not None:
        return curr_pop
    else:
        return 0
def str_time_prop(start, end, time_format, prop):
    stime = time.mktime(time.strptime(start, time_format))
    etime = time.mktime(time.strptime(end, time_format))

    ptime = stime + prop * (etime - stime)

    return time.strftime(time_format, time.localtime(ptime))
def random_date(start, end, prop):
    return str_time_prop(start, end, '%Y-%m-%d %I:%M:%S', prop)

hours = []
for i in range(1,25):
    hours.append('hour_'+f'{i}')

allShops = []
shop = [None] * 11

allPopTimes = []

for j in jsonObj:
    shop[0] = j.get('id')
    shop[1] = j.get('name')
    shop[2] = j.get('address')
    shop[3] = "'" + str(j.get('types')).replace('[','').replace(']','').replace("'",'') + "'"
    shop[4], shop[5] = getLat_longitude(j)
    shop[6] = j.get('rating')
    shop[7] = j.get('rating_n')
    shop[8] = getCurrPopularity(j)
    timeSpent = j.get('time_spent')
    populartimes = j.get('populartimes')
    if timeSpent is not None:
        shop[9], shop[10] = timeSpent[0], timeSpent[1]
    else:
        shop[9], shop[10] = 0, 0
    allShops.append(tuple(shop))
    populartimes = j.get('populartimes')
    id = j.get('id')
    for o in range(7):
        p = populartimes[o]['data']
        p.insert(0, id)
        p.insert(1, populartimes[o]['name'])
        allPopTimes.append(tuple(p))


k = str(allShops).replace('[', '').replace(']', '')
q = f'INSERT INTO POI(id, name, address, types, latitude, longitude, rating, rating_n, currentPopularity, spentTimeFrom, spentTimeTo) VALUES {k};'#bulk insert
cursor.execute(q)

k1 = str(allPopTimes).replace('[', '').replace(']', '')
k2 = str(hours).replace('[', '').replace(']', '').replace("'", '')
cursor.execute(f'INSERT INTO popularTimes(id, day, {k2}) VALUES {k1}') #bulk insert


jsonData1 = open('./first-names.json', 'rb').read()
jsonObjNames = json.loads(jsonData1)

jsonData2 = open('./surnames.json', 'rb').read()
jsonObjSurnames = json.loads(jsonData2)

names = []
allUsers = []

for j in jsonObjNames:
    names.append(j)

c = 0
for j in jsonObjSurnames:
    if c == len(names):
        c = 0
        break
    names[c] = names[c] + f' {j}'
    c += 1


emails = [None] * len(names)
passwords = [None] * len(names)

for j in names:
    emails[c] = j.replace(' ', '') + '@gmail.com'
    c += 1
c = 0

for j in range(len(names)):

    passwords[j] = get_random_password(8)
    allUsers.append((names[j], emails[j], passwords[j]))


v = str(allUsers).replace("[", '').replace("]", '')
cursor.execute(f'INSERT INTO user(username, email, password) VALUES {v}')#bulk insert

allVisits = []
temp = [None] * 4
for i in range(len(emails)):
    x = randrange(0, len(allShops))
    temp[0] = allShops[i%len(allShops)][0]
    temp[1] = emails[i]
    temp[2] = random_date("2022-1-1 1:30:23", "2022-1-10 4:50:12", random.random())
    temp[3] = randrange(0, 300)
    allVisits.append(tuple(temp))


for i in range(1000):
    nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    r = 'OK'
    r = random.choice(nums)
    if r == f'{nums[9]}':
    
        cursor.execute(f'INSERT INTO covid19register VALUES ({i}, NOW())')
    

p = str(allVisits).replace("[", '').replace(']', '')
cursor.execute(f'INSERT INTO visit(idOfPOI, emailOfVisitor, timeOfVisit, estimatedNumOfVisitors) VALUES {p}')

db.commit()
db.close()