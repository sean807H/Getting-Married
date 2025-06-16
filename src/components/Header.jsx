import { useState, useEffect, useRef } from "react";

function Header(){ //처음은 항상 대문자로 작성
    const [isVisible, setIsVisible] = useState(true)
    const lastScrollY = useRef(window.scrollY)

    useEffect(()=>{
        const handleScroll = ()=>{
            if(window.scrollY > lastScrollY.current){
                setIsVisible(false) // 스크롤을 내리면 헤더 숨김
            }else{
                setIsVisible(true) // 스크롤을 올리면 헤더 보임
            }
            lastScrollY.current = window.scrollY;
        }
        window.addEventListener('scroll', handleScroll)
        return ()=>{
            window.removeEventListener('scroll', handleScroll)
        }
    },[])

    return(
        <header style={{
            position:'sticky', 
            top:0,
            backgroundColor:'green',
            transition:'transform 0.3s ease',
            transform: isVisible ? 'transLateY(0)' : 'transLateY(-100%)',
            zIndex: 1000,
            padding: '20px 0px',
            textAlign: 'center',
            boxShadowL:"0 2px 4px rgba(0,0,0,0.1)"
        }}>
            <h1>이미림 & 김미림</h1>
            <p>2025년 6월 15일 오후 1시</p>
            <p>그랜드 호텔 서울</p>
        </header>
    )
}
export default Header;