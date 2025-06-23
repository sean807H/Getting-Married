import React, { useState, useEffect } from "react";

function Countdown() {
  // 1) 결혼식 날짜 설정
  const weddingDate = new Date("2030-04-12T12:00:00");

  // 2) 남은 시간(일·시·분·초) state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 3) 카운트다운 로직 (1초마다 업데이트)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = weddingDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timerId = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerId);
  }, []);

  // 4) 해당 월(2030년 4월)의 달력 배열 생성
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth(); // 0 = 1월
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0=일요일
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayArray = [];
  for (let i = 0; i < firstDayIndex; i++) dayArray.push(null);
  for (let d = 1; d <= daysInMonth; d++) dayArray.push(d);
  while (dayArray.length % 7 !== 0) dayArray.push(null);

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <section data-aos="fade-up"
      style={{
        padding: "2rem",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {/* 헤더 */}
      <h4 style={{ letterSpacing: "0.2em", margin: 0 }}>WEDDING DAY</h4>
      <h2
        style={{
          fontSize: "3rem",
          margin: "0.5rem 0",
          fontFamily: "BookkMyungjo-Bd",
          marginBottom: "20px",
        }}
      >
        {month + 1}/{weddingDate.getDate()}
      </h2>

      <p style={{ margin: "0 0 1rem" }}>
        {weddingDate.toLocaleDateString("ko-KR", { weekday: "long" })} 오후{" "}
        {weddingDate.getHours()}시
      </p>

      <hr />

      {/* 달력 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          margin: "1rem 0",
          alignItems: "center",
        }}
      >
        {dayNames.map((name, idx) => (
          <div
            key={name}
            style={{
              color: idx === 0 ? "red" : idx === 6 ? "blue" : "black",
              fontWeight: 500,
            }}
          >
            {name}
          </div>
        ))}

        {dayArray.map((d, idx) => {
          const weekday = idx % 7;
          const isWeddingDay = d === weddingDate.getDate();
          return (
            <div
              key={idx}
              style={{
                position: "relative",
                padding: "0.5rem 0",
                color:
                  d == null
                    ? "transparent"
                    : weekday === 0
                    ? "red"
                    : weekday === 6
                    ? "blue"
                    : "black",
                fontWeight: isWeddingDay ? "bold" : "normal",
              }}
            >
              {isWeddingDay && (
                <span
                  style={{
                    position: "absolute",
                    top: "45%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "2rem",
                    color: "rgba(255, 192, 203, 0.3)", // 흐릿한 핑크 하트
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                >
                  ❤️
                </span>
              )}
              <span style={{ position: "relative", zIndex: 1 }}>{d}</span>
            </div>
          );
        })}
      </div>

      <hr />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "1.5rem 0",
          gap: "0.5rem",
        }}
      >
        {[
          { label: "Days", value: timeLeft.days },
          ":",
          { label: "Hour", value: timeLeft.hours },
          ":",
          { label: "Min", value: timeLeft.minutes },
          ":",
          { label: "Sec", value: timeLeft.seconds },
        ].map((item, index) =>
          item === ":" ? (
            <span
              key={`colon-${index}`}
              style={{
                fontSize: "1.5rem",
                margin: "0 0.25rem",
                fontWeight: "bold",
              }}
            >
              :
            </span>
          ) : (
            <div
              key={item.label}
              style={{
                background: "#eee",
                padding: "1rem",
                borderRadius: "8px",
                flex: "0 0 auto",
                minWidth: "60px",
              }}
            >
              <div style={{ fontSize: "0.9rem" }}>{item.label}</div>
              <div style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>
                {String(item.value).padStart(2, "0")}
              </div>
            </div>
          )
        )}
      </div>

      {/* 문구 */}
      <p style={{ fontSize: "1rem" }}>
        석민❤️서연의 결혼식이{" "}
        <span style={{ color: "red" }}>{timeLeft.days}</span>일 남았습니다
      </p>
    </section>
  );
}

export default Countdown;