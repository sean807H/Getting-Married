import { React, useEffect } from "react";

function Location() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.daum?.roughmap) {
        new window.daum.roughmap.Lander({
          timestamp: "1750681298368",
          key: "433rdt8adcy",
          mapWidth: "100%",
          mapHeight: "330",
        }).render();
      }
    }, 100); // 100ms 지연

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      data-aos="fade-up"
      style={{
        padding: "2rem",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {/* 상단 레이블 + 제목 */}
      <h4 style={{ letterSpacing: "0.2em", marginBottom: "1.5rem" }}>
        LOCATION
      </h4>
      <h2 style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}>식장위치</h2>

      {/* 장소명 + 주소 */}
      <p style={{ fontSize: "1.125rem", fontWeight: 500, marginTop: "30px" }}>
        세인트메리스 강남
      </p>
      <p style={{ fontSize: "1rem", margin: "0.5rem 0 2rem" }}>
        서울 서초구 남부순환로289길 5 5층
      </p>

      <div
        id="daumRoughmapContainer1750681298368"
        className="root_daum_roughmap root_daum_roughmap_landing"
        style={{ width: "100%", height: "330px", margin: "0 auto" }}
      ></div>

      <button
        onClick={() => {
          window.open(
            "https://map.kakao.com/link/search/세인트메리스 강남",
            "_blank"
          );
        }}
        style={{
          width: "100%",
          padding: "0.75rem",
          border: "1px solid #ddd",
          borderRadius: "4px",
          background: "#f9f9f9",
          fontSize: "1rem",
          marginBottom: "2rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <img
          src="/images/map.png"
          alt="지도 아이콘"
          style={{ width: "20px", height: "20px" }}
        />
        카카오맵
      </button>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #eee",
          margin: "2rem 0",
        }}
      />

      {/* 교통 및 주차 안내 */}
      <div style={{ textAlign: "left", fontSize: "1rem", lineHeight: 1.6 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
            <img
              src="/images/train.png"
              alt="train"
              style={{ width: "20px", height: "20px", marginBottom: "5px" }}
            />
          </span>
          <div>
            <strong>지하철</strong>
            <br />
            사당역 14번 출구 도보 10분 거리
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
            <img
              src="/images/car.png"
              alt="car"
              style={{ width: "20px", height: "20px", marginBottom: "5px" }}
            />
          </span>
          <div>
            <strong>주차 안내</strong>
            <br />
            (주차공간이 협소하오니, 되도록 대중교통을 이용해 주시기 바랍니다.)
            <br />
            건물주차 150대 | 2시간 무료주차
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;