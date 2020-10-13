import pymysql

conn = pymysql.Connect(
    host='localhost',
    port = 3306,
    user = 'root',
    password = '12345',
    database='recommend',
    charset='utf8',
)


cs = conn.cursor(pymysql.cursors.DictCursor)
sql = 'select * from forum limit 0,2;'
cs.execute(sql)

# datas =cs.fetchall()
# for data in datas:
#     print(data)
# datas = cs.fetchmany(2)
# datas =cs.fetchall()
# for data in datas:
#     print(data)

# data = cs.fetchone()
# print(data)

# datas = cs.fetchmany(1)
# print(datas)
# datas = cs.fetchmany(1)
# print(datas)
# datas = cs.fetchmany(1)
# print(datas)
