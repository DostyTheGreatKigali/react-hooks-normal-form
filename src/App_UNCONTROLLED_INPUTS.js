import React, { useReducer, useState } from 'react';
import './App.css';

const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value
 }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  }

  const handleChange = event => {
    // Storing Type Checkbox
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      // value: event.target.value,
      // If input type is checkbox we want the checked property and not the value property
      // This is because the value of a checkbox will always be "on"
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  }

  return(
    <div className="wrapper">
      <h1>How About Them Apples</h1>
      {/* {submitting &&
        <div>Submtting Form...</div>
      } */}
        { submitting &&
       <div>
         You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}
         </ul>
       </div>
      }
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input name="name" onChange={handleChange}/>
          </label>
        </fieldset>
        <fieldset>
         <label>
           <p>Apples</p>
           <select name="apple" onChange={handleChange}>
               <option value="">--Please choose an option--</option>
               <option value="fuji">Fuji</option>
               <option value="jonathan">Jonathan</option>
               <option value="honey-crisp">Honey Crisp</option>
           </select>
         </label>
         <label>
           <p>Count</p>
           <input type="number" name="count" onChange={handleChange} step="1"/>
         </label>
         <label>
           <p>Gift Wrap</p>
           <input type="checkbox" name="gift-wrap" onChange={handleChange} />
         </label>
       </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App;