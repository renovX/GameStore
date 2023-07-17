import React from "react"
import parse from 'html-react-parser';
export default function GameDetails(props) {
    const gameData = props.gameData
    return (<div className="gameDetails">
        <div className="accordion" id="accordionPanelsStayOpenExample" >
            <div className="accordion-item" style={{ borderColor: 'black' }}>
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button
                        className="accordion-button  d-block text-center descp-heading"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                    >
                        Description
                    </button>
                </h2>
                <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne"
                >
                    <div className="accordion-body" style={{ backgroundColor: "black" }}>
                        {parse(String(gameData.description))}
                    </div>
                </div>
            </div>
            <div>
                <div className="accordion-item" style={{ borderColor: 'black' }}>
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button
                            className="accordion-button collapsed  d-block text-center descp-heading"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseTwo"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseTwo"
                            color="black"
                        >
                            System Requirements
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingTwo"
                    >
                        <div className="accordion-body">
                            <ul style={{ listStyle: 'none' }}>
                                {gameData.requirements ? (
                                    gameData.requirements.map((s) => <li>{s}</li>)
                                ) : (
                                    <li></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item " style={{ borderColor: 'black' }}>
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                        <button
                            className="accordion-button collapsed d-block text-center descp-heading"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseThree"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseThree"
                        >
                            Criric Review
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingThree"
                    >
                        <div className="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It
                            is hidden by default, until the collapse plugin adds the
                            appropriate classNamees that we use to style each element.
                            These classNamees control the overall appearance, as well as
                            the showing and hiding via CSS transitions. You can modify any
                            of this with custom CSS or overriding our default variables.
                            It's also worth noting that just about any HTML can go within
                            the <code>.accordion-body</code>, though the transition does
                            limit overflow.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}