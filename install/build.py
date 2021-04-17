import os
template = 'build.nsi'
target = 'build_target.nsi'

size_all = 0


def my_format(data: str, replace: dict):
    for k in replace:
        target = '{{' + k + '}}'
        data = data.replace(target, str(replace[k]))
    return data


def find(dir_name, origin=None, replace=None, dir_only=True):
    global size_all
    if origin is None:
        size_all = 0
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
        size_all += os.path.getsize(path)
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


def main():
    files = []
    add_files = []
    delete_files = []
    delete_file_dirs = []
    files = find("dist")
    for file in files:
        add_files.append(f'file "{file[0]}"')
    files = find("dist", replace="", dir_only=False)
    for file in files:
        delete_files.append(f'  delete "$INSTDIR\\{file[1]}"')
        tmp = os.path.dirname(file[1])
        while len(tmp) > 0:
            delete_file_dirs.append(f'  rmDir "$INSTDIR\\{tmp}"')
            tmp = os.path.dirname(tmp)
        # if len(os.path.dirname(file[1])) > 0:
        #     delete_file_dirs.append(f'  rmDir "{os.path.dirname(file[1])}"')
    delete_file_dirs = list(set(delete_file_dirs))
    delete_file_dirs.sort(reverse=True)

    with open(template, 'r', encoding='gbk') as f:
        file_data = f.read()
        file_data = my_format(file_data, {
            'version_major': 0,
            'version_minor': 1,
            'version_build': 1,
            'install_size': size_all // 1000,
            # 'add_files': '\n'.join(add_files),
            # 'delete_files': '\n'.join(delete_files)
            'add_files': 'file /r dist\\*',
            'delete_files': '\n'.join(delete_files),
            'delete_file_dirs': '\n'.join(delete_file_dirs)
        })
        with open(target, 'w', encoding='gbk') as t:
            t.write(file_data)


if __name__ == '__main__':
    main()
