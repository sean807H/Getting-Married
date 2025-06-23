import React, { useState } from "react";
import useCopyClipboard from "../../hooks/useCopyClipboard";

const accounts = {
  groom: {
    title: "신랑측",
    label: "신랑",
    name: "이석민",
    bank: "세봉은행",
    number: "100-0218-0412",
  },
  bride: {
    title: "신부측",
    label: "신부",
    name: "김서연",
    bank: "세봉은행",
    number: "100-0814-0412",
  },
};

function GuestBook() {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const pages = [1, 2, 3, 4, 5];

  const pagedEntries = entries.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [copy, copied] = useCopyClipboard();

  const openModal = (key) => {
    setSelected(accounts[key]);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const [msgModalOpen, setMsgModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", message: "" });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const deleteEntry = (index) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const submitMessage = () => {
    if (!form.name || !form.message) return;
    const today = new Date().toISOString().split("T")[0].replace(/-/g, ".");
    setEntries((prev) => [...prev, { ...form, date: today }]);
    setForm({ name: "", message: "" });
    setMsgModalOpen(false);
  };

  return (
    <section data-aos="fade-up"
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h4 style={{ letterSpacing: "0.2em", margin: 0 }}>GUESTBOOK</h4>
      <h2 style={{ fontSize: "2.5rem", margin: "0.5rem 0 1.5rem" }}>방명록</h2>

      {pagedEntries.length === 0 ? (
        <p style={{ color: "#888", marginBottom: "2rem" }}>
          아직 등록된 방명록이 없습니다.
        </p>
      ) : (
        pagedEntries.map((entry, idx) => (
          <div
            key={idx}
            style={{
              position: "relative",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <strong style={{ fontSize: "1.125rem" }}>{entry.name}</strong>
              <span style={{ color: "#ccc", fontSize: "0.875rem" }}>
                {entry.date}
                <span
                  onClick={() =>
                    deleteEntry((currentPage - 1) * entriesPerPage + idx)
                  }
                  style={{
                    marginLeft: "0.5rem",
                    cursor: "pointer",
                    color: "#aaa",
                  }}
                >
                  ×
                </span>
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.5 }}>
              {entry.message}
            </p>
          </div>
        ))
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "1.5rem",
        }}
      >
        <nav style={{ display: "flex", gap: "2rem", marginLeft: "30px" }}>
          {pages.map((p) => (
            <span
              key={p}
              onClick={() => setCurrentPage(p)}
              style={{
                fontSize: "1rem",
                fontWeight: p === currentPage ? "bold" : "normal",
                color: p === currentPage ? "#000" : "#888",
                cursor: "pointer",
              }}
            >
              {p}
            </span>
          ))}

          <span
            style={{
              marginLeft: "0.5rem",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          ></span>
        </nav>
        <button
          onClick={() => setMsgModalOpen(true)}
          style={{
            background: "#000",
            color: "#fff",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "999px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          작성하기
        </button>
      </div>

      <div
        style={{
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          borderRadius: "8px",
          padding: "1.5rem",
          marginTop: "2rem",
          textAlign: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>💍</span>
          <strong style={{ fontSize: "1rem" }}>마음전하실 곳(계좌번호)</strong>
        </div>
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #eee",
            margin: "0.5rem 0 1.5rem",
          }}
        />
        <button
          onClick={() => openModal("groom")}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "0.75rem",
            fontSize: "1rem",
            background: "#f9f9f9",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          신랑측 계좌번호
        </button>
        <button
          onClick={() => openModal("bride")}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "1rem",
            background: "#f9f9f9",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          신부측 계좌번호
        </button>
      </div>

      {modalOpen && selected && (
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
              width: "90%",
              maxWidth: "400px",
              background: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}
          >
            <header
              style={{
                background: "#000",
                color: "#fff",
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{selected.title} 마음 전하실 곳</span>
              <button
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </header>
            <div style={{ padding: "1.5rem", textAlign: "left" }}>
              <p style={{ margin: "0.5rem 0" }}>
                {selected.label} : {selected.name}
              </p>
              <p style={{ margin: "0.5rem 0" }}>
                {selected.bank} : {selected.number}
              </p>
              <button
                onClick={() => copy(selected.number)}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  padding: "0.75rem",
                  border: "none",
                  borderRadius: "4px",
                  background: "#f3f3f3",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                계좌번호 복사하기
              </button>
              {copied && (
                <div style={{ color: "green", marginTop: "0.5rem" }}>
                  복사되었습니다!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {msgModalOpen && (
        <div
          onClick={() => setMsgModalOpen(false)}
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
              width: "90%",
              maxWidth: "400px",
              background: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}
          >
            <header
              style={{
                background: "#000",
                color: "#fff",
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>신랑신부에게 축하인사 남겨주세요</span>
              <button
                onClick={() => setMsgModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </header>
            <div style={{ padding: "1.5rem", textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                name :
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  marginBottom: "1rem",
                }}
              />
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                message :
              </label>
              <input
                name="message"
                value={form.message}
                onChange={handleFormChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  marginBottom: "1rem",
                }}
              />
              <button
                onClick={submitMessage}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  padding: "0.75rem",
                  border: "none",
                  borderRadius: "4px",
                  background: "#f3f3f3",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                메세지 작성하기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GuestBook;