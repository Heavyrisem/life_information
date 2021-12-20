

export interface CovidAPI_Request {
    /** 서비스키 */	
    serviceKey?: string
    /** 페이지 번호 */	
    pageNo?: number
    /** 한 페이지 결과 수 */	
    numOfRows?: number
    /** 
    * 데이터 생성일 시작범위
    * 
    * 검색할 생성일 범위의 시작
    */	
    startCreateDt?: string
    /** 
    * 데이터 생성일 종료범위
    * 
    * 검색할 생성일 범위의 종료
    */	
    endCreateDt?: string
}


export interface CovidAPI_Response<T> {
    response: {
        header: {
            /** 결과코드 */
            resultCode: string
            /** 결과메시지 */
            resultMsg: string
        }
        body: {
            items: {
                item: T
            }
        }
        /** 한 페이지 결과 수 */
        numOfRows: number
        /** 페이지 번호 */
        pageNo: number
        /** 전체 결과 수 */
        totalCount: number
    }
}

// export interface CovidAPI_normal_Response extends CovidAPI_default_Response {
//     response: {
        
//     }
// }

// export interface CovidAPI_sido_Response extends CovidAPI_default_Response {
//     body: {
//         items: {
//             item: CovidSidoData[]
//         }
//     }
// }

export interface CovidData {
    /** 게시글번호(감염현황 고유값) */	
    seq: number
    /** 기준일 */	
    stateDt: number
    /** 기준시간 */	
    stateTime: string
    /** 확진자 수 */	
    decideCnt: number
    /** 사망자 수 */	
    deathCnt: number
    /** 누적 검사 수 */	
    accExamCnt: number
    /** 등록일시분초 */	
    createDt: Date | string
    /** 수정일시분초 */	
    updateDt: string | Date | null
}

export interface CovidSidoData {
    /** 게시글번호(국내 시도별 발생현황 고유값) */
    seq: number
    /** 등록일시분초 */
    createDt: Date | string
    /** 사망자 수 */
    deathCnt: number
    /** 시도명(한글) */
    gubun: string
    /** 시도명(중국어) */
    gubunCn: string
    /** 시도명(영어) */
    gubunEn: string
    /** 전일대비 증감 수 */
    incDec: number
    /** 격리 해제 수 */
    isolClearCnt: number
    /** 10만명당 발생률 */
    qurRate: number
    /** 기준일시 */
    stdDay: Date | string
    /** 수정일시분초 */
    updateDt: string | Date | null
    /** 확진자 수 */
    defCnt: number
    /** 해외유입 수 */
    overFlowCnt: number
    /** 지역발생 수 */
    localOccCnt: number
}