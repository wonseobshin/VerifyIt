// import React, { useState, useEffect } from "react";

// export default function ProgressBarExample  {
//   // constructor(props) {
//   //   super(props)

//   //   this.state = {
//   //     percentage: 0
//   //   }
//   //   this.nextStep = this.nextStep.bind(this)
//   // }

//   const [fakebox, setFakebox] = useState({
//     rating: 0,
//     decision: [],
//     category: [],
//     url: ""
//   });
  
//   nextStep() {
//     if(fakebox.rating === 100) return
//     // this set state will be replaced with fakebox.fakeboxRating and rating.rating
//     setFakebox({ rating: this.state.rating })
//   }

//   render() {
//     return (
//       <div>

//         <h2> Bias vs. Impartial </h2>
//         <ProgressBar percentage={this.state.percentage} />

//         <div style={( marginTop: '20px' )}>
//         <button
//           onClick={this.nextStep}
//           >
//             What does Fakebox say?
//           </button>
//           </div>
//           </div>
//     )
//   }
// }

// const ProgressBar = (props) => {
//   return (
//     <div className="progress-bar">
//       <Filler percentage={props.percentage} />
//       </div>
//   )
// }

// const Filler = (props) => {
//   return <div className="filler" style={{ width: `${props.percentage}%`}} />
// }


// )