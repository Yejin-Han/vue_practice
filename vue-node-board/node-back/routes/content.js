const router = require('express').Router();
const mysql = require('mysql2');
const db = require('.././models');
const Op = require('sequelize').Op; // 검색 기능을 위해
const multer = require('multer'); // 이미지 업로드 기능을 위해
const fs = require('fs'); // 이미지 업로드 기능을 위해

// multer을 이용한 파일 업로드 기능 구현
const storage = multer.diskStorage({
  destination: function(req, file, cb) { // 경로 => uploads 폴더
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) { // 파일명 => 이미지 업로드 시 원본 이름 그대로
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

db.sequelize.sync();

// 글 작성
router.post('/write', function(req, res) {
  db.content.create({ // 게시판번호와 게시글정보를 req.body로 받아와 db에 삽입
    boardnum: req.body.boardnum,
    writer: req.body.writer,
    title: req.body.title,
    text: req.body.text,
    imgcnt: req.body.imgcnt,
  }).then(function() {
    return res.status(200).json({ message: '글 작성 완료!' });
  }).catch(function(err) {
    console.log(err);
    return res.status(404).json({ message: '에러' });
  });
});

// 게시글 불러오기
router.post('/boardlist', function(req, res) {
  db.content.findAll({
    where: {
      boardnum: req.body.boardnum // 게시판 별로 db가 따로 있는게 아니여서 게시판 번호 필요
    },
    offset: 0 + (req.body.page - 1) * 10, // 현 페이지에 맞는 글 찾기
    limit: 10, // 글 10개만 가져오기
    order: [['id', 'DESC']], // id를 기준으로 오름차순 정렬
    raw: true, // db에서 field 정보만 가져오는 설정
  }).then(result => {
    return res.status(200).json(result);
  }).catch(err => {
    console.log(err);
    return res.status(404).json({ message: '에러' });
  });
});

// 해당 게시판의 게시글 개수 가져오기
router.post('/boardlistcnt', function(req, res) {
  db.content.findAndCountAll({ // 이 때 결과는 result.rows, 개수는 result.count로 받아옴
    where: {
      boardnum: req.body.boardnum
    },
    raw: true,
  }).then(result => {
    return res.status(200).json(result.count);
  }).catch(err => {
    console.log(err);
    return res.status(404).json({ message: '에러' });
  });
});

// 게시글 보기
router.post('/content', function(req, res) {
  db.content.findOne({ // id에 맞는 게시글 정보 하나만 불러오면 됨
    where: {
      id: req.body.id
    },
    raw: true,
  }).then(result => {
    if(!result.text || result.text.trim() === '') { // 아예 내용이 없거나 공백을 제거했을 때 아무것도 남지 않는 경우
      result.text = `(내용이 없습니다)`;
    }

    return res.status(200).json(result);
  }).catch(err => {
    console.log(err);
    return res.status(404).json({ message: '에러' });
  });
});

// 게시글 삭제
router.post('/delete', function(req, res) {
  const postId = req.body.id;

  // 데이터베이스에서 게시글 삭제
  db.content.destroy({
    where: {
      id: postId
    },
  }).then(function() {
    // 연관된 이미지 파일들도 삭제
    const uploadDir = path.join(__dirname, '../uploads');

    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        console.error("디렉토리 읽는 중 에러 발생: ", err);
        return res.status(500).json({ message: '이미지 파일 삭제 중 에러 발생' });
      }

      // postId와 일치하는 모든 이미지 파일 찾기
      const relatedFiles = files.filter(file => file.startsWith(`${postId}-`));
      
      // 관련 이미지 파일들 삭제
      relatedFiles.forEach(file => {
        fs.unlink(path.join(uploadDir, file), err => {
          if (err) {
            console.error(`${file} 삭제 중 에러 발생:`, err);
          } else {
            console.log(`${file} 삭제 완료`);
          }
        });
      });

      return res.status(200).json({ message: '글 삭제 완료!' });
    });
  }).catch(err => {
    console.log(err);
    return res.status(404).json({ message: '에러' });
  });
});

// 게시글 수정
router.post('/edit', function(req, res) {
  db.content.update({ text: req.body.text }, {
    where: {
      id: req.body.id
    },
  }).then(function() {
    return res.status(200).json({ message: '글 수정 완료!' });
  }).catch(err => {
    console.log(err);
    return res.status(404).json({ message: '에러' });
  });
});

// 검색 기능 (특정단어를 포함하는 검색)
router.post('/search', function(req, res) {
  if(req.body.searchoption == '제목') { // 검색옵션이 제목일 때
    db.content.findAndCountAll({
      where: {
        title: {
          // "%" + [단어] + "%"를 통해 [단어]가 포함된 모든 것 검색 가능
          [Op.like]: "%" + req.body.searchkeyword + "%"
        }
      },
      order: [['id', 'ASC']],
      raw: true,
    }).then(result => {
      const cnt = new Object();
      cnt.cnt = result.count;
      result.rows.push(cnt);

      return res.status(200).json(result.rows);
    }).catch(err => {
      console.log(err);
      
      return res.status(404).json({ message: '에러' });
    });
  } else { // 검색옵션이 작성자일 때
    db.content.findAndCountAll({
      where: {
        writer: {
          [Op.like]: "%" + req.body.searchkeyword + "%"
        }
      },
      order: [['id', 'ASC']],
      raw: true,
    }).then(result => {
      const cnt = new Object();
      cnt.cnt = result.count;
      result.rows.push(cnt);

      return res.status(200).json(result.rows);
    }).catch(err => {
      console.log(err);
      
      return res.status(404).json({ message: '에러' });
    });
  }
});

// 글 작성 페이지에서 이미지를 올리면 실행하는 부분
router.post('/imagesave', upload.array('filelist'), function(req, res) {
  let i, newname;

  db.content.findOne({ // 새 글 작성 시 기존에 있던 가장 큰 id + 1로 자동 저장되므로, 가장 큰 id를 찾아줌
    limit: 1,
    order: [['id', 'DESC']],
    raw: true,
  }).then(result => {
    try {
      newname = result ? result.id : 0;
    } catch(e) {
      // 등록된 글이 하나도 없으면 id가 null이여서 에러 발생하므로 대신 0으로 설정
      newname = 0;
    }

    for(i = 0; i < req.files.length; i++) {
      // 위에서 지정한 이미지이름(원본 그대로)을 filesystem을 통해 바꿔주는 작업
      fs.renameSync(req.files[i].path, 'uploads/' + (newname + 1) + '-' + (i + 1) + '.png');
    }

    // 이미지 업로드 후 imgcnt 업데이트
    db.content.update({ imgcnt: req.files.length }, {
      where: { id: newname + 1 }
    }).then(() => {
      return res.status(200).json({ message: '이미지 업로드 완료!' });
    }).catch(err => {
      console.error(err);
      return res.status(500).json({ message: 'imgcnt 업데이트 에러' });
    });

  }).catch(err => {
    console.log(err);
    return res.status(404).json({ message: '에러' });
  });
});

module.exports = router;