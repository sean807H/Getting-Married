import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import useCopyClipboard from "../../hooks/useCopyClipboard";

const initialState = {
  side: "groom", // 'groom' or 'bride'
  name: "",
  isAttending: "참석",
  phone: "",
  meal: "참석",
  guests: 1,
};

function rsvpReducer(state, action) {
  switch (action.type) {
    case "SET_SIDE":
      return { ...state, side: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_ATTENDING":
      return { ...state, isAttending: action.payload };
    case "SET_PHONE":
      return { ...state, phone: action.payload };
    case "SET_MEAL":
      return { ...state, meal: action.payload };
    case "INCREMENT_GUESTS":
      return { ...state, guests: state.guests + 1 };
    case "DECREMENT_GUESTS":
      return { ...state, guests: Math.max(1, state.guests - 1) };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

function RSVP() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://wedding-server-1kyi.onrender.com/rsvp", state);
      alert("참석 정보가 저장되었습니다!");
      dispatch({ type: "RESET" });
      closeModal();
    } catch (err) {
      console.error("RSVP 저장 실패:", err);
      alert("저장 실패");
    }
  };

  const [state, dispatch] = useReducer(rsvpReducer, initialState);
  const [modalOpen, setModalOpen] = useState(false);
  const [copyURL, copiedURL] = useCopyClipboard();
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [qrImage, setQrImage] = useState(null);
  const [shareData, setShareData] = useState(null);

  useEffect(() => {
    fetch(`https://wedding-server-1kyi.onrender.com/qrcode`)
      .then((res) => res.json())
      .then((data) => setQrImage(data.qrImage));
  }, []);

  useEffect(() => {
    fetch("https://wedding-server-1kyi.onrender.com/kakao")
      .then(res => res.json())
      .then(data => setShareData(data));
  }, []);

  // 청첩장 URL 복사
  const handleCopyLink = () => {
    copyURL(window.location.href);
  };

  // 카카오톡 공유
  const handleShareKakao = () => {
    // 카카오 SDK가 로드되지 않은 경우
    if (!window.Kakao) {
      alert("카카오 SDK가 로드되지 않았습니다.");
      return;
    }
  
    // 아직 초기화되지 않았다면 JavaScript 키로 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("13030a78b29bbe8ef5103e6552186830"); // 🔑 이 부분이 '키'를 사용하는 곳!
    }
  
    // 공유할 내용 설정
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "💌 우리 결혼합니다!",
        description: "소중한 분을 초대합니다. 초대장을 확인해보세요!",
        imageUrl: "/images/main.png", // 청첩장 대표 이미지 URL
        link: {
          mobileWebUrl: "https://getting-married-orcin.vercel.app/",
          webUrl: "https://getting-married-orcin.vercel.app/",
        },
      },
    });
  };
  

  return (
    <>
      <section
        data-aos="fade-up"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          참석 정보 전달하기
        </h2>
        <p style={{ lineHeight: 1.5, marginTop: "20px" }}>
          참석에 부담 가지지 말아주시고
          <br />
          편하게 알려주세요.
          <br />
          저희의 정성을 다하는 준비에 도움이 될 것 같아
          <br />
          참석 여부를 알려주시면 감사하겠습니다.
        </p>
        <hr
          style={{
            border: "none",
            borderTop: "1px dashed #ccc",
            margin: "2rem 0",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <span>신랑 석민</span>
          <span style={{ color: "red" }}>
            <img
              src="/images/heart.png"
              alt="heart"
              style={{ width: "25px", height: "25px", marginTop: "10px" }}
            />
          </span>
          <span>신부 서연</span>
        </div>
        <h3
          style={{
            fontSize: "2rem",
            margin: "0.5rem 0",
            fontFamily: "BookkMyungjo-Bd",
          }}
        >
          4/12
        </h3>
        <p style={{ margin: "0.5rem 0" }}>
          토요일 오후 12시
          <br />
          <span style={{ color: "#888" }}>세인트메리스 강남</span>
        </p>
        <button
          onClick={openModal}
          style={{
            padding: "1rem",
            background: "#000",
            fontSize: "1rem",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "200px",
            cursor: "pointer",
            marginTop: "30px",
          }}
        >
          참석여부 전달하기
        </button>
      </section>
      {/* 공유/복사 섹션 */}
      <section
        data-aos="fade-up"
        style={{ background: "#f5f5f5", padding: "2rem" }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <button
            onClick={handleShareKakao}
            style={{
              width: "100%",
              padding: "1rem",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span>카카오톡으로 공유하기</span>
            <img
              src="/images/kakao-talk-icon.png"
              alt="kakao"
              style={{ width: "24px", height: "24px" }}
            />
          </button>

          <button
            onClick={handleCopyLink}
            style={{
              width: "100%",
              padding: "1rem",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span>청첩장 주소 복사하기</span>
            <img
              src="/images/link-icon.png"
              alt="copy link"
              style={{ width: "24px", height: "24px" }}
            />
          </button>
        </div>
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #ddd",
            marginTop: "2rem",
          }}
        />
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p>청첩장 QR 코드</p>
          {qrImage ? (
            <img src={qrImage} alt="QR Code" style={{ width: "150px" }} />
          ) : (
            <p>로딩 중...</p>
          )}
        </div>
      </section>

      {modalOpen && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "16px",
              width: "90%",
              maxWidth: "360px",
              overflow: "hidden",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  fontFamily: "Pretendard-Regular",
                }}
              >
                참석여부 전달하기
              </h3>
            </div>
            <hr
              style={{ margin: 0, border: "none", borderTop: "1px solid #eee" }}
            />

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#f3f3f3",
                  borderRadius: "12px",
                  height: "64px",
                  gap: "4px",
                  padding: "0 8px",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: "SET_SIDE", payload: "groom" })
                  }
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background:
                      state.side === "groom" ? "#ffffff" : "transparent",
                    border: "1px solid #ccc",
                    fontWeight: state.side === "groom" ? "600" : "400",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  신랑측
                </button>

                <div
                  style={{
                    fontSize: "1.5rem",
                    padding: "0 8px",
                  }}
                >
                  <img
                    src="/images/cake.png"
                    alt="cake"
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: "SET_SIDE", payload: "bride" })
                  }
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background:
                      state.side === "bride" ? "#ffffff" : "transparent",
                    border: "1px solid #ccc",
                    fontWeight: state.side === "bride" ? "600" : "400",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  신부측
                </button>
              </div>

              {/* 성함 입력 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#f3f3f3",
                  borderRadius: "8px",
                  padding: "0.75rem",
                }}
              >
                <label style={{ margin: 0 }}>성함</label>
                <input
                  type="text"
                  required
                  value={state.name}
                  onChange={(e) =>
                    dispatch({ type: "SET_NAME", payload: e.target.value })
                  }
                  placeholder="성함 입력"
                  style={{
                    border: "none",
                    background: "transparent",
                    textAlign: "right",
                    flex: 1,
                    outline: "none",
                  }}
                />
              </div>

              {/* 참석여부 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#f3f3f3",
                  borderRadius: "12px",
                  padding: "0.75rem 1rem",
                }}
              >
                <label style={{ margin: 0, fontWeight: "500" }}>참석여부</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "SET_ATTENDING", payload: "참석" })
                    }
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      background:
                        state.isAttending === "참석"
                          ? "#ffffff"
                          : "transparent",
                      border: "1px solid #ccc",
                      fontWeight: state.isAttending === "참석" ? "600" : "400",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    참석
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "SET_ATTENDING", payload: "불참" })
                    }
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      background:
                        state.isAttending === "불참"
                          ? "#ffffff"
                          : "transparent",
                      border: "1px solid #ccc",
                      fontWeight: state.isAttending === "불참" ? "600" : "400",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    불참
                  </button>
                </div>
              </div>

              {/* 전화번호 입력 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#f3f3f3",
                  borderRadius: "8px",
                  padding: "0.75rem",
                }}
              >
                <label style={{ margin: 0 }}>전화번호</label>
                <input
                  type="tel"
                  required
                  value={state.phone}
                  onChange={(e) =>
                    dispatch({ type: "SET_PHONE", payload: e.target.value })
                  }
                  placeholder="전화번호 입력"
                  style={{
                    border: "none",
                    background: "transparent",
                    textAlign: "right",
                    flex: 1,
                    outline: "none",
                  }}
                />
              </div>

              {/* 식사예정 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#f3f3f3",
                  borderRadius: "12px",
                  padding: "0.75rem 1rem",
                }}
              >
                <label style={{ margin: 0, fontWeight: "500" }}>식사예정</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "SET_MEAL", payload: "참석" })
                    }
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      background:
                        state.meal === "참석" ? "#ffffff" : "transparent",
                      border: "1px solid #ccc",
                      fontWeight: state.meal === "참석" ? "600" : "400",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    참석
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "SET_MEAL", payload: "불참" })
                    }
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      background:
                        state.meal === "불참" ? "#ffffff" : "transparent",
                      border: "1px solid #ccc",
                      fontWeight: state.meal === "불참" ? "600" : "400",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    불참
                  </button>
                </div>
              </div>

              {/* 인원 조절 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#f3f3f3",
                  borderRadius: "8px",
                  padding: "0.75rem",
                }}
              >
                <label style={{ margin: 0 }}>인원(본인포함)</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "DECREMENT_GUESTS" })}
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: "1.25rem",
                      cursor: "pointer",
                      marginRight: "0.5rem",
                    }}
                  >
                    –
                  </button>
                  <span style={{ width: "2rem", textAlign: "center" }}>
                    {state.guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "INCREMENT_GUESTS" })}
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: "1.25rem",
                      cursor: "pointer",
                      marginLeft: "0.5rem",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem",
                  background: "#000",
                  fontSize: "1rem",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                참석 정보 전달하기
              </button>
            </form>

            <hr
              style={{ margin: 0, border: "none", borderTop: "1px solid #eee" }}
            />

            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              style={{
                width: "100%",
                padding: "1rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default RSVP;
