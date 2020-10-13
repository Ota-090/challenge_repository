# -*- coding: utf-8 -*-
"""
Created on Fri Aug 14 13:22:02 2020

@author: wenbo
"""
# while 
print("*"*9 +"this is for Project 1  method 1: while loop" )
# right angle, angle on the lower left corner

row  = 1
while row <=9:
    col = 1
    while col <=row:
        print('{}*{} = {:<4}'.format(col,row,row*col),end = " ")
        col +=1
    print("")
    row +=1
# right angle, angle on the upper left corner
row  = 9
while row>=1:
    col = 1
    while col<= row:
        print('{}*{} = {:<4}'.format(col,row,row*col),end = " ")
        col +=1
    print("")
    row -=1

# right angle, angle on the lower right corner
row  = 1
while row <= 9 :
    col = 9
    while col>=1:
        if col >row:
            print("{:<10}".format(""),end = " ")
        else:
            print('{}*{} = {:<4}'.format(col,row,row*col),end = " ")
        col -=1
    print("")
    row +=1

# right angle, angle on the upper right corner
row  = 9
while row >=1:
    col =9
    while col>=1:
        if col> row:
            print("{:<10}".format(""),end = " ")
        else:
            print('{}*{} = {:<4}'.format(col,row,row*col),end = " ")
        col -=1
    print("")
    row -=1
            

# for
print("*"*9 +"this is for Project 1  method 2: for loop" )
# right angle, angle on the lower left corner
for row in range(1,10):
    for col in range(1,row+1):
        print('{}*{} = {:<4}'.format(col,row,row*col),end = " ")
    print('')

# right angle, angle on the upper left corner
for row in range(9,0,-1):
    for col in range(1,row+1):
        print('{}*{} = {:<4}'.format(col,row,row*col),end = " ")
    print("")

# right angle, angle on the lower right corner
for row in range(1,10):
    for col in range(9,0,-1):
        if col> row:
            print("{:<10}".format(""),end = " ")
        else:
            print('{}*{} = {:<4}'.format(col,row,row*col),end = " ")
    print('')

# right angle, angle on the upper right corner
for row in range(9,0,-1):
    for col in range(9,0,-1):
        if col >row:
            print("{:<10}".format(""),end = " ")
        else:
           print('{}*{} = {:<4}'.format(col,row,row*col),end = " ")
    print("")


print("*"*9 +"this is for Project 2  method 0: getting the size of a dir" )
import os

def dirsize(filepath):
    size_sum = 0
    filelist = os.listdir(filepath)
    for item in filelist:
        file = os.path.join(filepath,item)
        if os.path.isdir(file):
            size = func(file)
            size_sum += size
        if os.path.isfile(file):
            size_sum += os.path.getsize(file)
    return size_sum
print("*"^19 + "the size is : ")
print(dirsize(r'F:/csdn/week1/model 1 chapter 1/code'),end = "byte")


