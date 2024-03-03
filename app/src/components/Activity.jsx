import React, { useRef, useEffect, useState } from 'react';
import './../resources/styles/components/Activity.css';

function Activity(act) {
    const a = act.act;
    return(
        <div className="card">
            <div/>
            <div className="card-text">
                <div className="card-title">
                    {a.name}
                </div>
                <div className="card-info">
                    hiiii
                </div>
            </div>
        </div>
    );
}

export default Activity;