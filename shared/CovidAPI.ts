

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


export interface CovidAPI_Response {
    response: {
        header: {
            /** 결과코드 */
            resultCode: string
            /** 결과메시지 */
            resultMsg: string
        }
        body: {
            items: {
                item: CovidData | CovidData[]
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
    // /** 누적 확진률 */	
    // ACC_DEF_RATE: number
    /** 등록일시분초 */	
    createDt: string
    /** 수정일시분초 */	
    updateDt: string | null
}