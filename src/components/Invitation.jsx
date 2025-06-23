import React from "react";

function Invitation() {
  return (
    <section
      style={{
        padding: "4rem 1rem",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h4
        style={{
          fontSize: "1rem",
          letterSpacing: "0.2em",
          marginBottom: "0.5rem",
        }}
      >
        INVITATION
      </h4>
      <h2 style={{ fontSize: "2.5rem", margin: "0 0 2rem" }}>초대합니다</h2>

      <p
        style={{
          fontSize: "1rem",
          lineHeight: 1.6,
          margin: "0 auto 2rem",
        }}
      >
        평생을 함께하고 싶은 사람이 생겼습니다.
        <br />
        처음처럼 변치않는 마음으로 서로 아끼며
        <br />
        예쁘게 살겠습니다.
        <br />
        부디 함께 하시어
        <br />
        저희의 하나됨을 따뜻한 미소로
        <br />
        축복해주시길 바랍니다.
      </p>

      {/* 설명과 사진 사이 세로선 */}
      <div
        style={{
          width: "1px",
          height: "80px",
          backgroundColor: "#ccc",
          margin: "0 auto 2rem",
        }}
      />

      {/* invitation.png */}
      <img
        src="/images/Invitation.png"
        alt="Invitation"
        style={{
          display: "block",
          width: "80%",
          borderRadius: "20px",
          margin: "0 auto 2rem", // 위아래 여백과 좌우 자동 정렬
        }}
      />

      {/* 부모님 성함 */}
      <div style={{ fontSize: "1rem", lineHeight: 1.5, color: "#333" }}>
        <p>
          이재석 · 양희경 의 아들 <strong>이석민</strong>
        </p>
        <p>
          김민수 · 최지선 의 딸 <strong>김서연</strong>
        </p>
      </div>
    </section>
  );
}

export default Invitation;
