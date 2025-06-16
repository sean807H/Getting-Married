import React, {useReducer} from 'react';

const initialState = {
    name: '',
    isAttending:'참석',
    guests:1,
    participants:[]
}

//상태 변경하는 함수  
//action은 dispatch로 전달된 객체
//payload는 action 객체의 속성으로 전달된 값
function rsvpReducer(state, action){
    switch(action.type){
        case 'SET_NAME':
        return {...state, name:action.payload}; //현재 상태 가져오고 name필드만 새로운 값으로 변경

        case 'SET_ATTENDING':
        return {...state, isAttending:action.payload};

        case 'SET_GUESTS':
        return {...state, guests:action.payload};

        case 'ADD_PARTICIPANT':
            return{...state, participants:[...state.participants, action.payload]}
        
        case 'RESET':
            return {...initialState, participants:state.participants} //기존 참가자 리스트는 유지하고 나머지 상태 초기화
        default:
            return state;

    }
}

function RSVP(){
    const [state,dispatch] = useReducer(rsvpReducer, initialState);
    const handleSubmit = (e) => {
        e.preventDefault();

        const newParticipant = {
            name: state.name,
            isAttending: state.isAttending,
            guests: state.guests
        }

        dispatch({type:'ADD_PARTICIPANT', payload:newParticipant});
        dispatch({type:'RESET'}); //상태 초기화
    }
    

    return(
        <section>
            <h2>RSVP (참석여부)</h2>
            <form onSubmit={handleSubmit}>
              <input 
                type='text'
                placeholder='이름을 입력하세요'
                value={state.name}
                onChange={(e)=>dispatch({type:'SET_NAME', payload:e.target.value})}
                required
              />
            <br />
            
            <select 
                value={state.isAttending}
                onChange={(e)=>dispatch({type:'SET_ATTENDING', payload:e.target.value})}
                >
                <option value="참석">참석</option>
                <option value="불참">불참</option>
                </select>

            <br />

            <input 
            type="number"
            min="1"
            value={state.guests}
            onChange={(e)=>dispatch({type:'SET_GUESTS', payload:e.target.value})}
            />
            <br />
            <button type="submit">제출</button>
            </form>

            <h3>참여자 리스트</h3>
            <ul>
                {state.participants.map((participant, index) => (
                    <li key={index}>
                        {participant.name} - {participant.isAttending} - {participant.guests}명
                    </li>
                ))}
            </ul>
        </section>
    )

}
export default RSVP;
