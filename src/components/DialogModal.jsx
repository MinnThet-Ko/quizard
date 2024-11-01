
import '../assets/styles/modal.styles.css'
function DialogModal({ totalScore, maxScore, resetClickHandler }) {
    return (

        <div className='backdrop'>
            <div className='modal-box'>
                <p>
                    Your score is: {totalScore}/{maxScore}!
                </p>
                <div >
                    <button onClick={(e) => resetClickHandler(e)}>Retake the test</button>
                    <button>Take an another test</button>
                </div>
            </div>
        </div >



    )

}

export default DialogModal