import os
files = []


def find(dir_name, origin=None, replace=None, dir_only=True):
    if origin is None:
        origin = dir_name
    result = []
    if not os.path.exists(dir_name):
        return []
    li = os.listdir(dir_name)
    for i in li:
        path = os.path.join(dir_name, i)
        if os.path.isdir(path):
            result.extend(find(path, origin, replace, dir_only))
            continue
        if replace is not None and path.startswith(origin):
            if len(replace) != 0:
                path2 = path[len(origin):]
            else:
                path2 = path[len(origin) + 1:]
            path2 = replace + path2
            if dir_only:
                result.append((path, os.path.dirname(path2)))
            else:
                result.append((path, path2))
        else:
            if dir_only:
                result.append((path, os.path.dirname(path)))
            else:
                result.append((path, path))
    return result


files.extend(find('public'))
files.extend(find('../dist/chrome', replace='chrome'))
print(files)

files = []

files.extend(find('dist/server', replace='', dir_only=False))
print(files)
file_list = []
for file in files:
    file_list.append(f'file "{file[1]}"')
file_list_str = '\n'.join(file_list)
print(file_list_str)
with open("install_files.txt", 'w') as f:
    f.write(file_list_str)

"{s}".format(s='s')