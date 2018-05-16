# Firestore Backup / Restore
Firestore Cloud simple tool for backup (export) / restore (import)

## Installation
Provide `serviceAccountKey.json` to root directory with Firebase credentials. You can generate this file by going: Project Settings -> Service Accounts -> Firebase Admin SDK -> Generate New Private Key -> Generate Key
(more on this here: https://firebase.google.com/docs/firestore/quickstart)

Then:
`npm install`

## Usage
Start with:
```node index [options]```

** Note: In restore mode, selected collection will be emptied first **

Options:
* `backup` or `b` - Backup mode
* `restore` or `r` - Restore mode
* `--collection` or `-c` - Name of collection to backup / restore
* `--file` or `-f` - Name of the file to save / read json data. If no file name provided default is collection name.

Example:

`node index backup -c col1 -f col1.json` will backup col1 into col1.json

`node index restore -c col1` will restore col1 from col1.json

Exemplary collection file structure:
```[
  {
    "id": "1",
    "data": "test 1"
  },
  {
    "id": "2",
    "data": "test 2"
  }
]```
