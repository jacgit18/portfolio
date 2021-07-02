import React from 'react';

const card =  ({ name, email, id }) => {
    // const { name, email, id } = props;
    /**  fragment test a way to use tags without ussing div*/

    return (
        // <>
      
        <div className="tc bg-light-gray dib br3 pa3 ma2 grow bw2 shadow-5"> 
            <img alt="robots" src={`https://robohash.org/${id}?200x200`}/>
            <div>
                <h2>
                    {name}
                </h2>
                <p> {email}</p>
            </div>    
         </div> 

        //  </>

    );

}


export default card;