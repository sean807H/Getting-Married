import { useState } from "react";

function GuestBook() {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const [entries, setEntries] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name.trim() || !message.trim())return 
        const newEntry ={ name, message, date:new Date().toLocaleString()}
        setEntries([newEntry,...entries]) // 새로 작성한 글을 가장 위에 추가
        setName('')
        setMessage('')
    }

    return(
       <section>
        <h2>방명록</h2>
        <form onSubmit={handleSubmit}>
            <input type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
           <textarea
            placeholder="축하메시지"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
           /> <br/>
              <button type="submit">남기기</button>
        </form>
        <div>
            {entries.length === 0 ? (
                <p>첫번째 방명록을 남겨주세요!</p>
            ) : (
                <div>
                    {entries.map((entry, index) => (
                        <div key={index}
                        style={{border:'1px solid #ccc', paddingBottom:'10px', marginBottom:'10px 0'}}>
                    
                            <strong>{entry.name}</strong>
                            <stromg>{entry.date}</stromg>
                            <p>{entry.message}</p> 
                        </div>
                    ))}
                    
                </div>
            )}
        </div>
     </section>
        )}
export default GuestBook;