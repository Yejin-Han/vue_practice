const router = require('express').Router();
const mysql = require('mysql2');
const db = require('.././models');

db.sequelize.sync();

// 글 작성
router.post('/write', function(req, res) {
  db.content.create({ // 게시판번호와 게시글정보를 req.body로 받아와 db에 삽입
    boardnum: req.body.boardnum,
    writer: req.body.writer,
    title: req.body.title,
    text: req.body.text,
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
    order: [['id', 'ASC']], // id를 기준으로 오름차순 정렬
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
    return res.status(200).json(result);
  }).catch(err => {
    console.log(err);
    return res.status(404).json({ message: '에러' });
  });
});

// 게시글 삭제
router.post('/delete', function(req, res) {
  db.content.destroy({
    where: {
      id: req.body.id
    },
  }).then(function() {
    return res.status(200).json({ message: '글 삭제 완료!' });
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

module.exports = router;