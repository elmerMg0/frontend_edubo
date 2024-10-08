
interface Props{
  classname1: string,
  txtBtn2: string | React.ReactNode,
  txtBtn1: string,
  handleSkip: () => void,
  changeView: () => void,
  juscont: string,
  classname2: string
}
function Btns({classname1,classname2, txtBtn2, txtBtn1, handleSkip, changeView, juscont}: Props) {
  return (
   
    <section className="quiz-footer" style={{justifyContent: `${juscont}`}}>
      <button
        className={`btn ${classname1}`}
        onClick={handleSkip}
      >
        {txtBtn1}
      </button>
      <button
        className={`btn ${classname2}`}
        onClick={changeView}
        style={{minWidth: '100px'}}
      >
        {txtBtn2}
      </button>
  </section>
  )
}

export default Btns