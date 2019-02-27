import React from 'react';
import Moment from 'react-moment';

const List = (props) => {
    //console.log('props', props);

    return (
        <React.Fragment>
        <br />
        <div className="container">
        <div className="card border">
            <div className="card-body col-12" key={props.details.id}>
                <span className="float-left col-7">{props.details.modText}</span>
                <span className="col-3">Added <Moment fromNow ago>{props.details.timeStamp}</Moment> ago </span>
                <div className="float-right col-2">
                    <button className="btn btn-danger btn-sm btn-block" onClick={props.deleteTodo}>Delete</button>
                </div>

            </div>
        </div>    
        </div>
        </React.Fragment>
    )
}

export default List;