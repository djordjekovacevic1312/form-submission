/*
	Napraviti mini-library za form submission.
	Implementacija u pozadini treba da koristi context API i da se ne oslanja na postojece npm pakete za forme.
	Sva logika (input[value], input[onChange], form[onSumbit]) treba da se nalazi u Form i FormInput
	komponentama tako da nije izlozena korisniku library-a.

	Ispod je primjer komponente koja bi koristila library na zeljeni nacin. Ukoliko ovakva struktura
	bude u browseru rezultovala renderovanju forme koja na submit loguje userInfo objekat sa izmjenjenim vrijednostima,
	zadatak se smatra uspjesno zavrsenim.
	
	Za zadatak kreirati poseban projekat gdje ce sadrzaj App.tsx fajla biti ovaj fajl.

	Koristiti React i TypeScript.

	Puno srece ;-)
*/
import React, { useState } from "react";
import Form from './components/Form';
import FormInput from "./components/FormInput";

const App = () => {
  // Example
  const [userInfo, setUserInfo] = useState({
    email: "example@alea.com",
    age: 30,
    name: "John Doe",
    phone: {
      ext: "00387",
      number: "65/123-456",
    },
  });


  return (
    <div>
      <Form initialValues={userInfo} onSubmit={setUserInfo}>
        <FormInput
          type="email"
          required
          name="email"
          placeholder="your@email.com"
        />
        <FormInput type="number" name="age" />
        <FormInput type="text" required name="name" />
        <FormInput type="text" name="phone.ext" />
        <FormInput type="text" name="phone.number" />
        <FormInput type="submit" value="Submit" />
      </Form> 
    </div>
  );
};


export default App;