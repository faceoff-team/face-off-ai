from os import walk

count = 0

for subdir, dirs, files in walk('/Users/dommiller88/Documents/GitHub/face-off-ai/model/modified_data'):
    for file in files:
        if (file.endswith('.jpg')):
            count += 1
print(f'Count: {count}')
if (count >= 15000):
    print('Pass')
else:
    print('Fail')
            
        