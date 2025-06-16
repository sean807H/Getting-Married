function Location(){
    return(
        <section>
            <h2>오시는 길</h2>
            <p><strong>그랜드 호텔 서울</strong></p>
            <p>서울특별시</p>
            <div>
                <iframe
                    title="지도"
                    src="https://kko.kakao.com/AZ4zR39ku1"
                    width="600"
                    height="450"
                    style={{border:0}}
                />
            </div>

            <h3>대중교통</h3>
           <ul>
            <li>지하철 2호선 신림역 3번 출구 도보 5분</li>
            <li>버스 152, 5516번, 5523번 출구 도보 5분</li>
           </ul>
           <h3>자가용</h3>
           <p>호텔 주차장 이용 가능(3시간 무료)</p>
        </section>
    )
}
export default Location;