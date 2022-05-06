BEGIN TRANSACTION;

insert into users (name, email, entries, joined) values ('Aki', 'aki@gmail.com', 0, '2022-05-06');
insert into login (hash, email) values ('$2a$10$lBHzpQLiZ0pBqQZ0on6CiuyE8B5uI3VnBBqFXiC7GQHPR1TGoF.lC', 'aki@gmail.com');

COMMIT;