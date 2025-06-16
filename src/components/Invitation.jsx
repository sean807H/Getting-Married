function Invitation() {
    const handleClick = () => {
        alert("축하해주셔서 감사합니다❤")
    }

  return (
    <div>
        <h2>초대합니다</h2>
        <p>
        시간이 지나도 변하지 않을 마음을 약속하려 합니다.<br/>
        우리의 첫걸음을 따뜻한 시선으로 지켜봐 주신다면<br/>
        큰 축복이 될 것입니다.<br/>
        새로운 인생을 시작하는 자리에 오셔서<br/>
        축하해주시면 감사하겠습니다.
        </p>

        <div>
            <p>김길동 김영희의 장남 <strong>김미림</strong></p>
            <p>이길동 김영희의 장녀 <strong>이미림</strong></p>
        </div>
        <button onClick={handleClick}>축하하기</button>
    </div>
  );
}
export default Invitation;