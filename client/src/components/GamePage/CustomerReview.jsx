import React from "react"
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
export default function CustomerReview({ commData, profileData, handleForm, userComm, commStatus, setCommStatus, CommentRate }) {
    return (
        <div className="review">

            <h2 className="comment-heading">Customer Review</h2>

            {profileData.loggedIn ? (<Box
                component="form"
                noValidate
                onSubmit={handleForm}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                        Add Your Review
                    </label>
                    <textarea
                        className="form-control"
                        id="comment-text"
                        name="comment-text"
                        defaultValue={userComm}
                        rows="3"
                    ></textarea>
                    <ToggleButtonGroup
                        value={commStatus}
                        exclusive
                        onChange={() => { setCommStatus(!commStatus) }}
                        aria-label="text alignment"
                    >
                        <ToggleButton value={true} aria-label="left aligned">
                            <ThumbUpIcon sx={{ color: 'green' }} />
                        </ToggleButton>
                        <ToggleButton value={false} aria-label="centered">
                            <ThumbDownIcon sx={{ color: 'red' }} />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginBottom: '3%' }}>
                    Submit
                </button>
            </Box>) : <></>}
            {commData ? commData.map(comment => (
                <div className="comments">

                    <div className="custdetail">
                        <h3 style={{ color: 'blue' }}>{comment.uname}</h3>
                        <div className="cust-rating">
                            <CommentRate rate={comment.rate} />
                            <text>Total Hours: {comment.hours}h</text>
                        </div>
                    </div>
                    <p className="user-comment">{comment.data}
                    </p></div>)) : (<p style={{ color: 'black' }}>No Comments Posted</p>)}
        </div>
    )
}