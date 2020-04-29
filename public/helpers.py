import os, json

def rename_files(path='', ext='.jpg'):
    n = 0
    files = os.listdir(path)
    for file in files:
        if ext in file:
            os.rename(path + '\\' + file, path + '\\' + 'img' + str(n).rjust(3, '0') + '.jpg')
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

def rename_and_make_json(path=''):
    rename_files(path)
    dir_to_json(path)
    