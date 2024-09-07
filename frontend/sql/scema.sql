-- 조각집 sculpturehouse
create user `sculpturehouse`@`%` identified by 'sculpturehouse';
create database sculpturehouse CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
grant all privileges on sculpturehouse.* to `sculpturehouse`@`%` ;


-- 조각집 sculpturehouse
create user `sculpturehouse`@`localhost` identified by 'sculpturehouse';
grant all privileges on sculpturehouse.* to `sculpturehouse`@`localhost` ;


CREATE TABLE `tbl_group` (
    `groupId` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID 필드',                     
    `name` VARCHAR(255) UNIQUE NOT NULL COMMENT '이름 필드',                              
    `password` VARCHAR(255) NOT NULL COMMENT '비밀번호 필드',                             
    `imageUrl` VARCHAR(2083) DEFAULT NULL COMMENT '이미지 URL 필드',                      
    `isPublic` enum('true','false') NOT NULL DEFAULT 'true' COMMENT '공개 여부 필드',                    
    `likeCount` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '좋아요 개수 필드',               
    `badges` VARCHAR(255) DEFAULT NULL COMMENT '뱃지 필드',                         
    `introduction` TEXT DEFAULT NULL COMMENT '소개 필드',                              
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜 필드', 
    PRIMARY KEY (`groupId`)                                                            
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='그룹 테이블';


CREATE TABLE tbl_posts (
    `postId` INT AUTO_INCREMENT PRIMARY KEY COMMENT '게시물 ID 필드',
    `groupId` INT UNSIGNED NOT NULL COMMENT '그룹 ID 필드',
    `nickname` VARCHAR(255) NOT NULL COMMENT '닉네임 필드',
    `postPassword` VARCHAR(255) NOT NULL COMMENT '비밀번호 필드',                           
    `title` VARCHAR(255) NOT NULL COMMENT '제목 필드',
    `content` TEXT COMMENT '내용 필드',
    `imageUrl` VARCHAR(255) COMMENT '이미지 URL 필드',
    `tags`   VARCHAR(255) COMMENT '태그 필드 ',
    `location` VARCHAR(255) COMMENT '위치 필드',
    `moment` VARCHAR(25) COMMENT '날짜 필드',
    `isPublic` enum('true','false') NOT NULL DEFAULT 'true' COMMENT '공개 여부 필드', 
    `likeCount` INT DEFAULT 0 COMMENT '좋아요 개수 필드',
    `commentCount` INT DEFAULT 0 COMMENT '댓글 개수 필드',
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜 필드',
    CONSTRAINT fk_group FOREIGN KEY (groupId) REFERENCES tbl_group(groupId) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='게시물 테이블';


CREATE TABLE tbl_comments (
    `commentId` INT AUTO_INCREMENT PRIMARY KEY COMMENT '댓글 ID 필드',
    `postId` INT  NOT NULL COMMENT '게시물 ID 필드',    
    `nickname` VARCHAR(255) NOT NULL COMMENT '닉네임 필드',
    `content` TEXT NOT NULL COMMENT '댓글 텍스트',
    `password` VARCHAR(255) NOT NULL COMMENT '비밀번호 필드',               
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜 필드',
    CONSTRAINT fk_posts FOREIGN KEY (postId) REFERENCES tbl_posts(postId) ON DELETE CASCADE
);



CREATE TABLE tbl_images (
    `imageId` INT AUTO_INCREMENT PRIMARY KEY COMMENT '이미지 ID 필드',
    `imageUrl` VARCHAR(255) NOT NULL COMMENT '이미지 URL 필드',
     `type`   enum('group', 'post') NOT NULL COMMENT 'group, post ID 필드',
    `typeId`  INT COMMENT 'group, post ID 필드',
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '생성 날짜 필드'    
);




--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- 
--- 더미 데이터 작업
INSERT INTO tbl_group (name, password, imageUrl, isPublic, likeCount, badges, introduction)
SELECT 
    CONCAT('Group_', LPAD(ROW_NUMBER() OVER (ORDER BY RAND()), 4, '0')) AS name,
    '1111' AS password,
    CONCAT('https://picsum.photos/336?random=', FLOOR(RAND() * 1000)) AS imageUrl,
    IF(RAND() > 0.5, 'true', 'false') AS isPublic,
    FLOOR(RAND() * 1000) AS likeCount,
    CASE 
        WHEN RAND() < 0.2 THEN '7days'
        WHEN RAND() < 0.4 THEN 'posts-20-register'
        WHEN RAND() < 0.6 THEN 'group-1years'
        WHEN RAND() < 0.8 THEN 'group-10k-likes'
        ELSE 'posts-10k-likes'
    END AS badges,
    CONCAT('This is the introduction for group ', LPAD(ROW_NUMBER() OVER (ORDER BY RAND()), 4, '0')) AS introduction
FROM
    (SELECT 1 FROM DUAL UNION ALL SELECT 2 FROM DUAL UNION ALL SELECT 3 FROM DUAL UNION ALL SELECT 4 FROM DUAL UNION ALL SELECT 5 FROM DUAL) t1,
    (SELECT 1 FROM DUAL UNION ALL SELECT 2 FROM DUAL UNION ALL SELECT 3 FROM DUAL UNION ALL SELECT 4 FROM DUAL UNION ALL SELECT 5 FROM DUAL) t2,
    (SELECT 1 FROM DUAL UNION ALL SELECT 2 FROM DUAL UNION ALL SELECT 3 FROM DUAL UNION ALL SELECT 4 FROM DUAL UNION ALL SELECT 5 FROM DUAL) t3,
    (SELECT 1 FROM DUAL UNION ALL SELECT 2 FROM DUAL UNION ALL SELECT 3 FROM DUAL UNION ALL SELECT 4 FROM DUAL UNION ALL SELECT 5 FROM DUAL) t4
LIMIT 500;





---- 게시물 데이터 작업
DELIMITER $$

CREATE PROCEDURE insert_posts_per_group()
BEGIN
    DECLARE v_groupId INT;
    DECLARE v_counter INT DEFAULT 0;

    -- CURSOR를 사용하여 tbl_group의 모든 groupId를 순회
    DECLARE done INT DEFAULT 0;
    DECLARE group_cursor CURSOR FOR SELECT groupId FROM tbl_group;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN group_cursor;

    read_loop: LOOP
        FETCH group_cursor INTO v_groupId;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- 각 그룹마다 10개의 post 데이터 삽입
        SET v_counter = 0;
        WHILE v_counter < 10 DO
            INSERT INTO tbl_posts (groupId, nickname, postPassword, title, content, imageUrl, tags, location, moment, isPublic, likeCount, commentCount)
            VALUES (
                v_groupId,
                CONCAT('User_', LPAD(FLOOR(RAND() * 10000), 4, '0')),
                '1111',
                CONCAT('Title_', LPAD(FLOOR(RAND() * 10000), 4, '0')),
                CONCAT('This is the content of post ', LPAD(FLOOR(RAND() * 10000), 4, '0')),
                CONCAT('https://picsum.photos/336?random=', FLOOR(RAND() * 1000)),
                CONCAT('Tag_', LPAD(FLOOR(RAND() * 10000), 4, '0')),
                CONCAT('Location_', LPAD(FLOOR(RAND() * 10000), 4, '0')),
                CONCAT('2024-08-', LPAD(FLOOR(RAND() * 28) + 1, 2, '0')),
                IF(RAND() > 0.5, 'true', 'false'),
                FLOOR(RAND() * 500),
                FLOOR(RAND() * 50)
            );
            SET v_counter = v_counter + 1;
        END WHILE;
    END LOOP;

    CLOSE group_cursor;
END $$

DELIMITER ;





CALL insert_posts_per_group();








--- 댓글 더미데이터 작업

DELIMITER $$

CREATE PROCEDURE insert_comments_per_post()
BEGIN
    DECLARE v_postId INT;
    DECLARE v_counter INT DEFAULT 0;

    -- CURSOR를 사용하여 tbl_posts의 모든 postId를 순회
    DECLARE done INT DEFAULT 0;
    DECLARE post_cursor CURSOR FOR SELECT postId FROM tbl_posts;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN post_cursor;

    read_loop: LOOP
        FETCH post_cursor INTO v_postId;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- 각 게시물마다 10개의 댓글 데이터 삽입
        SET v_counter = 0;
        WHILE v_counter < 10 DO
            INSERT INTO tbl_comments (postId, nickname, content, password, createdAt)
            VALUES (
                v_postId,
                CONCAT('Commenter_', LPAD(FLOOR(RAND() * 10000), 4, '0')),
                CONCAT('This is a comment content ', LPAD(FLOOR(RAND() * 10000), 4, '0')),
                '1111',
                NOW() - INTERVAL FLOOR(RAND() * 100) DAY
            );
            SET v_counter = v_counter + 1;
        END WHILE;
    END LOOP;

    CLOSE post_cursor;
END $$

DELIMITER ;

CALL insert_comments_per_post();






