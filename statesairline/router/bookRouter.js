const { findById, create, deleteById } = require('../controller/bookController');
const exress = require('express');
const router = exress.Router();

// 예약 내역 조회
router.get('/', findById);

// 항공편에 대한 예약 내역 생성
router.post('/', create);

// 예약 내역 삭제
router.delete('/:id', deleteById);

module.exports = router;
