# Prompt company Web service
Prompt company web service for project management

## Table of Contents
1. [Project Configuration](#1-project-configuration)
2. [Requirements](#2-requirments)
3. [ER diagram](#3-er-diagram)
4. [Sequence/Index](#4-sequenceindex)
5. [Development status](#5-development-status)

[Screenshot](#screenshot)

## 1. Project Configuration
<img width="930" alt="스크린샷 2022-07-15 오후 5 34 13" src="https://user-images.githubusercontent.com/43008762/179185895-b17619de-62ff-4576-a3d6-983ad47bb71a.png">

## 2. Requirments
| ID | Requirment's name |
| ------ | ------ |
| REQ-001 | Register and Modify employee information |
| REQ-002 | Search employee information(Manager) |
| REQ-003 | Search for employee projects(Manager) |
| REQ-004 | Project Management(Manager) |
| REQ-005 | Search Project Duration(Manager) |
| REQ-006 | Project Registration(PM) |
| REQ-007 | Set project participation status |
| REQ-008 | Project Staff Job Settings(PM) |
| REQ-009 | Modifying project information(PM) |
| REQ-010 | Revise project budget(Manager) |

## 3. ER diagram
<img width="586" alt="스크린샷 2022-07-15 오후 11 46 00" src="https://user-images.githubusercontent.com/43008762/179247543-e4d6b980-28c9-4e9c-80c6-4e57466d6e41.png">


## 4. Sequence/Index
**#Sequence**

<img width="358" alt="스크린샷 2022-07-15 오후 11 49 57" src="https://user-images.githubusercontent.com/43008762/179248219-d84e904f-8ede-45c3-b925-ce3ec2673a93.png">

> ID of all tables is generated using MySql sequence.

**#Index**

The columns used for the query create an index.

```
CREATE INDEX IDX_ENAME ON employee(emp_name);
```
> Ref is used when searching with quality criteria when not primary key or unique (far better performance than full scan).
```
CREATE INDEX IDX_PERIOD ON project(proj_start_date, proj_end_date);
```
> range is the same as index range scan of orcle.

## 5. Development status
- Implement permission isolation settings using passport-local.
  - Store userid in session using serializeUser function.
  - Set permission isolation by obtaining user information using the deserializeUser function.
- Encrypt password and save using Bcrypt.
- Implementation of pagination in case of increased staffing.

# Screenshot
![화면-기록-2022-07-16-오전-1 08 17](https://user-images.githubusercontent.com/43008762/179264567-7841d8aa-3d9e-4572-9089-f9eea4af726b.gif)
