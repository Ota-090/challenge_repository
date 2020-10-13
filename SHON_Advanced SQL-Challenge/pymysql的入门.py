import pymysql

conn = pymysql.Connect(
    host='localhost',
    port = 3306,
    user = 'root',
    password = '12345',
    database='recommend',
    charset='utf8',
)

cs = conn.cursor()

cs.execute(sql)
conn.commit()