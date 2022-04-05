# importing csv module
import csv
 
# csv file name
file1 = "C:\\Users\\User\\Documents\\GitHub\\KampungAdmiralty\\KampungAdmiralty\\Edited_Data\\Typical_Employee_copy.csv"
file2 = "C:\\Users\\User\\Documents\\GitHub\\KampungAdmiralty\\KampungAdmiralty\\Edited_Data\\Typical_Resident_copy.csv"
file3 = "C:\\Users\\User\\Documents\\GitHub\\KampungAdmiralty\\KampungAdmiralty\\Edited_Data\\Typical_Visitor_copy.csv"
changefile = "C:\\Users\\User\\Documents\\GitHub\\KampungAdmiralty\\KampungAdmiralty\\Edited_Data\\data_space_change.csv"
 
with open(changefile, 'r') as csvfile:
    with open(file1, 'r+', newline='') as empfile:
       # creating a csv reader object
       csvreader = csv.reader(csvfile)
       lines = list(csvreader) 
       csv1 = csv.reader(empfile)
       writer1 = csv.writer(empfile)
       data1 = list(csv1)
       #print("data length =", len(data1))
       #print("line length =", len(lines))
       #if conditioning
       for row1 in data1:
          for row in lines:
            if row1[3] == row[2]:
               #print('The space', row1[3])
               row1[3] = row[3]
               #print('is changed to', row1[3], '\n')
       empfile.truncate(0)
       #print("data length =", len(data1))
       writer1.writerows(data1)   
    #print("Done")
    with open(file2, 'r+', newline='') as visfile:
       # creating a csv reader object
       csv2 = csv.reader(visfile)
       writer2 = csv.writer(visfile)
       data2 = list(csv2)
       for row2 in data2:
          for row in lines:
            if row2[3] == row[2]:
               #print('The space', row1[3])
               row2[3] = row[3]
               #print('is changed to', row1[3], '\n')
       visfile.truncate(0)
       #print("data length =", len(data1))
       writer2.writerows(data2)
    with open(file3, 'r+', newline='') as resfile:
       # creating a csv reader object
       csv3 = csv.reader(resfile)
       writer3 = csv.writer(resfile)
       data3 = list(csv3)
       for row3 in data3:
          for row in lines:
            if row3[3] == row[2]:
               #print('The space', row1[3])
               row3[3] = row[3]
               #print('is changed to', row1[3], '\n')
       resfile.truncate(0)
       #print("data length =", len(data1))
       writer3.writerows(data3)
       print("Done")