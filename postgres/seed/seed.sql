BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Yonatan', 'yonitint1@gmail.com', 5, '2024-01-01');
INSERT into login (hash, email) values ('$2a$10$DlM1ssIUgZuRwZTnDqrEpO1nzJPZzrUOZ8zhr/ntPuF4pPlJPmA5i', 'yonitint1@gmail.com');

COMMIT;