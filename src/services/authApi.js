import axios from 'axios';
import { environment } from '../config/environment';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: `${environment.API_URL}/api/auth`,
  withCredentials: true,
  timeout: 10000,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    console.log('API 요청:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// (!!!) authApi를 사용한 중복 인터셉터 블록 삭제 (!!!)

// 인증 관련 API 함수들
export const authApi = {
  // 회원가입
  register: (name, email, password) =>
    apiClient.post('/register', { name, email, password }), // <-- apiClient로 변경

  // 로그인
  login: (email, password) =>
    apiClient.post('/login', { email, password }), // <-- apiClient로 변경

  // 로그아웃
  logout: () =>
    apiClient.post('/logout'), // <-- apiClient로 변경

  // 현재 사용자 정보 조회
  getCurrentUser: () =>
    apiClient.get('/me'), // <-- apiClient로 변경

  // Google OAuth 로그인 URL 생성
  getGoogleAuthUrl: () =>
    apiClient.get('/google/url'), // <-- apiClient로 변경

  // Naver OAuth 로그인 URL 생성
  getNaverAuthUrl: () =>
    apiClient.get('/naver/url'), // <-- apiClient로 변경

  // OAuth 콜백 처리
  handleOAuthCallback: (provider, code) =>
    apiClient.post(`/${provider}/callback`, { code }), // <-- apiClient로 변경

  // 관리자 전용 API
  admin: {
    // 모든 사용자 목록 조회
    getUsers: () =>
      apiClient.get('/admin/users'), // <-- apiClient로 변경

    // 사용자 권한 변경
    updateUserType: (userId, userType) =>
      apiClient.put(`/admin/users/${userId}`, { userType }), // <-- apiClient로 변경

    // 사용자 삭제
    deleteUser: (userId) =>
      apiClient.delete(`/admin/users/${userId}`) // <-- apiClient로 변경
  }
};

export default authApi;