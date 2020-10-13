from sqlalchemy import create_engine
import pandas as pd

conn = create_engine('mysql+pymysql://root:12345@localhost:3306/recommend?charset=utf8')

df_data = pd.read_sql(
    'select * from forum;',
    conn,
)

print(df_data.head())

df_data.to_sql(
    'forum3',
    conn,
    index=False,
    if_exists='append',
)



