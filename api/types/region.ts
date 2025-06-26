// 개별 지역 정보 아이템 타입
interface RegionItem {
  region_cd: string;            // 지역코드
  sido_cd: string;              // 시도코드
  sgg_cd: string;               // 시군구코드
  umd_cd: string;               // 읍면동코드
  ri_cd: string;                // 리코드
  locatjumin_cd: string;        // 지역코드_주민
  locatjijuk_cd: string;        // 지역코드_지적
  locatadd_nm: string;          // 지역주소명
  locat_order: number;          // 서열
  locat_rm: string;             // 비고 (빈 문자열일 수 있음)
  locathigh_cd: string;         // 상위지역코드
  locallow_nm: string;          // 최하위지역명
  adpt_de: string;              // 생성일 (YYYYMMDD 형태)
}

// API 응답의 헤더 정보
interface ApiHeader {
  totalCount: number;
}

interface ApiPagination {
  numOfRows: string;
  pageNo: string;
  type: string;
}

interface ApiResult {
  RESULT: {
    resultCode: string;
    resultMsg: string;
  };
}

// 실제 API 응답 구조
interface StanReginCdApiResponse {
  StanReginCd: [
    {
      head: [
        ApiHeader,
        ApiPagination,
        ApiResult
      ];
    },
    {
      row: RegionItem[];
    }
  ];
}

// 편의를 위한 파싱된 데이터 타입
interface ParsedRegionApiResponse {
  metadata: {
    totalCount: number;
    numOfRows: string;
    pageNo: string;
    type: string;
    resultCode: string;
    resultMsg: string;
  };
  regions: RegionItem[];
}

// API 응답을 파싱하는 유틸리티 함수
export const parseRegionApiResponse = (response: StanReginCdApiResponse): ParsedRegionApiResponse => {
  const [metaData, dataSection] = response.StanReginCd;
  const [headerInfo, paginationInfo, resultInfo] = metaData.head;
  
  return {
    metadata: {
      totalCount: headerInfo.totalCount,
      numOfRows: paginationInfo.numOfRows,
      pageNo: paginationInfo.pageNo,
      type: paginationInfo.type,
      resultCode: resultInfo.RESULT.resultCode,
      resultMsg: resultInfo.RESULT.resultMsg,
    },
    regions: dataSection.row
  };
};

// 지역 레벨 확인 유틸리티 함수들
export const getRegionLevel = (region: RegionItem): 'sido' | 'sigungu' | 'eupmyeondong' | 'ri' => {
  if (region.ri_cd !== "00") return 'ri';
  if (region.umd_cd !== "000") return 'eupmyeondong';
  if (region.sgg_cd !== "000") return 'sigungu';
  return 'sido';
};

export const isSidoLevel = (region: RegionItem): boolean => {
  return region.sgg_cd === "000" && region.umd_cd === "000" && region.ri_cd === "00";
};

export const isSigunguLevel = (region: RegionItem): boolean => {
  return region.sgg_cd !== "000" && region.umd_cd === "000" && region.ri_cd === "00";
};

export const isEupmyeondongLevel = (region: RegionItem): boolean => {
  return region.umd_cd !== "000" && region.ri_cd === "00";
};

export const isRiLevel = (region: RegionItem): boolean => {
  return region.ri_cd !== "00";
};

// 성공 응답 확인 함수
export const isSuccessResponse = (response: StanReginCdApiResponse): boolean => {
  try {
    const resultInfo = response.StanReginCd[0].head[2];
    return resultInfo.RESULT.resultCode === "INFO-0";
  } catch {
    return false;
  }
};

export type {
  RegionItem,
  StanReginCdApiResponse,
  ParsedRegionApiResponse,
  ApiHeader,
  ApiPagination,
  ApiResult
};