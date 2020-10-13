# -*- coding: utf-8 -*-
"""
Created on Fri Aug 14 21:38:49 2020

@author: wenbo
"""

'''
    用户信息管理系统
    1.用户信息数据源
    2.查看用户信息
    3.添加用户信息
    4.删除用户信息
    5.退出系统
    6.界面和交互
    7. 存款与取款

'''
# 1.用户信息数据源
user_list = [
    {'name':'zhangsan','balance':20,'userid':'User_01'},
    {'name':'lisi','balance':28,'userid':'User_02'},
    {'name':'wangwu','balance':31,'userid':'User_03'}]

# 2.查看用户信息
def show_users_info():
    '''

    :return:
    '''
    if len(user_list)==0:
        print('='*20,'没有用户信息','='*20)
        return

    print('|{0:<5}|{1:<10}|{2:<10}|{3:<10}|'.format('sid','name','balance','userid'))
    print('-'*40)
    for i, stu_dict in enumerate(user_list):
        print('|{0:<5}|{1:<10}|{2:<10}|{3:<10}|'.format(i+1,stu_dict['name'],stu_dict['balance'],stu_dict['userid']))



# 3.添加用户信息
def add_user(name,balance,userid):
    user_dict = {}
    user_dict['name'] = name
    user_dict['balance'] = balance
    user_dict['userid'] = userid
    user_list.append(user_dict)

# 4.删除用户信息
def del_user(sid):
    sid_int = int(sid)
    user_list.pop(sid_int-1)

# 5.退出系统
def loginOut():
    pass


def save_or_get(index):
    print('{:10} {:5} {:5}'.format(' 您的操作是','1. 存款','2. 取款'))
    ent = input('请输入对应的选择')
    if ent == '1':
        print('='*12,'请输入操作金额','='*12)
        money = input("￥")
        try:
            the_money = float(money)
        except:
            print("请键入正确的金额")
            save_or_get(index)
        else:
            user_list[index]['balance'] += the_money
            print(" 操作成功")
        
        
        show_users_info()
        input('按回车继续：')
    elif ent == '2':
        print('='*12,'请输入操作金额','='*12)
        now_money = user_list[index]['balance']
        print('='*12,'请输入操作金额','='*12)
        money = input("￥")
        try:
            the_money = float(money)
        except:
            print("请键入正确的金额")
            save_or_get(index)
        else:
            if now_money < the_money:
                print("金额不足")
                save_or_get(index)
            else:
                user_list[index]['balance'] -= the_money
                print(" 操作成功")
                show_users_info()
                input('按回车继续：')

        
        
        
        
        
        
        
    else:
        print("Wrong input:(  Please do it again")
        save_or_get(index)
    
    



def find_user(account):
    counter = 0
    index = 0
    for i in range(0,len(user_list)):
        if account == user_list[i]["userid"]:
            counter +=1
            index = i
            print("*"*12)
    if counter == 0:
        print("user not exit")
        input('按回车继续：')
    else:
        print("This is your account information: ")
        print(user_list[index])
        print("=="*10)
        save_or_get(index)
        
    
    
    


def now_balance():
    pass


# 测试 2.查看用户信息
# show_users_info()

# 测试 3.添加用户信息
# add_user('yh',18,'Python04')
# show_users_info()

# 测试 4.删除用户信息
# del_user(3)
# show_users_info()


# 6.界面和交互

while True:
    # 输出初始界面
    print('='*12,'用户管理系统','='*12)
    print('{:1} {:13} {:15}'.format(' ','1. 查看用户信息','2. 添加用户信息'))
    print('{:1} {:13} {:15}'.format(' ', '3. 删除用户信息', '4. 存款与取款'))
    print('{:1} {:13} {:15}'.format(' ', '5. 退出系统',''))
    print('='*40)
    key = input('请输入对应的选择')
    # 根据输入操作值，执行对应操作
    if key == '1':
        print('='*12,'用户信息浏览','='*12)
        show_users_info()
        input('按回车继续：')
    elif key == '2':
        print('=' * 12, '添加用户信息', '=' * 12)
        name = input('请输入姓名：')
        balance = input('请输入金额：')
        userid = input('请输入ID：')
        add_user(name,balance,userid)
        show_users_info()
        input('按回车继续：')
    elif key == '3':
        print('=' * 12, '删除用户信息', '=' * 12)
        show_users_info()
        sid = input('请输入要删除用户的sid')
        del_user(sid)
        show_users_info()
        input('按回车继续：')
    elif key == '4':
        print('=' * 12, '存款取款服务', '=' * 12)
        account = input("键入用户ID： ")
        find_user(account)
              
            
    elif key == '5':
        loginOut()
        print('=' * 12, '再见', '=' * 12)
        break
    else:
        print('=' * 12, '操作无效', '=' * 12)
