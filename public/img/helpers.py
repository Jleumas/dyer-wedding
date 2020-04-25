import os, json

def rename_files(ext='.jpg'):
    n = 0
    files = os.listdir()
    for file in files:
        if ext in file:
            os.rename(file, 'img'+str(n)+'.jpg')
            n += 1

def dir_to_json(path=''):
    if os.path.exists(path + '\\' + 'photos.json'):
        os.remove(path + '\\' + 'photos.json')

    if path:
        files = os.listdir(path)
    else:
        files = os.listdir()

    with open(path + '\\' + 'photos.json', 'w+') as f:
        f.write('{"photos": \n\t')
        json.dump(obj=files, fp=f, indent=4, sort_keys=True)
        f.write('\n}')
        f.close()