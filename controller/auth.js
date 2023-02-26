import bcrypt from 'bcrypt';
import { config } from '../lib/config.js';

/**
 * login
 */
export async function login(req, res) {
  const { password } = req.body;
  const validPassword = await bcrypt.compare(password, config.app.encodedPassword);
  if (validPassword) {
    req.session.save(() => {
      req.session.user = { 
        logined: true,
        authority: 'admin',
      };
      const data = {
        ...req.session,
        message: '로그인 성공',
      };
      res.status(201).json(data);
    });
  } else {
    res.status(401).json({ message: '유효하지 않은 인증 번호 입니다.' });
  }
}

/**
 * loginSuccess
 * 현재 로그인된 상태인지 체크, 로그인 되었다면 session 데이터를 반환
 */
export async function loginSuccess(req, res) {
  if (req.session.user) {
    res.status(200).json({
      ...req.session,
      message: '로그인된 사용자',
    });
  } else {
    res.status(403).json({ message: '로그인되지 않은 사용자' });
  }
}

/**
 * logout
 */
export async function logout(req, res) {
  req.session.destroy(() => {
    res.status(200).json({ message: '로그아웃 성공.' });
  })
}