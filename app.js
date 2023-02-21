import cors from 'cors';
import express from 'express';
import keywordNoteRouter from './router/keywordNote.js';
import authRouter from './router/auth.js';
import { config } from './lib/config.js';
import session from 'express-session'; 
import createMemoryStore from 'memorystore';


// options
const PORT = process.env.PORT || 8080

/**
 * @see https://github.com/expressjs/cors#configuration-options
 */
const corsOption = {
  origin: config.cors.allowedOrigins,
  credentials: true, // Access-Control-Allow-Credentials: true
  optionsSuccessStatus: 200,
};

/**
 * @see https://github.com/expressjs/session#sessionoptions
 */
const MemoryStore = createMemoryStore(session);
const sessionOption = {
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,                   // 24시간
    httpOnly: true,                                // 쿠키에 JS에서 접근 불가
    secure: process.env.NODE_ENV === 'production', // HTTPS만 접근 가능
    /**
     * @TODO 추후 session 베이스에서 JWT로 변경
     *  - Chrome80에서 sameSite 기본 값을 lax로 변경
     *  - 브라우저에서 기본 설정을 변경한 것은 크로스 도메인간 중요한 정보 유지는 CSRF 가능성이 있는 쿠키가 아닌 다른 안전한 방식으로 하기를 권장하기 때문
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
     * @see https://ifuwanna.tistory.com/223
     */
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 로컬 개발 환경에서는 lax, 운영 환경에선 none(cross-site)
  },
  store: new MemoryStore({                 // 세션을 저장할 스토어
    checkPeriod: 24 * 60 * 60 * 1000,      // 24시간 마다 저장소에 만료된 세션 체크 및 제거
  }),
  name: 'nlstory',                         // 세션 ID Cookie의 이름
  secret: config.session.secret,           // Sessions ID Cookie를 암호화할 때 사용하는 키
  resave: false,                           // 매 요청마다 세션을 다시 저장할지 여부
  saveUninitialized: false,                // uninitialized 상태의 세션을 강제로 저장할지 여부
};


// middlewares
const app = express();

app.use(cors(corsOption));
app.use(session(sessionOption));
app.use(express.json());

app.use('/keywordNote', keywordNoteRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(PORT);