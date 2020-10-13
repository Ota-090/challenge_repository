import pymongo

client = pymongo.MongoClient()

# db = client.get_database('db1')
# c = db.get_collection('c1')
# c.insert_one(
#     {'username':'aaaa','password':'bbb','age':10}
# )

db2 = client.get_database('db2')

c = db2.get_collection('c2')

# c.insert_one(
#     {'username':'aaa'}
# )

# c.insert_many(
#     [
#         {'username':1111,'password':'12121123'},
#         {'username': 1111, 'password': '12121123'},
#         {'username': 1111, 'password': '12121123'},
#         {'username': 1111, 'password': '12121123'},
#     ]
# )
# select * from table

ret = c.find()
print(ret)
for data in ret:
    print(data)


# if __name__ == '__main__':
#     mongodb = {
#         'db1':{
#             'c1':[
#                 {'username':'...','password':'...'},
#                 {'username': '...', 'password': '...'},
#                 {'username': '...', 'password': '...','age':10,},
#             ]
#         }
#     }


