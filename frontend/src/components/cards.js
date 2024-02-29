// import React from 'react';
// import Toast from 'react-bootstrap/Toast';
// import ToastContainer from 'react-bootstrap/ToastContainer';

// export function Toasts(prop) {
//   // Uncomment the following lines if you want to use state and add new toasts
//   // const [toastsData, setToastsData] = useState([]);

//   // const addToast = () => {
//   //   setToastsData(prevToasts => [
//   //     ...prevToasts,
//   //     { id: prevToasts.length + 1, name: `New Toast ${prevToasts.length + 1}`, info: 'New  for the toast' },
//   //   ]);
//   // };

//   // const handleCardClick = (toast) => {
//   //   if (props.onCardClick) {
//   //     props.onCardClick(toast);
//   //   }
//   // };

//   return (
//     <div
//       aria-live="polite"
//       aria-atomic="true"
//       className="Dark"
//       style={{ minHeight: '200px' }}
//     >
//       <ToastContainer className="position-static">
//         {props.proposals.map((prop, index) => (
//           <Toast key={index} style={{ backgroundColor: 'black', color: 'white' }}>
//             <Toast.Header>
//               <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
//               <strong className="me-auto">{prop.desc}</strong>
//             </Toast.Header>
//             <Toast.Body>For = {prop.votefor} VS Against = {prop.voteagainst}</Toast.Body>
//             {/* Uncomment the following line if you want to handle click events */}
//             {/* <button className="btn btn-primary" onClick={() => props.executeClick(index)}>Execute proposal</button> */}
//           </Toast>
//         ))}
//       </ToastContainer>
//       {/* Uncomment the following line if you want to add a new toast */}
//       {/* <button className="btn btn-primary" onClick={addToast}>Add Toast</button> */}
//     </div>
//   );
// }
<Background item={<HalfWindow first={
    <ProposalsInfo proposals = {proposals} executeClick = { (index) => { signedContract.executeProposal(index) }}/>

   } info={
    <StuffInfo stuff = {stuff}/>

   } second={
    <div>
    <h2 className="text-center"> Token owner: {token._name}, role: {token._role}</h2>
    <h3 className="text-center"> Owner address: {_address}</h3>			
    <DirectorButtons role = {token._role} contract = {signedContract} proposals = { proposals } />
</div>
   } />}/>