CREATE TABLE tasks (
    id BIGINT PRIMARY KEY, 
    title VARCHAR(255), 
    description TEXT, 
    createdAt Date
)

-- selecting
select title, id from tasks


select * from tasks

-- adding
insert into tasks values (5, shalaa ugaa)


insert into tasks values (6, toosoo soruul)
-- 


-- deleting
delete from taks where id = 5

-- changing updating
update tasks set title = 'bi ugaamaargui bna' where id = 6


-- drop table to delete table
drop table tasks