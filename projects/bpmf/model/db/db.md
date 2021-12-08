# Lokijs database

## Databases

- db0 : 編詞-高頻
- db1 : 編詞-常用

## Structure of documents

- characters
    - character
    - initials
    - media
    - vowel
    - tone
    - wid : ID list of wordDoc
- words
    - word
    - freq
    - pid : 
        - 0 : ID list of characterDoc
        - 1 : ID list of characterDoc
