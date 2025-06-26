import { StanReginCdApiResponse } from "../types/region.js";

export const getStanRegionCodeList = async (location: string, pageNo: number = 1): Promise<StanReginCdApiResponse> => {
  const params = `ServiceKey=${process.env.DATA_PORTAL_API_KEY}&numOfRows=1000&pageNo=${pageNo}&type=json&location=${encodeURIComponent(location)}`;
  const response = await fetch(`http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?${params}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() as StanReginCdApiResponse;
}

export const tooDescription = `
  지역 주소명으로 행정구역의 코드 값을 조회합니다.
  예를 들어, '경기도 안산시'를 입력하면 '안신시'를 포함하여 안산사의 구와 동의 코드 값을 반환합니다.
  반환 결과에는 검색어에 대한 결과 외에 총 결과 수와 페이지 정보도 포함됩니다. 이 도구에서 pageNo를 지정하면 페이지네이션이 가능합니다.
  <example>
  # 예시 1 - '경기도 안산시'를 입력했을 때
  {
    "StanReginCd": [
      {
        "head": [
          {
            "totalCount": 33
          },
          {
            "numOfRows": "3",
            "pageNo": "1",
            "type": "JSON"
          },
          {
            "RESULT": {
              "resultCode": "INFO-0",
              "resultMsg": "NOMAL SERVICE"
            }
          }
        ]
      },
      {
        "row": [
          {
            "region_cd": "4127000000",
            "sido_cd": "41",
            "sgg_cd": "270",
            "umd_cd": "000",
            "ri_cd": "00",
            "locatjumin_cd": "4127000000",
            "locatjijuk_cd": "4127000000",
            "locatadd_nm": "경기도 안산시",
            "locat_order": 20,
            "locat_rm": "",
            "locathigh_cd": "4100000000",
            "locallow_nm": "안산시",
            "adpt_de": ""
          },
          {
            "region_cd": "4127100000",
            "sido_cd": "41",
            "sgg_cd": "271",
            "umd_cd": "000",
            "ri_cd": "00",
            "locatjumin_cd": "4127100000",
            "locatjijuk_cd": "4127100000",
            "locatadd_nm": "경기도 안산시 상록구",
            "locat_order": 1,
            "locat_rm": "",
            "locathigh_cd": "4100000000",
            "locallow_nm": "상록구",
            "adpt_de": "20021101"
          },
          {
            "region_cd": "4127110100",
            "sido_cd": "41",
            "sgg_cd": "271",
            "umd_cd": "101",
            "ri_cd": "00",
            "locatjumin_cd": "4127110100",
            "locatjijuk_cd": "4127110100",
            "locatadd_nm": "경기도 안산시 상록구 일동",
            "locat_order": 1,
            "locat_rm": "",
            "locathigh_cd": "4127100000",
            "locallow_nm": "일동",
            "adpt_de": "20021101"
          }
        ]
      }
    ]
  }

  # 예시 2 - '안산'를 입력했을 때
  {
    "StanReginCd": [
      {
        "head": [
          {
            "totalCount": 38
          },
          {
            "numOfRows": "3",
            "pageNo": "1",
            "type": "JSON"
          },
          {
            "RESULT": {
              "resultCode": "INFO-0",
              "resultMsg": "NOMAL SERVICE"
            }
          }
        ]
      },
      {
        "row": [
          {
            "region_cd": "3020013700",
            "sido_cd": "30",
            "sgg_cd": "200",
            "umd_cd": "137",
            "ri_cd": "00",
            "locatjumin_cd": "3020013700",
            "locatjijuk_cd": "3020013700",
            "locatadd_nm": "대전광역시 유성구 안산동",
            "locat_order": 37,
            "locat_rm": "",
            "locathigh_cd": "3020000000",
            "locallow_nm": "안산동",
            "adpt_de": ""
          },
          {
            "region_cd": "4127000000",
            "sido_cd": "41",
            "sgg_cd": "270",
            "umd_cd": "000",
            "ri_cd": "00",
            "locatjumin_cd": "4127000000",
            "locatjijuk_cd": "4127000000",
            "locatadd_nm": "경기도 안산시",
            "locat_order": 20,
            "locat_rm": "",
            "locathigh_cd": "4100000000",
            "locallow_nm": "안산시",
            "adpt_de": ""
          },
          {
            "region_cd": "4127100000",
            "sido_cd": "41",
            "sgg_cd": "271",
            "umd_cd": "000",
            "ri_cd": "00",
            "locatjumin_cd": "4127100000",
            "locatjijuk_cd": "4127100000",
            "locatadd_nm": "경기도 안산시 상록구",
            "locat_order": 1,
            "locat_rm": "",
            "locathigh_cd": "4100000000",
            "locallow_nm": "상록구",
            "adpt_de": "20021101"
          }
        ]
      }
    ]
  }
  </example>
`