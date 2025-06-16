import { useState, useEffect} from "react";
//useState : 변하는 값 저장
//useEffect: : 컴포넌트가 렌더링 될 때마다 특정 작업을 수행할 수 있도록 해주는 Hook(컴포넌트가 시작될때 실행하고 싶은 거)
function Countdown() {
    const [days, setDays] = useState(0); //일 

    useEffect(() => { 
        const weddingDate = new Date("2025-06-15T13:00:00"); // 결혼식 날짜
        const today = new Date(); // 오늘 날짜
        const timeDiff = weddingDate - today; // 두 날짜의 차이
        const d = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // 밀리초를-> 일로 변환
        setDays(d); // 일수 업데이트
    },[]) //[] : 빈 배열을 넣으면 컴포넌트가 처음 렌더링 될 때만 실행됨
    
    return (
            <div>
                <h2>결혼식까지 남은 날자</h2>
                <p>{days}일 남았습니다.</p>
            </div>
    )
}
export default Countdown;