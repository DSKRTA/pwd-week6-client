import axios from 'axios';

// Axios 인턴스 생성
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // 실습용 가짜 API
  timeout: 10000,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log('API 요청:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API 에러:', error);
    return Promise.reject(error);
  }
);

// ---  restaurantAPI ---
export const restaurantAPI = {
  // 맛집 목록 가져오기 (가짜 데이터)
  getRestaurants: async () => {
    // ... (기존 코드와 동일)
    return {
      data: [
        {
          id: 1,
          name: "송림식당",
          category: "한식",
          location: "경기 수원시 영통구 월드컵로193번길 21 원천동",
          priceRange: "7,000-13,000원",
          rating: 4.99,
          description: "맛있는 한식 맛집입니다.",
          recommendedMenu: ["순두부", "김치찌개", "소불고기", "제육볶음"],
          likes: 0,
          image: "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MTJfODEg/MDAxNjU0OTYzNTM3MjE1.1BfmrmOsz_B6DBHAnhQSs6qfNIDnssofR-DrzMfigIIg.JHHDheG6ifJjtfKUqLss_mLXWFE9fNJ5BmepNUVXSOog.PNG.cary63/image.png?type=w966"
        },
        // ... (다른 식당 데이터) ...
        {
          id: 3,
          name: "Sogo",
          category: "일식",
          location: "경기 수원시 영통구 월드컵로193번길 7",
          priceRange: "10,000-16,000원",
          rating: 4.89,
          description: "일식 맛집, 구 허수아비,",
          recommendedMenu: ["냉모밀", "김치돈까스나베", "코돈부르"],
          likes: 0,
          image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190707_63%2F1562462598960nPDMy_JPEG%2FW7iKQEhTMzCF3flC1t0pzgzF.jpeg.jpg"
        }
      ]
    };
  },

  // 맛집 상세 정보 가져오기
  getRestaurantById: async (id) => {
    const restaurants = await restaurantAPI.getRestaurants();
    const restaurant = restaurants.data.find(r => r.id === parseInt(id));
    return { data: restaurant };
  },

  // 인기 맛집 가져오기
  getPopularRestaurants: async () => {
    const restaurants = await restaurantAPI.getRestaurants();
    const sorted = [...restaurants.data].sort((a, b) => b.rating - a.rating);
    return { data: sorted.slice(0, 5) };
  },

  // (!!!) SubmissionsPage에 필요한 누락된 함수 (!!!)
  createRestaurant: async (payload) => {
    console.log('Mock API: createRestaurant 호출됨', payload);
    // 새 ID를 생성하고 payload를 포함하는 가짜 응답 반환
    const newRestaurant = {
      id: Math.floor(Math.random() * 1000) + 10, // 임의의 ID
      ...payload,
      rating: payload.rating || 0,
      likes: 0,
    };
    return { data: newRestaurant };
  },
};

// (!!!) SubmissionsPage에 필요한 누락된 API 객체 (!!!)
export const submissionAPI = {
  // 제보 목록 가져오기 (가짜 데이터)
  listSubmissions: async (status) => {
    console.log('Mock API: listSubmissions 호출됨', status);
    const mockSubmissions = [
      {
        id: 101,
        restaurantName: "새로운 맛집",
        category: "양식",
        location: "수원시 어딘가",
        priceRange: "15,000-30,000원",
        recommendedMenu: ["파스타", "스테이크"],
        review: "분위기 좋아요",
        submitterName: "김제보",
        submitterEmail: "test@example.com",
        status: "pending"
      },
      {
        id: 102,
        restaurantName: "오래된 맛집",
        category: "한식",
        location: "서울시 어딘가",
        review: "이미 등록됨",
        submitterName: "박제보",
        submitterEmail: "test2@example.com",
        status: "rejected"
      },
      {
        id: 103,
        restaurantName: "승인된 맛집",
        category: "중식",
        location: "부산시 어딘가",
        recommendedMenu: ["짜장면"],
        submitterName: "이제보",
        submitterEmail: "test3@example.com",
        status: "approved"
      }
    ];

    // status 필터링 흉내
    const filtered = status ? mockSubmissions.filter(s => s.status === status) : mockSubmissions;
    return { data: filtered };
  },

  // 제보 상태 수정
  updateSubmission: async (id, payload) => {
    console.log('Mock API: updateSubmission 호출됨', id, payload);
    return { data: { id, ...payload } };
  },

  // 제보 삭제
  deleteSubmission: async (id) => {
    console.log('Mock API: deleteSubmission 호출됨', id);
    return { data: { message: "삭제 완료" } };
  }
};


export default api;