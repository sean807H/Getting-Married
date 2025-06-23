import React from "react";

function Gallery() {
  const images = [
    "/images/dk1.jpg",
    "/images/dk2.jpg",
    "/images/dk3.jpg",
    "/images/dk4.jpg",
  ];

  return (
    <section
      style={{
        padding: "2rem",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {/* 상단 레이블 + 제목 */}
      <h4 style={{ letterSpacing: "0.2em", margin: 0 }}>GALLERY</h4>
      <h2 style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}>우리의 추억</h2>

      {/* 이미지 그리드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            style={{
              overflow: "hidden",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={src}
              alt={`기념사진 ${idx + 1}`}
              style={{
                width: "100%",
                display: "block",
                transition: "transform 0.3s ease", // 부드러운 줌 효과
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
