# importing csv module
import csv
 
# csv file name
file1 = "C:\\Users\\User\\Documents\\GitHub\\KampungAdmiralty\\KampungAdmiralty\\Stacked_area_chart\\Typical_Employee_level-minutes.csv"
file2 = "C:\\Users\\User\\Documents\\GitHub\\KampungAdmiralty\\KampungAdmiralty\\Stacked_area_chart\\Typical_Resident_level-minutes.csv"
file3 = "C:\\Users\\User\\Documents\\GitHub\\KampungAdmiralty\\KampungAdmiralty\\Stacked_area_chart\\Typical_Visitor_level-minutes.csv"
changefile = "C:\\Users\\User\\Documents\\GitHub\\KampungAdmiralty\\KampungAdmiralty\\Circular_packing\\edited_data.csv"

with open(changefile, 'r+', newline='') as outfile:
    with open(file1, 'r') as empfile:
        with open(file2, 'r') as resfile:
            with open(file3, 'r') as visfile:
            # creating a csv reader object and reading data
             csvreader = csv.reader(outfile)
             lines = list(csvreader) 
             csvwriter = csv.writer(outfile)
             csv1 = csv.reader(empfile)
             data1 = list(csv1)
             csv2 = csv.reader(resfile)
             data2 = list(csv2)
             csv3 = csv.reader(visfile)
             data3 = list(csv3)
             # on the same day to calculate maximum and minimum decimal time
             for row in lines:
                 min1=1440
                 max1=0
                 for row1 in data1:
                    if row1[2] == row[1]:
                        if int(row1[9]) <= min1:
                            min1 = int(row1[9])
                        if int(row1[9]) >= max1:
                            max1 = int(row1[9])                    
                 if max1 - min1 != -1440:
                     row[2] = (max1 - min1)
                 else:
                     row[2] = 0                 
                 #print( " min = ", min1, " max = ", max1)
                 min2=1440
                 max2=0
                 for row2 in data2:
                    if row2[2] == row[1]:
                        if int(row2[9]) <= min2:
                            min2 = int(row2[9])
                        if int(row2[9]) >= max2:
                            max2 = int(row2[9])                    
                 if max2 - min2 != -1440:
                     row[3] = (max2 - min2)
                 else:
                     row[3] = 0
                 min3=1440
                 max3=0
                 for row3 in data3:
                    if row3[2] == row[1]:
                        if int(row3[9]) <= min3:
                            min3 = int(row3[9])
                        if int(row3[9]) >= max3:
                            max3 = int(row3[9])                    
                 if max3 - min3 != -1440:
                     row[4] = (max3 - min3)
                 else:
                     row[4] = 0
                 row[5] = row[2] + row[3] + row[4]
        #write the data
        outfile.truncate(0)
        csvwriter.writerows(lines)  
        print("Done")

            


