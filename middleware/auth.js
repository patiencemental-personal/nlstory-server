export const isAuth = (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.user.logined) {
    return res.status(401).json({ message: '로그인되지 않은 사용자' });
  }
  
  if (req.session.user.authority === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: '접근 권한이 없습니다.' });
  }
};